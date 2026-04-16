'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Shimmer } from '@shimmer-from-structure/react';
import { Header } from './Header';
import { Footer } from './Footer';
import { NpmDownloadStats } from './NpmDownloadStats';
import { LatestRelease } from './LatestRelease';
import { ShimmerProvider } from '@shimmer-from-structure/react';
import type { Release } from '../../lib/changelog';

interface HomeContentProps {
  latestRelease: Release;
}

/** macOS-style terminal window for code example */
function QuickExampleTerminal() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-xl overflow-hidden text-left shadow-xl bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#2d2d2d]">
        {/* Traffic-light dots */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-200 dark:border-[#2d2d2d]">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" />
          <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Code example */}
        <pre
          className="m-0 p-6 text-sm overflow-x-auto text-gray-800 dark:text-gray-200"
          style={{
            fontFamily:
              "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
          }}
        >
          <code>
            <span data-shimmer-no-children>
              <span className="text-purple-600 dark:text-purple-400">import</span>{' '}
              <span className="text-gray-800 dark:text-gray-200">{'{ Shimmer }'}</span>{' '}
              <span className="text-purple-600 dark:text-purple-400">from</span>{' '}
              <span className="text-green-600 dark:text-green-400">'shimmer-from-structure'</span>
              <span className="text-gray-800 dark:text-gray-200">;</span>
            </span>
            {'\n\n'}
            <span data-shimmer-no-children>
              <span className="text-purple-600 dark:text-purple-400">function</span>{' '}
              <span className="text-blue-600 dark:text-blue-400">UserCard</span>
              <span className="text-gray-800 dark:text-gray-200">() {'{'}</span>
            </span>
            {'\n  '}
            <span data-shimmer-no-children>
              <span className="text-purple-600 dark:text-purple-400">return</span>{' '}
              <span className="text-gray-800 dark:text-gray-200">(</span>
            </span>
            {'\n    '}
            <span data-shimmer-no-children>
              <span className="text-red-600 dark:text-red-400">{'<Shimmer'}</span>{' '}
              <span className="text-orange-600 dark:text-orange-400">loading</span>
              <span className="text-gray-800 dark:text-gray-200">={'{'}</span>
              <span className="text-orange-600 dark:text-orange-400">isLoading</span>
              <span className="text-gray-800 dark:text-gray-200">{'}'}</span>
              <span className="text-red-600 dark:text-red-400">{'>'}</span>
            </span>
            {'\n      '}
            <span data-shimmer-no-children>
              <span className="text-red-600 dark:text-red-400">{'<div'}</span>{' '}
              <span className="text-orange-600 dark:text-orange-400">className</span>
              <span className="text-gray-800 dark:text-gray-200">=</span>
              <span className="text-green-600 dark:text-green-400">"card"</span>
              <span className="text-red-600 dark:text-red-400">{'>'}</span>
            </span>
            {'\n        '}
            <span data-shimmer-no-children>
              <span className="text-red-600 dark:text-red-400">{'<img'}</span>{' '}
              <span className="text-orange-600 dark:text-orange-400">src</span>
              <span className="text-gray-800 dark:text-gray-200">=</span>
              <span className="text-green-600 dark:text-green-400">"avatar.jpg"</span>{' '}
              <span className="text-orange-600 dark:text-orange-400">className</span>
              <span className="text-gray-800 dark:text-gray-200">=</span>
              <span className="text-green-600 dark:text-green-400">"avatar"</span>{' '}
              <span className="text-red-600 dark:text-red-400">{'/>'}</span>
            </span>
            {'\n        '}
            <span data-shimmer-no-children>
              <span className="text-red-600 dark:text-red-400">{'<h2>'}</span>
              <span className="text-gray-800 dark:text-gray-200">John Doe</span>
              <span className="text-red-600 dark:text-red-400">{'</h2>'}</span>
            </span>
            {'\n        '}
            <span data-shimmer-no-children>
              <span className="text-red-600 dark:text-red-400">{'<p>'}</span>
              <span className="text-gray-800 dark:text-gray-200">Software Engineer</span>
              <span className="text-red-600 dark:text-red-400">{'</p>'}</span>
            </span>
            {'\n      '}
            <span className="text-red-600 dark:text-red-400">{'</div>'}</span>
            {'\n    '}
            <span className="text-red-600 dark:text-red-400">{'</Shimmer>'}</span>
            {'\n  '}
            <span className="text-gray-800 dark:text-gray-200">);</span>
            {'\n'}
            <span className="text-gray-800 dark:text-gray-200">{'}'}</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

export function HomeContent({ latestRelease }: HomeContentProps) {
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleShowDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const isDark = resolvedTheme === 'dark';
  const shimmerColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  const backgroundColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

  return (
    <ShimmerProvider config={{ shimmerColor, backgroundColor }}>
      <div className="min-h-screen flex flex-col">
        <Shimmer loading={loading} shimmerColor={shimmerColor} backgroundColor={backgroundColor}>
          <Header />

          {/* Demo Button */}
          <div className="fixed top-24 right-6 z-50" data-shimmer-ignore="">
            <button
              data-shimmer-ignore=""
              onClick={handleShowDemo}
              style={{ cursor: 'pointer' }}
              className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg font-medium transition-colors shadow-lg"
            >
              Show Shimmer Demo
            </button>
          </div>

          {/* Hero Section */}
          <section className="flex-1 flex items-center justify-center px-6 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 w-fit mx-auto">
                Shimmer From Structure
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                <span className="block w-fit mx-auto">
                  A structure-aware skeleton loader that mirrors your rendered UI at runtime.
                </span>
                <span className="block w-fit mx-auto">
                  Zero layout duplication. Built for modern frameworks.
                </span>
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
                {['React', 'Vue', 'Svelte', 'Angular', 'SolidJS'].map((fw) => (
                  <span
                    key={fw}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                  >
                    {fw}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6 py-20 bg-gray-50 dark:bg-transparent">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white w-fit mx-auto">
                Why Shimmer From Structure?
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
                  <h3 className="text-xl font-semibold mb-3 w-fit">Zero Maintenance</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Automatically measures your component's structure at runtime. No need to
                    maintain separate skeleton components.
                  </p>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
                  <h3 className="text-xl font-semibold mb-3 w-fit">Auto Border-Radius</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Detects border-radius from your CSS automatically. Circular avatars get circular
                    shimmer blocks.
                  </p>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
                  <h3 className="text-xl font-semibold mb-3 w-fit">Framework Agnostic</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Dedicated adapters for React, Vue, Svelte, Angular, and SolidJS with
                    framework-specific APIs.
                  </p>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
                  <h3 className="text-xl font-semibold mb-3 w-fit">Tiny Bundle Size</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Core package is only 1.44 kB. Framework adapters range from 3.89 kB to 12.84 kB.
                  </p>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
                  <h3 className="text-xl font-semibold mb-3 w-fit">Dynamic Data Support</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Use templateProps to provide mock data for components that receive dynamic
                    props.
                  </p>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-transparent">
                  <h3 className="text-xl font-semibold mb-3 w-fit">Dark Mode Friendly</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Default colors use semi-transparent whites that work on any background.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Shimmer>

        {/* NPM Download Stats */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <NpmDownloadStats showShimmerDemo={loading} />
          </div>
        </section>

        {/* Latest Release */}
        <Shimmer loading={loading} shimmerColor={shimmerColor} backgroundColor={backgroundColor}>
          <LatestRelease
            version={latestRelease.version}
            date={latestRelease.date}
            highlights={latestRelease.highlights}
          />

          {/* Quick Example */}
          <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 w-fit mx-auto">Quick Example</h2>

              <QuickExampleTerminal />

              <p className="text-center mt-6 text-gray-600 dark:text-gray-400 w-fit mx-auto">
                That's it! No skeleton components to maintain.
              </p>
            </div>
          </section>

          <Footer />
        </Shimmer>
      </div>
    </ShimmerProvider>
  );
}
