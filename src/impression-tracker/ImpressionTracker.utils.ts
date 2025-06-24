import { Dimensions } from 'react-native';
import { IsAteastHalfVisibleProps } from './interface';

/**
 * Determines if a component is visible enough on screen to count as an impression.
 * It uses layout dimensions and a viewability threshold to check both vertical and horizontal visibility.
 *
 * @param {IsAteastHalfVisibleProps} props - Props containing margins, dimensions, and viewability threshold
 * @returns {boolean} - True if the component meets the visibility criteria, false otherwise
 */
export const isAtLeastHalfVisible = ({
  rootMargin,
  dimensions,
  desiredImpressionViewability,
}: IsAteastHalfVisibleProps) => {
  // Destructure and default all margin values to 0 if not provided
  const { top = 0, left = 0, right = 0, bottom = 0 } = rootMargin ?? {};

  // Compute the adjusted window size by subtracting the root margins
  const windowHeight = Dimensions.get('window').height - top - bottom;
  const windowWidth = Dimensions.get('window').width - left - right;

  // Extract the current layout dimensions of the component
  const {
    top: compTop,
    bottom: compBottom,
    left: compLeft,
    right: compRight,
    height,
    width,
  } = dimensions.current;

  // If the component has zero height or width, it is not visible
  if (height === 0 || width === 0) {
    return false;
  }

  // Calculate the vertical overlap of the component within the visible window
  const visibleTop = Math.max(compTop, top);
  const visibleBottom = Math.min(compBottom, windowHeight);
  const visibleHeight = Math.max(visibleBottom - visibleTop, 0);

  // Calculate the horizontal overlap of the component within the visible window
  const visibleLeft = Math.max(compLeft, left);
  const visibleRight = Math.min(compRight, windowWidth);
  const visibleWidth = Math.max(visibleRight - visibleLeft, 0);

  // Determine if both visible height and width meet or exceed the required viewability threshold
  return (
    visibleHeight >= height * desiredImpressionViewability &&
    visibleWidth >= width * desiredImpressionViewability
  );
};
