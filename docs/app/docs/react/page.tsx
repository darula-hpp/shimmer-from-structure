import { DocsLayout } from '../../components/DocsLayout';

export default function ReactGuide() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>React Guide</h1>

        <p>
          Learn how to use Shimmer From Structure with React. The React adapter is built into the
          main package for backward compatibility.
        </p>

        <h2>Installation</h2>

        <pre>
          <code>npm install shimmer-from-structure</code>
        </pre>

        <p>Or use the dedicated React package:</p>

        <pre>
          <code>npm install @shimmer-from-structure/react</code>
        </pre>

        <h2>Basic Usage</h2>

        <h3>Static Content</h3>

        <p>For components with hardcoded/static content:</p>

        <pre>
          <code>{`import { Shimmer } from 'shimmer-from-structure';

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

        <h3>Dynamic Content with templateProps</h3>

        <p>For components that receive dynamic data via props, use templateProps:</p>

        <pre>
          <code>{`import { Shimmer } from 'shimmer-from-structure';

// Your component that accepts props
const UserCard = ({ user }) => (
  <div className="card">
    <img src={user.avatar} className="avatar" />
    <h2>{user.name}</h2>
    <p>{user.role}</p>
  </div>
);

// Template data for the skeleton
const userTemplate = {
  name: 'Loading...',
  role: 'Loading role...',
  avatar: 'placeholder.jpg',
};

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <Shimmer loading={loading} templateProps={{ user: userTemplate }}>
      <UserCard user={user || userTemplate} />
    </Shimmer>
  );
}`}</code>
        </pre>

        <h2>Using with React Suspense</h2>

        <p>
          Shimmer works seamlessly as a Suspense fallback. When used this way, loading is always
          true because React automatically unmounts the fallback and replaces it with the resolved
          component.
        </p>

        <pre>
          <code>{`import { Suspense, lazy } from 'react';
import { Shimmer } from 'shimmer-from-structure';

const UserProfile = lazy(() => import('./UserProfile'));

function App() {
  return (
    <Suspense
      fallback={
        <Shimmer loading={true} templateProps={{ user: userTemplate }}>
          <UserProfile />
        </Shimmer>
      }
    >
      <UserProfile userId="123" />
    </Suspense>
  );
}`}</code>
        </pre>

        <h3>Performance Tips for Suspense</h3>

        <p>Memoize the fallback to prevent re-renders:</p>

        <pre>
          <code>{`const ShimmerFallback = React.memo(() => (
  <Shimmer loading={true} templateProps={{ user: userTemplate }}>
    <UserProfile />
  </Shimmer>
));

// Usage
<Suspense fallback={<ShimmerFallback />}>
  <UserProfile userId="123" />
</Suspense>`}</code>
        </pre>

        <h2>Global Configuration</h2>

        <p>Set default configuration for your entire app using the Context API:</p>

        <pre>
          <code>{`import { Shimmer, ShimmerProvider } from '@shimmer-from-structure/react';

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

        <p>Components inside the provider automatically inherit these values:</p>

        <pre>
          <code>{`// Inherits blue theme from provider
<Shimmer loading={true}><UserCard /></Shimmer>

// Overrides provider settings
<Shimmer loading={true} duration={0.5}><FastCard /></Shimmer>`}</code>
        </pre>

        <h3>Accessing Config in Hooks</h3>

        <pre>
          <code>{`import { useShimmerConfig } from 'shimmer-from-structure';

function MyComponent() {
  const config = useShimmerConfig();
  return <div style={{ background: config.backgroundColor }}>...</div>;
}`}</code>
        </pre>

        <h2>Examples</h2>

        <h3>Dashboard with Multiple Sections</h3>

        <pre>
          <code>{`import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Shimmer, ShimmerProvider } from '@shimmer-from-structure/react';

// lazy-load components to demonstrate Suspense integration
const LazyNotifications = lazy(() => import('./Notifications'));

function Dashboard() {
  // Independent loading states for each section
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  
  // Data states
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    // Simulate independent API calls
    setTimeout(() => { setUser(realUser); setLoadingUser(false); }, 800);
    setTimeout(() => { setStats(realStats); setLoadingStats(false); }, 1200);
    setTimeout(() => { setTransactions(realTransactions); setLoadingTransactions(false); }, 2000);
  }, []);

  return (
    <div className="dashboard">
      {/* User Profile Section */}
      <section className="dashboard-section">
        <Shimmer loading={loadingUser} templateProps={{ user: userTemplate }}>
          <UserProfile user={user || userTemplate} />
        </Shimmer>
      </section>

      {/* Stats Section with Custom Color */}
      <section className="dashboard-section">
        <Shimmer 
          loading={loadingStats} 
          templateProps={{ stats: statsTemplate }}
          shimmerColor="rgba(20, 184, 166, 0.2)"
        >
          <StatsGrid stats={stats || statsTemplate} />
        </Shimmer>
      </section>

      {/* Suspense Integration */}
      <section className="dashboard-section">
        <Suspense fallback={
          <Shimmer loading={true} templateProps={{ notifications: notificationsTemplate }}>
            <NotificationsList notifications={notificationsTemplate} />
          </Shimmer>
        }>
          <LazyNotifications />
        </Suspense>
      </section>

      {/* Transactions List */}
      <section className="dashboard-section">
        <Shimmer loading={loadingTransactions}>
          <TransactionsList transactions={transactions || transactionsTemplate} />
        </Shimmer>
      </section>
    </div>
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
