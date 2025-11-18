'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-fade';

interface ProgramCard {
  id?: string | number;
  title: string;
  description: string;
  days: string;
  schedule: string;
  host?: string;
  imageUrl: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const programs: ProgramCard[] = [
  {
    id: 'mananas',
    title: 'Mañanas Estéreo',
    description:
      'Acompaña tus mañanas con noticias, novedades, consejos y buena música. Un espacio cargado de buena energía y positividad que ameniza tu día.',
    days: 'Lunes a Viernes',
    schedule: '7 am - 10 am',
    host: 'Rosa María Solano',
    imageUrl: '/assets/homepage/de9a11.png'
  },
  {
    id: 'tarde',
    title: 'Música para Dos',
    description:
      'Una mezcla vibrante de éxitos que te acompaña durante tu tarde. Música, entrevistas y segmentos interactivos para disfrutar en buena compañía.',
    days: 'Lunes a Viernes',
    schedule: '4:30 pm - 7 pm',
    host: 'Juan Carlos Ugalde',
    imageUrl: '/assets/homepage/musicaParaDos.png'
  },
  {
    id: 'sabado',
    title: 'Éxitos Estéreo',
    description:
      'Los mejores éxitos del momento y de siempre. Tu compañía perfecta para disfrutar el fin de semana con la mejor música.',
    days: 'Sábados',
    schedule: '12 pm - 2 pm',
    host: 'Rosa María Solano',
    imageUrl: '/assets/homepage/exitosEstereo.png'
  }
];

interface ProgramsCarouselProps {
  title: string;
  subtitle?: string;
  programs: ProgramCard[];
}

export default function ProgramsCarousel({
  title,
  subtitle,
}: ProgramsCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="programs-carousel" id="shows">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between border-b border-[#1B1B1B]/30 pb-2">
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-lg md:text-2xl lg:text-3xl text-[#1B1B1B]">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm md:text-base text-[#1B1B1B]/60 hidden md:block">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="programs-swiper-wrapper">
          <Swiper
            modules={[EffectFade]}
            effect="fade"
            speed={800}
            slidesPerView={1}
            loop={programs.length > 1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            fadeEffect={{
              crossFade: true
            }}
            className="!py-4"
          >
            {programs.map((program, index) => (
              <SwiperSlide key={program.id ?? index}>
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
                  <div className="relative h-[280px] sm:h-[340px] lg:h-[360px] overflow-hidden rounded-3xl">
                    <Image
                      src={program.imageUrl}
                      alt={program.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#F72585]/70 via-transparent to-[#4CC9F0]/70 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
                    {programs.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6">
                        <button
                          type="button"
                          aria-label="Programa anterior"
                          onClick={() => swiperRef.current?.slidePrev()}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-[#1B1B1B] shadow-lg transition hover:bg-white z-10"
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          aria-label="Programa siguiente"
                          onClick={() => swiperRef.current?.slideNext()}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-[#1B1B1B] shadow-lg transition hover:bg-white z-10"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <span className="text-sm text-[#1B1B1B]/60">
                        {program.days} · {program.schedule}
                      </span>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1B1B1B]">
                        {program.title}
                      </h3>
                    </div>

                    <p className="text-base md:text-lg lg:text-xl font-medium leading-relaxed text-[#1B1B1B]/50">
                      {program.description}
                    </p>

                    {program.ctaHref && program.ctaLabel && (
                      <a
                        href={program.ctaHref}
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D4D5DD] px-5 py-2 text-sm font-medium text-[#717171] transition hover:scale-105"
                      >
                        {program.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

