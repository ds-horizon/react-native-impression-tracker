import { createContext, useContext } from 'react';

import { NOT_IN_PROVIDER_ERROR } from '../constants';
import { AdsClickedInterface } from '../interface';

/**
 * Defines the shape of the ImpressionTracker context.
 * `handleClickForImpression` is a callback to record when an ad (or similar element) is clicked.
 */
interface ImpressionTrackerContextTypeProps {
  handleClickForImpression: (params: AdsClickedInterface) => void;
}

/**
 * React Context used to share the `handleClickForImpression` method across components.
 * Initialized as `undefined` to enforce usage only within a Provider.
 */
export const ImpressionTrackerContext = createContext<
  ImpressionTrackerContextTypeProps | undefined
>(undefined);

/**
 * Hook to access the ImpressionTracker context.
 * Throws a clear error if used outside the corresponding Provider.
 */
export const useImpressionTracker = () => {
  const context = useContext(ImpressionTrackerContext);

  if (!context) {
    // Helps developers quickly identify misusage outside of the Provider wrapper
    throw new Error(NOT_IN_PROVIDER_ERROR);
  }

  return context;
};
