/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  white: '#ffffff',
  text: '#212529',
  gray: '#848484',
  lightGray: '#f7f7f7',
  primary: '#896800',
  primary50: 'rgba(137, 104, 0, 0.5)',
  success: '#28a745',
  error: '#dc3545',
}

export const NavigationColors = {
  primary: Colors.primary, // The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
  background: Colors.lightGray, // The color of various backgrounds, such as background color for the screens
  card: Colors.white, //The background color of card-like elements, such as headers, tab bars etc.
  // text: '', The text color of various elements
  // border: '', The color of borders, e.g. header border, tab bar border etc
  // notification: '', The color of Tab Navigator badge
}

/**
 * FontSize
 */
export const FontSize = {
  tiny: 10,
  small: 12,
  regular: 14,
  large: 16,
  big: 18,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
