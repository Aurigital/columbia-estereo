'use client';

import { useMemo, useRef } from 'react';
import Image from 'next/image';
import Slider, { type Settings } from 'react-slick';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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

interface ProgramsCarouselProps {
  title: string;
  subtitle?: string;
  programs: ProgramCard[];
}

export default function ProgramsCarousel({
  title,
  subtitle,
  programs
}: ProgramsCarouselProps) {
  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings = useMemo<Settings>(() => ({
    dots: false,
    infinite: programs.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {}
      }
    ]
  }), [programs.length]);

  if (!programs || programs.length === 0) {
    return null;
  }

  return (
    <section className="programs-carousel">
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

        <Slider ref={sliderRef} {...sliderSettings}>
          {programs.map((program, index) => (
            <div key={program.id ?? index} className="py-4">
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
                        onClick={() => sliderRef.current?.slickPrev()}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-[#1B1B1B] shadow-lg transition hover:bg-white"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Programa siguiente"
                        onClick={() => sliderRef.current?.slickNext()}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-[#1B1B1B] shadow-lg transition hover:bg-white"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <span className="uppercase tracking-[0.3em] text-xs text-[#1B1B1B]/60">
                      {program.days} · {program.schedule}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1B1B1B]">
                      {program.title}
                    </h3>
                    {program.host && (
                      <p className="text-sm md:text-base font-medium text-[#1B1B1B]/70">
                        Con {program.host}
                      </p>
                    )}
                  </div>

                  <p className="text-base md:text-lg leading-relaxed text-[#1B1B1B]/70">
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
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

