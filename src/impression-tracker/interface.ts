import { ViewStyle } from 'react-native';

export interface AdsClickedInterface {
  adId: string;
  adType: string;
  advertiserName: string;
  deepLink: string;
}

export interface ImpressionTrackerPropsI {
  /**
   * Children elements that will be wrapped and tracked for impressions.
   */
  children: React.ReactNode;

  /**
   * Optional margins to expand or contract the visible area considered for impression tracking.
   */
  rootMargin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };

  /**
   * The portion (0 to 1) of the component that must be visible to count as an impression.
   * @default 0.5
   */
  desiredImpressionViewability?: number;

  /**
   * Time in milliseconds the component must remain visible to trigger an impression.
   * @default 1000
   */
  desiredImpressionTime?: number;

  /**
   * Callback fired once the visibility condition has been met.
   */
  onImpressionTrigger?: () => void;

  /**
   * Callback fired when the user interacts (clicks/taps) on the tracked real estate.
   */
  onRealEstateClicked?: (params: AdsClickedInterface) => void;

  /**
   * Optional custom style to apply to the wrapper View.
   */
  style?: ViewStyle;
}

/**
 * `ImpressionTracker` wraps a component and monitors its visibility.
 * It triggers an impression event if the view meets visibility & dwell time thresholds.
 *
 * @param props {@link ImpressionTrackerProps}
 */

export interface VisibilityTrackerHookProps {
  rootMargin?: { top?: number; left?: number; right?: number; bottom?: number };
  desiredImpressionViewability: number;
  desiredImpressionTime: number;
  onImpressionTrigger?: () => void;
}

export interface IsAteastHalfVisibleProps {
  rootMargin?: { top?: number; left?: number; right?: number; bottom?: number };
  dimensions: React.MutableRefObject<{
    top: number;
    bottom: number;
    left: number;
    right: number;
    height: number;
    width: number;
  }>;
  desiredImpressionViewability: number;
}
