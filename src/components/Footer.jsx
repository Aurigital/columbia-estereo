import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="text-white py-12 lg:py-24 bg-[#0C0C0C]">
            <div className="w-full mx-auto max-w-7xl px-4 sm:px-8 container">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start mb-12">
                    <div className="mb-8 md:mb-0 max-w-xs mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">
                        <img src="/assets/LogoFooter.svg" alt="Columbia Estéreo" className="w-52 mb-3" />
                        <p className="text-base leading-tight text-[#FFFFFF] mb-3">
                            La evolución de la radio en Costa Rica. Música, cultura y comunidad que te inspiran.
                        </p>
                        <p className="text-xs text-[#FFFFFF]/60"> © Todos los derechos reservados. 2025 Radio Columbia </p >
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 text-center lg:text-left mx-auto lg:mx-0">
                        <div>
                            <h5 className="text-xl mb-3 flex items-center justify-center lg:justify-start text-[#FFFFFF] font-bold">
                                Información
                            </h5>
                            <ul className="space-y-3 text-sm text-[#FFFFFF]/60">
                                <li><Link href="/about-us" className="hover:text-[#DF4B54] transition-colors">Sobre Nosotros</Link></li>
                                <li><Link href="/shows" className="hover:text-[#DF4B54] transition-colors">Programas</Link></li>
                                <li><Link href="/live" className="hover:text-[#DF4B54] transition-colors">En Vivo</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-xl mb-3 flex items-center justify-center lg:justify-start text-[#FFFFFF] font-bold">
                                Redes
                            </h5>
                            <ul className="space-y-3 text-sm text-[#FFFFFF]/60">
                                <li><a href="https://www.instagram.com/columbiaestereo/?hl=es" target="_blank" rel="noopener noreferrer" className="hover:text-[#DF4B54] transition-colors">Instagram</a></li>
                                <li><a href="https://www.facebook.com/columbiaestereo/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="hover:text-[#DF4B54] transition-colors">Facebook</a></li>
                                <li><a href="https://x.com/927estereo/" target="_blank" rel="noopener noreferrer" className="hover:text-[#DF4B54] transition-colors">Twitter (X)</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-xl mb-3 flex items-center justify-center lg:justify-start text-[#FFFFFF] font-bold">
                                Contacto
                            </h5>
                            <ul className="space-y-3 text-sm text-[#FFFFFF]/60">
                                <li className='flex flex-col lg:flex-row font-bold gap-1 text-[#FFFFFF]/75'>Teléfono: <a href="tel:+50622240707" className="hover:text-[#DF4B54] transition-colors text-[#FFFFFF]/60 font-normal">2224-0707 (8am - 5pm)</a></li>
                                <li className='flex flex-col lg:flex-row font-bold gap-1 text-[#FFFFFF]/75'>Correo: <a href="mailto:ventas@grupocolumbia.co.cr" className="text-[#FFFFFF]/60 font-normal">ventas@grupocolumbia.co.cr</a></li>
                                <li className='flex flex-col font-normal'><Link href="/contact" className="hover:text-[#DF4B54] transition-colors">Anúnciate con nosotros</Link></li>
                                <li className='flex flex-col font-normal'><Link href="/contact" className="hover:text-[#DF4B54] transition-colors">Pauta con nosotros</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
