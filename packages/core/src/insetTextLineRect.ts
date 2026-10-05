const REPLACED_OR_CONTROL_TAGS = new Set([
  'img',
  'svg',
  'video',
  'canvas',
  'iframe',
  'input',
  'textarea',
  'button',
]);

const MIN_BAR_HEIGHT = 4;
const MIN_BAR_FONT_RATIO = 0.75;
const PADDING_SKIP_RATIO = 0.5;
const NORMAL_LINE_HEIGHT_MULTIPLIER = 1.2;

export interface InsetTextLineRectInput {
  x: number;
  y: number;
  width: number;
  height: number;
  tag: string;
  isNoChildren?: boolean;
  fontSize: string;
  lineHeight: string;
  paddingTop: string;
  paddingBottom: string;
}

export interface InsetTextLineRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function parsePx(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function resolveLineHeight(lineHeight: string, fontSize: number): number {
  if (!lineHeight || lineHeight === 'normal') {
    return fontSize * NORMAL_LINE_HEIGHT_MULTIPLIER;
  }

  const parsed = parseFloat(lineHeight);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fontSize * NORMAL_LINE_HEIGHT_MULTIPLIER;
  }

  return parsed;
}

/**
 * Vertically inset a text-line overlay inside its reserved box so stacked
 * skeleton bars show a gap. Layout size is unchanged — only the overlay shrinks.
 */
export function insetTextLineRect(input: InsetTextLineRectInput): InsetTextLineRect {
  const {
    x,
    y,
    width,
    height,
    tag,
    isNoChildren,
    fontSize,
    lineHeight,
    paddingTop,
    paddingBottom,
  } = input;

  if (isNoChildren || REPLACED_OR_CONTROL_TAGS.has(tag)) {
    return { x, y, width, height };
  }

  const fontSizePx = parsePx(fontSize);
  if (fontSizePx <= 0) {
    return { x, y, width, height };
  }

  const paddingBlock = parsePx(paddingTop) + parsePx(paddingBottom);
  if (paddingBlock >= fontSizePx * PADDING_SKIP_RATIO) {
    return { x, y, width, height };
  }

  const lineHeightPx = resolveLineHeight(lineHeight, fontSizePx);
  const leading = Math.max(0, lineHeightPx - fontSizePx);
  const inset = leading / 2;

  const minHeight = Math.min(height, Math.max(MIN_BAR_HEIGHT, fontSizePx * MIN_BAR_FONT_RATIO));
  const maxInset = Math.max(0, (height - minHeight) / 2);
  const applied = Math.min(inset, maxInset);

  return {
    x,
    y: y + applied,
    width,
    height: height - 2 * applied,
  };
}
