import { render } from '@testing-library/react-native';

import { Text } from 'react-native';
import { ImpressionTracker } from '../ImpressionTracker';

describe('ImpressionTracker Snapshot', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ImpressionTracker onImpressionTrigger={jest.fn()}>
        <Text>Snapshot Test</Text>
      </ImpressionTracker>
    );

    // Compare the rendered output to a previously saved snapshot
    expect(toJSON()).toMatchSnapshot();
  });
});
