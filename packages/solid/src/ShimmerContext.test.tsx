import { render, screen } from '@solidjs/testing-library';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Shimmer } from './Shimmer';
import { ShimmerProvider, useShimmerConfig } from './ShimmerContext';

describe('Shimmer Context API', () => {
  // Mock getBoundingClientRect
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  const originalGetComputedStyle = window.getComputedStyle;

  beforeEach(() => {
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 50,
      top: 0,
      left: 0,
      bottom: 50,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    // Override the global styling mock from setup.ts which forces 4px border radius
    window.getComputedStyle = (elt) => {
      const styles = originalGetComputedStyle(elt);
      Object.defineProperty(styles, 'borderRadius', {
        value: '0px',
        writable: true,
      });
      return styles;
    };
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    window.getComputedStyle = originalGetComputedStyle;
  });

  const TestContent = () => <div data-testid="content">Content</div>;

  it('propagates context correctly to consumers', () => {
    const Consumer = () => {
      const config = useShimmerConfig();
      return <div data-testid="debug-config">{config.fallbackBorderRadius}</div>;
    };

    const config = { fallbackBorderRadius: 99 };
    render(() => (
      <ShimmerProvider config={config}>
        <Consumer />
      </ShimmerProvider>
    ));

    expect(screen.getByTestId('debug-config')).toHaveTextContent('99');
  });

  it('uses provided context values in Shimmer component', () => {
    const config = {
      shimmerColor: 'rgba(255, 0, 0, 0.5)',
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
      duration: 5,
      fallbackBorderRadius: 10,
    };

    const { container } = render(() => (
      <ShimmerProvider config={config}>
        <Shimmer loading={true}>
          <TestContent />
        </Shimmer>
      </ShimmerProvider>
    ));

    // Check for context background color in the rendered output
    expect(container.innerHTML).toContain(config.backgroundColor);
  });

  it('merges partial context config with defaults', () => {
    const Consumer = () => {
      const config = useShimmerConfig();
      return (
        <>
          <div data-testid="shimmer-color">{config.shimmerColor}</div>
          <div data-testid="duration">{config.duration}</div>
        </>
      );
    };

    render(() => (
      <ShimmerProvider config={{ shimmerColor: 'rgba(100, 100, 100, 0.5)' }}>
        <Consumer />
      </ShimmerProvider>
    ));

    // Custom value
    expect(screen.getByTestId('shimmer-color')).toHaveTextContent('rgba(100, 100, 100, 0.5)');
    // Default value (1.5)
    expect(screen.getByTestId('duration')).toHaveTextContent('1.5');
  });

  it('works without ShimmerProvider (uses defaults)', () => {
    const Consumer = () => {
      const config = useShimmerConfig();
      return <div data-testid="config-check">{config.duration}</div>;
    };

    render(() => <Consumer />);

    // Should use default value
    expect(screen.getByTestId('config-check')).toHaveTextContent('1.5');
  });
});
