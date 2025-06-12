import { isAtLeastHalfVisible } from '../ImpressionTracker.utils';

// Mock the Dimensions.get method to control window size during tests
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({
      height: 800,
      width: 400,
    })),
  },
}));

describe('isAtLeastHalfVisible', () => {
  const rootMargin = { top: 0, left: 0, right: 0, bottom: 0 };

  it('should return true if the component is at least half visible', () => {
    const dimensions = {
      current: {
        top: 100,
        bottom: 300,
        left: 50,
        right: 150,
        height: 200,
        width: 100,
      },
    };

    // 50% of the height and width is visible (i.e., more than half visible)
    const result = isAtLeastHalfVisible({
      rootMargin,
      dimensions,
      desiredImpressionViewability: 0.5,
    });

    expect(result).toBe(true);
  });

  it('should return true if the component is fully visible', () => {
    const dimensions = {
      current: {
        top: 0,
        bottom: 800,
        left: 0,
        right: 400,
        height: 800,
        width: 400,
      },
    };

    // Full visibility
    const result = isAtLeastHalfVisible({
      rootMargin,
      dimensions,
      desiredImpressionViewability: 0.5,
    });

    expect(result).toBe(true);
  });

  it('should return false if the component has zero width or height', () => {
    const dimensions = {
      current: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: 0,
        width: 0,
      },
    };

    // Component has zero size, so it's not visible
    const result = isAtLeastHalfVisible({
      rootMargin,
      dimensions,
      desiredImpressionViewability: 0.5,
    });

    expect(result).toBe(false);
  });

  it('should handle negative margins correctly', () => {
    const dimensions = {
      current: {
        top: 100,
        bottom: 200,
        left: 100,
        right: 150,
        height: 100,
        width: 50,
      },
    };

    // Negative margin on the top, but the component is partially visible
    const result = isAtLeastHalfVisible({
      rootMargin: { top: -50, left: 0, right: 0, bottom: 0 },
      dimensions,
      desiredImpressionViewability: 0.5,
    });

    expect(result).toBe(true);
  });

  it('should return false if the visible height is less than the required viewability', () => {
    const dimensions = {
      current: {
        top: 50,
        bottom: 100,
        left: 0,
        right: 100,
        height: 200,
        width: 100,
      },
    };

    // Only 25% of the height is visible, less than the required 50%
    const result = isAtLeastHalfVisible({
      rootMargin,
      dimensions,
      desiredImpressionViewability: 0.5,
    });

    expect(result).toBe(false);
  });
});
