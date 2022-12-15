import React from 'react';
import { resolveContentPosition } from './utils';
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
        return '50% 50%';
    }
    if (resolvedPosition.top == null || resolvedPosition.bottom == null) {
        resolvedPosition.top = '50%';
    }
    if (resolvedPosition.left == null || resolvedPosition.right == null) {
        resolvedPosition.left = '50%';
    }
    return (['top', 'bottom', 'left', 'right']
        .map((key) => {
        if (key in resolvedPosition) {
            return `${key} ${ensureUnit(resolvedPosition[key])}`;
        }
        return '';
    })
        .join(' ') || '50% 50%');
}
export default function ExpoImage({ source, contentFit, contentPosition, onLoad, onLoadStart, onLoadEnd, onError, ...props }) {
    const { aspectRatio, backgroundColor, transform, borderColor, ...style } = props.style ?? {};
    return (React.createElement(React.Fragment, null,
        React.createElement("picture", { style: {
                overflow: 'hidden',
                ...style,
            } },
            React.createElement("img", { src: source?.[0]?.uri, style: {
                    width: '100%',
                    height: '100%',
                    aspectRatio: String(aspectRatio),
                    backgroundColor: backgroundColor?.toString(),
                    transform: transform?.toString(),
                    borderColor: borderColor?.toString(),
                    objectFit: contentFit,
                    objectPosition: getObjectPositionFromContentPosition(contentPosition),
                } }))));
}
//# sourceMappingURL=ExpoImage.web.js.map