import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { extractElementInfo } from './extractElementInfo';
import { isLeafElement } from './isLeafElement';

describe('isLeafElement', () => {
  it('returns true for void elements', () => {
    const img = document.createElement('img');
    expect(isLeafElement(img)).toBe(true);

    const input = document.createElement('input');
    expect(isLeafElement(input)).toBe(true);
  });

  it('returns true for elements with only text nodes', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello';
    expect(isLeafElement(div)).toBe(true);
  });

  it('returns false for elements with element children', () => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.appendChild(span);
    expect(isLeafElement(div)).toBe(false);
  });

  it('returns true for elements whose only element children are <br> tags', () => {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode('First line.'));
    p.appendChild(document.createElement('br'));
    p.appendChild(document.createTextNode('Second line.'));
    expect(isLeafElement(p)).toBe(true);
  });

  it('returns true for elements with only <br> children and no text', () => {
    const div = document.createElement('div');
    div.appendChild(document.createElement('br'));
    expect(isLeafElement(div)).toBe(true);
  });

  it('returns false for elements with <br> AND real element children', () => {
    const div = document.createElement('div');
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('span'));
    expect(isLeafElement(div)).toBe(false);
  });
});

describe('extractElementInfo', () => {
  // Mock getBoundingClientRect
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
