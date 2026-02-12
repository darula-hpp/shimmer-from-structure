import Link from 'next/link';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
          >
            Go Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
