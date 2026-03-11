<script lang="ts">
  import Shimmer from '../Shimmer.svelte';
  import { setShimmerConfig } from '../ShimmerContext';
  import type { ShimmerConfig } from '@shimmer-from-structure/core';

  interface Props {
    loading?: boolean;
    shimmerColor?: string;
    backgroundColor?: string;
    duration?: number;
    fallbackBorderRadius?: number;
    config?: ShimmerConfig;
  }

  let {
    loading = true,
    shimmerColor = undefined,
    backgroundColor = undefined,
    duration = undefined,
    fallbackBorderRadius = undefined,
    config = undefined,
  }: Props = $props();

  if (config) {
    setShimmerConfig(config);
  }
</script>

<Shimmer {loading} {shimmerColor} {backgroundColor} {duration} {fallbackBorderRadius}>
  <div class="content">Content</div>
  <div class="nested">Nested</div>
</Shimmer>
