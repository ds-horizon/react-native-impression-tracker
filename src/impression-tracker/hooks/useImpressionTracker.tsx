import { createContext, useContext } from 'react';

import { NOT_IN_PROVIDER_ERROR } from '../constants';
import { AdsClickedInterface } from '../interface';

interface ImpressionTrackerContextTypeProps {
  handleClickForImpression: (params: AdsClickedInterface) => void;
}

export const ImpressionTrackerContext = createContext<
  ImpressionTrackerContextTypeProps | undefined
>(undefined);

// Hook to use the ImpressionTracker context
export const useImpressionTracker = () => {
  const context = useContext(ImpressionTrackerContext);
  if (!context) {
    throw new Error(NOT_IN_PROVIDER_ERROR);
  }
  return context;
};
