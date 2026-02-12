import { DocsLayout } from '../../components/DocsLayout';
import { CodeTabs } from '../../components/CodeTabs';

export default function GettingStarted() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>Getting Started</h1>

        <p>
          Shimmer From Structure is a structure-aware skeleton loader that automatically mirrors
          your rendered UI at runtime. No need to maintain separate skeleton components.
        </p>

        <h2>Why This Library?</h2>

        <p>Traditional shimmer libraries require you to:</p>

        <ul>
          <li>Manually create skeleton components that mirror your real components</li>
          <li>Maintain two versions of each component (real + skeleton)</li>
          <li>Update skeletons every time your layout changes</li>
        </ul>

        <p>
          <strong>Shimmer From Structure</strong> eliminates all of that:
        </p>

        <ul>
          <li>✔ Works with React, Vue, Svelte, Angular & SolidJS</li>
          <li>✔ Automatically measures your component's structure at runtime</li>
          <li>✔ Generates shimmer effects that match actual dimensions</li>
          <li>✔ Zero maintenance - works with any layout changes</li>
          <li>✔ Works with complex nested structures</li>
          <li>✔ Supports dynamic data with templateProps</li>
          <li>✔ Preserves container backgrounds during loading</li>
          <li>✔ Auto-detects border-radius from your CSS</li>
        </ul>

        <h2>Installation</h2>

        <p>Install the package for your specific framework using your preferred package manager:</p>

        <CodeTabs
          tabs={[
            {
              id: 'react',
              label: 'React',
              content: (
                <pre>
                  <code>{`npm install @shimmer-from-structure/react
# or
yarn add @shimmer-from-structure/react
# or
pnpm add @shimmer-from-structure/react`}</code>
                </pre>
              ),
            },
            {
              id: 'vue',
              label: 'Vue',
              content: (
                <pre>
                  <code>{`npm install @shimmer-from-structure/vue
# or
yarn add @shimmer-from-structure/vue
# or
pnpm add @shimmer-from-structure/vue`}</code>
                </pre>
              ),
            },
            {
              id: 'svelte',
              label: 'Svelte',
              content: (
                <pre>
                  <code>{`npm install @shimmer-from-structure/svelte
# or
yarn add @shimmer-from-structure/svelte
# or
pnpm add @shimmer-from-structure/svelte`}</code>
                </pre>
              ),
            },
            {
              id: 'solid',
              label: 'Solid',
              content: (
                <pre>
                  <code>{`npm install @shimmer-from-structure/solid
# or
yarn add @shimmer-from-structure/solid
# or
pnpm add @shimmer-from-structure/solid`}</code>
                </pre>
              ),
            },
            {
              id: 'angular',
              label: 'Angular',
              content: (
                <pre>
                  <code>{`npm install @shimmer-from-structure/angular
# or
yarn add @shimmer-from-structure/angular
# or
pnpm add @shimmer-from-structure/angular`}</code>
                </pre>
              ),
            },
          ]}
        />

        <h2>Quick Example</h2>

        <p>Here's a simple example with each framework:</p>

        <CodeTabs
          tabs={[
            {
              id: 'react',
              label: 'React',
              content: (
                <pre>
                  <code>{`import { Shimmer } from '@shimmer-from-structure/react';

function UserCard() {
  const [loading, setLoading] = useState(true);

  return (
    <Shimmer loading={loading}>
      <div className="card">
        <img src="avatar.jpg" className="avatar" />
        <h2>John Doe</h2>
        <p>Software Engineer</p>
      </div>
    </Shimmer>
  );
}`}</code>
                </pre>
              ),
            },
            {
              id: 'vue',
              label: 'Vue',
              content: (
                <pre>
                  <code>{`<script setup>
import { Shimmer } from '@shimmer-from-structure/vue';
const loading = ref(true);
</script>

<template>
  <Shimmer :loading="loading">
    <div class="card">
      <img src="avatar.jpg" class="avatar" />
      <h2>John Doe</h2>
      <p>Software Engineer</p>
    </div>
  </Shimmer>
</template>`}</code>
                </pre>
              ),
            },
            {
              id: 'svelte',
              label: 'Svelte',
              content: (
                <pre>
                  <code>{`<script>
  import { Shimmer } from '@shimmer-from-structure/svelte';
  let loading = true;
</script>

<Shimmer {loading}>
  <div class="card">
    <img src="avatar.jpg" class="avatar" />
    <h2>John Doe</h2>
    <p>Software Engineer</p>
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'solid',
              label: 'Solid',
              content: (
                <pre>
                  <code>{`import { Shimmer } from '@shimmer-from-structure/solid';

function UserCard() {
  const [loading, setLoading] = createSignal(true);

  return (
    <Shimmer loading={loading()}>
      <div class="card">
        <img src="avatar.jpg" class="avatar" />
        <h2>John Doe</h2>
        <p>Software Engineer</p>
      </div>
    </Shimmer>
  );
}`}</code>
                </pre>
              ),
            },
            {
              id: 'angular',
              label: 'Angular',
              content: (
                <pre>
                  <code>{`@Component({
  standalone: true,
  imports: [ShimmerComponent],
  template: \`
    <shimmer [loading]="loading()">
      <div class="card">
        <img src="avatar.jpg" class="avatar" />
        <h2>John Doe</h2>
        <p>Software Engineer</p>
      </div>
    </shimmer>
  \`
})
export class UserCard {
  loading = signal(true);
}`}</code>
                </pre>
              ),
            },
          ]}
        />

        <p>
          That's it! The shimmer effect will automatically match the structure and dimensions of
          your component.
        </p>

        <h2>Next Steps</h2>

        <ul>
          <li>
            <a href="/docs/react">React Guide</a> - Learn how to use with React
          </li>
          <li>
            <a href="/docs/vue">Vue Guide</a> - Learn how to use with Vue
          </li>
          <li>
            <a href="/docs/svelte">Svelte Guide</a> - Learn how to use with Svelte
          </li>
          <li>
            <a href="/docs/angular">Angular Guide</a> - Learn how to use with Angular
          </li>
          <li>
            <a href="/docs/solid">SolidJS Guide</a> - Learn how to use with SolidJS
          </li>
          <li>
            <a href="/docs/api">API Reference</a> - Explore all available props and options
          </li>
        </ul>
      </article>
    </DocsLayout>
  );
}
