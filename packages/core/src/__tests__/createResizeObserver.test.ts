import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { createResizeObserver } from '../createResizeObserver';

describe('createResizeObserver', () => {
  let observeMock: Mock;
  let disconnectMock: Mock;
  let element: HTMLElement;
  let callback: Mock;
  let triggerResize: (entries?: ResizeObserverEntry[]) => void;

  beforeEach(() => {
    vi.useFakeTimers();

    observeMock = vi.fn();
    disconnectMock = vi.fn();
    callback = vi.fn();
    element = document.createElement('div');

    // Mock ResizeObserver
    global.ResizeObserver = class ResizeObserver {
      constructor(cb: ResizeObserverCallback) {
        triggerResize = (entries: ResizeObserverEntry[] = []) => {
          cb(entries, this);
        };
      }
      observe = observeMock;
      disconnect = disconnectMock;
      unobserve = vi.fn();
    } as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('starts observing the element on creation', () => {
    createResizeObserver(element, callback);
    expect(observeMock).toHaveBeenCalledWith(element);
    expect(observeMock).toHaveBeenCalledTimes(1);
  });

  it('does not call callback immediately', () => {
    createResizeObserver(element, callback);
    expect(callback).not.toHaveBeenCalled();
  });

  it('throttles callback execution using requestAnimationFrame', () => {
    createResizeObserver(element, callback);

    // Trigger resize event
    triggerResize();

    // Callback shouldn't run synchronously (waiting next frame)
    expect(callback).not.toHaveBeenCalled();

    // Fast-forward time
    vi.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('cancels pending animation frames if multiple resize events occur', () => {
    createResizeObserver(element, callback);

    // Trigger multiple resize events rapidly
    triggerResize();
    triggerResize();
    triggerResize();

    expect(callback).not.toHaveBeenCalled();

    // Should only execute once for the batch
    vi.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('cleanup function disconnects observer and cancels pending frames', () => {
    const cleanup = createResizeObserver(element, callback);

    triggerResize();

    // Clean up before timer fires
    cleanup();

    expect(disconnectMock).toHaveBeenCalledTimes(1);

    // Run timers to verify cancelled RAF doesn't fire callback
    vi.runAllTimers();
    expect(callback).not.toHaveBeenCalled();
  });
});
