import type { Snippet } from 'svelte';

export interface ShimmerProps {
  loading?: boolean;
  shimmerColor?: string;
  backgroundColor?: string;
  duration?: number;
  /**
   * Fallback border radius (in pixels) used when an element has no border-radius.
   * Helps avoid square-ish shimmer blocks, especially for text elements.
   * @default 4
   */
  fallbackBorderRadius?: number;
  /**
   * This will be removed in a future version
   */
  templateProps?: Record<string, unknown>;
  /**
   * This defines the layout structure that will be measured to generate the shimmer effect.
   */
  children?: Snippet;
}

// Re-export core types for convenience
export type { ShimmerConfig, ShimmerContextValue, ElementInfo } from '@shimmer-from-structure/core';
