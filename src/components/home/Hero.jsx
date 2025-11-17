"use client";
import { useState } from "react";
import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Navbar from "@/components/Navbar";

const programas = [
  {
    nombre: "Mañanas Estéreo",
    autor: "Rosa María Solano",
    horario: "Lunes a Viernes: 7 am - 10 am",
    imagen: "/assets/homepage/de9a11.png"
  },
  {
    nombre: "Música para Dos",
    autor: "Juan Carlos Ugalde",
    horario: "Lunes a Viernes: 4:30 pm - 7pm",
    imagen: "/assets/homepage/musicaParaDos.png"
  },
  {
    nombre: "Éxitos Estéreo",
    autor: "Rosa María Solano",
    horario: "Sábados: 12pm - 2pm",
    imagen: "/assets/homepage/exitosEstereo.png"
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % programas.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? programas.length - 1 : prev - 1));
  };

  const selected = programas[currentIndex];

  return (
    <section className="relative h-[95vh] w-full overflow-hidden bg-black mb-8">
      <div className="absolute z-20 w-full">
        <Navbar
          backgroundColor="bg-black/5"
        />
      </div>

      {/* Fondo con imagen del programa actual */}
      <div className="absolute inset-0">
        <Image
          src={selected.imagen}
          alt={selected.nombre}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Espaciador superior para mantener el foco abajo */}
        <div className="flex-1" />

        {/* Información del programa abajo a la izquierda y flechas abajo a la derecha */}
        <div className="flex items-end justify-between px-6 sm:px-10 pb-10">
          {/* Info programa */}
          <div className="max-w-2xl">
            <p className="text-white/70 text-xs sm:text-sm mb-2 flex items-center gap-2">
              <span className="uppercase tracking-[0.25em] font-bebas text-white/60">
                {selected.autor}
              </span>
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-3">
              {selected.nombre}
            </h1>
            <p className="text-white/70 text-sm sm:text-base mb-2">
              {selected.horario}
            </p>
          </div>

          {/* Controles del carrusel (desktop) */}
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

        {/* Controles del carrusel (mobile) */}
        <div className="sm:hidden flex justify-center gap-6 pb-6">
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
    </section>
  );
};

export default Hero;