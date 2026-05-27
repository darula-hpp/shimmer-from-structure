import type { Metadata } from 'next';
import { ThemeProvider } from './components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://shimmer-from-structure-docs.vercel.app'),

  title: {
    default: 'Shimmer From Structure',
    template: '%s | Shimmer From Structure',
  },

  description:
    'A structure-aware skeleton loader that mirrors your rendered UI at runtime. Zero layout duplication for React, Vue, Svelte, Angular & SolidJS.',

  keywords: [
    'skeleton loader',
    'react skeleton',
    'loading shimmer',
    'ui performance',
    'frontend performance',
    'react tools',
    'pixel perfect skeleton',
    'auto-skeleton-react',
    'auto-skeleton-vue',
    'auto-skeleton-svelte',
    'auto-skeleton-angular',
    'auto-skeleton-solidjs',
  ],

  authors: [{ name: 'Olebogeng Mbedzi' }, { name: 'Brandon Zylstra' }, { name: 'Manoj Kumar' }],
  creator: 'Olebogeng Mbedzi',

  openGraph: {
    title: 'Shimmer From Structure',
    description: 'Structure-aware skeleton loader that mirrors your UI at runtime.',
    url: 'https://shimmer-from-structure-docs.vercel.app',
    siteName: 'Shimmer From Structure',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shimmer From Structure Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Shimmer From Structure',
    description: 'Structure-aware skeleton loader that mirrors your UI at runtime.',
    images: ['/og-image.png'],
    creator: '@OlebogengMbedzi',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://shimmer-from-structure-docs.vercel.app',
  },

  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
