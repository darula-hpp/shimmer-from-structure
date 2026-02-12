import { DocsLayout } from '../../components/DocsLayout';

export default function SvelteGuide() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>Svelte Guide</h1>

        <p>Learn how to use Shimmer From Structure with Svelte 5.</p>

        <h2>Installation</h2>

        <pre>
          <code>npm install @shimmer-from-structure/svelte</code>
        </pre>

        <h2>Basic Usage</h2>

        <h3>Static Content</h3>

        <pre>
          <code>{`<script>
import { Shimmer } from '@shimmer-from-structure/svelte';

let isLoading = $state(true);
</script>

<Shimmer loading={isLoading}>
  <div class="card">
    <img src="avatar.jpg" class="avatar" />
    <h2>John Doe</h2>
    <p>Software Engineer</p>
  </div>
</Shimmer>`}</code>
        </pre>

        <h3>Dynamic Content with templateProps</h3>

        <pre>
          <code>{`<script>
import { Shimmer } from '@shimmer-from-structure/svelte';
import UserCard from './UserCard.svelte';

let { user } = $props();
let loading = $state(true);

const userTemplate = {
  name: 'Loading...',
  role: 'Loading role...',
  avatar: 'placeholder.jpg',
};
</script>

<Shimmer loading={loading} templateProps={{ user: userTemplate }}>
  <UserCard user={user || userTemplate} />
</Shimmer>`}</code>
        </pre>

        <h2>Global Configuration</h2>

        <p>Use setShimmerConfig to set global defaults:</p>

        <pre>
          <code>{`<!-- App.svelte or any parent component -->
<script>
import { setShimmerConfig } from '@shimmer-from-structure/svelte';
import Dashboard from './Dashboard.svelte';

// Must be called at the top level during component initialization
setShimmerConfig({
  shimmerColor: 'rgba(56, 189, 248, 0.4)',
  backgroundColor: 'rgba(56, 189, 248, 0.1)',
  duration: 2.5,
  fallbackBorderRadius: 8,
});
</script>

<Dashboard />`}</code>
        </pre>

        <h3>Accessing Config</h3>

        <pre>
          <code>{`import { getShimmerConfig } from '@shimmer-from-structure/svelte';

const config = getShimmerConfig();
console.log(config.backgroundColor);`}</code>
        </pre>

        <h2>Examples</h2>

        <h3>Dashboard with Multiple Sections</h3>

        <pre>
          <code>{`<script>
import { Shimmer } from '@shimmer-from-structure/svelte';

let loadingUser = $state(true);
let loadingStats = $state(true);
</script>

<Shimmer loading={loadingUser} templateProps={{ user: userTemplate }}>
  <UserProfile {user} />
</Shimmer>

<Shimmer
  loading={loadingStats}
  templateProps={{ stats: statsTemplate }}
  shimmerColor="rgba(20, 184, 166, 0.2)"
>
  <StatsGrid {stats} />
</Shimmer>`}</code>
        </pre>

        <h2>Next Steps</h2>

        <ul>
          <li>
            <a href="/docs/api">API Reference</a> - Explore all available props
          </li>
          <li>
            <a href="/docs/examples">Examples</a> - See more real-world examples
          </li>
          <li>
            <a href="/docs/best-practices">Best Practices</a> - Learn optimization techniques
          </li>
        </ul>
      </article>
    </DocsLayout>
  );
}
