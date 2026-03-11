import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/svelte';
import TestFixture from './TestFixture.svelte';
import { tick } from 'svelte';

describe('Shimmer.svelte', () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

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
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it('renders slot content when loading is false', () => {
    const { getByText } = render(TestFixture, {
      props: { loading: false },
    });

    expect(getByText('Content')).toBeInTheDocument();
    expect(document.querySelector('.shimmer-measure-container')).toBeNull();
  });

  it('renders shimmer structure when loading is true', async () => {
    const { container } = render(TestFixture, {
      props: { loading: true },
    });

    await act(() => tick());
    await act(() => tick());

    expect(container.querySelector('.shimmer-measure-container')).toBeInTheDocument();

    const overlays = container.querySelectorAll('.shimmer-measure-container + div > div');
    expect(overlays.length).toBeGreaterThan(0);
  });

  it('applies props correctly', async () => {
    const { container } = render(TestFixture, {
      props: {
        loading: true,
        shimmerColor: 'rgba(255, 0, 0, 0.5)',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
      },
    });

    await act(() => tick());
    await act(() => tick());

    const overlays = container.querySelectorAll('.shimmer-measure-container + div > div');
    expect(overlays.length).toBeGreaterThan(0);
    const firstOverlay = overlays[0];

    expect(firstOverlay.getAttribute('style')).toContain('background-color: rgba(0, 0, 255, 0.5)');
  });

  it('uses provided context configuration', async () => {
    const { container } = render(TestFixture, {
      props: {
        config: {
          backgroundColor: 'rgb(0, 128, 0)',
        },
      },
    });

    await act(() => tick());
    await act(() => tick());

    const overlays = container.querySelectorAll('.shimmer-measure-container + div > div');
    expect(overlays.length).toBeGreaterThan(0);
    expect(overlays[0].getAttribute('style')).toContain('background-color: rgb(0, 128, 0)');
  });
});
