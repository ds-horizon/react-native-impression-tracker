import React from 'react';
import { View, Text, Dimensions, InteractionManager } from 'react-native';
import { render, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ImpressionTracker } from '../ImpressionTracker';
import { ImpressionTrackerContext } from '../hooks/useImpressionTracker';
import { AdsClickedInterface } from '../interface';
import { CLICK_IMPRESSION_DETAILS } from './__mocks__/ImpressionTracker.mock';

jest.useFakeTimers();

describe('ImpressionTracker Component', () => {
  let measureCallbackValues = { pageX: 10, pageY: 10, width: 200, height: 200 };
  let fakeTime = 0;

  beforeEach(() => {
    fakeTime = 0;

    jest
      .spyOn(InteractionManager, 'runAfterInteractions')
      .mockImplementation((cb) => {
        if (typeof cb === 'function') {
          cb();
        }
        return {
          then: (resolve: any) => Promise.resolve().then(resolve),
          done: () => {},
          cancel: () => {},
        };
      });

    jest.spyOn(Date, 'now').mockImplementation(() => fakeTime);

    measureCallbackValues = { pageX: 10, pageY: 10, width: 200, height: 200 };

    jest
      .spyOn(View.prototype, 'measureInWindow')
      .mockImplementation(function (callback) {
        callback(
          measureCallbackValues.pageX,
          measureCallbackValues.pageY,
          measureCallbackValues.width,
          measureCallbackValues.height
        );
      });

    jest.spyOn(Dimensions, 'get').mockReturnValue({
      height: 800,
      width: 400,
      scale: 2,
      fontScale: 2,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should not trigger impression if component is not visible', () => {
    const onImpressionTrigger = jest.fn();

    measureCallbackValues = { pageX: 10, pageY: 10, width: 0, height: 200 };

    render(
      <NavigationContainer>
        <ImpressionTracker
          onImpressionTrigger={onImpressionTrigger}
          desiredImpressionTime={1000}
        >
          <Text>Not Visible Component</Text>
        </ImpressionTracker>
      </NavigationContainer>
    );

    act(() => {
      fakeTime += 3000;
      jest.advanceTimersByTime(3000);
    });

    expect(onImpressionTrigger).not.toHaveBeenCalled();
  });

  it('should call onRealEstateClicked when handleClickForImpression is invoked from context', () => {
    const onRealEstateClicked = jest.fn();
    let contextValue:
      | { handleClickForImpression: (params: AdsClickedInterface) => void }
      | undefined;

    const Consumer = () => {
      const ctx = React.useContext(ImpressionTrackerContext);
      contextValue = ctx;
      return <Text>Context Consumer</Text>;
    };

    render(
      <NavigationContainer>
        <ImpressionTracker onRealEstateClicked={onRealEstateClicked}>
          <Consumer />
        </ImpressionTracker>
      </NavigationContainer>
    );

    act(() => {
      contextValue?.handleClickForImpression(CLICK_IMPRESSION_DETAILS);
    });

    expect(onRealEstateClicked).toHaveBeenCalledWith(CLICK_IMPRESSION_DETAILS);
  });
});
