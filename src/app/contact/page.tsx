'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    requirement: 'Bridal Silk Sarees',
    message: ''
  });

  const requirements = [
    'Bridal Silk Sarees',
    'Kanchipuram Inspired Sarees',
    'Wedding Collection Sarees',
    'Traditional Handloom Collection',
    'Wholesale Bulk Purchase',
    'Custom Weaving / Other Queries'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      setError('Please provide Name and Mobile Number.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          mobile: '',
          city: '',
          requirement: 'Bridal Silk Sarees',
          message: ''
        });
      } else {
        setError(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError('A network error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const phoneNumber = '917997750760';
  const defaultText = 'Hello Sri Srinivasa Silk Sarees, I would like to know more about your collections.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultText)}`;

  return (
    <div className="w-full space-y-16 pb-20">
      
      {/* Page Header */}
      <section className="bg-silk-maroon text-white py-16 text-center border-b border-gold-secondary/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#FAF5ED_1px,transparent_1px)] [background-size:20px_20px] opacity-5"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-secondary">
            Get In Touch
          </span>
          <h1 className="font-luxury text-4xl sm:text-5xl font-bold tracking-wide">
            Contact &amp; Saree Inquiries
          </h1>
          <p className="text-sm text-cream/70">
            Submit your requirements below or message us directly on WhatsApp to speak to M. Sathish Kumar or M. Srinivasulu.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Saree Inquiry Form Column */}
          <div className="lg:col-span-7 bg-white p-8 rounded-xl border border-gold-secondary/25 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="font-luxury text-2xl font-bold text-maroon-dark">
                Submit Showroom Inquiry
              </h2>
              <p className="text-xs text-darktext/60">
                Whip up your requirements and we will catalog specific styles for your showcase or visit.
              </p>
            </div>

            {success && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-emerald-50 border border-emerald-400 p-5 rounded-lg text-emerald-800 text-sm text-center space-y-2"
              >
                <p className="font-bold text-base">✓ Form Submitted Successfully!</p>
                <p className="text-xs">
                  Thank you for reaching out. The proprietors at Sri Srinivasa Silk Sarees will call you on your mobile shortly.
                </p>
              </motion.div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-400 p-4 rounded-lg text-red-800 text-xs text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-bold text-maroon-primary uppercase tracking-wide">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-cream/35 px-4 py-3 text-sm rounded border border-gold-secondary/35 focus:outline-none focus:border-maroon-primary text-darktext"
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="mobile" className="text-xs font-bold text-maroon-primary uppercase tracking-wide">
                    Mobile Number *
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    required
                    placeholder="Enter contact number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full bg-cream/35 px-4 py-3 text-sm rounded border border-gold-secondary/35 focus:outline-none focus:border-maroon-primary text-darktext"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="city" className="text-xs font-bold text-maroon-primary uppercase tracking-wide">
                    City / Town
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="E.g., Madanapalle, Tirupati, Bangalore"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-cream/35 px-4 py-3 text-sm rounded border border-gold-secondary/35 focus:outline-none focus:border-maroon-primary text-darktext"
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="requirement" className="text-xs font-bold text-maroon-primary uppercase tracking-wide">
                    Saree Requirement *
                  </label>
                  <select
                    id="requirement"
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full bg-white px-4 py-3 text-sm rounded border border-gold-secondary/35 focus:outline-none focus:border-maroon-primary text-darktext"
                  >
                    {requirements.map((req, idx) => (
                      <option key={idx} value={req}>
                        {req}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-bold text-maroon-primary uppercase tracking-wide">
                  Message / Details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Detail any specifics: border thickness, fabric color, wedding dates, or bulk quantities..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-cream/35 px-4 py-3 text-sm rounded border border-gold-secondary/35 focus:outline-none focus:border-maroon-primary text-darktext resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-maroon-primary hover:bg-maroon-dark text-white font-bold uppercase tracking-wider text-xs py-4 rounded shadow-lg transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-gold-secondary" />
                <span>{loading ? 'Submitting Form...' : 'Send Inquiry Request'}</span>
              </button>
            </form>
          </div>

          {/* Quick Contact Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* WhatsApp CTA */}
            <div className="bg-emerald-50 border border-emerald-400 p-6 rounded-xl shadow-md space-y-4">
              <div className="flex items-center space-x-3 text-emerald-800">
                <MessageSquare className="w-7 h-7 fill-emerald-600 text-emerald-500" />
                <h3 className="font-bold text-lg">Instant Chat Support</h3>
              </div>
              <p className="text-xs text-emerald-800/80 leading-relaxed">
                Connect directly with our showroom team on WhatsApp. Ask questions, request video calls of silk sarees, or share screenshots of designs you like!
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded shadow transition-colors"
              >
                <span>Message on WhatsApp</span>
              </a>
            </div>

            {/* Timings and addresses */}
            <div className="bg-white p-6 rounded-xl border border-gold-secondary/20 shadow-md space-y-6 flex-grow">
              <h3 className="font-luxury text-2xl font-bold text-maroon-dark tracking-wide border-b border-gold-secondary/20 pb-3">
                Store Locations &amp; Timings
              </h3>

              <div className="space-y-4 text-xs">
                
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-gold-secondary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-maroon-primary">Flagship Showroom</p>
                    <p className="text-darktext/75 leading-relaxed">
                      Beside Radha Krishna Silks &amp; Textiles,<br />
                      Chowdeswari 3rd Street, Kadiri Road,<br />
                      Madanapalle – 517325, Andhra Pradesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-gold-secondary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-maroon-primary">Operating Hours</p>
                    <p className="text-darktext/75">10:00 AM – 8:00 PM (Every Day Open)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-gold-secondary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-maroon-primary">Call Hotlines</p>
                    <p className="text-darktext/75 font-medium space-y-1">
                      <span>📱 7997750760 (Sathish Kumar)</span><br />
                      <span>📱 9502409797 (Srinivasulu)</span><br />
                      <span>📱 8919495829 (Store Desk)</span>
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Beside+Radha+Krishna+Silks+Textiles,+Chowdeswari+3rd+Street,+Kadiri+Road,+Madanapalle+Andhra+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 border border-gold-secondary text-maroon-primary hover:bg-cream text-xs font-bold uppercase tracking-wider py-3.5 rounded transition-all"
                >
                  <Compass className="w-4 h-4 text-gold-secondary" />
                  <span>Navigate Showroom Map</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
