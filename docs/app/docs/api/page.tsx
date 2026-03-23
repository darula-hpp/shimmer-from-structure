import { DocsLayout } from '../../components/DocsLayout';
import { CodeTabs } from '../../components/CodeTabs';

export default function APIReference() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>API Reference</h1>

        <p>Complete reference for all Shimmer component props and configuration options.</p>

        <h2>Shimmer Component Props</h2>

        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>loading</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>Whether to show shimmer effect or actual content</td>
            </tr>
            <tr>
              <td>
                <code>children</code>
              </td>
              <td>
                <code>Component Children</code>
              </td>
              <td>required</td>
              <td>The content to render/measure (Slot/Children)</td>
            </tr>
            <tr>
              <td>
                <code>shimmerColor</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>'rgba(255,255,255,0.15)'</code>
              </td>
              <td>Color of the shimmer wave</td>
            </tr>
            <tr>
              <td>
                <code>backgroundColor</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>'rgba(255,255,255,0.08)'</code>
              </td>
              <td>Background color of shimmer blocks</td>
            </tr>
            <tr>
              <td>
                <code>duration</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>1.5</code>
              </td>
              <td>Animation duration in seconds</td>
            </tr>
            <tr>
              <td>
                <code>fallbackBorderRadius</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>4</code>
              </td>
              <td>Border radius (px) for elements with no CSS border-radius</td>
            </tr>
            <tr>
              <td>
                <code>templateProps</code>
              </td>
              <td>
                <code>Record&lt;string, unknown&gt;</code>
              </td>
              <td>-</td>
              <td>Props to inject into first child for skeleton rendering</td>
            </tr>
          </tbody>
        </table>

        <h2>Example with All Props</h2>

        <CodeTabs
          tabs={[
            {
              id: 'react',
              label: 'React',
              content: (
                <pre>
                  <code>{`<Shimmer
  loading={isLoading}
  shimmerColor="rgba(255, 255, 255, 0.2)"
  backgroundColor="rgba(255, 255, 255, 0.1)"
  duration={2}
  fallbackBorderRadius={8}
  templateProps={{
    user: userTemplate,
    settings: settingsTemplate,
  }}
>
  <MyComponent user={user || userTemplate} settings={settings} />
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'vue',
              label: 'Vue',
              content: (
                <pre>
                  <code>{`<Shimmer
  :loading="isLoading"
  shimmerColor="rgba(255, 255, 255, 0.2)"
  backgroundColor="rgba(255, 255, 255, 0.1)"
  :duration="2"
  :fallbackBorderRadius="8"
  :templateProps="{
    user: userTemplate,
    settings: settingsTemplate,
  }"
>
  <MyComponent :user="user || userTemplate" :settings="settings" />
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'svelte',
              label: 'Svelte',
              content: (
                <pre>
                  <code>{`<Shimmer
  loading={isLoading}
  shimmerColor="rgba(255, 255, 255, 0.2)"
  backgroundColor="rgba(255, 255, 255, 0.1)"
  duration={2}
  fallbackBorderRadius={8}
  templateProps={{
    user: userTemplate,
    settings: settingsTemplate,
  }}
>
  <MyComponent user={user || userTemplate} {settings} />
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'solid',
              label: 'Solid',
              content: (
                <pre>
                  <code>{`<Shimmer
  loading={isLoading()}
  shimmerColor="rgba(255, 255, 255, 0.2)"
  backgroundColor="rgba(255, 255, 255, 0.1)"
  duration={2}
  fallbackBorderRadius={8}
  templateProps={{
    user: userTemplate,
    settings: settingsTemplate,
  }}
>
  <MyComponent user={user() || userTemplate} settings={settings} />
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'angular',
              label: 'Angular',
              content: (
                <pre>
                  <code>{`<shimmer
  [loading]="isLoading()"
  shimmerColor="rgba(255, 255, 255, 0.2)"
  backgroundColor="rgba(255, 255, 255, 0.1)"
  [duration]="2"
  [fallbackBorderRadius]="8"
  [templateProps]="{
    user: userTemplate,
    settings: settingsTemplate,
  }"
>
  <app-my-component [user]="user() || userTemplate" [settings]="settings" />
</shimmer>`}</code>
                </pre>
              ),
            },
          ]}
        />

        <h2>Global Configuration</h2>

        <p>
          All frameworks support global configuration through their respective context/provider
          patterns.
        </p>

        <h3>React</h3>

        <pre>
          <code>{`import { ShimmerProvider } from '@shimmer-from-structure/react';

<ShimmerProvider config={{ shimmerColor: '...', ... }}>
  <App />
</ShimmerProvider>`}</code>
        </pre>

        <h3>Vue</h3>

        <pre>
          <code>{`import { provideShimmerConfig } from '@shimmer-from-structure/vue';

provideShimmerConfig({ shimmerColor: '...', ... });`}</code>
        </pre>

        <h3>Svelte</h3>

        <pre>
          <code>{`import { setShimmerConfig } from '@shimmer-from-structure/svelte';

setShimmerConfig({ shimmerColor: '...', ... });`}</code>
        </pre>

        <h3>Angular</h3>

        <pre>
          <code>{`import { provideShimmerConfig } from '@shimmer-from-structure/angular';

bootstrapApplication(AppComponent, {
  providers: [provideShimmerConfig({ shimmerColor: '...', ... })],
});`}</code>
        </pre>

        <h3>SolidJS</h3>

        <pre>
          <code>{`import { ShimmerProvider } from '@shimmer-from-structure/solid';

<ShimmerProvider config={{ shimmerColor: '...', ... }}>
  <App />
</ShimmerProvider>`}</code>
        </pre>

        <h2>Configuration Object</h2>

        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>shimmerColor</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>'rgba(255,255,255,0.15)'</code>
              </td>
              <td>Global shimmer wave color</td>
            </tr>
            <tr>
              <td>
                <code>backgroundColor</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>'rgba(255,255,255,0.08)'</code>
              </td>
              <td>Global background color for shimmer blocks</td>
            </tr>
            <tr>
              <td>
                <code>duration</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>1.5</code>
              </td>
              <td>Global animation duration in seconds</td>
            </tr>
            <tr>
              <td>
                <code>fallbackBorderRadius</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>4</code>
              </td>
              <td>Global fallback border radius in pixels</td>
            </tr>
          </tbody>
        </table>

        <h2>Accessing Configuration</h2>

        <p>Each framework provides a way to access the current configuration:</p>

        <ul>
          <li>
            React: <code>useShimmerConfig()</code>
          </li>
          <li>
            Vue: <code>useShimmerConfig()</code>
          </li>
          <li>
            Svelte: <code>getShimmerConfig()</code>
          </li>
          <li>
            Angular: <code>injectShimmerConfig()</code>
          </li>
          <li>
            SolidJS: <code>useShimmerConfig()</code>
          </li>
        </ul>

        <h2>HTML Attribute Controls</h2>

        <p>
          Control shimmer behavior at the element level using HTML data attributes. These attributes
          provide fine-grained control over which elements are measured and how they are rendered
          during the loading state.
        </p>

        <table>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Description</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>data-shimmer-ignore</code>
              </td>
              <td>
                Excludes the element and all its descendants from shimmer measurement and rendering.
                Elements with this attribute remain visible during loading (text and media are not
                hidden).
              </td>
              <td>
                Live indicators, badges, static labels, or any content that should remain visible
                during loading
              </td>
            </tr>
            <tr>
              <td>
                <code>data-shimmer-no-children</code>
              </td>
              <td>
                Treats the element as a single shimmer block. The library does not recurse into its
                children and uses the element's own bounding rect for the overlay.
              </td>
              <td>
                Complex nested structures where you want a single unified shimmer block instead of
                multiple child blocks
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Example Usage</h3>

        <CodeTabs
          tabs={[
            {
              id: 'react',
              label: 'React',
              content: (
                <pre>
                  <code>{`<Shimmer loading={loading}>
  <div className="card">
    {/* This badge stays visible during loading */}
    <span className="badge" data-shimmer-ignore>
      LIVE
    </span>
    
    <h2>Card Title</h2>
    <p>Card content that will be shimmered</p>
    
    {/* This entire row becomes one shimmer block */}
    <div className="metric-row" data-shimmer-no-children>
      <span>Views: 1,234</span>
      <span>Likes: 567</span>
      <span>Shares: 89</span>
    </div>
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'vue',
              label: 'Vue',
              content: (
                <pre>
                  <code>{`<Shimmer :loading="loading">
  <div class="card">
    <!-- This badge stays visible during loading -->
    <span class="badge" data-shimmer-ignore>
      LIVE
    </span>
    
    <h2>Card Title</h2>
    <p>Card content that will be shimmered</p>
    
    <!-- This entire row becomes one shimmer block -->
    <div class="metric-row" data-shimmer-no-children>
      <span>Views: {{ views }}</span>
      <span>Likes: {{ likes }}</span>
      <span>Shares: {{ shares }}</span>
    </div>
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'svelte',
              label: 'Svelte',
              content: (
                <pre>
                  <code>{`<Shimmer loading={loading}>
  <div class="card">
    <!-- This badge stays visible during loading -->
    <span class="badge" data-shimmer-ignore>
      LIVE
    </span>
    
    <h2>Card Title</h2>
    <p>Card content that will be shimmered</p>
    
    <!-- This entire row becomes one shimmer block -->
    <div class="metric-row" data-shimmer-no-children>
      <span>Views: {views}</span>
      <span>Likes: {likes}</span>
      <span>Shares: {shares}</span>
    </div>
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
                  <code>{`<Shimmer loading={loading()}>
  <div class="card">
    {/* This badge stays visible during loading */}
    <span class="badge" data-shimmer-ignore>
      LIVE
    </span>
    
    <h2>Card Title</h2>
    <p>Card content that will be shimmered</p>
    
    {/* This entire row becomes one shimmer block */}
    <div class="metric-row" data-shimmer-no-children>
      <span>Views: {views()}</span>
      <span>Likes: {likes()}</span>
      <span>Shares: {shares()}</span>
    </div>
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'angular',
              label: 'Angular',
              content: (
                <pre>
                  <code>{`<shimmer [loading]="loading()">
  <div class="card">
    <!-- This badge stays visible during loading -->
    <span class="badge" data-shimmer-ignore>
      LIVE
    </span>
    
    <h2>Card Title</h2>
    <p>Card content that will be shimmered</p>
    
    <!-- This entire row becomes one shimmer block -->
    <div class="metric-row" data-shimmer-no-children>
      <span>Views: {{ views() }}</span>
      <span>Likes: {{ likes() }}</span>
      <span>Shares: {{ shares() }}</span>
    </div>
  </div>
</shimmer>`}</code>
                </pre>
              ),
            },
          ]}
        />

        <h2>TypeScript Support</h2>

        <p>All packages include full TypeScript definitions. Import types as needed:</p>

        <pre>
          <code>{`import type { ShimmerProps, ShimmerConfig } from 'shimmer-from-structure';`}</code>
        </pre>
      </article>
    </DocsLayout>
  );
}
