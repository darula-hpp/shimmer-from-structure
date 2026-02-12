import { DocsLayout } from '../../components/DocsLayout';

export default function BestPractices() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>Best Practices</h1>

        <p>
          Learn how to get the most out of Shimmer From Structure with these optimization techniques
          and best practices.
        </p>

        <h2>1. Use templateProps for Dynamic Data</h2>

        <p>
          When your component receives data via props, always provide <code>templateProps</code>{' '}
          with mock data that matches the expected structure.
        </p>

        <pre>
          <code>{`// ✅ Good - provides template data
<Shimmer loading={loading} templateProps={{ user: userTemplate }}>
  <UserCard user={user || userTemplate} />
</Shimmer>

// ❌ Avoid - no template data for dynamic component
<Shimmer loading={loading}>
  <UserCard user={user} />
</Shimmer>`}</code>
        </pre>

        <h2>2. Match Template Structure to Real Data</h2>

        <p>
          Ensure your template data has the same array length and property structure as real data
          for accurate shimmer layout.
        </p>

        <pre>
          <code>{`// ✅ Good - template matches real data structure
const transactionsTemplate = Array(5).fill({
  id: '1',
  description: 'Loading...',
  amount: '$0.00',
  date: 'Jan 00',
  status: 'pending',
});

// Real data will also have 5 items
const realTransactions = [/* 5 items */];`}</code>
        </pre>

        <h2>3. Use Individual Shimmer Components</h2>

        <p>Wrap each section in its own Shimmer for independent loading states:</p>

        <pre>
          <code>{`// ✅ Good - independent loading
<Shimmer loading={loadingUsers}><UserList /></Shimmer>
<Shimmer loading={loadingPosts}><PostList /></Shimmer>

// ❌ Avoid - all-or-nothing loading
<Shimmer loading={loadingUsers || loadingPosts}>
  <UserList />
  <PostList />
</Shimmer>`}</code>
        </pre>

        <h2>4. Consider Element Widths</h2>

        <p>
          Block elements like <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code> take full container
          width. If you want shimmer to match text width:
        </p>

        <pre>
          <code>{`.title {
  width: fit-content;
}`}</code>
        </pre>

        <h2>5. Provide Container Dimensions</h2>

        <p>
          For async components (like charts), ensure containers have explicit dimensions so shimmer
          has something to measure.
        </p>

        <pre>
          <code>{`// ✅ Good - explicit dimensions
<div style={{ height: '300px', width: '100%' }}>
  <Shimmer loading={loading}>
    <Chart data={data} />
  </Shimmer>
</div>

// ❌ Avoid - no dimensions
<Shimmer loading={loading}>
  <Chart data={data} />
</Shimmer>`}</code>
        </pre>

        <h2>6. Optimize with Global Configuration</h2>

        <p>
          Use global configuration to avoid repeating props and maintain consistent themes across
          your app:
        </p>

        <pre>
          <code>{`// Set once at app root
<ShimmerProvider
  config={{
    shimmerColor: 'rgba(56, 189, 248, 0.4)',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    duration: 2,
  }}
>
  <App />
</ShimmerProvider>

// Use anywhere without repeating props
<Shimmer loading={loading}>
  <Component />
</Shimmer>`}</code>
        </pre>

        <h2>7. Memoize Suspense Fallbacks</h2>

        <p>
          When using with React Suspense, memoize the fallback to prevent unnecessary re-renders:
        </p>

        <pre>
          <code>{`const ShimmerFallback = React.memo(() => (
  <Shimmer loading={true} templateProps={{ user: userTemplate }}>
    <UserProfile />
  </Shimmer>
));

<Suspense fallback={<ShimmerFallback />}>
  <UserProfile userId="123" />
</Suspense>`}</code>
        </pre>

        <h2>8. Keep Templates Lightweight</h2>

        <p>
          The DOM is measured synchronously, so avoid complex logic in your template components:
        </p>

        <pre>
          <code>{`// ✅ Good - simple template
const userTemplate = {
  name: 'Loading...',
  role: 'Loading role...',
  avatar: 'placeholder.jpg',
};

// ❌ Avoid - complex computations in template
const userTemplate = {
  name: generateRandomName(),
  role: fetchRoleFromAPI(),
  avatar: processImage(),
};`}</code>
        </pre>

        <h2>9. Use Appropriate Border Radius</h2>

        <p>
          The library auto-detects border-radius from CSS. For elements without border-radius, use{' '}
          <code>fallbackBorderRadius</code>:
        </p>

        <pre>
          <code>{`// For rounded UI
<Shimmer loading={loading} fallbackBorderRadius={8}>
  <Component />
</Shimmer>

// For sharp UI
<Shimmer loading={loading} fallbackBorderRadius={0}>
  <Component />
</Shimmer>`}</code>
        </pre>

        <h2>10. Test with Different Data Sizes</h2>

        <p>Test your shimmer with different data sizes to ensure it looks good in all scenarios:</p>

        <pre>
          <code>{`// Test with minimum data
const minTemplate = Array(1).fill({ /* ... */ });

// Test with typical data
const typicalTemplate = Array(5).fill({ /* ... */ });

// Test with maximum data
const maxTemplate = Array(20).fill({ /* ... */ });`}</code>
        </pre>

        <h2>Performance Considerations</h2>

        <ul>
          <li>Measurement happens only when loading changes to true</li>
          <li>Uses useLayoutEffect for synchronous measurement (no flicker)</li>
          <li>Minimal re-renders - only updates when loading state or children change</li>
          <li>Lightweight DOM measurements using native browser APIs</li>
        </ul>

        <h2>Known Limitations</h2>

        <ul>
          <li>
            <strong>Async components:</strong> Components that render asynchronously may need
            explicit container dimensions
          </li>
          <li>
            <strong>Zero-dimension elements:</strong> Elements with display: none or zero dimensions
            won't be captured
          </li>
          <li>
            <strong>SVG internals:</strong> Only the outer SVG element is captured, not internal
            paths/shapes
          </li>
        </ul>
      </article>
    </DocsLayout>
  );
}
