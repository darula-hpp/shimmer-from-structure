<script lang="ts">
  import { Shimmer, setShimmerConfig } from '@shimmer-from-structure/svelte';

  interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
  }

  interface Props {
    loadingContextExample: boolean;
    contextData: TeamMember[] | null;
    teamTemplate: TeamMember[];
  }

  let { loadingContextExample, contextData, teamTemplate }: Props = $props();

  // Apply custom shimmer config during initialization (must be top-level in script)
  setShimmerConfig({
    shimmerColor: 'rgba(56, 189, 248, 0.4)',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    duration: 3,
    fallbackBorderRadius: 16,
  });
</script>

<Shimmer loading={loadingContextExample} templateProps={{ members: teamTemplate.slice(0, 2) }}>
  <div class="members-grid">
    {#each contextData || teamTemplate.slice(0, 2) as member}
      <div class="member-card">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: #333;"></div>
        <p class="member-name">{member.name}</p>
        <span class="member-role">{member.role}</span>
      </div>
    {/each}
  </div>
</Shimmer>
