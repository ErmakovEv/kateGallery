import { Inter, Kablammo, Balsamiq_Sans } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});
export const kablammo = Kablammo({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-kablammo',
});
export const balsamiqSans = Balsamiq_Sans({
  subsets: ['cyrillic'],
  weight: ['400', '700'],
  variable: '--font-balsamiq-sans',
});
