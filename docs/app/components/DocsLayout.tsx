'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/getting-started' },
      { title: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    title: 'Frameworks',
    items: [
      { title: 'React', href: '/docs/react' },
      { title: 'Vue', href: '/docs/vue' },
      { title: 'Svelte', href: '/docs/svelte' },
      { title: 'Angular', href: '/docs/angular' },
      { title: 'SolidJS', href: '/docs/solid' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'API Reference', href: '/docs/api' },
      { title: 'Examples', href: '/docs/examples' },
      { title: 'Best Practices', href: '/docs/best-practices' },
    ],
  },
];

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
          <nav className="p-6 space-y-8">
            {navigation.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block text-sm py-1 px-3 rounded transition-colors ${
                          pathname === item.href
                            ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-12">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
