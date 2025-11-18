'use client';
import Link from 'next/link';
import { Home, ArrowLeft, Radio } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto relative opacity-0 animate-fadeInUp" style={{ animationFillMode: 'forwards' }}>
        {/* Contenido principal */}
        <div className="relative z-10">
          {/* Número 404 con efecto de radio */}
          <div className="mb-8 relative">
            <h1 className="text-8xl md:text-[10rem] font-bold leading-none">
              <span className="text-[#000000]">4</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#D90043] to-[#FFB700] bg-clip-text text-transparent animate-pulse">0</span>
                <Radio className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-[#FF3D34] opacity-20" />
              </span>
              <span className="text-[#000000]">4</span>
            </h1>
          </div>

          {/* Mensaje principal */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#000000]">
              Señal no encontrada
            </h2>
            <p className="text-lg text-[#000000]/60 leading-relaxed">
              Parece que has sintonizado una frecuencia que no existe.
              Ajustemos la señal para llevarte de vuelta a la programación.
            </p>
          </div>

          {/* Separador con gradiente */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#000000]/20 to-transparent mb-12"></div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="flex items-center gap-2 bg-gradient-to-r from-[#D90043] to-[#FFB700] text-white px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center group font-semibold shadow-lg"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Volver al inicio
            </Link>

            <Link
              href="/news"
              className="flex items-center gap-2 bg-transparent text-[#717171] border border-[#D4D5DD] px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center group font-semibold"
            >
              <Radio className="w-5 h-5 group-hover:animate-spin" />
              Ver noticias
            </Link>
          </div>

          {/* Botón de regresar */}
          <div className="mt-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-[#000000]/40 hover:text-[#FF3D34] transition-colors duration-300 mx-auto group font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Regresar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 