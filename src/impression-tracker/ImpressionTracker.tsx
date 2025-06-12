import { useCallback, FC } from 'react';

import { View } from 'react-native';

import { ImpressionTrackerContext } from './hooks/useImpressionTracker';
import { useVisibilityTracker } from './hooks/useVisibilityTracker';
import { AdsClickedInterface, ImpressionTrackerProps } from './interface';

const ImpressionTracker: FC<ImpressionTrackerProps> = ({
  children,
  rootMargin,
  desiredImpressionViewability = 0.5,
  desiredImpressionTime = 1000,
  onImpressionTrigger,
  onRealEstateClicked,
}) => {
  const visibilityTrackerView = useVisibilityTracker({
    rootMargin,
    desiredImpressionViewability,
    desiredImpressionTime,
    onImpressionTrigger,
  });

  const handleClickForImpression = useCallback(
    (customParams: AdsClickedInterface) => {
      onRealEstateClicked?.(customParams);
    },
    [onRealEstateClicked]
  );

  return (
    <ImpressionTrackerContext.Provider value={{ handleClickForImpression }}>
      <View
        collapsable={false}
        ref={visibilityTrackerView}
        testID="impression-root-view"
      >
        {children}
      </View>
    </ImpressionTrackerContext.Provider>
  );
};

export { ImpressionTracker };
