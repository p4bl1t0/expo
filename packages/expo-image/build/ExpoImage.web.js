import React from 'react';
import { ImageTransitionEffect, ImageTransitionTiming, } from './Image.types';
import { resolveContentFit, resolveContentPosition } from './utils';
function resolveAssetSource(source) {
    if (source == null)
        return null;
    if (typeof source === 'string') {
        return { uri: source };
    }
    if (typeof source === 'number') {
        return { uri: String(source) };
    }
    return source;
}
function ensureUnit(value) {
    const trimmedValue = String(value).trim();
    if (trimmedValue.endsWith('%')) {
        return trimmedValue;
    }
    return `${trimmedValue}px`;
}
function getObjectPositionFromContentPosition(contentPosition) {
    const resolvedPosition = (typeof contentPosition === 'string' ? resolveContentPosition(contentPosition) : contentPosition);
    if (!resolvedPosition) {
        return null;
    }
    if (resolvedPosition.top == null || resolvedPosition.bottom == null) {
        resolvedPosition.top = '50%';
    }
    if (resolvedPosition.left == null || resolvedPosition.right == null) {
        resolvedPosition.left = '50%';
    }
    return ['top', 'bottom', 'left', 'right']
        .map((key) => {
        if (key in resolvedPosition) {
            return `${key} ${ensureUnit(resolvedPosition[key])}`;
        }
        return '';
    })
        .join(' ');
}
function ensureIsArray(source) {
    if (Array.isArray(source)) {
        return source;
    }
    if (source == null) {
        return [];
    }
    return [source];
}
function useImageState(source) {
    const [imageState, setImageState] = React.useState(source ? 'loading' : 'empty');
    React.useEffect(() => {
        setImageState((prevState) => prevState === 'empty' ? (source ? 'loading' : 'empty') : prevState);
    }, [source]);
    const onLoad = React.useCallback(() => setImageState((prevState) => (imageState === 'loading' ? 'loaded' : prevState)), []);
    const handlers = React.useMemo(() => ({
        onLoad,
    }), [onLoad]);
    return [imageState, handlers];
}
const getCSSTiming = (timing) => {
    return {
        [ImageTransitionTiming.EASE_IN]: 'ease-in',
        [ImageTransitionTiming.EASE_OUT]: 'ease-out',
        [ImageTransitionTiming.EASE_IN_OUT]: 'ease-in-out',
        [ImageTransitionTiming.LINEAR]: 'linear',
    }[timing || ImageTransitionTiming.LINEAR];
};
function useTransition(transition, state) {
    if (!transition?.effect)
        return { placeholder: {}, image: {} };
    const { duration, timing, effect } = {
        timing: ImageTransitionTiming.EASE_IN_OUT,
        duration: 1000,
        ...transition,
    };
    if (effect === ImageTransitionEffect.CROSS_DISOLVE) {
        const commonStyles = {
            transition: `opacity ${duration}ms`,
            transitionTimingFunction: getCSSTiming(timing),
        };
        return {
            image: {
                opacity: state === 'loaded' ? '1' : '0',
                ...commonStyles,
            },
            placeholder: {
                opacity: state === 'loaded' ? '0' : '1',
                ...commonStyles,
            },
        };
    }
    else if (effect === ImageTransitionEffect.FLIP_FROM_TOP) {
        const commonStyles = {
            transition: `transform ${duration}ms`,
            transformOrigin: 'top',
            transitionTimingFunction: getCSSTiming(timing),
        };
        return {
            placeholder: {
                transform: `rotateX(${state !== 'loaded' ? '0' : '90deg'})`,
                ...commonStyles,
            },
            image: {
                transform: `rotateX(${state === 'loaded' ? '0' : '90deg'})`,
                ...commonStyles,
            },
        };
    }
    return { placeholder: {}, image: {} };
}
const findBestSourceForSize = (sources, size) => {
    return (sources
        // look for the smallest image that's still larger then a container
        .map((source) => {
        if (!size)
            return { source, penalty: 0, covers: false };
        const { width, height } = source;
        if (width == null || height == null)
            return { source, penalty: 0, covers: false };
        if (width < size.width || height < size.height)
            return {
                source,
                penalty: Math.max(size.width - width, size.height - height),
                covers: false,
            };
        return { source, penalty: (width - size.width) * (height - size.height), covers: true };
    })
        .sort((a, b) => b.penalty - a.penalty)
        .sort((a, b) => Number(a.covers) - Number(b.covers))
        .at(-1)?.source ?? null);
};
const useSourceSelection = (sources, sizeCalculation = 'initial') => {
    // undefined - not calculated yet, don't fetch any images, null - no size available, pick arbitrary image, DOMRect - size available
    const [size, setSize] = React.useState(undefined);
    const resizeObserver = React.useRef(null);
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setSize((s) => (s === undefined ? null : s));
        }, 200);
        return () => {
            clearTimeout(timeout);
            resizeObserver.current?.disconnect();
        };
    }, []);
    const containerRef = React.useCallback((element) => {
        if (sizeCalculation === 'initial') {
            setSize(element?.getBoundingClientRect());
        }
        else if (sizeCalculation === 'live') {
            resizeObserver.current?.disconnect();
            if (!element)
                return;
            resizeObserver.current = new ResizeObserver((entries) => {
                setSize(entries[0].contentRect);
            });
            resizeObserver.current.observe(element);
        }
    }, []);
    const source = size !== undefined ? findBestSourceForSize(sources, size) : null;
    return React.useMemo(() => ({
        containerRef,
        source,
    }), [source]);
};
export default function ExpoImage({ source, placeholder, loadingIndicatorSource, contentPosition, onLoad, transition, onLoadStart, onLoadEnd, onError, webResponsivePolicy, ...props }) {
    const { aspectRatio, backgroundColor, transform, borderColor, ...style } = props.style ?? {};
    const [state, handlers] = useImageState(source);
    const { placeholder: placeholderStyle, image: imageStyle } = useTransition(transition, state);
    const resolvedSources = ensureIsArray(source)
        .map(resolveAssetSource)
        .filter(Boolean);
    const { containerRef, source: selectedSource } = useSourceSelection(resolvedSources, webResponsivePolicy);
    return (React.createElement("div", { ref: containerRef, style: {
            aspectRatio: String(aspectRatio),
            backgroundColor: backgroundColor?.toString(),
            transform: transform?.toString(),
            borderColor: borderColor?.toString(),
            ...style,
            overflow: 'hidden',
            position: 'relative',
        } },
        React.createElement("img", { src: ensureIsArray(placeholder).map(resolveAssetSource)?.[0]?.uri, style: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: 0,
                right: 0,
                objectFit: 'scale-down',
                objectPosition: 'center',
                ...placeholderStyle,
            } }),
        React.createElement("img", { src: selectedSource?.uri, style: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: 0,
                right: 0,
                objectFit: resolveContentFit(props.contentFit, props.resizeMode),
                objectPosition: getObjectPositionFromContentPosition(contentPosition) || undefined,
                ...imageStyle,
            }, onLoad: handlers.onLoad })));
}
//# sourceMappingURL=ExpoImage.web.js.map