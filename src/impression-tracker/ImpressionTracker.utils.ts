import { Dimensions } from 'react-native';

import { IsAteastHalfVisibleProps } from './interface';

export const isAtLeastHalfVisible = ({
  rootMargin,
  dimensions,
  desiredImpressionViewability,
}: IsAteastHalfVisibleProps) => {
  const { top = 0, left = 0, right = 0, bottom = 0 } = rootMargin ?? {};

  const windowHeight = Dimensions.get('window').height - top - bottom;
  const windowWidth = Dimensions.get('window').width - left - right;

  const {
    top: compTop,
    bottom: compBottom,
    left: compLeft,
    right: compRight,
    height,
    width,
  } = dimensions.current;

  if (height === 0 || width === 0) {
    return false;
  }

  // Calculate the visible portion of the component
  const visibleTop = Math.max(compTop, top);
  const visibleBottom = Math.min(compBottom, windowHeight);
  const visibleHeight = Math.max(visibleBottom - visibleTop, 0);

  const visibleLeft = Math.max(compLeft, left);
  const visibleRight = Math.min(compRight, windowWidth);
  const visibleWidth = Math.max(visibleRight - visibleLeft, 0);

  // Check if the component is visible enough to count as an impression
  return (
    visibleHeight >= height * desiredImpressionViewability &&
    visibleWidth >= width * desiredImpressionViewability
  );
};
