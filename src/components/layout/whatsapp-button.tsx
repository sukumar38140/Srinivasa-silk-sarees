'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phoneNumber = '917997750760'; // Standard format with country code (91 for India)
  const defaultText = 'Hello Sri Srinivasa Silk Sarees, I would like to know more about your collections.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultText)}`;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 pointer-events-auto"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl transition-colors relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Inquire on WhatsApp"
      >
        <span className="absolute -left-36 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium tracking-wide shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Inquire on WhatsApp
        </span>
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 border-l-4 border-l-emerald-600 border-y-4 border-y-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        
        {/* Breathing pulse rings */}
        <span className="absolute inset-0 rounded-full border-2 border-emerald-600 animate-ping opacity-35 scale-150"></span>
        
        <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
      </motion.a>
    </motion.div>
  );
}
