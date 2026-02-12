import Link from 'next/link';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Shimmer From Structure</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            A structure-aware skeleton loader that mirrors your rendered UI at runtime.
            <br />
            Zero layout duplication. Built for modern frameworks.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              href="/docs/getting-started"
              className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/docs/examples"
              className="px-8 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg font-medium transition-colors"
            >
              View Examples
            </Link>
            <a
              href="https://github.com/darula-hpp/shimmer-from-structure"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg font-medium transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Framework Badges */}
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
              React
            </span>
            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
              Vue
            </span>
            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
              Svelte
            </span>
            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
              Angular
            </span>
            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
              SolidJS
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Shimmer From Structure?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Zero Maintenance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Automatically measures your component's structure at runtime. No need to maintain
                separate skeleton components.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Auto Border-Radius</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Detects border-radius from your CSS automatically. Circular avatars get circular
                shimmer blocks.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Framework Agnostic</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Dedicated adapters for React, Vue, Svelte, Angular, and SolidJS with
                framework-specific APIs.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Tiny Bundle Size</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Core package is only 1.44 kB. Framework adapters range from 3.89 kB to 12.84 kB.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Dynamic Data Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use templateProps to provide mock data for components that receive dynamic props.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Dark Mode Friendly</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Default colors use semi-transparent whites that work on any background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Example */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Example</h2>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`import { Shimmer } from 'shimmer-from-structure';

function UserCard() {
  return (
    <Shimmer loading={isLoading}>
      <div className="card">
        <img src="avatar.jpg" className="avatar" />
        <h2>John Doe</h2>
        <p>Software Engineer</p>
      </div>
    </Shimmer>
  );
}`}</code>
            </pre>
          </div>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            That's it! No skeleton components to maintain.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
