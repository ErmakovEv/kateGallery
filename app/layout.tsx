import type { Metadata } from 'next';

import './globals.css';
import { kablammo, inter, balsamiqSans } from './fonts';
import { Navbar } from './shared/ui/navbar';

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
        <div className="bg-cotton-200">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
