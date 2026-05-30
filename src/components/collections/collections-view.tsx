'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Calendar, Filter, X, ZoomIn, Send } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

interface Saree {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categorySlug: string;
  tags: string[];
}

interface CollectionsViewProps {
  collections: Collection[];
  sarees: Saree[];
  initialCategory?: string;
}

export default function CollectionsView({ collections, sarees, initialCategory = 'all' }: CollectionsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [activeSaree, setActiveSaree] = useState<Saree | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    message: ''
  });

  // Filter sarees
  const filteredSarees = selectedCategory === 'all'
    ? sarees
    : sarees.filter(s => s.categorySlug === selectedCategory);

  const phoneNumber = '917997750760';

  // Get WhatsApp URL for a saree
  const getWhatsAppUrl = (saree: Saree) => {
    const text = `Hello Sri Srinivasa Silk Sarees, I would like to inquire about the "${saree.name}" under the ${sarees.find(s => s.id === saree.id)?.categorySlug || 'Collections'} collection.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  // Handle form submission
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          city: formData.city,
          requirement: `Saree Inquiry: ${activeSaree?.name}`,
          message: formData.message || `Inquiry about Saree ID ${activeSaree?.id}.`
        })
      });
      if (res.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', mobile: '', city: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Category Tabs */}
      <div className="border-b border-gold-secondary/20 pb-4">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-maroon-primary mb-3">
          <Filter className="w-4 h-4 text-gold-secondary" />
          <span>Filter by Category</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${
              selectedCategory === 'all'
                ? 'bg-maroon-primary text-white shadow'
                : 'bg-white text-darktext border border-gold-secondary/25 hover:bg-cream'
            }`}
          >
            All Sarees ({sarees.length})
          </button>
          {collections.map((col) => {
            const count = sarees.filter(s => s.categorySlug === col.slug).length;
            return (
              <button
                key={col.slug}
                onClick={() => setSelectedCategory(col.slug)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${
                  selectedCategory === col.slug
                    ? 'bg-maroon-primary text-white shadow'
                    : 'bg-white text-darktext border border-gold-secondary/25 hover:bg-cream'
                }`}
              >
                {col.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Header Card */}
      {selectedCategory !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gold-secondary/20 shadow-md space-y-2"
        >
          {collections.filter(c => c.slug === selectedCategory).map(col => (
            <div key={col.id}>
              <h3 className="font-luxury text-2xl font-bold text-maroon-primary">{col.name}</h3>
              <p className="text-sm text-darktext/75 mt-1 leading-relaxed">{col.description}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Sarees Grid */}
      {filteredSarees.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gold-secondary/30">
          <p className="text-sm text-darktext/50">No sarees available in this collection yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSarees.map((saree) => (
            <motion.div
              layout
              key={saree.id}
              className="bg-white rounded-lg border border-gold-secondary/15 overflow-hidden shadow hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Product Image */}
              <div 
                className="relative aspect-4/5 overflow-hidden bg-cream cursor-pointer"
                onClick={() => {
                  setActiveSaree(saree);
                  setFormSubmitted(false);
                }}
              >
                <Image
                  src={saree.imageUrl}
                  alt={saree.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gold hover shade overlay */}
                <div className="absolute inset-0 bg-maroon-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/95 text-maroon-primary px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-2 text-xs font-bold uppercase tracking-wider">
                    <ZoomIn className="w-4 h-4 text-gold-secondary" />
                    <span>Zoom Gallery</span>
                  </div>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark">
                    {collections.find(c => c.slug === saree.categorySlug)?.name || 'Heritage Silk'}
                  </span>
                  <h4 className="font-luxury text-xl font-bold text-maroon-dark leading-snug">
                    {saree.name}
                  </h4>
                  <p className="text-xs text-darktext/75 line-clamp-2 leading-relaxed">
                    {saree.description}
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  {/* WhatsApp Quick CTA */}
                  <a
                    href={getWhatsAppUrl(saree)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-[10px] py-3 rounded transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                  
                  {/* Form Trigger CTA */}
                  <button
                    onClick={() => {
                      setActiveSaree(saree);
                      setFormSubmitted(false);
                    }}
                    className="w-full text-center border border-gold-secondary/40 text-maroon-primary hover:bg-cream font-bold uppercase tracking-wider text-[10px] py-3 rounded transition-colors"
                  >
                    View Details &amp; Inquiry Form
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox / Details Dialog */}
      <AnimatePresence>
        {activeSaree && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSaree(null)}
              className="absolute inset-0 bg-maroon-dark/85 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl bg-cream rounded-xl overflow-hidden border border-gold-secondary/40 shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveSaree(null)}
                className="absolute top-4 right-4 z-25 bg-maroon-primary text-gold-secondary border border-gold-secondary/30 p-2 rounded-full hover:bg-maroon-dark hover:scale-105 transition-all shadow"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Saree Image Side */}
              <div className="relative aspect-4/5 md:h-full bg-black min-h-[300px]">
                <Image
                  src={activeSaree.imageUrl}
                  alt={activeSaree.name}
                  fill
                  className="object-cover"
                />
                {/* Traditional motif corner accents */}
                <div className="absolute top-4 left-4 border border-gold-secondary/35 w-8 h-8 border-r-0 border-b-0"></div>
                <div className="absolute bottom-4 right-4 border border-gold-secondary/35 w-8 h-8 border-l-0 border-t-0"></div>
              </div>

              {/* Saree Details & Forms Side */}
              <div className="p-8 space-y-6 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-dark bg-gold-secondary/10 px-2.5 py-1 rounded">
                    {collections.find(c => c.slug === activeSaree.categorySlug)?.name || 'Heritage Handloom'}
                  </span>
                  
                  <h3 className="font-luxury text-3xl font-bold text-maroon-dark">
                    {activeSaree.name}
                  </h3>
                  
                  <p className="text-sm text-darktext/80 leading-relaxed border-b border-gold-secondary/20 pb-4">
                    {activeSaree.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeSaree.tags.map((t, i) => (
                      <span key={i} className="text-[10px] font-semibold text-maroon-primary bg-white border border-gold-secondary/20 px-2 py-0.5 rounded-full">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Inquiry Methods */}
                <div className="space-y-4 pt-4 border-t border-gold-secondary/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-maroon-primary">
                    Submit Inquiry for this Saree
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {/* Primary Option: WhatsApp */}
                    <a
                      href={getWhatsAppUrl(activeSaree)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-xs py-4 rounded shadow-lg transition-colors"
                    >
                      <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
                      <span>Inquire Directly via WhatsApp</span>
                    </a>

                    {/* Secondary Option: Form Submission */}
                    <div className="bg-white p-5 rounded-lg border border-gold-secondary/20">
                      <p className="text-[11px] text-darktext/60 mb-3 text-center">
                        Or fill this form and our showroom representatives will call you:
                      </p>
                      
                      {formSubmitted ? (
                        <div className="text-center py-4 space-y-2">
                          <p className="text-xs font-bold text-emerald-600">✓ Inquiry Submitted Successfully!</p>
                          <p className="text-[10px] text-darktext/75">We will review your requirements and phone you shortly.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleInquirySubmit} className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              required
                              placeholder="Your Name *"
                              aria-label="Your Name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-cream px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="Mobile No. *"
                              aria-label="Mobile Number"
                              value={formData.mobile}
                              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                              className="w-full bg-cream px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Your City"
                            aria-label="Your City"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full bg-cream px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext"
                          />
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center space-x-2 bg-maroon-primary hover:bg-maroon-dark text-white font-bold uppercase tracking-wider text-[10px] py-2.5 rounded shadow transition-all disabled:opacity-50"
                          >
                            <Send className="w-3 h-3" />
                            <span>{loading ? 'Submitting...' : 'Submit Form Inquiry'}</span>
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
