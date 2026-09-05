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

  describe('text line inset', () => {
    const textStyle = {
      borderRadius: '4px',
      fontSize: '16px',
      lineHeight: '24px',
      paddingTop: '0px',
      paddingBottom: '0px',
    };

    beforeEach(() => {
      window.getComputedStyle = vi
        .fn()
        .mockReturnValue(textStyle) as unknown as typeof window.getComputedStyle;
    });

    it('insets a text leaf so stacked lines have a visual gap', () => {
      const p = document.createElement('p');
      p.textContent = 'Stacked line';

      const info = extractElementInfo(p, parentRect);

      expect(info).toHaveLength(1);
      expect(info[0].x).toBe(10);
      expect(info[0].width).toBe(100);
      expect(info[0].y).toBeCloseTo(14);
      expect(info[0].height).toBeCloseTo(42);
    });

    it('does not inset img or button leaves', () => {
      const img = document.createElement('img');
      const button = document.createElement('button');
      button.textContent = 'Save';

      expect(extractElementInfo(img, parentRect)[0]).toMatchObject({
        x: 10,
        y: 10,
        width: 100,
        height: 50,
      });
      expect(extractElementInfo(button, parentRect)[0]).toMatchObject({
        x: 10,
        y: 10,
        width: 100,
        height: 50,
      });
    });

    it('does not inset data-shimmer-no-children blocks', () => {
      const parent = document.createElement('div');
      parent.setAttribute('data-shimmer-no-children', '');
      const child = document.createElement('p');
      child.textContent = 'Child';
      parent.appendChild(child);

      const info = extractElementInfo(parent, parentRect);

      expect(info).toHaveLength(1);
      expect(info[0]).toMatchObject({
        x: 10,
        y: 10,
        width: 100,
        height: 50,
        tag: 'div',
      });
    });

    it('does not inset padded leaves such as buttons or pills', () => {
      window.getComputedStyle = vi.fn().mockReturnValue({
        ...textStyle,
        paddingTop: '8px',
        paddingBottom: '8px',
      }) as unknown as typeof window.getComputedStyle;

      const span = document.createElement('span');
      span.textContent = 'Pill';

      const info = extractElementInfo(span, parentRect);

      expect(info[0]).toMatchObject({
        x: 10,
        y: 10,
        width: 100,
        height: 50,
      });
    });

    it('insets text-only table cells measured via the inner span', () => {
      const td = document.createElement('td');
      td.textContent = 'Cell text';

      const info = extractElementInfo(td, parentRect);

      expect(info).toHaveLength(1);
      expect(info[0].tag).toBe('td');
      expect(info[0].x).toBe(10);
      expect(info[0].width).toBe(100);
      expect(info[0].y).toBeCloseTo(14);
      expect(info[0].height).toBeCloseTo(42);
    });

    it('measures text-only no-children table cells as the full cell, not a text span', () => {
      Element.prototype.getBoundingClientRect = vi.fn(function (this: Element) {
        // Cell includes padding; a wrapped text span would be smaller
        if (this.tagName === 'TD' || this.tagName === 'TH') {
          return {
            width: 120,
            height: 66,
            top: 10,
            left: 10,
            bottom: 76,
            right: 130,
            x: 10,
            y: 10,
            toJSON: () => {},
          };
        }
        return {
          width: 100,
          height: 50,
          top: 18,
          left: 18,
          bottom: 68,
          right: 118,
          x: 18,
          y: 18,
          toJSON: () => {},
        };
      });

      const td = document.createElement('td');
      td.setAttribute('data-shimmer-no-children', '');
      td.textContent = 'Cell text';

      const info = extractElementInfo(td, parentRect);

      expect(info).toHaveLength(1);
      expect(info[0]).toMatchObject({
        x: 10,
        y: 10,
        width: 120,
        height: 66,
        tag: 'td',
      });
      // No temporary span left behind
      expect(td.childNodes).toHaveLength(1);
      expect(td.firstChild?.nodeType).toBe(Node.TEXT_NODE);
    });

    it('does not shrink a box that is already shorter than 75% of font-size', () => {
      Element.prototype.getBoundingClientRect = vi.fn(() => ({
        width: 100,
        height: 6,
        top: 10,
        left: 10,
        bottom: 16,
        right: 110,
        x: 10,
        y: 10,
        toJSON: () => {},
      }));

      const p = document.createElement('p');
      p.textContent = 'Tiny';

      const info = extractElementInfo(p, parentRect);

      expect(info[0].height).toBe(6);
      expect(info[0].y).toBe(10);
    });
  });
});
