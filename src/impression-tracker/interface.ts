import { ReactNode } from 'react';

export interface AdsClickedInterface {
  adId: string;
  adType: string;
  advertiserName: string;
  deepLink: string;
}

export interface ImpressionTrackerProps {
  children: ReactNode;
  desiredImpressionViewability?: number;
  desiredImpressionTime?: number;
  onImpressionTrigger?(): void;
  onRealEstateClicked?(params: AdsClickedInterface): void;
  rootMargin?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
}

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
