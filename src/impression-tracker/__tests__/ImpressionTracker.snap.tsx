import { render } from '@testing-library/react-native';

import { Text } from 'react-native';
import { ImpressionTracker } from '../ImpressionTracker';
import { NavigationContainer } from '@react-navigation/native';

describe('ImpressionTracker Snapshot', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <NavigationContainer>
        <ImpressionTracker onImpressionTrigger={jest.fn()}>
          <Text>Snapshot Test</Text>
        </ImpressionTracker>
      </NavigationContainer>
    );

    // Compare the rendered output to a previously saved snapshot
    expect(toJSON()).toMatchSnapshot();
  });
});
