import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'GramSaarthi - Government Scheme Eligibility Assistant',
  description: 'AI-powered civic assistant helping rural citizens discover government schemes they are eligible for',
  keywords: ['government schemes', 'eligibility', 'rural', 'India', 'benefits'],
  authors: [{ name: 'GramSaarthi' }],
  creator: 'GramSaarthi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gramsaarthi.in',
    title: 'GramSaarthi - Government Scheme Eligibility Assistant',
    description: 'Discover government schemes you qualify for',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
