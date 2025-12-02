"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Navbar from "@/components/Navbar";

import "swiper/css";
import "swiper/css/effect-fade";

const programas = [
  {
    nombre: "Mañanas Estéreo",
    autor: "Rosa María Solano",
    horario: "Lunes a Viernes: 7 am - 10 am",
    imagen: "/assets/homepage/MananasEstereo.png",
    imagenMobile: "/assets/homepage/mananasestereoHeroMobile.png"
  },
  {
    nombre: "De 9 a 11",
    autor: "Rosa María Solano",
    horario: "Lunes a viernes - 9 am a 11 am",
    imagen: "/assets/homepage/de9a11.png",
    imagenMobile: "/assets/homepage/de9a11-mobile.png"
  },
  {
    nombre: "Música para Dos",
    autor: "Juan Carlos Ugalde",
    horario: "Lunes a Viernes: 4:30 pm - 7pm",
    imagen: "/assets/homepage/musicaParaDos.png",
    imagenMobile: "/assets/homepage/musicaParaDos-mobile.png"
  },
  {
    nombre: "Éxitos Estéreo",
    autor: "Rosa María Solano",
    horario: "Sábados: 12pm - 2pm",
    imagen: "/assets/homepage/exitosEstereo.png",
    imagenMobile: "/assets/homepage/exitosEstereoHeroMobile.png"
  }
];

const Hero = () => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <section className="relative h-[95vh] w-full overflow-hidden bg-black mb-8">
      <div className="absolute z-20 w-full">
        <Navbar
          backgroundColor="bg-transparent"
        />
      </div>

      <div className="hero-swiper-wrapper absolute inset-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.realIndex);
          }}
          className="!h-full !w-full"
          style={{ position: 'static', height: '100%', width: '100%' }}
        >
          {programas.map((programa, index) => (
            <SwiperSlide key={index} className="!h-full">
              <div className="relative h-full w-full">
                <Image
                  src={programa.imagen}
                  alt={programa.nombre}
                  fill
                  className="object-cover object-center hidden sm:block"
                  sizes="100vw"
                  priority={index === 0}
                />
                <Image
                  src={programa.imagenMobile}
                  alt={programa.nombre}
                  fill
                  className="object-cover object-center block sm:hidden"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
        <div className="flex-1" />

        <div className="flex items-end justify-between px-6 sm:px-10 pb-10 pointer-events-auto">
          <div className="max-w-2xl font-medium">
            <p className="text-white text-xs sm:text-sm mb-2 flex items-center gap-2">
              <span className="uppercase tracking-[0.25em] text-white">
                {programas[currentSlide].autor}
              </span>
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight mb-3">
              {programas[currentSlide].nombre}
            </h1>
            <p className="text-white/80 text-sm sm:text-base mb-2">
              {programas[currentSlide].horario}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/40 bg-black/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Anterior programa"
            >
              <IoChevronBack className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/40 bg-black/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Siguiente programa"
            >
              <IoChevronForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;