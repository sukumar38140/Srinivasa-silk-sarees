import React from 'react';
import { getCollections, getSarees } from '@/lib/db';
import CollectionsView from '@/components/collections/collections-view';

export const metadata = {
  title: 'Digital Saree Showroom | Sri Srinivasa Silk Sarees',
  description: 'Browse our luxurious pure handloom silk collections including Wedding, Bridal, Kanchipuram styles, Designer, and Traditional sarees. Directly enquire on WhatsApp or via our booking forms.',
};

export const revalidate = 0; // Fresh content every load

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CollectionsPage({ searchParams }: PageProps) {
  const collections = await getCollections();
  const sarees = await getSarees();

  // Resolve search parameters
  const resolvedParams = await searchParams;
  const categoryParam = typeof resolvedParams.category === 'string' ? resolvedParams.category : 'all';

  return (
    <div className="w-full space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-silk-maroon text-white py-16 text-center border-b border-gold-secondary/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#FAF5ED_1px,transparent_1px)] [background-size:20px_20px] opacity-5"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-secondary">
            Digital Showroom
          </span>
          <h1 className="font-luxury text-4xl sm:text-5xl font-bold tracking-wide">
            Our Premium Silk Collections
          </h1>
          <p className="text-sm text-cream/70">
            Explore pure handloom sarees woven with heritage and luxury. Tap any item to inspect details or start an inquiry.
          </p>
        </div>
      </section>

      {/* Main Digital Catalog View */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CollectionsView
          collections={collections}
          sarees={sarees}
          initialCategory={categoryParam}
        />
      </section>
    </div>
  );
}
