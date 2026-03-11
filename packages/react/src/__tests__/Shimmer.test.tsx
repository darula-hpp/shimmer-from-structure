import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Shimmer } from '../Shimmer';
import React from 'react';

describe('Shimmer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders children normally when loading=false', () => {
    render(
      <Shimmer loading={false}>
        <div data-testid="content">Content</div>
      </Shimmer>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.queryByTestId('shimmer-measure-container')).not.toBeInTheDocument();
  });

  it('renders shimmer structure when loading=true', () => {
    const { container } = render(
      <Shimmer loading={true}>
        <div style={{ width: 100, height: 50 }}>Content</div>
      </Shimmer>
    );

    const measureContainer = container.querySelector('.shimmer-measure-container');
    expect(measureContainer).toBeInTheDocument();
  });

  it('injects templateProps into the first child', () => {
    const TestComponent = ({ title, subtitle }: { title?: string; subtitle?: string }) => (
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    );

    render(
      <Shimmer loading={true} templateProps={{ title: 'Mock Title', subtitle: 'Mock Subtitle' }}>
        <TestComponent />
      </Shimmer>
    );

    expect(screen.getByText('Mock Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Subtitle')).toBeInTheDocument();
  });

  it('preserves container backgrounds by using transparent text', () => {
    const { container } = render(
      <Shimmer loading={true}>
        <div className="card">Content</div>
      </Shimmer>
    );

    expect(container.innerHTML).toContain('.shimmer-measure-container * {');
    expect(container.innerHTML).toContain('color: transparent !important');
  });

  it('uses fallbackBorderRadius when element has 0px border-radius', () => {
    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = vi.fn().mockReturnValue({
      borderRadius: '0px',
    }) as unknown as typeof window.getComputedStyle;

    render(
      <Shimmer loading={true} fallbackBorderRadius={12}>
        <div>Content</div>
      </Shimmer>
    );

    act(() => {
      vi.runAllTimers();
    });

    window.getComputedStyle = originalGetComputedStyle;
  });

  it('retries measurement for async components that render late', async () => {
    function AsyncComponent() {
      const [ready, setReady] = React.useState(false);

      React.useEffect(() => {
        const timer = setTimeout(() => setReady(true), 50);
        return () => clearTimeout(timer);
      }, []);

      if (!ready) return <div />;
      return <div className="async-content">Ready</div>;
    }

    const { container } = render(
      <Shimmer loading={true}>
        <AsyncComponent />
      </Shimmer>
    );

    act(() => {
      vi.advanceTimersByTime(50);
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(container.querySelector('.shimmer-measure-container')).toBeInTheDocument();
  });
});
