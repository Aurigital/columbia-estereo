'use client';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSearch } from '@/lib/SearchContext';
import { usePlayer } from '@/lib/PlayerContext';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface MenuItem {
  key: string;
  label: string;
  href: string;
}

interface NavbarProps {
  backgroundColor?: string;
}

export default function Navbar({ backgroundColor = '#101010' }: NavbarProps) {
  const pathname = usePathname();
  const { setSearchTerm } = useSearch();
  const { playRadio } = usePlayer();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const menuItems: MenuItem[] = [
    { key: 'inicio', label: 'Inicio', href: '/' },
    { key: 'programas', label: 'Programas', href: '/shows' },
    { key: 'noticias', label: 'Noticias', href: '/news' },
  ];

  const socialLinks: { key: string; label: string; href: string; icon: React.ReactNode }[] = [
    {
      key: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/columbiaestereo/?locale=es_LA',
      icon: <FaFacebookF className="w-4 h-4" />,
    },
    {
      key: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/columbiaestereo/?hl=es',
      icon: <FaInstagram className="w-4 h-4" />,
    },
    {
      key: 'x',
      label: 'X (Twitter)',
      href: 'https://x.com/927estereo/',
      icon: <FaXTwitter className="w-4 h-4" />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent, searchValue: string) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setSearchTerm(searchValue.trim());
      setLocalSearchTerm('');
      closeMenu();

      const params = new URLSearchParams();
      params.set('search', searchValue.trim());
      const newURL = `/news?${params.toString()}`;

      if (window.location.pathname === '/news') {
        router.replace(newURL, { scroll: false });
      } else {
        router.push(newURL);
      }
    }
  };

  const handleSearchInputChange = (value: string) => {
    setLocalSearchTerm(value);
  };

  const handleEnVivoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playRadio();
    closeMenu();
  };

  const isCurrent = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className="w-full text-white border-b border-white/5"
        style={{ backgroundColor }}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-8">
            <Link href="/" className="inline-flex items-center">
              <img src="/assets/Logo.svg" alt="Columbia Estéreo" className="w-36" />
            </Link>
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/90">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`transition-colors ${
                    isCurrent(item.href) ? 'text-white' : 'hover:text-white/90'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            <div ref={searchContainerRef} className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  isSearchOpen
                    ? 'bg-white/15 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
                aria-label="Buscar"
              >
                <FiSearch className="h-4 w-4" />
              </button>
              <form
                onSubmit={(e) => handleSearch(e, localSearchTerm)}
                className={`flex items-center gap-2 overflow-hidden rounded-full transition-all duration-300 ease-out ${
                  isSearchOpen
                    ? 'ml-2 w-64 border border-white/10 bg-[#161616] px-4 py-2 opacity-100 shadow-lg shadow-black/30'
                    : 'ml-0 w-0 border-none bg-transparent px-0 py-0 opacity-0 pointer-events-none'
                }`}
              >
                <FiSearch className="h-4 w-4 text-white/40" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Buscar en noticias"
                  value={localSearchTerm}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </form>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <button
              onClick={handleEnVivoClick}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#D92A34] px-5 py-2 font-semibold text-white shadow-md shadow-[#D92A34]/30 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#D92A34]/60"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              En vivo
            </button>

            <button
              onClick={toggleMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Abrir menú"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-80 bg-[#050505] border-l border-[#141414] shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#141414]">
            <div className="flex items-center justify-between">
              <img src="/assets/Logo.svg" alt="Columbia Estéreo" className="w-28" />
              <button
                onClick={closeMenu}
                className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Cerrar menú"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <button
              onClick={handleEnVivoClick}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D92A34] px-5 py-3 font-semibold text-white shadow-md shadow-[#D92A34]/30 transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#D92A34]/60"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              En vivo
            </button>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <form onSubmit={(e) => handleSearch(e, localSearchTerm)}>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#161616] px-4 py-2">
                <FiSearch className="h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar en noticias"
                  value={localSearchTerm}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </div>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => {
                    closeMenu();
                  }}
                  className={`flex items-center px-6 py-3 text-lg font-medium transition-colors ${
                    isCurrent(item.href)
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
} 