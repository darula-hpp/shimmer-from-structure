import { ElementInfo } from './types';
import { isLeafElement } from './isLeafElement';
import { insetTextLineRect } from './insetTextLineRect';

interface TextLineStyle {
  fontSize: string;
  lineHeight: string;
  paddingTop: string;
  paddingBottom: string;
}

interface LeafElement {
  element: Element;
  borderRadius: string;
  isNoChildren: boolean;
  textStyle: TextLineStyle;
}

interface WrappedCell {
  element: HTMLElement;
  span: HTMLSpanElement;
  borderRadius: string;
  textStyle: TextLineStyle;
}

function readTextLineStyle(computedStyle: CSSStyleDeclaration): TextLineStyle {
  return {
    fontSize: computedStyle.fontSize || '',
    lineHeight: computedStyle.lineHeight || '',
    paddingTop: computedStyle.paddingTop || '',
    paddingBottom: computedStyle.paddingBottom || '',
  };
}

/**
 * Phase 1: Traverses the DOM tree, collects leaf elements, and wraps table cells
 * Pure writes only - no getBoundingClientRect() calls to avoid triggering reflows
 */
function collectLeafElements(
  element: Element,
  leafElements: LeafElement[],
  wrappedCells: WrappedCell[]
): void {
  // Skip elements marked to be ignored (no measurement needed)
  if (element.hasAttribute('data-shimmer-ignore')) {
    return;
  }

  const isNoChildren = element.hasAttribute('data-shimmer-no-children');

  if (isNoChildren || isLeafElement(element)) {
    const computedStyle = window.getComputedStyle(element);
    const borderRadius = computedStyle.borderRadius || '0px';
    const textStyle = readTextLineStyle(computedStyle);

    // Handle text-only table cells specially (skip when treating the cell as one block)
    const tag = element.tagName.toLowerCase();
    const isTableCell = tag === 'td' || tag === 'th';

    if (!isNoChildren && isTableCell && element.childNodes.length > 0) {
      const hasOnlyText = Array.from(element.childNodes).every(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      if (hasOnlyText) {
        const span = document.createElement('span');
        span.style.display = 'inline';

        while (element.firstChild) {
          span.appendChild(element.firstChild);
        }
        element.appendChild(span);

        wrappedCells.push({
          element: element as HTMLElement,
          span,
          borderRadius,
          // Span excludes cell padding; still inset using the cell's font metrics
          textStyle: { ...textStyle, paddingTop: '0px', paddingBottom: '0px' },
        });
        return;
      }
    }

    // Regular leaf elements - will filter zero-dimension ones in Phase 2
    leafElements.push({ element, borderRadius, isNoChildren, textStyle });
  } else {
    // Recursively process children
    Array.from(element.children).forEach((child) => {
      collectLeafElements(child, leafElements, wrappedCells);
    });
  }
}

/**
 * Phase 2: Measures all collected elements and filters out zero-dimension ones
 * First getBoundingClientRect() triggers one reflow, subsequent calls are cached
 */
function measureElements(
  leafElements: LeafElement[],
  wrappedCells: WrappedCell[],
  parentRect: DOMRect
): ElementInfo[] {
  const elements: ElementInfo[] = [];

  // Measure regular leaf elements
  leafElements.forEach(({ element, borderRadius, isNoChildren, textStyle }) => {
    const rect = element.getBoundingClientRect();

    // Skip elements with no dimensions
    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    const inset = insetTextLineRect({
      x: rect.left - parentRect.left,
      y: rect.top - parentRect.top,
      width: rect.width,
      height: rect.height,
      tag: element.tagName.toLowerCase(),
      isNoChildren,
      ...textStyle,
    });

    elements.push({
      ...inset,
      tag: element.tagName.toLowerCase(),
      borderRadius,
    });
  });

  // Measure wrapped table cells
  wrappedCells.forEach(({ span, borderRadius, textStyle }) => {
    const rect = span.getBoundingClientRect();

    // Skip elements with no dimensions
    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    const tag = span.parentElement!.tagName.toLowerCase();
    const inset = insetTextLineRect({
      x: rect.left - parentRect.left,
      y: rect.top - parentRect.top,
      width: rect.width,
      height: rect.height,
      tag,
      ...textStyle,
    });

    elements.push({
      ...inset,
      tag,
      borderRadius,
    });
  });

  return elements;
}

/**
 * Phase 3: Cleans up temporary span wrappers
 */
function cleanupWrappedCells(wrappedCells: WrappedCell[]): void {
  wrappedCells.forEach(({ element, span }) => {
    while (span.firstChild) {
      element.insertBefore(span.firstChild, span);
    }
    element.removeChild(span);
  });
}

/**
 * Extracts dimension information from content-bearing elements in a DOM tree
 * Uses a 3-phase approach to minimize reflows:
 * 1. Collect leaf elements and wrap table cells (writes only, no measurements)
 * 2. Measure all elements and filter zero-dimension ones (reads only - triggers one reflow)
 * 3. Clean up temporary wrappers (writes only)
 */
export function extractElementInfo(element: Element, parentRect: DOMRect): ElementInfo[] {
  const leafElements: LeafElement[] = [];
  const wrappedCells: WrappedCell[] = [];

  collectLeafElements(element, leafElements, wrappedCells);
  const elements = measureElements(leafElements, wrappedCells, parentRect);
  cleanupWrappedCells(wrappedCells);

  return elements;
}
