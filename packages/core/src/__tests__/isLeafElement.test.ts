import { describe, it, expect } from 'vitest';
import { isLeafElement } from '../isLeafElement';

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
