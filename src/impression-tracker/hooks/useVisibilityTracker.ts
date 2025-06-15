import { useCallback, useRef } from 'react';
import React from 'react';
import { InteractionManager, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { isAtLeastHalfVisible } from '../ImpressionTracker.utils';
import { CHECK_INTERVAL } from '../constants';
import { VisibilityTrackerHookProps } from '../interface';

/**
 * Hook to track visibility of a component and trigger a callback
 * when it has remained visible (based on viewability thresholds) for a specific duration.
 */
export const useVisibilityTracker = ({
  rootMargin,
  desiredImpressionViewability,
  desiredImpressionTime,
  onImpressionTrigger,
}: VisibilityTrackerHookProps) => {
  // Ref to the component being tracked
  const visibilityTrackerView = useRef<View>(null);

  // Ref to the interval timer
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Ref to store current layout dimensions of the view
  const dimensions = useRef({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    width: 0,
  });

  // Timestamp when the component first became visible
  const visibleStartTime = useRef<number | null>(null);

  /**
   * Checks whether the component is sufficiently visible.
   * If it has remained visible for the desired time, the impression callback is triggered.
   */
  const checkVisibility = useCallback(() => {
    if (
      isAtLeastHalfVisible({
        rootMargin,
        dimensions,
        desiredImpressionViewability,
      })
    ) {
      if (visibleStartTime.current === null) {
        // Start timing visibility
        visibleStartTime.current = Date.now();
      } else {
        const elapsedTime = Date.now() - visibleStartTime.current;

        if (elapsedTime >= desiredImpressionTime) {
          // Trigger impression and clear the interval
          onImpressionTrigger?.();

          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            visibleStartTime.current = null;
          }
        }
      }
    } else {
      // Reset visibility timer if component is no longer visible
      visibleStartTime.current = null;
    }
  }, [
    rootMargin,
    desiredImpressionViewability,
    desiredImpressionTime,
    onImpressionTrigger,
  ]);

  /**
   * Starts the visibility checking interval when the screen gains focus.
   * Stops it when the screen is unfocused or unmounted.
   */
  useFocusEffect(
    React.useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        // Start polling the visibility every CHECK_INTERVAL ms
        intervalRef.current = setInterval(() => {
          if (!visibilityTrackerView.current) return;

          // Measure component's position and size in the window
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

      // Cleanup when the screen loses focus
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          visibleStartTime.current = null;
        }
      };
    }, [checkVisibility])
  );

  // Return ref to be attached to the component you want to track
  return visibilityTrackerView;
};
