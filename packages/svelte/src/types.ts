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
   * Object mapping prop names to their mock/template values.
   * These props will be injected into the slot when loading.
   * Example: { user: { name: "Lorem" }, settings: { theme: "dark" } }
   */
  templateProps?: Record<string, unknown>;
  /**
   * The content to render inside the shimmer component.
   */
  children?: Snippet;
}

// Re-export core types for convenience
export type { ShimmerConfig, ShimmerContextValue, ElementInfo } from '@shimmer-from-structure/core';
