/**
 * Creates a ResizeObserver that monitors an element and calls a callback when it resizes.
 * Uses requestAnimationFrame to throttle updates for better performance.
 *
 * @param element - The HTMLElement to observe
 * @param callback - Function to call when the element resizes
 * @returns Cleanup function to disconnect the observer
 *
 * @example
 * ```typescript
 * const cleanup = createResizeObserver(containerElement, () => {
 *   console.log('Element resized!');
 *   measureElements();
 * });
 *
 * // Later, when unmounting:
 * cleanup();
 * ```
 */
export function createResizeObserver(element: HTMLElement, callback: () => void): () => void {
  let rafId: number | null = null;

  const resizeObserver = new ResizeObserver(() => {
    // Cancel any pending RAF to avoid redundant calls
    if (rafId) {
      cancelAnimationFrame(rafId);
    }

    // Use requestAnimationFrame for smooth, batched updates
    rafId = requestAnimationFrame(() => {
      callback();
      rafId = null;
    });
  });

  resizeObserver.observe(element);

  // Return cleanup function
  return () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    resizeObserver.disconnect();
  };
}
