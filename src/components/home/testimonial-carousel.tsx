'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const currentItem = testimonials[current];

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative min-h-[250px] flex flex-col items-center justify-center text-center">
        
        {/* Luxury Background Quote Icon */}
        <Quote className="absolute -top-6 left-4 w-24 h-24 text-gold-secondary/10 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 z-10"
          >
            {/* Stars */}
            <div className="flex justify-center space-x-1">
              {[...Array(currentItem.rating)].map((_, idx) => (
                <Star key={idx} className="w-5 h-5 fill-gold-accent text-gold-accent" />
              ))}
            </div>

            {/* Testimonial text */}
            <p className="font-luxury text-xl sm:text-2xl italic font-medium text-cream leading-relaxed max-w-2xl px-6">
              &ldquo;{currentItem.review}&rdquo;
            </p>

            {/* Client Metadata */}
            <div>
              <h4 className="font-sans font-bold text-gold-secondary uppercase tracking-wider text-sm">
                {currentItem.name}
              </h4>
              <p className="text-xs text-cream/70 mt-1">{currentItem.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Navigation Controls */}
      {testimonials.length > 1 && (
        <div className="flex justify-center items-center space-x-6 mt-8">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-secondary/40 text-gold-secondary hover:bg-gold-secondary hover:text-maroon-primary transition-all shadow-md focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex space-x-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  current === i ? 'bg-gold-accent w-5' : 'bg-gold-secondary/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-secondary/40 text-gold-secondary hover:bg-gold-secondary hover:text-maroon-primary transition-all shadow-md focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
