import { DocsLayout } from '../../components/DocsLayout';

export default function VueGuide() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>Vue Guide</h1>

        <p>Learn how to use Shimmer From Structure with Vue 3.</p>

        <h2>Installation</h2>

        <pre>
          <code>npm install @shimmer-from-structure/vue</code>
        </pre>

        <h2>Basic Usage</h2>

        <h3>Static Content</h3>

        <pre>
          <code>{`<script setup>
import { ref } from 'vue';
import { Shimmer } from '@shimmer-from-structure/vue';

const isLoading = ref(true);
</script>

<template>
  <Shimmer :loading="isLoading">
    <div class="card">
      <img src="avatar.jpg" class="avatar" />
      <h2>John Doe</h2>
      <p>Software Engineer</p>
    </div>
  </Shimmer>
</template>`}</code>
        </pre>

        <h3>Dynamic Content with templateProps</h3>

        <pre>
          <code>{`<script setup>
import { ref } from 'vue';
import { Shimmer } from '@shimmer-from-structure/vue';
import UserCard from './UserCard.vue';

const loading = ref(true);
const user = ref(null);

const userTemplate = {
  name: 'Loading...',
  role: 'Loading role...',
  avatar: 'placeholder.jpg',
};
</script>

<template>
  <Shimmer :loading="loading" :templateProps="{ user: userTemplate }">
    <UserCard :user="user || userTemplate" />
  </Shimmer>
</template>`}</code>
        </pre>

        <h2>Global Configuration</h2>

        <p>Use Vue's provide/inject pattern to set global defaults:</p>

        <pre>
          <code>{`<!-- App.vue -->
<script setup>
import { provideShimmerConfig } from '@shimmer-from-structure/vue';

provideShimmerConfig({
  shimmerColor: 'rgba(56, 189, 248, 0.4)',
  backgroundColor: 'rgba(56, 189, 248, 0.1)',
  duration: 2.5,
  fallbackBorderRadius: 8,
});
</script>

<template>
  <router-view />
</template>`}</code>
        </pre>

        <h3>Accessing Config in Composables</h3>

        <pre>
          <code>{`import { useShimmerConfig } from '@shimmer-from-structure/vue';

const config = useShimmerConfig();
console.log(config.value.backgroundColor);`}</code>
        </pre>

        <h2>Examples</h2>

        <h3>Dashboard with Multiple Sections</h3>

        <pre>
          <code>{`<script setup>
import { ref } from 'vue';
import { Shimmer } from '@shimmer-from-structure/vue';

const loadingUser = ref(true);
const loadingStats = ref(true);
</script>

<template>
  <Shimmer :loading="loadingUser" :templateProps="{ user: userTemplate }">
    <UserProfile :user="user" />
  </Shimmer>

  <Shimmer
    :loading="loadingStats"
    :templateProps="{ stats: statsTemplate }"
    shimmerColor="rgba(20, 184, 166, 0.2)"
  >
    <StatsGrid :stats="stats" />
  </Shimmer>
</template>`}</code>
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
