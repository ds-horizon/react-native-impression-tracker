import { Text, TouchableNativeFeedback } from 'react-native';
import TestRenderer, { act } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';

import {
  ImpressionTrackerContext,
  useImpressionTracker,
} from '../hooks/useImpressionTracker';

import { CLICK_IMPRESSION_DETAILS } from './__mocks__/ImpressionTracker.mock';
import { NOT_IN_PROVIDER_ERROR } from '../constants';

const TestComponent = () => {
  const { handleClickForImpression } = useImpressionTracker();
  return (
    <TouchableNativeFeedback
      onPress={() => handleClickForImpression(CLICK_IMPRESSION_DETAILS)}
    >
      <Text>Test Button</Text>
    </TouchableNativeFeedback>
  );
};

describe('useImpressionTracker hook', () => {
  it('should call handleClickForImpression when used within a provider', () => {
    const mockHandler = jest.fn();
    const { getByText } = render(
      <ImpressionTrackerContext.Provider
        value={{ handleClickForImpression: mockHandler }}
      >
        <TestComponent />
      </ImpressionTrackerContext.Provider>
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockHandler).toHaveBeenCalledWith(CLICK_IMPRESSION_DETAILS);
  });

  it('should throw error when used outside of a provider', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      act(() => {
        TestRenderer.create(<TestComponent />);
      });
    }).toThrow(NOT_IN_PROVIDER_ERROR);

    errorSpy.mockRestore();
  });
});
