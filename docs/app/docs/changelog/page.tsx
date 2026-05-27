import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DocsLayout } from '../../components/DocsLayout';

export const metadata = {
  title: 'Changelog - Shimmer From Structure',
  description: 'Release history and changelog for Shimmer From Structure',
};

// Revalidate every hour to get fresh changelog data
export const revalidate = 3600;

async function getChangelog() {
  try {
    // Fetch from GitHub raw content URL
    const response = await fetch(
      'https://raw.githubusercontent.com/darula-hpp/shimmer-from-structure/main/CHANGELOG.md',
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch changelog: ${response.status}`);
    }

    const content = await response.text();
    return content;
  } catch (error) {
    console.error('Error fetching changelog:', error);
    // Fallback content if fetch fails
    return '# Changelog\n\nUnable to load changelog. Please visit [GitHub](https://github.com/darula-hpp/shimmer-from-structure/blob/main/CHANGELOG.md) to view the latest changes.';
  }
}

export default async function ChangelogPage() {
  const changelog = await getChangelog();

  return (
    <DocsLayout>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">{children}</h1>
            ),
            h2: ({ children }) => {
              const text = String(children);
              // Extract version and date from format like "[2.4.2] - 2026-03-21"
              const match = text.match(/\[([^\]]+)\]\s*-\s*(.+)/);
              if (match) {
                const [, version, date] = match;
                return (
                  <div className="flex items-baseline gap-3 mt-12 mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-0">
                      v{version}
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
                  </div>
                );
              }
              return (
                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
                  {children}
                </h2>
              );
            },
            h3: ({ children }) => {
              // Style section headers like "Added", "Fixed", "Changed"
              const text = String(children);
              const colors: Record<string, string> = {
                Added: 'text-green-600 dark:text-green-400',
                Fixed: 'text-blue-600 dark:text-blue-400',
                Changed: 'text-yellow-600 dark:text-yellow-400',
                Security: 'text-red-600 dark:text-red-400',
                Improved: 'text-purple-600 dark:text-purple-400',
                'Breaking Changes': 'text-red-600 dark:text-red-400',
              };
              const colorClass = colors[text] || 'text-gray-900 dark:text-white';
              return (
                <h3 className={`text-xl font-semibold mt-8 mb-4 ${colorClass}`}>{children}</h3>
              );
            },
            ul: ({ children }) => (
              <ul className="my-4 list-disc list-outside space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed text-gray-700 dark:text-gray-300 [&>p]:!my-0">
                {children}
              </li>
            ),
            p: ({ children }) => (
              <p className="my-4 leading-relaxed text-gray-700 dark:text-gray-300 last:mb-0">
                {children}
              </p>
            ),
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-gray-900 dark:text-gray-100">
                    {children}
                  </code>
                );
              }
              return (
                <code className="block p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm font-mono overflow-x-auto">
                  {children}
                </code>
              );
            },
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 dark:text-teal-400 hover:underline"
              >
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
            ),
          }}
        >
          {changelog}
        </ReactMarkdown>
      </div>
    </DocsLayout>
  );
}
