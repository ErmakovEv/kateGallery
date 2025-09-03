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
        <div className="relative">
          <div className="absolute inset-0 bg-[url('/bg3.jpg')] bg-repeat bg-[length:50%] bg-top opacity-80"></div>
          <div className="relative z-10">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
