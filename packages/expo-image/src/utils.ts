import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import {
  ImageContentFit,
  ImageContentPosition,
  ImageContentPositionObject,
  ImageContentPositionString,
  ImageNativeProps,
  ImageProps,
  ImageResizeMode,
  ImageSource,
} from './Image.types';

let loggedResizeModeDeprecationWarning = false;
let loggedRepeatDeprecationWarning = false;
let loggedFadeDurationDeprecationWarning = false;

/**
 * If the `contentFit` is not provided, it's resolved from the equivalent `resizeMode` prop
 * that we support to provide compatibility with React Native Image.
 */
export function resolveContentFit(
  contentFit?: ImageContentFit,
  resizeMode?: ImageResizeMode
): ImageContentFit {
  if (contentFit) {
    return contentFit;
  }
  if (resizeMode) {
    if (!loggedResizeModeDeprecationWarning) {
      console.log('[expo-image]: Prop "resizeMode" is deprecated, use "contentFit" instead');
      loggedResizeModeDeprecationWarning = true;
    }

    switch (resizeMode) {
      case ImageResizeMode.CONTAIN:
        return ImageContentFit.CONTAIN;
      case ImageResizeMode.COVER:
        return ImageContentFit.COVER;
      case ImageResizeMode.STRETCH:
        return ImageContentFit.FILL;
      case ImageResizeMode.CENTER:
        return ImageContentFit.SCALE_DOWN;
      case ImageResizeMode.REPEAT:
        if (!loggedRepeatDeprecationWarning) {
          console.log('[expo-image]: Resize mode "repeat" is no longer supported');
          loggedRepeatDeprecationWarning = true;
        }
    }
  }
  return ImageContentFit.COVER;
}

/**
 * It resolves a stringified form of the `contentPosition` prop to an object,
 * which is the only form supported in the native code.
 */
export function resolveContentPosition(
  contentPosition?: ImageContentPosition
): ImageContentPositionObject | undefined {
  if (typeof contentPosition === 'string') {
    const contentPositionStringMappings: Record<
      ImageContentPositionString,
      ImageContentPositionObject
    > = {
      center: { top: '50%', left: '50%' },
      top: { top: 0, left: '50%' },
      right: { top: '50%', right: 0 },
      bottom: { bottom: 0, left: '50%' },
      left: { top: '50%', left: 0 },
      'top center': { top: 0, left: '50%' },
      'top right': { top: 0, right: 0 },
      'top left': { top: 0, left: 0 },
      'right center': { top: '50%', right: 0 },
      'right top': { top: 0, right: 0 },
      'right bottom': { bottom: 0, right: 0 },
      'bottom center': { bottom: 0, left: '50%' },
      'bottom right': { bottom: 0, right: 0 },
      'bottom left': { bottom: 0, left: 0 },
      'left center': { top: '50%', left: 0 },
      'left top': { top: 0, left: 0 },
      'left bottom': { bottom: 0, left: 0 },
    };
    const contentPositionObject = contentPositionStringMappings[contentPosition];

    if (!contentPositionObject) {
      console.warn(`[expo-image]: Content position "${contentPosition}" is invalid`);
      return contentPositionStringMappings.center;
    }
    return contentPositionObject;
  }
  return contentPosition;
}

/**
 * If `transition` or `fadeDuration` is a number, it's resolved to a cross dissolve transition with the given duration.
 * When `fadeDuration` is used, it logs an appropriate deprecation warning.
 */
export function resolveTransition(
  transition?: ImageProps['transition'],
  fadeDuration?: ImageProps['fadeDuration']
): ImageProps['transition'] {
  if (typeof transition === 'number') {
    return { duration: transition };
  }
  if (!transition && typeof fadeDuration === 'number') {
    if (!loggedFadeDurationDeprecationWarning) {
      console.warn('[expo-image]: Prop "fadeDuration" is deprecated, use "transition" instead');
      loggedFadeDurationDeprecationWarning = true;
    }
    return { duration: fadeDuration };
  }
  return transition;
}

function isBlurhashString(str: string): boolean {
  return /^(blurhash:\/)?[\w#$%*+,\-.:;=?@[\]^_{}|~]+(\/[\d.]+)*$/.test(str);
}

function resolveBlurhashString(str: string): ImageSource {
  const [hash, width, height] = str.replace(/^blurhash:\//, '').split('/');
  return {
    uri: `blurhash:/${hash}`,
    width: parseInt(width, 10) ?? 16,
    height: parseInt(height, 10) ?? 16,
  };
}

function resolveSource(source?: ImageSource | string | number | null): ImageSource | null {
  if (typeof source === 'string') {
    if (isBlurhashString(source)) {
      return resolveBlurhashString(source);
    }
    return { uri: source };
  }
  if (typeof source === 'number') {
    return resolveAssetSource(source);
  }
  return source ?? null;
}

export function resolveSources(sources?: ImageProps['source']): ImageNativeProps['source'] {
  if (Array.isArray(sources)) {
    return sources.map(resolveSource).filter(Boolean) as ImageSource[];
  }
  return [resolveSource(sources)].filter(Boolean) as ImageSource[];
}
