import type { Metadata } from 'next';
import { ThemeProvider } from './components/ThemeProvider';
import './globals.css';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Shimmer From Structure - Structure-Aware Skeleton Loader',
  description:
    'A structure-aware skeleton loader that mirrors your rendered UI at runtime. Zero layout duplication for React, Vue, Svelte, Angular & SolidJS.',
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
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
