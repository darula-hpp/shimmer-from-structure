import { describe, it, expect } from 'vitest';
import { insetTextLineRect } from '../insetTextLineRect';

const textLine = {
  x: 10,
  y: 10,
  width: 100,
  height: 50,
  tag: 'p',
  fontSize: '16px',
  lineHeight: '24px',
  paddingTop: '0px',
  paddingBottom: '0px',
};

describe('insetTextLineRect', () => {
  it('insets a text leaf by half the leftover line-height leading', () => {
    // leading/2 = (24-16)/2 = 4
    const result = insetTextLineRect(textLine);

    expect(result.x).toBe(10);
    expect(result.width).toBe(100);
    expect(result.y).toBeCloseTo(14);
    expect(result.height).toBeCloseTo(42);
  });

  it('treats normal line-height as 1.2em', () => {
    const result = insetTextLineRect({ ...textLine, lineHeight: 'normal' });
    // leading/2 = (16*1.2 - 16)/2 = 1.6
    expect(result.y).toBeCloseTo(11.6);
    expect(result.height).toBeCloseTo(46.8);
  });

  it('does not inset replaced or control elements', () => {
    for (const tag of ['img', 'svg', 'video', 'canvas', 'iframe', 'input', 'textarea', 'button']) {
      expect(insetTextLineRect({ ...textLine, tag })).toEqual({
        x: 10,
        y: 10,
        width: 100,
        height: 50,
      });
    }
  });

  it('does not inset data-shimmer-no-children blocks', () => {
    expect(insetTextLineRect({ ...textLine, isNoChildren: true })).toEqual({
      x: 10,
      y: 10,
      width: 100,
      height: 50,
    });
  });

  it('does not inset when padding-block is at least half the font size', () => {
    const result = insetTextLineRect({
      ...textLine,
      paddingTop: '4px',
      paddingBottom: '4px',
    });

    expect(result).toEqual({ x: 10, y: 10, width: 100, height: 50 });
  });

  it('does not inset when font-size is missing', () => {
    const result = insetTextLineRect({ ...textLine, fontSize: '' });

    expect(result).toEqual({ x: 10, y: 10, width: 100, height: 50 });
  });

  it('does not shrink large display text below 75% of font-size', () => {
    const result = insetTextLineRect({
      ...textLine,
      height: 22,
      fontSize: '28px',
      lineHeight: '44.8px',
    });

    expect(result.height).toBeGreaterThanOrEqual(21);
    expect(result.height).toBeLessThanOrEqual(22);
  });

  it('clamps inset so height never goes below 4px or above the original', () => {
    const tiny = insetTextLineRect({
      ...textLine,
      height: 6,
      fontSize: '4px',
      lineHeight: '10px',
    });

    expect(tiny.height).toBe(4);
    expect(tiny.y).toBe(11);
    expect(tiny.height).toBeLessThanOrEqual(6);
  });

  it('does not expand bars that are already shorter than 4px', () => {
    const result = insetTextLineRect({ ...textLine, height: 3 });

    expect(result.height).toBe(3);
    expect(result.y).toBe(10);
  });
});
