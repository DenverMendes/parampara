import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import './product.css';
import './flows.css';

const display = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const sans = Manrope({
  variable: '--font-sans-custom',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://parampara-living-culture.prayan-mendes.chatgpt.site'),
  title: {
    default: 'Parampara — Culture, in its own voice',
    template: '%s | Parampara',
  },
  description:
    'Discover living traditions through the people who protect, practice, and pass them on.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: 'Parampara',
    title: 'Parampara — Culture, in its own voice',
    description: 'A living culture network where custodians tell, approve, and control their own stories.',
    images: [{ url: '/og.png', width: 1664, height: 936, alt: 'Parampara — Culture lives in their voice' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parampara — Culture, in its own voice',
    description: 'A living culture network where custodians tell, approve, and control their own stories.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
