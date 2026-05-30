import React from 'react';

interface TempleDividerProps {
  className?: string;
  inverse?: boolean;
}

export default function TempleDivider({ className = '', inverse = false }: TempleDividerProps) {
  return (
    <div className={`w-full relative flex items-center justify-center py-4 ${className}`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gold-secondary/30"></div>
      </div>
      <div className="relative flex justify-center bg-transparent">
        <div className={`flex space-x-1 px-4 ${inverse ? 'rotate-180' : ''}`}>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-6 h-3 text-gold-secondary fill-current ${
                i === 2 ? 'scale-130' : i === 1 || i === 3 ? 'scale-110' : 'opacity-70'
              }`}
              viewBox="0 0 24 12"
            >
              <path d="M0 12 L12 0 L24 12 Z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
