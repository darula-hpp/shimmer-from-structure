export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Documentation</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="/docs/getting-started" className="hover:text-teal-600">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="/docs/api" className="hover:text-teal-600">
                  API Reference
                </a>
              </li>
              <li>
                <a href="/docs/examples" className="hover:text-teal-600">
                  Examples
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Frameworks</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="/docs/react" className="hover:text-teal-600">
                  React
                </a>
              </li>
              <li>
                <a href="/docs/vue" className="hover:text-teal-600">
                  Vue
                </a>
              </li>
              <li>
                <a href="/docs/svelte" className="hover:text-teal-600">
                  Svelte
                </a>
              </li>
              <li>
                <a href="/docs/angular" className="hover:text-teal-600">
                  Angular
                </a>
              </li>
              <li>
                <a href="/docs/solid" className="hover:text-teal-600">
                  SolidJS
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="https://github.com/darula-hpp/shimmer-from-structure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-600"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/darula-hpp/shimmer-from-structure/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-600"
                >
                  Issues
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Made with ❤️ for developers tired of maintaining skeleton screens.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">MIT License</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <span className="w-fit">
            © {new Date().getFullYear()} Shimmer From Structure. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
