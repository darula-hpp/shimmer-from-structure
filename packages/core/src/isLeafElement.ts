/**
 * Check if an element is a "leaf" content element that should be rendered as shimmer
 */
export function isLeafElement(element: Element): boolean {
  const tag = element.tagName.toLowerCase();

  // Always include these elements as they're always content
  const alwaysInclude = ['img', 'svg', 'video', 'canvas', 'iframe', 'input', 'textarea', 'button'];
  if (alwaysInclude.includes(tag)) {
    return true;
  }

  // Check if element has no *real* element children (ignore void/formatting
  // elements like <br> that carry no dimensions of their own)
  const voidElements = ['br', 'wbr', 'hr'];
  const hasRealChildren = Array.from(element.children).some(
    (child) => !voidElements.includes(child.tagName.toLowerCase())
  );
  if (!hasRealChildren) {
    // Treat as a leaf element: contains only text and/or void elements
    return true;
  }

  return false;
}
