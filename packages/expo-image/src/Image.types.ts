import { AccessibilityProps, ImageStyle as RNImageStyle } from 'react-native';

export type ImageSource = {
  /**
   * A string representing the resource identifier for the image,
   * which could be an http address, a local file path, or the name of a static image resource.
   */
  uri?: string;
  /**
   * An object representing the HTTP headers to send along with the request for a remote image.
   */
  headers?: { [key: string]: string };
  /**
   * Can be specified if known at build time, in which case the value
   * will be used to set the default `<Image/>` component dimension
   */
  width?: number;
  /**
   * Can be specified if known at build time, in which case the value
   * will be used to set the default `<Image/>` component dimension
   */
  height?: number;
};

/** @hidden */
export type ImageStyle = RNImageStyle & {
  resizeMode?: ImageResizeMode;
  elevation?: number;
};

export type ImageProps = AccessibilityProps & {
  /** @hidden */
  style?: ImageStyle;

  /**
   * The image source, either a remote URL, a local file resource or a number that is the result of the `require()` function.
   * When provided as an array of sources, the source that fits best into the container size and is closest to the screen scale
   * will be chosen. In this case it is important to provide `width`, `height` and `scale` properties.
   */
  source?: ImageSource | ImageSource[] | number | null;

  /**
   * An image to display while loading the proper image and no image has been displayed yet or the source is unset.
   */
  placeholder?: ImageSource | ImageSource[] | number | null;

  /**
   * @deprecated Provides compatibility for [React Native Image](https://reactnative.dev/docs/image#defaultsource) prop.
   * Use [`placeholder`](#placeholder-1) prop instead.
   */
  defaultSource?: ImageSource | null;

  /**
   * @deprecated Provides compatibility for [React Native Image](https://reactnative.dev/docs/image#loadingindicatorsource) prop.
   * Use [`placeholder`](#placeholder-1) prop instead.
   */
  loadingIndicatorSource?: ImageSource | null;

  /**
   * Determines how the image should be resized to fit its container. This property tells the image to fill the container
   * in a variety of ways; such as "preserve that aspect ratio" or "stretch up and take up as much space as possible".
   * It mirrors the CSS [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) property.
   * @default "cover"
   */
  contentFit?: ImageContentFit;

  /**
   * It is used together with [`contentFit`](#contentfit) to specify how the image should be positioned with x/y coordinates inside its own container.
   * An equivalent of the CSS [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) property.
   * @default "center"
   */
  contentPosition?: ImageContentPosition;

  /**
   * @deprecated Provides compatibility for [React Native Image](https://reactnative.dev/docs/image#resizemode) prop,
   * however `"repeat"` option is not supported at all.
   * Use the more powerful [`contentFit`](#contentfit) and [`contentPosition`](#contentposition) props instead.
   */
  resizeMode?: ImageResizeMode;

  /**
   * Object that describes how the image view should transition the contents on props change.
   * @platform ios
   */
  transition?: ImageTransition | null;

  /**
   * Priorities for completing loads. If more than one load is queued at a time,
   * the load with the higher priority will be started first.
   * Priorities are considered best effort, there are no guarantees about the order in which loads will start or finish.
   * @default 'normal'
   */
  priority?: 'low' | 'normal' | 'high' | null;

  /**
   * Determines whether to cache the image and where: on the disk, in the memory or both.
   * > Note: Memory cache may be purged very quickly to prevent high memory usage and the risk of out of memory exceptions.
   * @default 'disk'
   */
  cacheType?: 'none' | 'disk' | 'memory' | 'memoryAndDisk' | null;

  /**
   * Called when the image starts to load.
   */
  onLoadStart?: () => void;

  /**
   * Called when the image load completes successfully.
   */
  onLoad?: (event: ImageLoadEventData) => void;

  /**
   * Called when the image is loading. Can be called multiple times before the image has finished loading.
   * The event object provides details on how many bytes were loaded so far and what's the expected total size.
   */
  onProgress?: (event: ImageProgressEventData) => void;

  /**
   * Called on an image fetching error.
   */
  onError?: (event: ImageErrorEventData) => void;

  /**
   * Called when the image load either succeeds or fails.
   */
  onLoadEnd?: () => void;
};

/**
 * Determines how the image should be resized to fit its container.
 */
export enum ImageContentFit {
  /**
   * The image is sized to maintain its aspect ratio while filling the container box.
   * If the image's aspect ratio does not match the aspect ratio of its box, then the object will be clipped to fit.
   */
  COVER = 'cover',

  /**
   * The image is scaled down or up to maintain its aspect ratio while fitting within the container box.
   */
  CONTAIN = 'contain',

  /**
   * The image is sized to entirely fill the container box. If necessary, the image will be stretched or squished to fit.
   */
  FILL = 'fill',

  /**
   * The image is not resized and is centered by default.
   * When specified, the exact position can be controlled with [`contentPosition`](#contentposition) prop.
   */
  NONE = 'none',

  /**
   * The image is sized as if `none` or `contain` were specified, whichever would result in a smaller concrete image size.
   */
  SCALE_DOWN = 'scale-down',
}

/**
 * A value that represents the relative position of a single axis.
 *
 * If it is a number, it is a distance in points (logical pixels) from the respective edge.
 *
 * A string must be a percentage where `'100%'` is the difference in size between the container and the image along the respective axis,
 * or `'center'` which is an alias for `'50%'` that is the default value. You can read more regarding percentages on the MDN docs for
 * [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position#regarding_percentages) that describes this concept well.
 */
export type ImageContentPositionValue = number | string | `${number}%` | `${number}` | 'center';

// eslint-disable
// prettier-ignore
/**
 * Specifies the position of the image inside its container. One value controls the x-axis and the second value controls the y-axis.
 */
export type ImageContentPositionObject =
  /**
   * An object that positions the image relatively to the top-right corner.
   */
  {
    top?: ImageContentPositionValue;
    right?: ImageContentPositionValue;
  } |
  /**
   * An object that positions the image relatively to the top-left corner.
   */
  {
    top?: ImageContentPositionValue;
    left?: ImageContentPositionValue;
  } |
  /**
   * An object that positions the image relatively to the bottom-right corner.
   */
  {
    bottom?: ImageContentPositionValue;
    right?: ImageContentPositionValue;
  } |
  /**
   * An object that positions the image relatively to the bottom-left corner.
   */
  {
    bottom?: ImageContentPositionValue;
    left?: ImageContentPositionValue;
  };
// eslint-enable

/**
 * A stringified and shorthand form of the `contentPosition` prop. This specifies the edges to which to align the image content.
 * If only one keyword is provided, the other dimension is then set to `'50%'`, so the image is placed in the middle of the edge specified.
 */
export type ImageContentPositionString =
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top center'
  | 'top right'
  | 'top left'
  | 'right center'
  | 'right top'
  | 'right bottom'
  | 'bottom center'
  | 'bottom right'
  | 'bottom left'
  | 'left center'
  | 'left top'
  | 'left bottom';

/**
 * @docsMissing
 */
export type ImageContentPosition = ImageContentPositionString | ImageContentPositionObject;

/**
 * @deprecated The resize mode is deprecated in favor of `ImageContentFit` and `contentFit` prop.
 */
export enum ImageResizeMode {
  /**
   * The image will be resized such that the entire area of the view
   * is covered by the image, potentially clipping parts of the image.
   */
  COVER = 'cover',
  /**
   * The image will be resized such that it will be completely
   * visible, contained within the frame of the view.
   */
  CONTAIN = 'contain',
  /**
   * The image will be stretched to fill the entire frame of the view without clipping.
   * This may change the aspect ratio of the image, distorting it.
   *
   * @platform ios
   */
  STRETCH = 'stretch',
  /**
   * The image will be repeated to cover the frame of the view.
   * The image will keep its size and aspect ratio.
   */
  REPEAT = 'repeat',
  /**
   * The image will be scaled down such that it is completely visible,
   * if bigger than the area of the view. The image will not be scaled up.
   */
  CENTER = 'center',
}

export type ImageTransition = {
  duration?: number;
  timing?: ImageTransitionTiming;
  effect?: ImageTransitionEffect;
};

export enum ImageTransitionTiming {
  EASE_IN_OUT = 1,
  EASE_IN = 2,
  EASE_OUT = 3,
  LINEAR = 4,
}

export enum ImageTransitionEffect {
  NONE = 0,
  CROSS_DISOLVE = 1,
  FLIP_FROM_LEFT = 2,
  FLIP_FROM_RIGHT = 3,
  FLIP_FROM_TOP = 4,
  FLIP_FROM_BOTTOM = 5,
  CURL_UP = 6,
  CURL_DOWN = 7,
}

export type ImageLoadEventData = {
  cacheType: 'none' | 'disk' | 'memory';
  source: {
    url: string;
    width: number;
    height: number;
    mediaType: string | null;
  };
};

export type ImageProgressEventData = {
  loaded: number;
  total: number;
};

export type ImageErrorEventData = {
  error: string;
};
