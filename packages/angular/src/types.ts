
/**
 * Input properties for the Shimmer component
 */
export interface ShimmerInputs {
    /**
     * Whether the component is in loading state
     * @default true
     */
    loading?: boolean;

    /**
     * Color of the shimmer effect gradient
     */
    shimmerColor?: string;

    /**
     * Background color of the shimmer blocks
     */
    backgroundColor?: string;

    /**
     * Duration of one shimmer animation cycle in seconds
     */
    duration?: number;

    /**
     * Fallback border radius (in pixels) when element has no border-radius
     * @default 4
     */
    fallbackBorderRadius?: number;
}

// Re-export core types for convenience
export type { ShimmerConfig, ShimmerContextValue, ElementInfo } from '@shimmer-from-structure/core';
