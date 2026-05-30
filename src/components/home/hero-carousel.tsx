'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ArrowRight, MapPin } from 'lucide-react';

interface Slide {
  title: string;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Timeless Handloom Elegance",
    subtitle: "Manufacturing Pure Handloom Silk Sarees for Every Celebration",
    image: "/images/hero-banner.png"
  },
  {
    title: "Vibrant Bridal Heritage",
    subtitle: "Bespoke Kanchipuram Weaves with Ornate Golden Zari Embroidery",
    image: "/images/wedding-saree-1.png"
  },
  {
    title: "Crafted for Your Sacred Day",
    subtitle: "Luxury South Indian Wedding Collection from Master Weavers",
    image: "/images/bridal-saree-2.png"
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const phoneNumber = '917997750760';
  const defaultText = 'Hello Sri Srinivasa Silk Sarees, I would like to know more about your collections.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultText)}`;

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-maroon-dark">
      {/* Dynamic Slide Backgrounds */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].image})` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Luxury Deep Maroon Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-dark/90 via-maroon-primary/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Traditional Temple Top Accent */}
      <div className="absolute top-0 left-0 w-full z-10 opacity-70">
        <div className="temple-border-top"></div>
      </div>

      {/* Banner Content */}
      <div className="relative z-20 mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl text-left text-white space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 border border-gold-secondary/40 bg-maroon-primary/60 px-4 py-1.5 rounded-full backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-gold-accent animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gold-secondary">
              Pure Handloom Manufacturer
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="font-luxury text-4xl sm:text-6xl font-bold tracking-wide leading-tight text-white">
                {slides[current].title.split(" ").map((word, idx) => (
                  <span key={idx} className={idx >= 2 ? 'text-gold-gradient block sm:inline' : ''}>
                    {word}{" "}
                  </span>
                ))}
              </h2>
              <p className="text-base sm:text-lg text-cream/90 max-w-lg leading-relaxed">
                {slides[current].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href="/collections"
              className="flex items-center justify-center space-x-2 bg-gold-gradient text-maroon-primary hover:brightness-110 font-bold uppercase tracking-wider text-xs px-6 py-4 rounded-md shadow-xl transition-all"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/visit"
              className="flex items-center justify-center space-x-2 border border-gold-secondary bg-transparent hover:bg-gold-secondary hover:text-maroon-primary text-gold-secondary font-bold uppercase tracking-wider text-xs px-6 py-4 rounded-md shadow-lg transition-all"
            >
              <MapPin className="w-4 h-4" />
              <span>Visit Showroom</span>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-xs px-6 py-4 rounded-md shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Traditional Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <div className="temple-border-bottom"></div>
      </div>
      
      {/* Slider Indicator Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              current === i ? 'bg-gold-accent w-7' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
