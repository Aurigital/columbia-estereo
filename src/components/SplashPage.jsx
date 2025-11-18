'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Radio } from 'lucide-react';

export default function SplashPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

    useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#282828] transition-all duration-700 ease-in-out ${
      isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      <div className="text-center max-w-md mx-auto px-4">
        {/* Logo con animación */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D90043] to-[#FFB700] rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative">
            <Image
              src="/assets/Logo.png"
              alt="Columbia Estéreo"
              width={250}
              height={100}
              className="mx-auto drop-shadow-2xl animate-pulse"
              priority
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div
            className="w-2 h-2 bg-gradient-to-r from-[#D90043] to-[#FFB700] rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-gradient-to-r from-[#D90043] to-[#FFB700] rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-gradient-to-r from-[#D90043] to-[#FFB700] rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
} 