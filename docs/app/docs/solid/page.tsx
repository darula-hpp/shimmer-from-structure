import { DocsLayout } from '../../components/DocsLayout';

export default function SolidGuide() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>SolidJS Guide</h1>

        <p>Learn how to use Shimmer From Structure with SolidJS.</p>

        <h2>Installation</h2>

        <pre>
          <code>npm install @shimmer-from-structure/solid</code>
        </pre>

        <h2>Basic Usage</h2>

        <h3>Static Content</h3>

        <pre>
          <code>{`import { createSignal } from 'solid-js';
import { Shimmer } from '@shimmer-from-structure/solid';

function UserCard() {
  const [isLoading, setIsLoading] = createSignal(true);

  return (
    <Shimmer loading={isLoading()}>
      <div class="card">
        <img src="avatar.jpg" class="avatar" />
        <h2>John Doe</h2>
        <p>Software Engineer</p>
      </div>
    </Shimmer>
  );
}`}</code>
        </pre>

        <h3>Dynamic Content with templateProps</h3>

        <pre>
          <code>{`import { createSignal } from 'solid-js';
import { Shimmer } from '@shimmer-from-structure/solid';
import { UserCard } from './UserCard';

function App() {
  const [loading, setLoading] = createSignal(true);
  const [user, setUser] = createSignal(null);

  const userTemplate = {
    name: 'Loading...',
    role: 'Loading role...',
    avatar: 'placeholder.jpg',
  };

  return (
    <Shimmer loading={loading()} templateProps={{ user: userTemplate }}>
      <UserCard user={user() || userTemplate} />
    </Shimmer>
  );
}`}</code>
        </pre>

        <h2>Global Configuration</h2>

        <p>Use ShimmerProvider to set global defaults:</p>

        <pre>
          <code>{`import { Shimmer, ShimmerProvider } from '@shimmer-from-structure/solid';

function App() {
  return (
    <ShimmerProvider
      config={{
        shimmerColor: 'rgba(56, 189, 248, 0.4)',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        duration: 2.5,
        fallbackBorderRadius: 8,
      }}
    >
      <Dashboard />
    </ShimmerProvider>
  );
}`}</code>
        </pre>

        <h3>Accessing Config</h3>

        <pre>
          <code>{`import { useShimmerConfig } from '@shimmer-from-structure/solid';

function MyComponent() {
  const config = useShimmerConfig();
  return <div style={{ background: config.backgroundColor }}>...</div>;
}`}</code>
        </pre>

        <h2>Examples</h2>

        <h3>Dashboard with Multiple Sections</h3>

        <pre>
          <code>{`function Dashboard() {
  const [loadingUser, setLoadingUser] = createSignal(true);
  const [loadingStats, setLoadingStats] = createSignal(true);

  return (
    <>
      <Shimmer loading={loadingUser()} templateProps={{ user: userTemplate }}>
        <UserProfile user={user()} />
      </Shimmer>

      <Shimmer
        loading={loadingStats()}
        templateProps={{ stats: statsTemplate }}
        shimmerColor="rgba(20, 184, 166, 0.2)"
      >
        <StatsGrid stats={stats()} />
      </Shimmer>
    </>
  );
}`}</code>
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
