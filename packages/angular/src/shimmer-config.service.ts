import { InjectionToken, inject } from '@angular/core';
import type { ShimmerConfig, ShimmerContextValue } from '@shimmer-from-structure/core';
import { shimmerDefaults } from '@shimmer-from-structure/core';

/**
 * Injection token for global shimmer configuration.
 * Use `provideShimmerConfig()` to configure in your app.
 */
export const SHIMMER_CONFIG = new InjectionToken<ShimmerConfig>('SHIMMER_CONFIG');

/**
 * Provider function for shimmer configuration.
 * Use in your app's providers array.
 *
 * @example
 * ```typescript
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideShimmerConfig({
 *       shimmerColor: 'rgba(255, 255, 255, 0.3)',
 *       duration: 1.5
 *     })
 *   ]
 * });
 * ```
 */
export function provideShimmerConfig(config: ShimmerConfig) {
    return { provide: SHIMMER_CONFIG, useValue: config };
}

/**
 * Inject and resolve shimmer configuration.
 * Merges injected config with defaults.
 * Returns fully resolved ShimmerContextValue with all properties defined.
 */
export function injectShimmerConfig(): ShimmerContextValue {
    const config = inject(SHIMMER_CONFIG, { optional: true }) ?? {};

    return {
        shimmerColor: config.shimmerColor ?? shimmerDefaults.shimmerColor,
        backgroundColor: config.backgroundColor ?? shimmerDefaults.backgroundColor,
        duration: config.duration ?? shimmerDefaults.duration,
        fallbackBorderRadius: config.fallbackBorderRadius ?? shimmerDefaults.fallbackBorderRadius,
    };
}

// Re-export defaults for testing and reference
export { shimmerDefaults };
