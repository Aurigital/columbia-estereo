'use client';

import { usePlayer } from '@/lib/PlayerContext';

const CTA = () => {
    const { playRadio } = usePlayer();

    const handleEnVivoClick = (e) => {
        e.preventDefault();
        playRadio();
    };

    return (
        <section className="text-white py-12 lg:py-16 mx-auto max-w-7xl px-4 sm:px-8">
        <div className="md:px-12 px-6 py-12 sm:py-16 relative rounded-2xl overflow-hidden h-[500px] flex items-start md:items-center" data-aos="fade-up">
            <div className="absolute inset-0 w-full h-full z-0">
                <img src="/assets/CTA.avif" alt="cta-bg" className="w-full h-full object-cover hidden md:block" />
                <img src="/assets/CTAM.png" alt="cta-bg" className="w-full h-full object-cover block md:hidden" />
            </div>

            <div className="relative z-10">
                <div className="max-w-lg space-y-4 text-center md:text-left">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F9]">Sintoniza ahora!</h2>
                    <div className="text-sm sm:text-base text-[#F3F4F9]/80 font-medium space-y-2">
                        <p>Columbia Estéreo 92.7 FM — "La romántica" con lo mejor de los nuevos lanzamientos musicales de la escena latina e hispanohablante.</p>
                        <p>Con más de 30 años acompañando corazones, damoslo mejor de los clásicos románticos y lo más actual de la música hispana.
                            Somos una emisora para todo el día.</p>
                    </div>
                    <button onClick={handleEnVivoClick} className="inline-flex items-center gap-2 rounded-full bg-white text-[#D90144] px-5 py-2.5 font-light hover:scale-105 transition-all duration-300">
                        Escuchar en vivo <span aria-hidden="true">→</span>
                    </button>
                </div>
            </div>
        </div>
        </section>
    );
}

export default CTA;
