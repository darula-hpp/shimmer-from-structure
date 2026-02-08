import {
  createSignal,
  createEffect,
  onCleanup,
  mergeProps,
  children as resolveChildren,
} from 'solid-js';
import { For, Show } from 'solid-js';
import type { ShimmerProps } from './types';
import { useShimmerConfig } from './ShimmerContext';
import {
  extractElementInfo,
  createResizeObserver,
  type ElementInfo,
} from '@shimmer-from-structure/core';

/**
 * Shimmer component that adapts to the actual rendered structure of its children
 */
export const Shimmer = (props: ShimmerProps) => {
  // Merge with defaults
  const merged = mergeProps({ loading: true, templateProps: undefined }, props);

  // Get context values
  const contextConfig = useShimmerConfig();

  // Resolve configuration (props > context > defaults)
  const resolvedShimmerColor = () => merged.shimmerColor ?? contextConfig.shimmerColor;
  const resolvedBackgroundColor = () => merged.backgroundColor ?? contextConfig.backgroundColor;
  const resolvedDuration = () => merged.duration ?? contextConfig.duration;
  const resolvedFallbackBorderRadius = () =>
    merged.fallbackBorderRadius ?? contextConfig.fallbackBorderRadius;

  const [elements, setElements] = createSignal<ElementInfo[]>([]);
  let measureRef: HTMLDivElement | undefined;

  // Resolve children properly using SolidJS children helper
  const resolvedChildren = resolveChildren(() => merged.children);

  // Prepare children with injected template props when loading
  // NOTE: Unlike React/Vue, SolidJS doesn't clone elements with injected props.
  // Instead, developers use explicit conditionals: <UserCard user={user() || template} />
  // This is more idiomatic for SolidJS (explicit over implicit, type-safe, no magic).
  // The templateProps parameter exists for API consistency across frameworks.
  const childrenToRender = () => {
    return resolvedChildren();
  };

  // Measure the structure using createEffect (SolidJS equivalent of useLayoutEffect)
  createEffect(() => {
    if (!merged.loading || !measureRef) return;

    const container = measureRef;

    const measureElements = () => {
      const containerRect = container.getBoundingClientRect();

      // Extract all element dimensions
      const extractedElements: ElementInfo[] = [];
      Array.from(container.children).forEach((child) => {
        extractedElements.push(...extractElementInfo(child, containerRect));
      });

      setElements(extractedElements);
    };

    // Initial measurement
    measureElements();

    // Set up ResizeObserver to re-measure on layout changes
    const cleanup = createResizeObserver(container, measureElements);

    // Cleanup on effect disposal
    onCleanup(cleanup);
  });

  return (
    <Show when={merged.loading} fallback={<>{merged.children}</>}>
      <div style={{ position: 'relative' }}>
        {/* Inject styles for hiding text while preserving backgrounds */}
        <style>{`
          .shimmer-measure-container * {
            color: transparent !important;
          }
          .shimmer-measure-container img,
          .shimmer-measure-container svg,
          .shimmer-measure-container video {
            opacity: 0;
          }
        `}</style>

        {/* Children rendered with transparent text but visible container backgrounds */}
        <div
          ref={measureRef}
          class="shimmer-measure-container"
          style={{
            'pointer-events': 'none',
          }}
          aria-hidden="true"
        >
          {childrenToRender()}
        </div>

        {/* Shimmer overlay based on measured dimensions */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
          }}
        >
          <style>{`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
          `}</style>

          <For each={elements()}>
            {(element) => (
              <div
                style={{
                  position: 'absolute',
                  left: `${element.x}px`,
                  top: `${element.y}px`,
                  width: `${element.width}px`,
                  height: `${element.height}px`,
                  'background-color': resolvedBackgroundColor(),
                  'border-radius':
                    element.borderRadius === '0px'
                      ? `${resolvedFallbackBorderRadius()}px`
                      : element.borderRadius,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${resolvedShimmerColor()}, transparent)`,
                    animation: `shimmer ${resolvedDuration()}s infinite`,
                  }}
                />
              </div>
            )}
          </For>
        </div>
      </div>
    </Show>
  );
};
