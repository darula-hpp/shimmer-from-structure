import type { JSX } from 'solid-js';

export interface ShimmerProps {
  children: JSX.Element;
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
   * Optional parameter for API consistency with React/Vue/Angular adapters.
   * In SolidJS, you typically use explicit conditionals instead:
   * `<UserCard user={user() || userTemplate} />`
   *
   * This parameter doesn't inject props automatically - you control data flow yourself.
   * @example { user: { name: "Lorem" }, settings: { theme: "dark" } }
   */
  templateProps?: Record<string, unknown>;
}

// Re-export core types for convenience
export type { ShimmerConfig, ShimmerContextValue, ElementInfo } from '@shimmer-from-structure/core';
