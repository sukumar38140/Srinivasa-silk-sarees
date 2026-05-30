'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Collections', path: '/collections' },
    { name: 'Visit Showroom', path: '/visit' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gold-secondary/20 bg-maroon-primary text-white shadow-xl">
      {/* Decorative Golden Top Line */}
      <div className="w-full h-1 bg-gold-gradient"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand Logo and Text */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-secondary p-1 border border-gold-accent shadow-lg group-hover:scale-105 transition-transform">
              <span className="font-luxury text-maroon-primary font-bold text-lg">SSS</span>
            </div>
            <div className="flex flex-col">
              <h1 className="font-luxury text-xl sm:text-2xl font-bold tracking-wider text-gold-secondary group-hover:text-gold-accent transition-colors leading-tight">
                Sri Srinivasa
              </h1>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-cream/80">
                Silk Sarees
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative py-2 text-sm font-medium tracking-widest uppercase transition-colors hover:text-gold-accent"
                >
                  <span className={isActive ? 'text-gold-accent' : 'text-cream/90'}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBorder"
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-gold-gradient"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:7997750760"
              className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gold-secondary border border-gold-secondary/40 px-3.5 py-2 rounded-full hover:bg-gold-secondary hover:text-maroon-primary transition-all shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us</span>
            </a>
            <Link
              href="/visit"
              className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider bg-gold-gradient text-maroon-primary px-4 py-2.5 rounded-full shadow-lg hover:shadow-gold-accent/20 hover:scale-105 transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Directions</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="rounded-md p-2 text-gold-secondary md:hidden hover:bg-maroon-dark/50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gold-secondary/15 bg-maroon-dark overflow-hidden shadow-2xl"
          >
            <div className="space-y-2 px-4 py-6">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-base font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-gold-gradient text-maroon-primary shadow-md'
                        : 'text-cream/90 hover:bg-maroon-primary/45 hover:text-gold-accent'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-6 grid grid-cols-2 gap-4 border-t border-gold-secondary/10">
                <a
                  href="tel:7997750760"
                  className="flex items-center justify-center space-x-2 rounded-lg border border-gold-secondary/40 py-3 text-sm font-bold uppercase tracking-wider text-gold-secondary hover:bg-gold-secondary/10"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>
                <Link
                  href="/visit"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 rounded-lg bg-gold-gradient py-3 text-sm font-bold uppercase tracking-wider text-maroon-primary shadow-md"
                >
                  <Compass className="w-4 h-4" />
                  <span>Visit Store</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
