import { createContext, useContext, type JSX } from 'solid-js';
import type { ShimmerConfig, ShimmerContextValue } from '@shimmer-from-structure/core';
import { shimmerDefaults } from '@shimmer-from-structure/core';

const ShimmerContext = createContext<ShimmerContextValue>(shimmerDefaults);

export interface ShimmerProviderProps {
  /** Shimmer configuration to apply to all child Shimmer components */
  config?: ShimmerConfig;
  children: JSX.Element;
}

/**
 * Provider component for global shimmer configuration.
 * Wrap your app or a section of your component tree to apply default shimmer settings.
 *
 * @example
 * ```tsx
 * <ShimmerProvider config={{ shimmerColor: '#fff', duration: 2 }}>
 *   <App />
 * </ShimmerProvider>
 * ```
 */
export const ShimmerProvider = (props: ShimmerProviderProps) => {
  const mergedConfig: ShimmerContextValue = {
    shimmerColor: props.config?.shimmerColor ?? shimmerDefaults.shimmerColor,
    backgroundColor: props.config?.backgroundColor ?? shimmerDefaults.backgroundColor,
    duration: props.config?.duration ?? shimmerDefaults.duration,
    fallbackBorderRadius:
      props.config?.fallbackBorderRadius ?? shimmerDefaults.fallbackBorderRadius,
  };

  return <ShimmerContext.Provider value={mergedConfig}>{props.children}</ShimmerContext.Provider>;
};

/**
 * Hook to access the current shimmer configuration from context.
 * Returns default values if no ShimmerProvider is present.
 * All returned values are guaranteed to be defined.
 */
export const useShimmerConfig = (): ShimmerContextValue => {
  return useContext(ShimmerContext);
};

// Re-export defaults for testing and reference
export { shimmerDefaults };
