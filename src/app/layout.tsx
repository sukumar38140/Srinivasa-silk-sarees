import type { Metadata } from 'next';
import { Cormorant_Garamond, Poppins, Inter, Noto_Sans_Telugu } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/layout/whatsapp-button';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const telugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-telugu',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sri Srinivasa Silk Sarees | Pure Handloom Wedding Silk Sarees Madanapalle',
  description: 'World-class manufacturer and showroom of pure handloom silk sarees in Madanapalle, Andhra Pradesh. Discover our bridal collections, traditional Kanchipuram-inspired sarees, and wholesale availability.',
  keywords: [
    'Sri Srinivasa Silk Sarees',
    'Silk Sarees Madanapalle',
    'Handloom Sarees Madanapalle',
    'Wedding Sarees Madanapalle',
    'Bridal Silk Sarees Andhra Pradesh',
    'Pure Silk Sarees Madanapalle',
    'Saree Wholesalers Madanapalle',
  ],
  openGraph: {
    title: 'Sri Srinivasa Silk Sarees | Pure Handloom Elegance',
    description: 'Pure handloom silk sarees manufacturer & retail showroom in Madanapalle. Custom bridal collections and traditional South Indian wedding weaves.',
    url: 'https://srisrinivasasilksarees.com',
    siteName: 'Sri Srinivasa Silk Sarees',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Local SEO Schema Structured Data
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Sri Srinivasa Silk Sarees',
    'image': 'https://srisrinivasasilksarees.com/images/hero-banner.png',
    'telephone': '7997750760',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Chowdeswari 3rd Street, Kadiri Road',
      'addressLocality': 'Madanapalle',
      'addressRegion': 'Andhra Pradesh',
      'postalCode': '517325',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '13.5731094',
      'longitude': '78.5010884'
    },
    'url': 'https://srisrinivasasilksarees.com',
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '10:00',
      'closes': '20:00'
    }
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${poppins.variable} ${inter.variable} ${telugu.variable} h-full scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-darktext antialiased">
        <Header />
        <main className="flex-grow flex flex-col relative">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
