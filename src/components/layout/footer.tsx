import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-gold-secondary/20 bg-maroon-dark text-cream">
      {/* Decorative Golden Top line */}
      <div className="w-full h-1 bg-gold-gradient"></div>
      
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
          
          {/* Brand Info & Tagline */}
          <div className="space-y-4">
            <h2 className="font-luxury text-2xl font-bold tracking-wider text-gold-secondary">
              Sri Srinivasa Silk Sarees
            </h2>
            <p className="font-luxury italic text-gold-accent text-sm tracking-widest">
              Pure Handloom Elegance Since Tradition
            </p>
            <p className="text-sm text-cream/70 leading-relaxed max-w-sm">
              World-class traditional handloom silk saree manufacturer, retailer, and wholesaler. Specializing in wedding silks, bridal wear, and custom heritage handlooms.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-gold-secondary font-bold">
                Proprietors:
              </span>
              <p className="text-xs text-cream/80">M. Sathish Kumar &amp; M. Srinivasulu</p>
            </div>
          </div>

          {/* Quick Contact & Timings */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-wider text-gold-secondary uppercase">
              Contact &amp; Timings
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-3.5">
                <Clock className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gold-secondary">Showroom Hours</p>
                  <p className="text-cream/85">10:00 AM – 8:00 PM (All Days Open)</p>
                </div>
              </li>
              <li className="flex items-start space-x-3.5">
                <Phone className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gold-secondary">Call Support</p>
                  <p className="space-y-1">
                    <a href="tel:7997750760" className="block hover:underline">7997750760</a>
                    <a href="tel:9502409797" className="block hover:underline">9502409797</a>
                    <a href="tel:8919495829" className="block hover:underline">8919495829</a>
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Location & Directions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-wider text-gold-secondary uppercase">
              Showroom Location
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                <address className="not-italic text-cream/85 leading-relaxed">
                  Beside Radha Krishna Silks &amp; Textiles,<br />
                  Chowdeswari 3rd Street, Kadiri Road,<br />
                  Madanapalle – 517325,<br />
                  Andhra Pradesh, India
                </address>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/visit"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-maroon-primary bg-gold-gradient px-4 py-2.5 rounded-md shadow-lg hover:brightness-115 transition-all"
              >
                View Map &amp; Parking Info
              </Link>
            </div>
          </div>

        </div>

        {/* Lower Footer */}
        <div className="mt-16 border-t border-gold-secondary/15 pt-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 space-y-3 sm:space-y-0">
            <p>&copy; {currentYear} Sri Srinivasa Silk Sarees. All Rights Reserved.</p>
            <div className="flex items-center space-x-1">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-gold-accent fill-gold-accent" />
              <span>in Madanapalle</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/admin" className="hover:text-gold-accent transition-colors">
                Admin Portal
              </Link>
            </div>
          </div>
          {/* Developer Credit */}
          <div className="text-center pt-2 border-t border-gold-secondary/10">
            <p className="text-[11px] text-cream/35 tracking-wide">
              Designed &amp; Developed by{' '}
              <span className="text-gold-secondary/70 font-semibold hover:text-gold-accent transition-colors cursor-default">
                Rubicorn Technologies Pvt Ltd
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
