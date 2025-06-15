import { FC, useCallback } from 'react';
import { View } from 'react-native';
import { ImpressionTrackerContext } from './hooks/useImpressionTracker';
import { useVisibilityTracker } from './hooks/useVisibilityTracker';
import { AdsClickedInterface, ImpressionTrackerPropsI } from './interface';

const ImpressionTracker: FC<ImpressionTrackerPropsI> = ({
  children,
  rootMargin,
  desiredImpressionViewability = 0.5,
  desiredImpressionTime = 1000,
  onImpressionTrigger,
  onRealEstateClicked,
  style,
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
        style={style}
      >
        {children}
      </View>
    </ImpressionTrackerContext.Provider>
  );
};

export { ImpressionTracker };
