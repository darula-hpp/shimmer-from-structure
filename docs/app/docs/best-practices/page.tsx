import { DocsLayout } from '../../components/DocsLayout';

export default function BestPractices() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>Best Practices</h1>

        <p>
          Learn how to get the most out of Shimmer From Structure. These guidelines are divided into
          universal principles that apply to all frameworks and specific implementation details for
          each adapter.
        </p>

        <h2>Universal Guidelines</h2>
        <p>These practices apply regardless of which framework you are using.</p>

        <h3>1. Always Provide Template Props</h3>
        <p>
          When your component receives data via props, always provide <code>templateProps</code>{' '}
          with mock data that matches the expected structure. This allows the library to render your
          actual component with mock data to generate the skeleton.
        </p>

        <h3>2. Match Template Structure to Real Data</h3>
        <p>
          Ensure your template data has the same array length and property structure as real data.
          If your real data has 5 items, your template should also have 5 items to prevent layout
          shifts when data loads.
        </p>

        <h3>3. Use Independent Shimmer Components</h3>
        <p>
          Wrap separate logical sections (e.g., Sidebar, Feed, Header) in their own{' '}
          <code>Shimmer</code>
          components. This allows parts of your UI to load independently, improving the perceived
          performance.
        </p>

        <h3>4. Define Container Dimensions for Async Content</h3>
        <p>
          If a component loads content asynchronously (like a chart or lazy-loaded image) or has no
          initial dimensions, wrap it in a container with explicit <code>width</code> and{' '}
          <code>height</code>. This ensures the shimmer effect has a layout to measure immediately.
        </p>

        <h3>5. Use Global Configuration</h3>
        <p>
          Set a global theme (colors, duration, border radius) at the root of your application to
          maintain consistency and avoid repeating props.
        </p>

        <hr className="my-8" />

        <h2>Framework-Specific Details</h2>

        <h3>React</h3>
        <ul>
          <li>
            <strong>Suspense Integration:</strong> Shimmer works automatically as a Suspense
            fallback.
          </li>
          <li>
            <strong>Memoization:</strong> Wrap your fallback component in <code>React.memo</code> to
            prevent unnecessary re-renders during parent updates.
          </li>
          <li>
            <strong>Measurement:</strong> The library uses <code>useLayoutEffect</code> internally
            to measure the DOM synchronously before the browser paints, preventing flicker.
          </li>
        </ul>

        <h3>Vue</h3>
        <ul>
          <li>
            <strong>Composition API:</strong> Use <code>ref</code> for reactive loading states.
          </li>
          <li>
            <strong>Global Config:</strong> Use <code>provideShimmerConfig</code> at your app root
            (e.g., in <code>App.vue</code>) to set global defaults.
          </li>
        </ul>

        <h3>Svelte</h3>
        <ul>
          <li>
            <strong>Reactivity:</strong> Works with both Svelte 5 Runes (<code>$state</code>) and
            legacy stores/variables.
          </li>
          <li>
            <strong>Global Config:</strong> Use <code>setShimmerConfig</code> in your root
            component's initialization script.
          </li>
        </ul>

        <h3>SolidJS</h3>
        <ul>
          <li>
            <strong>Signals:</strong> Use <code>createSignal</code> for loading states.
          </li>
          <li>
            <strong>Suspense:</strong> Compatible with Solid's <code>Suspense</code> component for
            async resources.
          </li>
        </ul>

        <h3>Angular</h3>
        <ul>
          <li>
            <strong>Signals:</strong> The library is designed to work seamlessly with Angular
            Signals for loading states.
          </li>
          <li>
            <strong>Dependency Injection:</strong> Use <code>provideShimmerConfig</code> in your
            application config or root module to set global styles.
          </li>
        </ul>

        <hr className="my-8" />

        <h2>Performance Considerations</h2>
        <ul>
          <li>Measurement happens only once when loading is true.</li>
          <li>Zero-dimension elements (display: none) are skipped.</li>
          <li>The library uses native APIs (ResizeObserver, getComputedStyle) for efficiency.</li>
        </ul>
      </article>
    </DocsLayout>
  );
}
