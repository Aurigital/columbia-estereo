'use client';

import { Suspense } from 'react';
import Hero from '@/components/home/Hero';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import CategoryNewsGrid from '@/components/home/CategoryNewsGrid';
import ProgramsCarousel from '@/components/home/ProgramsCarousel';

export const dynamic = 'force-dynamic';

function HomeContent() {

  return (
    <>
      <div className="min-h-screen overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <Hero />
            <ProgramsCarousel
              title="Programas"
              subtitle="Relájate y disfruta de nuestros varios programas"
            />
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
        <Suspense fallback={<div />}> 
          <HomeContent />
        </Suspense>
      </div>
      <CTA />
      <Footer />
    </>
  );
}
