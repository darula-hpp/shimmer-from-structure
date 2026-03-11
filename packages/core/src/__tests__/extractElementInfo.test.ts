import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { extractElementInfo } from '../extractElementInfo';

describe('extractElementInfo', () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  const originalGetComputedStyle = window.getComputedStyle;

  beforeEach(() => {
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 50,
      top: 10,
      left: 10,
      bottom: 60,
      right: 110,
      x: 10,
      y: 10,
      toJSON: () => {},
    }));

    window.getComputedStyle = vi.fn().mockReturnValue({
      borderRadius: '4px',
    }) as unknown as typeof window.getComputedStyle;
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    window.getComputedStyle = originalGetComputedStyle;
  });

  it('extracts info from a leaf element', () => {
    const div = document.createElement('div');
    div.textContent = 'Content';

    const parentRect = {
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      bottom: 200,
      right: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    } as DOMRect;

    const info = extractElementInfo(div, parentRect);

    expect(info).toHaveLength(1);
    expect(info[0]).toMatchObject({
      width: 100,
      height: 50,
      x: 10,
      y: 10,
      tag: 'div',
      borderRadius: '4px',
    });
  });
});
