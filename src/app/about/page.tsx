import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TempleDivider from '@/components/ui/temple-divider';
import { Award, Eye, Heart, Star, MapPin, Phone } from 'lucide-react';

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

      {/* Story & Shop Showcase Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Real Shop Photo */}
          {/* mx-4 on mobile gives room so badges don't overlap surrounding content */}
          <div className="relative mx-4 sm:mx-0">

            {/* Premium gold-glow frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-[3px] border-gold-secondary/60 animate-gold-glow">

              {/* Top gold ornament strip */}
              <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #B5902A, #FFD700, #D4AF37, #FFD700, #B5902A)' }} />

              {/* Actual flagship shop photo */}
              <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                <Image
                  src="/images/sri-srinivasa-silk-sarees-About page .jpg"
                  alt="Sri Srinivasa Silk Sarees – Our Flagship Showroom at Chowdeswari 3rd Cross, Madanapalle"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Vignette overlay for premium depth */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(74,10,23,0.40) 100%)' }}
                />

                {/* Flagship Showroom ribbon — sits fully inside image */}
                <div className="absolute top-3 left-0 z-10 flex items-center">
                  <div
                    className="px-3 py-1 text-[9px] sm:text-[11px] font-black uppercase tracking-widest"
                    style={{ background: 'linear-gradient(90deg, #4A0A17, #6B1022)', color: '#FFD700' }}
                  >
                    ✦ Our Flagship Showroom
                  </div>
                  {/* Arrow tip */}
                  <div
                    className="w-0 h-0"
                    style={{
                      borderTop: '18px solid transparent',
                      borderBottom: '18px solid transparent',
                      borderLeft: '12px solid #6B1022'
                    }}
                  />
                </div>

                {/* Floating badge – top right INSIDE image frame */}
                <div className="absolute top-2 right-2 z-20 bg-gold-gradient rounded-full w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center shadow-lg border-2 border-white/60">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-maroon-primary fill-maroon-primary" />
                  <span className="text-[7px] font-black text-maroon-dark leading-tight text-center uppercase">Premium</span>
                  <span className="text-[6px] font-bold text-maroon-dark">Quality</span>
                </div>

                {/* Floating badge – bottom left INSIDE image frame */}
                <div className="absolute bottom-8 left-2 z-20 bg-silk-maroon rounded-full w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center shadow-lg border-2 border-gold-secondary/40">
                  <span className="text-gold-accent text-[10px] font-black">AP</span>
                  <span className="text-[6px] text-cream/80 leading-tight text-center uppercase font-bold">Hand<br />Loom</span>
                </div>

                {/* Bottom caption bar */}
                <div className="absolute bottom-0 left-0 right-0 z-10 px-3 py-2"
                  style={{ background: 'linear-gradient(0deg, rgba(74,10,23,0.90) 0%, transparent 100%)' }}>
                  <p className="text-[9px] sm:text-[10px] text-gold-accent font-semibold tracking-wide text-center leading-snug">
                    # 3-146-14-5-A1, Chowdeswari 3rd Cross, NG Palle, Madanapalle – 517325, A.P.
                  </p>
                </div>
              </div>

              {/* Bottom gold ornament strip */}
              <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #B5902A, #FFD700, #D4AF37, #FFD700, #B5902A)' }} />
            </div>

            {/* Location tag below image */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-maroon-primary font-semibold px-2">
              <MapPin className="w-4 h-4 text-gold-secondary flex-shrink-0" />
              <span className="text-center">Chowdeswari 3rd Cross, Madanapalle, Andhra Pradesh – 517325</span>
            </div>
          </div>

          {/* Story Text */}
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

            {/* Contact quick info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { value: '7997750760', icon: <Phone className="w-3.5 h-3.5" /> },
                { value: '9502409797', icon: <Phone className="w-3.5 h-3.5" /> },
                { value: '8919495829', icon: <Phone className="w-3.5 h-3.5" /> },
                { value: 'Madanapalle, A.P.', icon: <MapPin className="w-3.5 h-3.5" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-darktext/70 bg-gold-secondary/5 rounded-lg px-3 py-2 border border-gold-secondary/15">
                  <span className="text-gold-secondary">{item.icon}</span>
                  <span className="font-semibold text-maroon-primary">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-gold-secondary pl-4 italic text-sm text-maroon-primary bg-gold-secondary/5 py-3 rounded-r">
              &ldquo;A saree is not just attire. It is the repository of our cultural memory, the canvas of our weavers&apos; dreams, and the shine of your most precious celebrations.&rdquo;
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

      {/* Quality Promise Banner */}
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
