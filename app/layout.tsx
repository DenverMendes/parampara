import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Parampara · Culture with consent',
  description: 'A custodian-first platform for respectful cultural experiences, transparent consent, and direct community income.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
