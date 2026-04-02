'use client';

import Link from 'next/link';

interface LatestReleaseProps {
  version: string;
  date: string;
  highlights: string[];
}

export function LatestRelease({ version, date, highlights }: LatestReleaseProps) {
  return (
    <section className="px-6 py-20 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What's New</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Latest release: <span className="font-semibold">v{version}</span> • {date}
            </p>
          </div>
          <Link
            href="/docs/changelog"
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900 rounded-lg font-medium transition-colors"
          >
            View Full Changelog
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <ul className="space-y-3">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
