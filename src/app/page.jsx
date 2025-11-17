'use client';

import { Suspense } from 'react';
import Hero from '@/components/home/Hero';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import CategoryNewsGrid from '@/components/home/CategoryNewsGrid';
import ProgramsCarousel from '@/components/home/ProgramsCarousel';

export const dynamic = 'force-dynamic';

function HomeContent() {
  const featuredPrograms = [
    {
      id: 'mananas',
      title: 'De 9 a 11 am',
      description:
        'De 9 am a 11 am nos acompaña Rosa María Solano con noticias, novedades, consejos y buena música. Es un espacio cargado de buena energía y positividad, que nos ameniza nuestras mañanas.',
      days: 'Lunes a viernes',
      schedule: '9 am a 11 am',
      host: 'Rosa María Solano',
      imageUrl: '/assets/CTA2.avif'
    },
    {
      id: 'tarde',
      title: 'Ruta 2',
      description:
        'Una mezcla vibrante de éxitos actuales y clásicos que te mantiene con energía durante toda la tarde, con entrevistas, segmentos interactivos y la compañía de invitados especiales.',
      days: 'Lunes a viernes',
      schedule: '2 pm a 4 pm',
      host: 'Guillermo Leal',
      imageUrl: '/assets/PorTresRazones.avif'
    },
    {
      id: 'noche',
      title: 'Noches Columbia',
      description:
        'Relájate con una curaduría de sonidos chill, noticias ligeras y recomendaciones para cerrar el día con inspiración y buena vibra.',
      days: 'Lunes a viernes',
      schedule: '8 pm a 10 pm',
      host: 'Mariana Jiménez',
      imageUrl: '/assets/about-us/Hero.avif'
    }
  ];

  return (
    <>
      <div className="min-h-screen overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <Hero />
            <ProgramsCarousel
              title="Programas"
              subtitle="Relájate y disfruta de nuestros varios programas"
              programs={featuredPrograms}
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
