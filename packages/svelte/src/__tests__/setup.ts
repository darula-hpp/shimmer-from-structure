import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/svelte';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock MutationObserver
global.MutationObserver = class MutationObserver {
  observe() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};

// Mock getComputedStyle
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = (elt) => {
  const styles = originalGetComputedStyle(elt);
  if (!styles.borderRadius) {
    Object.defineProperty(styles, 'borderRadius', {
      value: '4px',
      writable: true,
    });
  }
  return styles;
};
