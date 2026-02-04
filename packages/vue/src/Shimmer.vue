<template>
  <div v-if="!loading">
    <slot></slot>
  </div>
  <div v-else style="position: relative">
    <!-- Styles for hiding text -->
    <component :is="'style'">
      {{ measureStyles }}
    </component>

    <!-- Measure container with transparent text -->
    <div
      ref="measureRef"
      class="shimmer-measure-container"
      style="pointer-events: none"
      aria-hidden="true"
    >
      <slot :loading="true" v-bind="templateProps"></slot>
    </div>

    <!-- Shimmer overlay -->
    <div :style="overlayStyle">
      <component :is="'style'">
        {{ shimmerKeyframes }}
      </component>

      <div v-for="(element, index) in elements" :key="index" :style="getElementStyle(element)">
        <div :style="getShimmerStyle()"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, nextTick, watch } from 'vue';
import {
  extractElementInfo,
  createResizeObserver,
  type ElementInfo,
} from '@shimmer-from-structure/core';
import { useShimmerConfig } from './composables/useShimmerConfig';

interface Props {
  loading?: boolean;
  shimmerColor?: string;
  backgroundColor?: string;
  duration?: number;
  fallbackBorderRadius?: number;
  templateProps?: Record<string, unknown>;
}

const props = withDefaults(defineProps<Props>(), {
  loading: true,
});

const measureRef = ref<HTMLElement | null>(null);
const elements = ref<ElementInfo[]>([]);

// Get context values
const contextConfig = useShimmerConfig();

// Resolved configuration (props > context > defaults)
const resolvedShimmerColor = computed(() => props.shimmerColor ?? contextConfig.shimmerColor);
const resolvedBackgroundColor = computed(
  () => props.backgroundColor ?? contextConfig.backgroundColor
);
const resolvedDuration = computed(() => props.duration ?? contextConfig.duration);
const resolvedFallbackBorderRadius = computed(
  () => props.fallbackBorderRadius ?? contextConfig.fallbackBorderRadius
);

// Measurement logic
const measureElements = async () => {
  console.log('measureElements called', { loading: props.loading, hasRef: !!measureRef.value });
  if (!props.loading || !measureRef.value) return;

  await nextTick();

  const container = measureRef.value;
  const containerRect = container.getBoundingClientRect();

  const extractedElements: ElementInfo[] = [];
  Array.from(container.children).forEach((child) => {
    extractedElements.push(...extractElementInfo(child, containerRect));
  });

  elements.value = extractedElements;
};

// Track cleanup function for ResizeObserver
let cleanupObserver: (() => void) | null = null;

// Watch for loading state changes and manage ResizeObserver lifecycle
watch(
  [() => props.loading, measureRef],
  async ([isLoading, element]) => {
    // Clean up existing observer when loading changes or element changes
    if (cleanupObserver) {
      cleanupObserver();
      cleanupObserver = null;
    }

    if (isLoading) {
      await measureElements();

      // Set up ResizeObserver when loading starts and element is available
      if (element) {
        cleanupObserver = createResizeObserver(element, measureElements);
      }
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (cleanupObserver) {
    cleanupObserver();
  }
});

// Computed styles
const measureStyles = computed(
  () => `
  .shimmer-measure-container * {
    color: transparent !important;
  }
  .shimmer-measure-container img,
  .shimmer-measure-container svg,
  .shimmer-measure-container video {
    opacity: 0;
  }
`
);

const shimmerKeyframes = computed(
  () => `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`
);

const overlayStyle = computed(() => ({
  position: 'absolute' as const,
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  overflow: 'hidden',
}));

const getElementStyle = (element: ElementInfo) => ({
  position: 'absolute' as const,
  left: `${element.x}px`,
  top: `${element.y}px`,
  width: `${element.width}px`,
  height: `${element.height}px`,
  backgroundColor: resolvedBackgroundColor.value,
  borderRadius:
    element.borderRadius === '0px'
      ? `${resolvedFallbackBorderRadius.value}px`
      : element.borderRadius,
  overflow: 'hidden',
});

const getShimmerStyle = () => ({
  position: 'absolute' as const,
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: `linear-gradient(90deg, transparent, ${resolvedShimmerColor.value}, transparent)`,
  animation: `shimmer ${resolvedDuration.value}s infinite`,
});
</script>
