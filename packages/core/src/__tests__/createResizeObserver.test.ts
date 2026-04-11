import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { createResizeObserver } from '../createResizeObserver';

describe('createResizeObserver', () => {
  let observeMock: Mock;
  let disconnectMock: Mock;
  let element: HTMLElement;
  let callback: Mock;
  let triggerResize: (entries?: ResizeObserverEntry[]) => void;
  let rafCallback: FrameRequestCallback | null = null;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    callback = vi.fn();
    element = document.createElement('div');
    rafCallback = null;

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

    // Mock requestAnimationFrame to capture the callback
    global.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
      rafCallback = cb;
      return 1;
    }) as unknown as typeof requestAnimationFrame;

    global.cancelAnimationFrame = vi.fn();
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
    expect(requestAnimationFrame).toHaveBeenCalled();

    // Manually trigger the RAF callback
    if (rafCallback) {
      rafCallback(0);
    }

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('cancels pending animation frames if multiple resize events occur', () => {
    createResizeObserver(element, callback);

    // Trigger multiple resize events rapidly
    triggerResize();
    const firstRafId = (requestAnimationFrame as Mock).mock.results[0]?.value;

    triggerResize();
    triggerResize();

    expect(callback).not.toHaveBeenCalled();
    expect(cancelAnimationFrame).toHaveBeenCalledWith(firstRafId);

    // Manually trigger the last RAF callback
    if (rafCallback) {
      rafCallback(0);
    }

    // Should only execute once for the batch
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('cleanup function disconnects observer and cancels pending frames', () => {
    const cleanup = createResizeObserver(element, callback);

    triggerResize();
    const rafId = (requestAnimationFrame as Mock).mock.results[0]?.value;

    // Clean up before RAF fires
    cleanup();

    expect(disconnectMock).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(rafId);

    // The callback should not have been called yet
    expect(callback).not.toHaveBeenCalled();
  });
});
