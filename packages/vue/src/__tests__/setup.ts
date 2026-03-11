import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock getBoundingClientRect since jsdom doesn't support layout
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

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock getComputedStyle for Vue tests
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = (elt) => {
  const styles = originalGetComputedStyle(elt);
  // Add borderRadius support for our tests
  if (!styles.borderRadius) {
    Object.defineProperty(styles, 'borderRadius', {
      value: '4px',
      writable: true,
    });
  }
  return styles;
};
