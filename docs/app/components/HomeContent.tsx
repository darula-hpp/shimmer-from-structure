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
    <div className="w-full max-w-4xl mx-auto px-6">
      <div
        className="rounded-xl overflow-hidden text-left shadow-xl"
        style={{ backgroundColor: '#0d0d0d', border: '1px solid #2d2d2d' }}
      >
        {/* Traffic-light dots */}
        <div
          className="flex items-center gap-1.5 px-4 py-3"
          style={{ borderBottom: '1px solid #2d2d2d' }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#ff5f57',
            }}
          />
          <span
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#febc2e',
            }}
          />
          <span
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#28c840',
            }}
          />
        </div>

        {/* Code example */}
        <pre
          style={{
            margin: 0,
            padding: '1.5rem 1.25rem',
            fontSize: '0.875rem',
            color: '#e5e7eb',
            overflowX: 'auto',
            fontFamily:
              "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
          }}
        >
          <code>
            <span data-shimmer-no-children>
              <span style={{ color: '#c678dd' }}>import</span>{' '}
              <span style={{ color: '#e5e7eb' }}>{'{ Shimmer }'}</span>{' '}
              <span style={{ color: '#c678dd' }}>from</span>{' '}
              <span style={{ color: '#98c379' }}>'shimmer-from-structure'</span>
              <span style={{ color: '#e5e7eb' }}>;</span>
            </span>
            {'\n\n'}
            <span data-shimmer-no-children>
              <span style={{ color: '#c678dd' }}>function</span>{' '}
              <span style={{ color: '#61afef' }}>UserCard</span>
              <span style={{ color: '#e5e7eb' }}>() {'{'}</span>
            </span>
            {'\n  '}
            <span data-shimmer-no-children>
              <span style={{ color: '#c678dd' }}>return</span>{' '}
              <span style={{ color: '#e5e7eb' }}>(</span>
            </span>
            {'\n    '}
            <span data-shimmer-no-children>
              <span style={{ color: '#e06c75' }}>{'<Shimmer'}</span>{' '}
              <span style={{ color: '#d19a66' }}>loading</span>
              <span style={{ color: '#e5e7eb' }}>={'{'}</span>
              <span style={{ color: '#d19a66' }}>isLoading</span>
              <span style={{ color: '#e5e7eb' }}>{'}'}</span>
              <span style={{ color: '#e06c75' }}>{'>'}</span>
            </span>
            {'\n      '}
            <span data-shimmer-no-children>
              <span style={{ color: '#e06c75' }}>{'<div'}</span>{' '}
              <span style={{ color: '#d19a66' }}>className</span>
              <span style={{ color: '#e5e7eb' }}>=</span>
              <span style={{ color: '#98c379' }}>"card"</span>
              <span style={{ color: '#e06c75' }}>{'>'}</span>
            </span>
            {'\n        '}
            <span data-shimmer-no-children>
              <span style={{ color: '#e06c75' }}>{'<img'}</span>{' '}
              <span style={{ color: '#d19a66' }}>src</span>
              <span style={{ color: '#e5e7eb' }}>=</span>
              <span style={{ color: '#98c379' }}>"avatar.jpg"</span>{' '}
              <span style={{ color: '#d19a66' }}>className</span>
              <span style={{ color: '#e5e7eb' }}>=</span>
              <span style={{ color: '#98c379' }}>"avatar"</span>{' '}
              <span style={{ color: '#e06c75' }}>{'/>'}</span>
            </span>
            {'\n        '}
            <span data-shimmer-no-children>
              <span style={{ color: '#e06c75' }}>{'<h2>'}</span>
              <span style={{ color: '#e5e7eb' }}>John Doe</span>
              <span style={{ color: '#e06c75' }}>{'</h2>'}</span>
            </span>
            {'\n        '}
            <span data-shimmer-no-children>
              <span style={{ color: '#e06c75' }}>{'<p>'}</span>
              <span style={{ color: '#e5e7eb' }}>Software Engineer</span>
              <span style={{ color: '#e06c75' }}>{'</p>'}</span>
            </span>
            {'\n      '}
            <span data-shimmer-no-children>
              <span style={{ color: '#e06c75' }}>{'</div>'}</span>
            </span>
            {'\n    '}
            <span style={{ color: '#e06c75' }}>{'</Shimmer>'}</span>
            {'\n  '}
            <span style={{ color: '#e5e7eb' }}>);</span>
            {'\n'}
            <span style={{ color: '#e5e7eb' }}>{'}'}</span>
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
        {/* ── Block 1: header + hero title/description ── */}
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

          <section className="flex-1 flex items-center justify-center px-6 pt-20 pb-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 w-fit mx-auto">
                Shimmer From Structure
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                <span className="block w-fit mx-auto">
                  A structure-aware skeleton loader that mirrors your rendered UI at runtime.
                </span>
                <span className="block w-fit mx-auto">
                  Zero layout duplication. Built for modern frameworks.
                </span>
              </p>
            </div>
          </section>
        </Shimmer>

        {/* ── CLI snippet — never inside a Shimmer ── */}
        <CliSnippet />

        {/* ── Block 2: CTA buttons + badges + features ── */}
        <Shimmer loading={loading} shimmerColor={shimmerColor} backgroundColor={backgroundColor}>
          <section className="px-6 pb-20">
            <div className="max-w-4xl mx-auto text-center">
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
