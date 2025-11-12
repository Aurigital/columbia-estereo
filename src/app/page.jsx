'use client';

import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/home/Hero';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import CategoryNewsGrid from '@/components/home/CategoryNewsGrid';

export const dynamic = 'force-dynamic';

function HomeContent() {

  return (
    <>
      <div className="min-h-screen overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <CategoryNewsGrid
              title="Últimas Noticias"
              subtitle="Mira lo más reciente que ha pasado en el mundo "
              tagSlug=""
              showCategories={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <Suspense fallback={<div />}> 
          <HomeContent />
        </Suspense>
      </div>
      <CTA />
      <Footer />
    </>
  );
}
