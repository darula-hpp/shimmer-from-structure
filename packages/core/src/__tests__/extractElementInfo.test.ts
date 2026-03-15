import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { extractElementInfo } from '../extractElementInfo';

describe('extractElementInfo', () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  const originalGetComputedStyle = window.getComputedStyle;

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

  describe('data-shimmer-ignore', () => {
    it('skips a leaf element that has data-shimmer-ignore', () => {
      const div = document.createElement('div');
      div.textContent = 'Ignored';
      div.setAttribute('data-shimmer-ignore', '');

      const info = extractElementInfo(div, parentRect);

      expect(info).toHaveLength(0);
    });

    it('skips a parent element and all its descendants when data-shimmer-ignore is set', () => {
      const parent = document.createElement('div');
      parent.setAttribute('data-shimmer-ignore', '');

      const child1 = document.createElement('p');
      child1.textContent = 'Child 1';
      const child2 = document.createElement('span');
      child2.textContent = 'Child 2';
      parent.appendChild(child1);
      parent.appendChild(child2);

      const info = extractElementInfo(parent, parentRect);

      expect(info).toHaveLength(0);
    });

    it('skips only the ignored child and still processes siblings', () => {
      const parent = document.createElement('div');

      const ignoredChild = document.createElement('p');
      ignoredChild.textContent = 'Skip me';
      ignoredChild.setAttribute('data-shimmer-ignore', '');

      const visibleChild = document.createElement('span');
      visibleChild.textContent = 'Keep me';

      parent.appendChild(ignoredChild);
      parent.appendChild(visibleChild);

      const info = extractElementInfo(parent, parentRect);

      expect(info).toHaveLength(1);
      expect(info[0].tag).toBe('span');
    });
  });

  describe('data-shimmer-no-children', () => {
    it('captures the element as a single block without recursing into children', () => {
      const parent = document.createElement('div');
      parent.setAttribute('data-shimmer-no-children', '');

      const child1 = document.createElement('p');
      child1.textContent = 'Child 1';
      const child2 = document.createElement('span');
      child2.textContent = 'Child 2';
      parent.appendChild(child1);
      parent.appendChild(child2);

      const info = extractElementInfo(parent, parentRect);

      // One block for the parent, not two for its children
      expect(info).toHaveLength(1);
      expect(info[0].tag).toBe('div');
    });

    it('captures the correct dimensions of the element itself', () => {
      const parent = document.createElement('section');
      parent.setAttribute('data-shimmer-no-children', '');

      const child = document.createElement('p');
      child.textContent = 'Child';
      parent.appendChild(child);

      const info = extractElementInfo(parent, parentRect);

      expect(info).toHaveLength(1);
      expect(info[0]).toMatchObject({
        width: 100,
        height: 50,
        x: 10,
        y: 10,
        tag: 'section',
        borderRadius: '4px',
      });
    });

    it('respects data-shimmer-ignore over data-shimmer-no-children when both are present', () => {
      const el = document.createElement('div');
      el.setAttribute('data-shimmer-ignore', '');
      el.setAttribute('data-shimmer-no-children', '');
      el.textContent = 'Content';

      const info = extractElementInfo(el, parentRect);

      expect(info).toHaveLength(0);
    });
  });
});
