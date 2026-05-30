import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTestimonials, getCollections } from '@/lib/db';
import HeroCarousel from '@/components/home/hero-carousel';
import TestimonialCarousel from '@/components/home/testimonial-carousel';
import TempleDivider from '@/components/ui/temple-divider';
import { Award, Heart, Shield, Users, ShoppingBag, Sparkles, ArrowRight, Settings, Hammer } from 'lucide-react';

export const revalidate = 0; // Fresh content every load

export default async function HomePage() {
  const testimonials = await getTestimonials();
  const collections = await getCollections();

  const features = [
    {
      icon: <Award className="w-8 h-8 text-gold-secondary" />,
      title: "Pure Handloom Silk",
      desc: "Every single saree in our showroom is crafted from 100% pure silk yarns, authenticating true Indian weaver craftsmanship."
    },
    {
      icon: <Shield className="w-8 h-8 text-gold-secondary" />,
      title: "Trusted Quality",
      desc: "Meticulous quality inspections on every weave ensure that your saree lasts generations without fading or wearing."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-gold-secondary" />,
      title: "Bridal Specialists",
      desc: "We curate the most magnificent, heavy gold-border bridal silk sarees tailor-made for South Indian wedding rituals."
    },
    {
      icon: <Users className="w-8 h-8 text-gold-secondary" />,
      title: "Wholesale Availability",
      desc: "Direct handloom manufacturers. We provide bulk premium sarees for boutiques, stores, and wedding parties."
    }
  ];

  const processSteps = [
    {
      num: "01",
      title: "Mulberry Silk Selection",
      desc: "Sourcing premium grade mulberry silk fibers, famed for natural sheen, high tensile strength, and soft texture."
    },
    {
      num: "02",
      title: "Master Design Process",
      desc: "Hand-sketching intricate patterns, incorporating temple motifs, peacock structures, and traditional borders."
    },
    {
      num: "03",
      title: "Zari Thread Prep",
      desc: "Threading pure gold-plated silver zari threads into the warp and weft to create metallic borders."
    },
    {
      num: "04",
      title: "Handloom Weaving",
      desc: "Master weavers spend weeks hand-operating the loom to bring the design to life with high precision."
    },
    {
      num: "05",
      title: "Rigorous Inspection",
      desc: "Checking thread integrity, zari alignment, and uniform texture to award our Srinivasa trust stamp."
    }
  ];

  return (
    <div className="w-full space-y-20 pb-20">
      
      {/* 1. Hero Section Slider */}
      <section aria-label="Hero Showcase">
        <HeroCarousel />
      </section>

      {/* 2. Welcome & Heritage Introduction */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-primary bg-gold-secondary/20 px-3 py-1 rounded">
              Est. Tradition
            </span>
            <h2 className="font-luxury text-3xl sm:text-5xl font-bold text-maroon-dark tracking-wide">
              Weaving Royal Heritage into Every Thread
            </h2>
            <p className="text-base sm:text-lg text-darktext/80 leading-relaxed">
              Located in the heart of Madanapalle, Andhra Pradesh, <strong>Sri Srinivasa Silk Sarees</strong> is a premier manufacturer and retailer of authentic handloom silk sarees. Our journey is rooted in the rich textile culture of South India. We hand-weave memories that are passed down as family heirlooms.
            </p>
            <p className="text-sm text-darktext/75 leading-relaxed">
              Proprietors <strong>M. Sathish Kumar</strong> and <strong>M. Srinivasulu</strong> oversee the production of every saree. By combining centuries-old Kanchipuram-inspired handloom techniques with contemporary designs, we ensure our collections offer unmatched grandeur for brides, wedding guests, and boutique retailers alike.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-white bg-maroon-primary hover:bg-maroon-dark px-6 py-3.5 rounded shadow-lg transition-all"
              >
                <span>Read Our Heritage Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 rounded-lg overflow-hidden shadow-2xl border-4 border-gold-secondary/40">
              <Image
                src="/images/store-interior.png"
                alt="Sri Srinivasa Saree Store Showroom"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute -bottom-6 -left-6 bg-gold-gradient p-5 rounded-lg shadow-xl text-maroon-primary border border-gold-accent max-w-[200px]">
              <p className="font-luxury text-3xl font-bold leading-none">100%</p>
              <p className="text-xs font-bold uppercase tracking-wider mt-1.5 leading-tight">
                Authentic Handloom Certified
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Temple line */}
      <TempleDivider />

      {/* 3. Signature Collections Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="collections">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-primary">
            Digital Showroom
          </span>
          <h2 className="font-luxury text-3xl sm:text-5xl font-bold text-maroon-dark tracking-wide">
            Our Signature Collections
          </h2>
          <p className="text-sm text-darktext/70 max-w-xl mx-auto">
            Discover a curated array of rich silk weaves tailored for weddings, festivals, and traditional boutique collections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.slice(0, 4).map((col) => (
            <Link
              key={col.id}
              href={`/collections?category=${col.slug}`}
              className="group relative flex flex-col h-96 overflow-hidden rounded-lg border border-gold-secondary/15 bg-white shadow-lg"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={col.imageUrl}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/95 via-maroon-dark/40 to-transparent opacity-90 group-hover:via-maroon-dark/50 transition-all" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-white space-y-2">
                <h3 className="font-luxury text-2xl font-bold text-gold-secondary group-hover:text-gold-accent transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-cream/80 line-clamp-2">
                  {col.description}
                </p>
                <div className="flex items-center space-x-1 pt-2 text-[10px] uppercase font-bold tracking-widest text-gold-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View Sarees</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/collections"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-maroon-primary border-2 border-maroon-primary hover:bg-maroon-primary hover:text-white px-8 py-3.5 rounded transition-all"
          >
            <span>Browse All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Why Choose Us Feature Cards */}
      <section className="bg-white py-20 border-y border-gold-secondary/10 relative overflow-hidden">
        {/* Floating background silk texture hint */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#6B1022_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-primary">
              Craftsmanship &amp; Trust
            </span>
            <h2 className="font-luxury text-3xl sm:text-5xl font-bold text-maroon-dark tracking-wide">
              The Srinivasa Assurance
            </h2>
            <p className="text-sm text-darktext/70 max-w-xl mx-auto">
              Our looms are dedicated to preserving quality, authenticity, and heritage. Here is why patrons across generations trust us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-cream/45 p-8 rounded-lg border border-gold-secondary/10 hover:border-gold-secondary/40 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 space-y-4"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-maroon-primary shadow-lg">
                  {feat.icon}
                </div>
                <h3 className="font-luxury text-xl font-bold text-maroon-dark">{feat.title}</h3>
                <p className="text-xs text-darktext/80 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Manufacturing Excellence Process Timeline */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-maroon-primary">
            Art of the Loom
          </span>
          <h2 className="font-luxury text-3xl sm:text-5xl font-bold text-maroon-dark tracking-wide">
            Handloom Manufacturing Process
          </h2>
          <p className="text-sm text-darktext/70 max-w-xl mx-auto">
            From raw cocoon selection to high-precision weaving, take a journey through the creation of our luxury sarees.
          </p>
        </div>

        <div className="relative border-l-2 border-gold-secondary/35 ml-4 md:ml-0 md:border-l-0 md:grid md:grid-cols-5 md:gap-4 md:before:absolute md:before:top-[19px] md:before:left-0 md:before:w-full md:before:h-0.5 md:before:bg-gold-secondary/25 md:before:-z-10 relative">
          {processSteps.map((step, idx) => (
            <div key={idx} className="relative pl-8 md:pl-0 md:text-center space-y-3 pb-8 md:pb-0">
              {/* Process dot marker */}
              <div className="absolute top-1 left-[-9px] md:relative md:top-0 md:left-0 md:mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-maroon-primary text-gold-secondary border-2 border-gold-accent font-bold text-sm shadow-md">
                {step.num}
              </div>
              <h3 className="font-luxury text-lg font-bold text-maroon-dark pt-1">{step.title}</h3>
              <p className="text-xs text-darktext/75 leading-relaxed max-w-xs md:mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Customer Testimonials Section with Carousel */}
      <section className="bg-silk-maroon text-white py-20 relative overflow-hidden border-y border-gold-secondary/25">
        {/* Soft floating background design */}
        <div className="absolute inset-0 bg-[radial-gradient(#FAF5ED_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-secondary">
              Patron Reviews
            </span>
            <h2 className="font-luxury text-3xl sm:text-5xl font-bold text-gold-accent tracking-wide">
              Voices of True Satisfaction
            </h2>
            <p className="text-xs text-cream/70 max-w-md mx-auto">
              Read how brides and retail shop partners rate their luxury purchase experience at Sri Srinivasa Silk Sarees.
            </p>
          </div>
          
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* 7. Showroom Visit Call to Action */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="bg-white border-2 border-gold-secondary/25 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
            <h2 className="font-luxury text-3xl font-bold text-maroon-dark leading-tight">
              Experience the Saree Drape in Person
            </h2>
            <p className="text-sm text-darktext/80 leading-relaxed">
              Nothing compares to feeling the heavy, organic texture of pure silk under your hands. Visit our showroom in Madanapalle to view the full spectrum of wedding collections.
            </p>
            <div className="space-y-2">
              <p className="text-xs text-darktext/75">
                📍 <strong>Address:</strong> Chowdeswari 3rd Cross, Kadiri Road, Madanapalle.
              </p>
              <p className="text-xs text-darktext/75">
                ⏰ <strong>Timings:</strong> 10:00 AM – 8:00 PM (Daily Open)
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/visit"
                className="bg-maroon-primary hover:bg-maroon-dark text-white font-bold uppercase tracking-wider text-xs px-6 py-4 rounded shadow-lg transition-all"
              >
                Get Store Directions
              </Link>
              <Link
                href="/contact"
                className="border border-maroon-primary text-maroon-primary hover:bg-cream font-bold uppercase tracking-wider text-xs px-6 py-4 rounded transition-all"
              >
                Submit Inquiry
              </Link>
            </div>
          </div>
          <div className="relative min-h-[300px] bg-maroon-dark">
            <Image
              src="/images/store-interior.png"
              alt="Visit our Madanapalle Silk Showroom"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
            />
            {/* Gold border mask inside */}
            <div className="absolute inset-4 border border-gold-secondary/35 pointer-events-none"></div>
          </div>
        </div>
      </section>

    </div>
  );
}
