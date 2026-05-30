import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TempleDivider from '@/components/ui/temple-divider';
import { Award, Eye, Heart, Compass, Star } from 'lucide-react';

export const metadata = {
  title: 'About Us | Sri Srinivasa Silk Sarees',
  description: 'Learn about the legacy of Sri Srinivasa Silk Sarees in Madanapalle. Read about our handloom weaving tradition, core principles, and the story of M. Sathish Kumar and M. Srinivasulu.',
};

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="w-7 h-7 text-gold-secondary" />,
      title: "Preserving Tradition",
      desc: "We run authentic handlooms that preserve local South Indian weaving styles passed down through generations."
    },
    {
      icon: <Heart className="w-7 h-7 text-gold-secondary" />,
      title: "Weaver Empowerment",
      desc: "Our manufacturing process directly supports local artisans, ensuring fair wages and preserving historical trades."
    },
    {
      icon: <Eye className="w-7 h-7 text-gold-secondary" />,
      title: "Unyielding Authenticity",
      desc: "No synthetic blends. We verify the density of every warp thread and the gold content of our zari wires."
    }
  ];

  const milestones = [
    {
      year: "Our Roots",
      title: "Traditional Loom Roots",
      desc: "Initiated weaving operations in small family looms in Madanapalle, manufacturing daily-wear silks for local patrons."
    },
    {
      year: "Brand Inception",
      title: "Establishing Sri Srinivasa",
      desc: "Formally established the business under proprietors M. Sathish Kumar and M. Srinivasulu, expanding to wholesale supply."
    },
    {
      year: "Wedding Focus",
      title: "Bridal Zari Excellence",
      desc: "Expanded weaving setups to specialize in heavy wedding sarees, sourcing premium gold-plated silver zari threads."
    },
    {
      year: "Showroom Inception",
      title: "Madanapalle Showroom Launch",
      desc: "Opened our flagship showroom on Chowdeswari 3rd Cross to display collections directly to visiting customers."
    }
  ];

  return (
    <div className="w-full space-y-20 pb-20">
      {/* Page Header */}
      <section className="bg-silk-maroon text-white py-16 text-center border-b border-gold-secondary/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#FAF5ED_1px,transparent_1px)] [background-size:20px_20px] opacity-5"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-secondary">
            Our Legacy
          </span>
          <h1 className="font-luxury text-4xl sm:text-5xl font-bold tracking-wide">
            Pure Handloom Elegance Since Tradition
          </h1>
          <p className="text-sm text-cream/70">
            Discover the heritage, principles, and master craftsmanship that define Sri Srinivasa Silk Sarees.
          </p>
        </div>
      </section>

      {/* Story & Legacy Content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-video lg:aspect-4/5 rounded-lg overflow-hidden border-2 border-gold-secondary/20 shadow-2xl">
            <Image
              src="/images/store-interior.png"
              alt="Inside Sri Srinivasa Handloom Boutique"
              fill
              className="object-cover"
            />
            {/* Ornate border overlay */}
            <div className="absolute inset-4 border border-gold-secondary/30 pointer-events-none"></div>
          </div>

          <div className="space-y-6">
            <h2 className="font-luxury text-3xl font-bold text-maroon-dark tracking-wide">
              The Journey of Our Craftsmanship
            </h2>
            <p className="text-sm text-darktext/80 leading-relaxed">
              For decades, <strong>Sri Srinivasa Silk Sarees</strong> has stood as a beacon of luxury textile heritage. Founded in Madanapalle, Andhra Pradesh, we started with a handful of handlooms and a singular goal: to manufacture sarees that feel like a second skin while carrying the majesty of a royal court.
            </p>
            <p className="text-sm text-darktext/85 leading-relaxed">
              We specialize in the complex art of Kanchipuram-inspired handloom weaving. Every saree takes days, sometimes weeks, of concentrated coordination between our yarn sorters, design card makers, and master weavers. Under the management of <strong>M. Sathish Kumar</strong> and <strong>M. Srinivasulu</strong>, we ensure that every customer receives the exact saree they dreamed of, custom-inspected and hand-delivered.
            </p>
            <div className="border-l-4 border-gold-secondary pl-4 italic text-sm text-maroon-primary bg-gold-secondary/5 py-3 rounded-r">
              &ldquo;A saree is not just attire. It is the repository of our cultural memory, the canvas of our weavers' dreams, and the shine of your most precious celebrations.&rdquo;
              <span className="block text-xs font-bold uppercase mt-1.5 text-gold-dark not-italic">— M. Sathish Kumar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Temple divider */}
      <TempleDivider />

      {/* Core Values Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-luxury text-3xl font-bold text-maroon-dark tracking-wide">
            Our Core Principles
          </h2>
          <p className="text-xs text-darktext/70 max-w-md mx-auto">
            These guidelines shape how we run our handlooms, support our weavers, and interact with our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-lg border border-gold-secondary/15 hover:border-gold-secondary/40 shadow-sm hover:shadow-xl transition-all space-y-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-primary shadow-md">
                {val.icon}
              </div>
              <h3 className="font-luxury text-xl font-bold text-maroon-dark">{val.title}</h3>
              <p className="text-xs text-darktext/75 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legacy Timeline */}
      <section className="bg-white py-20 border-y border-gold-secondary/15 relative">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-16">
          <div className="text-center space-y-3">
            <h2 className="font-luxury text-3xl font-bold text-maroon-dark tracking-wide">
              Timeline of Our Legacy
            </h2>
            <p className="text-xs text-darktext/70 max-w-md mx-auto">
              A historical look at the major milestones of the Sri Srinivasa brand.
            </p>
          </div>

          <div className="relative border-l-2 border-gold-secondary/30 pl-8 ml-4 space-y-12">
            {milestones.map((mile, idx) => (
              <div key={idx} className="relative">
                {/* Marker point */}
                <div className="absolute top-1.5 -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-maroon-primary border-2 border-gold-accent shadow"></div>
                
                <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
                  {mile.year}
                </span>
                <h3 className="font-luxury text-xl font-bold text-maroon-dark mt-1">
                  {mile.title}
                </h3>
                <p className="text-xs text-darktext/75 mt-2 leading-relaxed">
                  {mile.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise Badge Banner */}
      <section className="mx-auto max-w-5xl px-4">
        <div className="bg-silk-maroon text-cream rounded-2xl p-8 sm:p-12 border border-gold-secondary/20 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(#FFF8EF_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold-accent text-gold-accent" />
              ))}
            </div>
            <h2 className="font-luxury text-3xl font-bold text-gold-secondary">
              Our 100% Quality Promise
            </h2>
            <p className="text-sm text-cream/80 max-w-2xl mx-auto leading-relaxed">
              We stand behind every single thread we weave. If you buy a Sri Srinivasa saree, you receive a promise of pure Mulberry Silk, certified gold zari details, and zero synthetic dye degradation. Our proprietors are always available to inspect and answer any weaving questions you have during your showroom visit.
            </p>
            <div className="pt-2">
              <Link
                href="/visit"
                className="bg-gold-gradient text-maroon-primary font-bold uppercase tracking-wider text-xs px-6 py-4 rounded shadow-lg hover:brightness-110 transition-all inline-block"
              >
                Plan a Showroom Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
