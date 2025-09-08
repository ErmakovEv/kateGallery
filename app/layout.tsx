import type { Metadata } from 'next';

import './globals.css';
import { kablammo, inter, balsamiqSans } from './fonts';
import { Navbar } from './shared/ui/navbar';

export const metadata: Metadata = {
  title: 'Kate-gallery',
  description: 'Kate-gallery',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
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
