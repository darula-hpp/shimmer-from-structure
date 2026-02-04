<script lang="ts">
  import { onMount, tick, type Snippet } from 'svelte';
  import {
    extractElementInfo,
    createResizeObserver,
    type ElementInfo,
  } from '@shimmer-from-structure/core';
  import { getShimmerConfig } from './ShimmerContext';
  import type { ShimmerProps } from './types';

  let {
    loading = true,
    shimmerColor = undefined,
    backgroundColor = undefined,
    duration = undefined,
    fallbackBorderRadius = undefined,
    children,
  }: ShimmerProps & { children: Snippet } = $props();

  let measureRef: HTMLDivElement | undefined = $state();
  let elements: ElementInfo[] = $state([]);

  const contextConfig = getShimmerConfig();

  const resolvedShimmerColor = $derived(shimmerColor ?? contextConfig.shimmerColor);
  const resolvedBackgroundColor = $derived(backgroundColor ?? contextConfig.backgroundColor);
  const resolvedDuration = $derived(duration ?? contextConfig.duration);
  const resolvedFallbackBorderRadius = $derived(
    fallbackBorderRadius ?? contextConfig.fallbackBorderRadius
  );

  let observer: MutationObserver | undefined;
  let resizeCleanup: (() => void) | undefined;

  async function measureElements() {
    if (!loading || !measureRef) return;

    // Temporarily stop observing to avoid recursion from DOM-modifying measurements
    // (e.g. extractElementInfo temporarily wrapping text in spans)
    observer?.disconnect();

    // Wait for DOM update
    await tick();

    const container = measureRef;
    const containerRect = container.getBoundingClientRect();
    const extractedElements: ElementInfo[] = [];

    Array.from(container.children).forEach((child) => {
      extractedElements.push(...extractElementInfo(child, containerRect));
    });

    elements = extractedElements;

    // Restart observation session
    if (measureRef && observer) {
      observer.observe(measureRef, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: false,
      });
    }
  }

  // Re-measure when loading state changes and manage ResizeObserver lifecycle
  $effect(() => {
    if (loading && measureRef) {
      measureElements();

      // Clean up existing ResizeObserver if any
      if (resizeCleanup) {
        resizeCleanup();
      }

      // Set up ResizeObserver for this loading session
      resizeCleanup = createResizeObserver(measureRef, measureElements);
    } else {
      // Clean up ResizeObserver when not loading
      if (resizeCleanup) {
        resizeCleanup();
        resizeCleanup = undefined;
      }
    }

    // Cleanup on effect re-run or component unmount
    return () => {
      if (resizeCleanup) {
        resizeCleanup();
        resizeCleanup = undefined;
      }
    };
  });

  onMount(() => {
    measureElements();

    if (measureRef) {
      // MutationObserver: watches for DOM content changes (new children, text changes)
      observer = new MutationObserver(() => {
        // Only observe changes in the measure container (slot content changes)
        // Don't trigger when we're not loading
        if (loading) {
          measureElements();
        }
      });

      // Only observe the slot content changes, NOT the shimmer overlay
      observer.observe(measureRef, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: false, // Don't observe attribute changes (style updates)
      });
    }

    return () => {
      observer?.disconnect();
    };
  });

  // Helper to signal content change from parent (optional)
  export function remeasure() {
    measureElements();
  }
  const styleTag = 'style';
</script>

{#if !loading}
  {@render children()}
{:else}
  <div style="position: relative;">
    <!-- Measure container with transparent text -->
    <div
      bind:this={measureRef}
      class="shimmer-measure-container"
      style="pointer-events: none;"
      aria-hidden="true"
    >
      {@render children()}
    </div>

    <!-- Shimmer overlay - isolated from mutation observer -->
    <div
      style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        pointer-events: none;
      "
    >
      <svelte:element this={styleTag}>
        {`
          @keyframes shimmer-animation {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </svelte:element>

      {#each elements as element, index (index)}
        <div
          style="
            position: absolute;
            left: {element.x}px;
            top: {element.y}px;
            width: {element.width}px;
            height: {element.height}px;
            background-color: {resolvedBackgroundColor};
            border-radius: {element.borderRadius === '0px'
            ? resolvedFallbackBorderRadius + 'px'
            : element.borderRadius};
            overflow: hidden;
          "
        >
          <div
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, {resolvedShimmerColor}, transparent);
              animation: shimmer-animation {resolvedDuration}s infinite;
            "
          ></div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .shimmer-measure-container :global(*) {
    color: transparent !important;
  }
  .shimmer-measure-container :global(img),
  .shimmer-measure-container :global(svg),
  .shimmer-measure-container :global(video) {
    opacity: 0;
  }
</style>
