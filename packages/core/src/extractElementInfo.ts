import { ElementInfo } from './types';
import { isLeafElement } from './isLeafElement';

/**
 * Extracts dimension information from content-bearing elements in a DOM tree
 */
export function extractElementInfo(element: Element, parentRect: DOMRect): ElementInfo[] {
  const elements: ElementInfo[] = [];
  const rect = element.getBoundingClientRect();

  // Skip elements with no dimensions
  if (rect.width === 0 || rect.height === 0) {
    return elements;
  }

  // Skip this element and all its descendants entirely
  if (element.hasAttribute('data-shimmer-ignore')) {
    return elements;
  }

  // Treat this element as a single block — capture it without recursing into children
  const isNoChildren = element.hasAttribute('data-shimmer-no-children');

  // If this is a leaf element (or explicitly marked as a block), capture it
  if (isNoChildren || isLeafElement(element)) {
    // Get computed border-radius from the element's styles
    const computedStyle = window.getComputedStyle(element);
    const computedBorderRadius = computedStyle.borderRadius || '0px';

    // Extract padding to inset shimmer blocks ONLY for table cells
    // This prevents merged shimmer blocks in tables without affecting other layouts
    const tag = element.tagName.toLowerCase();
    const isTableCell = tag === 'td' || tag === 'th';

    // For table cells with text-only content, temporarily wrap in span to measure text width
    let measureTarget: Element = element;
    let tempSpan: HTMLSpanElement | null = null;

    if (isTableCell && element.childNodes.length > 0) {
      // Check if all children are text nodes
      const hasOnlyText = Array.from(element.childNodes).every(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      if (hasOnlyText) {
        // Create temporary span wrapper
        tempSpan = document.createElement('span');
        tempSpan.style.display = 'inline';

        // Move text content to span
        while (element.firstChild) {
          tempSpan.appendChild(element.firstChild);
        }
        element.appendChild(tempSpan);
        measureTarget = tempSpan;
      }
    }

    // Measure the target element (span if wrapped, original element otherwise)
    const targetRect = measureTarget.getBoundingClientRect();

    const info: ElementInfo = {
      x: targetRect.left - parentRect.left,
      y: targetRect.top - parentRect.top,
      width: targetRect.width,
      height: targetRect.height,
      tag: element.tagName.toLowerCase(),
      borderRadius: computedBorderRadius,
    };

    // Clean up temporary span
    if (tempSpan) {
      // Move text back to original element
      while (tempSpan.firstChild) {
        element.insertBefore(tempSpan.firstChild, tempSpan);
      }
      element.removeChild(tempSpan);
    }

    elements.push(info);
  } else {
    // Otherwise, recursively process children
    Array.from(element.children).forEach((child) => {
      elements.push(...extractElementInfo(child, parentRect));
    });
  }

  return elements;
}
