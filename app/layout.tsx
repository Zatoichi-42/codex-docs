import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Codex Guidance',
  description: 'Native Codex translation of the Claude guidance site structure.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
