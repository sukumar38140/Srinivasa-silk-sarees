import React from 'react';
import Image from 'next/image';
import { Compass, Clock, MapPin, Phone, Info } from 'lucide-react';
import TempleDivider from '@/components/ui/temple-divider';

export const metadata = {
  title: 'Visit Our Showroom | Sri Srinivasa Silk Sarees',
  description: 'Plan your visit to our luxury silk saree showroom in Madanapalle. Get maps, directions, parking instructions, and contact details.',
};

export default function VisitShowroomPage() {
  const directions = [
    {
      title: "From Kadiri Road Bypass",
      desc: "Drive straight onto Kadiri Road towards Chowdeswari Cross. Turn into Chowdeswari 3rd Street. We are located right next to Radha Krishna Silks & Textiles."
    },
    {
      title: "From Madanapalle RTC Bus Stand",
      desc: "We are situated approximately 2.5 km from the main RTC Bus Stand. Autos and local taxis are readily available. Simply mention Chowdeswari Cross / Kadiri Road."
    },
    {
      title: "Landmark Cue",
      desc: "Look for our large royal maroon shop board directly adjacent to Radha Krishna Silks & Textiles. Feel free to call us if you need navigation assistance."
    }
  ];

  return (
    <div className="w-full space-y-16 pb-20">
      
      {/* Header */}
      <section className="bg-silk-maroon text-white py-16 text-center border-b border-gold-secondary/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#FAF5ED_1px,transparent_1px)] [background-size:20px_20px] opacity-5"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-secondary">
            Showroom Experience
          </span>
          <h1 className="font-luxury text-4xl sm:text-5xl font-bold tracking-wide">
            Visit Sri Srinivasa Silk Sarees
          </h1>
          <p className="text-sm text-cream/70">
            Come feel the rich, authentic textures of pure handloom silks and pick your perfect celebration saree.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Showroom info cards */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-luxury text-3xl font-bold text-maroon-dark tracking-wide">
              Showroom Details
            </h2>
            
            <div className="space-y-6">
              
              {/* Address card */}
              <div className="flex items-start space-x-4 p-5 bg-white border border-gold-secondary/20 rounded-lg shadow-sm">
                <MapPin className="w-6 h-6 text-gold-secondary shrink-0 mt-1" />
                <div className="space-y-1.5 text-sm">
                  <h3 className="font-bold text-maroon-primary">Address Location</h3>
                  <address className="not-italic text-darktext/80 leading-relaxed">
                    Beside Radha Krishna Silks &amp; Textiles,<br />
                    Chowdeswari 3rd Street, Kadiri Road,<br />
                    Madanapalle – 517325, Andhra Pradesh
                  </address>
                </div>
              </div>

              {/* Hours Card */}
              <div className="flex items-start space-x-4 p-5 bg-white border border-gold-secondary/20 rounded-lg shadow-sm">
                <Clock className="w-6 h-6 text-gold-secondary shrink-0 mt-1" />
                <div className="space-y-1 text-sm">
                  <h3 className="font-bold text-maroon-primary">Showroom Hours</h3>
                  <p className="text-darktext/80">10:00 AM – 8:00 PM</p>
                  <p className="text-[11px] text-emerald-600 font-bold">Open on Sundays &amp; Public Holidays</p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="flex items-start space-x-4 p-5 bg-white border border-gold-secondary/20 rounded-lg shadow-sm">
                <Phone className="w-6 h-6 text-gold-secondary shrink-0 mt-1" />
                <div className="space-y-1.5 text-sm">
                  <h3 className="font-bold text-maroon-primary">Contact Numbers</h3>
                  <p className="space-y-1 text-darktext/80 font-medium">
                    <a href="tel:7997750760" className="block hover:underline">7997750760 (Main)</a>
                    <a href="tel:9502409797" className="block hover:underline">9502409797</a>
                    <a href="tel:8919495829" className="block hover:underline">8919495829</a>
                  </p>
                </div>
              </div>

              {/* Parking details */}
              <div className="flex items-start space-x-4 p-5 bg-gold-secondary/5 border border-gold-secondary/30 rounded-lg shadow-sm">
                <Info className="w-6 h-6 text-gold-dark shrink-0 mt-1" />
                <div className="space-y-1 text-sm text-darktext/90">
                  <h3 className="font-bold text-maroon-primary">Parking Information</h3>
                  <p className="text-xs leading-relaxed">
                    Ample dedicated parking is available directly outside the showroom for two-wheelers. For four-wheelers, comfortable side-road parking is accessible along Kadiri Road with active staff assistance for unloading/drop-offs.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Map & Visuals column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-luxury text-3xl font-bold text-maroon-dark tracking-wide">
              Showroom Map
            </h2>
            
            {/* Embedded Google Map */}
            <div className="w-full aspect-video rounded-lg overflow-hidden border-2 border-gold-secondary/20 shadow-lg relative bg-cream">
              {/* Actual Map Embed centered at Chowdeswari St, Madanapalle */}
              <iframe
                title="Sri Srinivasa Silk Sarees Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.605389658252!2d78.5042456!3d13.6264663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2594a558509c3%3A0xe54b9f3e498c3639!2sKadiri%20Rd%2C%20Madanapalle%2C%20Andhra%20Pradesh%20517325!5e0!3m2!1sen!2sin!4v1780139900000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
            
            <a
              href="https://maps.google.com/?q=Beside+Radha+Krishna+Silks+Textiles,+Chowdeswari+3rd+Street,+Kadiri+Road,+Madanapalle+Andhra+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-white bg-maroon-primary hover:bg-maroon-dark px-6 py-4 rounded shadow-md transition-colors w-full justify-center"
            >
              <Compass className="w-4 h-4 text-gold-secondary" />
              <span>Open Google Maps App</span>
            </a>
          </div>

        </div>
      </section>

      {/* Decorative Temple separator */}
      <TempleDivider />

      {/* Written Directions & Landmark details */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <h2 className="font-luxury text-3xl font-bold text-center text-maroon-dark tracking-wide">
          Step-by-Step Directions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {directions.map((dir, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg border border-gold-secondary/15 hover:border-gold-secondary/40 shadow-sm transition-all space-y-3"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-gold-dark">
                Route Guide {idx + 1}
              </div>
              <h3 className="font-luxury text-lg font-bold text-maroon-dark">{dir.title}</h3>
              <p className="text-xs text-darktext/75 leading-relaxed">{dir.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Call to Action */}
      <section className="mx-auto max-w-4xl px-4">
        <div className="bg-white border border-gold-secondary/20 rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row items-stretch">
          <div className="relative w-full md:w-2/5 min-h-[200px]">
            <Image
              src="/images/store-interior.png"
              alt="Silk fabric stack display"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 md:w-3/5 flex flex-col justify-center space-y-4">
            <h3 className="font-luxury text-2xl font-bold text-maroon-dark">
              Are you planning to buy wholesale?
            </h3>
            <p className="text-xs text-darktext/80 leading-relaxed">
              We cater extensively to wedding planners, saree shops, and fashion boutiques. Sourcing directly from us eliminates middlemen and ensures authentic handloom weaves at manufacturing prices. Reach out to schedule a private viewing.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/917997750760?text=Hello Sri Srinivasa Silk Sarees, I would like to schedule a showroom visit to discuss wholesale ordering."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-xs px-5 py-3 rounded shadow transition-colors inline-block"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
