import { Poppins } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { serverFetch } from '@/lib/serverApi';
import { defaultSettings } from '@/context/SettingsContext';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://alsadiqhealthcare.online'),
  title: {
    default: 'Al Sadiq Health Care Centre | ASHCC Lahore',
    template: '%s | Al Sadiq Health Care Centre',
  },
  description:
    'Al Sadiq Health Care Centre (ASHCC) - Lahore, Pakistan. Compassionate, trusted healthcare. Book appointments, meet our team, read our health blog.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    siteName: 'Al Sadiq Health Care Centre',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport = {
  themeColor: '#C8102E',
};

export default async function RootLayout({ children }) {
  const settings = await serverFetch('/settings');

  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <ClientProviders initialSettings={settings || defaultSettings}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ClientProviders>
      </body>
    </html>
  );
}
