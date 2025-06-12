import { useCallback, useRef } from 'react';
import React from 'react';

import { InteractionManager, View } from 'react-native';

import { isAtLeastHalfVisible } from '../ImpressionTracker.utils';
import { CHECK_INTERVAL } from '../constants';
import { VisibilityTrackerHookProps } from '../interface';

import { useFocusEffect } from '@react-navigation/native';

export const useVisibilityTracker = ({
  rootMargin,
  desiredImpressionViewability,
  desiredImpressionTime,
  onImpressionTrigger,
}: VisibilityTrackerHookProps) => {
  const visibilityTrackerView = useRef<View>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dimensions = useRef({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    width: 0,
  });
  const visibleStartTime = useRef<number | null>(null);

  const checkVisibility = useCallback(() => {
    if (
      isAtLeastHalfVisible({
        rootMargin,
        dimensions,
        desiredImpressionViewability,
      })
    ) {
      if (visibleStartTime.current === null) {
        visibleStartTime.current = Date.now();
      } else {
        const elapsedTime = Date.now() - visibleStartTime.current;

        if (elapsedTime >= desiredImpressionTime) {
          onImpressionTrigger?.();
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            visibleStartTime.current = null;
          }
        }
      }
    } else {
      // Reset the timer if visibility is lost before 1 second
      visibleStartTime.current = null;
    }
  }, [
    rootMargin,
    desiredImpressionViewability,
    desiredImpressionTime,
    onImpressionTrigger,
  ]);

  useFocusEffect(
    React.useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
          if (!visibilityTrackerView.current) return;

          visibilityTrackerView.current.measureInWindow(
            (pageX, pageY, width, height) => {
              if (!height || !width) return;

              dimensions.current = {
                top: pageY,
                bottom: pageY + height,
                left: pageX,
                right: pageX + width,
                height,
                width,
              };

              checkVisibility();
            }
          );
        }, CHECK_INTERVAL);
      });

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          visibleStartTime.current = null;
        }
      };
    }, [checkVisibility])
  );

  return visibilityTrackerView;
};
