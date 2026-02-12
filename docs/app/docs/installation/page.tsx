import { DocsLayout } from '../../components/DocsLayout';
import { CodeTabs } from '../../components/CodeTabs';

export default function Installation() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>Installation</h1>

        <p>Install Shimmer From Structure using your preferred package manager.</p>

        <CodeTabs
          tabs={[
            {
              id: 'react',
              label: 'React',
              content: (
                <>
                  <h3>Installation</h3>
                  <pre>
                    <code>{`npm install @shimmer-from-structure/react
# or
yarn add @shimmer-from-structure/react
# or
pnpm add @shimmer-from-structure/react`}</code>
                  </pre>
                  <h3>Usage</h3>
                  <pre>
                    <code>{`import { Shimmer } from '@shimmer-from-structure/react';`}</code>
                  </pre>
                </>
              ),
            },
            {
              id: 'vue',
              label: 'Vue',
              content: (
                <>
                  <h3>Installation</h3>
                  <pre>
                    <code>{`npm install @shimmer-from-structure/vue
# or
yarn add @shimmer-from-structure/vue
# or
pnpm add @shimmer-from-structure/vue`}</code>
                  </pre>
                  <h3>Usage</h3>
                  <pre>
                    <code>{`import { Shimmer } from '@shimmer-from-structure/vue';`}</code>
                  </pre>
                </>
              ),
            },
            {
              id: 'svelte',
              label: 'Svelte',
              content: (
                <>
                  <h3>Installation</h3>
                  <pre>
                    <code>{`npm install @shimmer-from-structure/svelte
# or
yarn add @shimmer-from-structure/svelte
# or
pnpm add @shimmer-from-structure/svelte`}</code>
                  </pre>
                  <h3>Usage</h3>
                  <pre>
                    <code>{`import { Shimmer } from '@shimmer-from-structure/svelte';`}</code>
                  </pre>
                </>
              ),
            },
            {
              id: 'angular',
              label: 'Angular',
              content: (
                <>
                  <h3>Installation</h3>
                  <pre>
                    <code>{`npm install @shimmer-from-structure/angular
# or
yarn add @shimmer-from-structure/angular
# or
pnpm add @shimmer-from-structure/angular`}</code>
                  </pre>
                  <h3>Usage</h3>
                  <pre>
                    <code>{`import { ShimmerComponent } from '@shimmer-from-structure/angular';

@Component({
  standalone: true,
  imports: [ShimmerComponent],
  // ...
})`}</code>
                  </pre>
                </>
              ),
            },
            {
              id: 'solid',
              label: 'Solid',
              content: (
                <>
                  <h3>Installation</h3>
                  <pre>
                    <code>{`npm install @shimmer-from-structure/solid
# or
yarn add @shimmer-from-structure/solid
# or
pnpm add @shimmer-from-structure/solid`}</code>
                  </pre>
                  <h3>Usage</h3>
                  <pre>
                    <code>{`import { Shimmer } from '@shimmer-from-structure/solid';`}</code>
                  </pre>
                </>
              ),
            },
          ]}
        />

        <h2>Package Managers</h2>

        <p>You can use any of these package managers:</p>

        <h3>npm</h3>

        <pre>
          <code>npm install shimmer-from-structure</code>
        </pre>

        <h3>yarn</h3>

        <pre>
          <code>yarn add shimmer-from-structure</code>
        </pre>

        <h3>pnpm</h3>

        <pre>
          <code>pnpm add shimmer-from-structure</code>
        </pre>

        <h3>bun</h3>

        <pre>
          <code>bun add shimmer-from-structure</code>
        </pre>

        <h2>Package Sizes</h2>

        <table>
          <thead>
            <tr>
              <th>Package</th>
              <th>Size</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>@shimmer-from-structure/core</code>
              </td>
              <td>1.44 kB</td>
              <td>Framework-agnostic DOM utilities</td>
            </tr>
            <tr>
              <td>
                <code>@shimmer-from-structure/react</code>
              </td>
              <td>12.84 kB</td>
              <td>React adapter</td>
            </tr>
            <tr>
              <td>
                <code>@shimmer-from-structure/vue</code>
              </td>
              <td>3.89 kB</td>
              <td>Vue 3 adapter</td>
            </tr>
            <tr>
              <td>
                <code>@shimmer-from-structure/svelte</code>
              </td>
              <td>4.60 kB</td>
              <td>Svelte adapter</td>
            </tr>
            <tr>
              <td>
                <code>@shimmer-from-structure/angular</code>
              </td>
              <td>6.83 kB</td>
              <td>Angular adapter</td>
            </tr>
            <tr>
              <td>
                <code>@shimmer-from-structure/solid</code>
              </td>
              <td>4.01 kB</td>
              <td>SolidJS adapter</td>
            </tr>
            <tr>
              <td>
                <code>shimmer-from-structure</code>
              </td>
              <td>0.93 kB</td>
              <td>Main package (React backward compatibility)</td>
            </tr>
          </tbody>
        </table>

        <h2>Requirements</h2>

        <ul>
          <li>
            <strong>React:</strong> React 18.0.0 or higher
          </li>
          <li>
            <strong>Vue:</strong> Vue 3.3.0 or higher
          </li>
          <li>
            <strong>Svelte:</strong> Svelte 5.0.0 or higher
          </li>
          <li>
            <strong>Angular:</strong> Angular 19.0.0 or higher
          </li>
          <li>
            <strong>SolidJS:</strong> SolidJS 1.9.0 or higher
          </li>
        </ul>

        <h2>Next Steps</h2>

        <ul>
          <li>
            <a href="/docs/getting-started">Getting Started</a> - Learn the basics
          </li>
          <li>
            <a href="/docs/react">React Guide</a> - React-specific documentation
          </li>
          <li>
            <a href="/docs/vue">Vue Guide</a> - Vue-specific documentation
          </li>
          <li>
            <a href="/docs/svelte">Svelte Guide</a> - Svelte-specific documentation
          </li>
          <li>
            <a href="/docs/angular">Angular Guide</a> - Angular-specific documentation
          </li>
          <li>
            <a href="/docs/solid">SolidJS Guide</a> - SolidJS-specific documentation
          </li>
        </ul>
      </article>
    </DocsLayout>
  );
}
