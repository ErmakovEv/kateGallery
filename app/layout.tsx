import type { Metadata } from 'next';

import './globals.css';
import { kablammo, inter, balsamiqSans } from './fonts';

export const metadata: Metadata = {
  title: 'Kate-gallery',
  description: 'Kate-gallery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${balsamiqSans.variable} ${inter.variable} ${kablammo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
