import React, { useLayoutEffect, useState, useRef } from 'react';
import { ShimmerProps } from './types';
import { useShimmerConfig } from './ShimmerContext';
import {
  extractElementInfo,
  createResizeObserver,
  SHIMMER_CONTAINER_STYLES,
  type ElementInfo,
} from '@shimmer-from-structure/core';

/**
 * Shimmer component that adapts to the actual rendered structure of its children
 */
export const Shimmer: React.FC<ShimmerProps> = ({
  children,
  loading = true,
  shimmerColor,
  backgroundColor,
  duration,
  fallbackBorderRadius,
  templateProps,
}) => {
  // Get context values (contains defaults if no provider)
  const contextConfig = useShimmerConfig();

  // Merge: props > context > defaults
  const resolvedShimmerColor = shimmerColor ?? contextConfig.shimmerColor;
  const resolvedBackgroundColor = backgroundColor ?? contextConfig.backgroundColor;
  const resolvedDuration = duration ?? contextConfig.duration;
  const resolvedFallbackBorderRadius = fallbackBorderRadius ?? contextConfig.fallbackBorderRadius;

  const [elements, setElements] = useState<ElementInfo[]>([]);
  const measureRef = useRef<HTMLDivElement>(null);

  // Prepare children with injected template props when loading
  const childrenToRender = React.useMemo(() => {
    // Only inject template props if loading and templateProps is provided
    if (!loading || !templateProps) {
      return children;
    }

    // Get the first child
    const childArray = React.Children.toArray(children);
    if (childArray.length === 0) {
      return children;
    }

    const firstChild = childArray[0];

    // Check if it's a valid React element that can receive props
    if (!React.isValidElement(firstChild)) {
      return children;
    }

    // Clone the first child with the template props spread onto it
    const clonedChild = React.cloneElement(firstChild, {
      ...templateProps,
    });

    // Return cloned first child + rest of children unchanged
    return [clonedChild, ...childArray.slice(1)];
  }, [children, loading, templateProps]);

  // Measure the structure using useLayoutEffect (synchronous, before paint)
  useLayoutEffect(() => {
    if (!loading || !measureRef.current) return;

    const container = measureRef.current;

    const measureElements = () => {
      try {
        const containerRect = container.getBoundingClientRect();

        // Extract all element dimensions
        const extractedElements: ElementInfo[] = [];
        Array.from(container.children).forEach((child) => {
          extractedElements.push(...extractElementInfo(child, containerRect));
        });

        setElements(extractedElements);
      } catch (error) {
        console.error('Error measuring elements:', error);
      }
    };

    // Initial measurement
    measureElements();

    // Set up ResizeObserver to re-measure on layout changes
    const cleanup = createResizeObserver(container, measureElements);

    // Cleanup
    return cleanup;
  }, [loading, childrenToRender]);

  if (!loading) {
    return <>{children}</>;
  }

  return (
    <div style={{ position: 'relative' }}>
      <style>{SHIMMER_CONTAINER_STYLES}</style>

      {/* Children rendered with transparent text but visible container backgrounds */}
      <div
        ref={measureRef}
        className="shimmer-measure-container"
        style={{
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {childrenToRender}
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

        {elements.map((element, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${element.x}px`,
              top: `${element.y}px`,
              width: `${element.width}px`,
              height: `${element.height}px`,
              backgroundColor: resolvedBackgroundColor,
              borderRadius:
                element.borderRadius === '0px'
                  ? `${resolvedFallbackBorderRadius}px`
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
                background: `linear-gradient(90deg, transparent, ${resolvedShimmerColor}, transparent)`,
                animation: `shimmer ${resolvedDuration}s infinite`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
