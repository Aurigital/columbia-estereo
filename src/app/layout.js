import './globals.css'
import { SearchProvider } from '@/lib/SearchContext'
import { PlayerProvider } from '@/lib/PlayerContext'
import RadioPlayer from '@/components/RadioPlayer'
import Script from 'next/script'
import SplashPage from '@/components/SplashPage'  

export const metadata = {
  title: 'Columbia Estéreo 92.7 FM - La Romántica de Costa Rica',
  description: 'Columbia Estéreo - Una emisora costarricense de Grupo Columbia dedicada a las canciones que acompañan historias, romances, recuerdos y momentos inolvidables.',
  keywords: 'columbia estereo, 92.7 fm, radio romantica, musica latina, radio costa rica, radio online, streaming, musica en vivo, musica hispanohablante, radio en vivo',
  authors: [{ name: 'Columbia Estéreo' }],
  creator: 'Columbia Estéreo',
  publisher: 'Columbia Estéreo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://columbiaestereo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Columbia Estéreo 92.7 FM - La Romántica de Costa Rica',
    description: 'Una emisora costarricense de Grupo Columbia dedicada a las canciones que acompañan historias, romances, recuerdos y momentos inolvidables.',
    url: 'https://columbiaestereo.com',
    siteName: 'Columbia Estéreo',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Columbia Estéreo 92.7 FM - La Romántica',
      },
    ],
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Columbia Estéreo 92.7 FM - La Romántica de Costa Rica',
    description: 'Una emisora costarricense de Grupo Columbia dedicada a las canciones que acompañan historias, romances, recuerdos y momentos inolvidables.',
    creator: '@927estereo',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#D90043',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-CR" className="overflow-x-hidden">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ECE367HRCW"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ECE367HRCW');
          `}
        </Script>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RadioStation",
            "name": "Columbia Estéreo",
            "description": "Una emisora costarricense de Grupo Columbia dedicada a las canciones que acompañan historias, romances, recuerdos y momentos inolvidables.",
            "url": "https://columbiaestereo.com",
            "logo": "https://columbiaestereo.com/assets/Logo.png",
            "sameAs": [
              "https://www.facebook.com/columbiaestereo/?locale=es_LA",
              "https://www.instagram.com/columbiaestereo/?hl=es",
              "https://x.com/927estereo/",
              "https://www.youtube.com/@ColumbiaDigital"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "Spanish"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CR"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Costa Rica"
            }
          })}
        </Script>
      </head>
      <body>
        <SearchProvider>
          <PlayerProvider>
            <SplashPage />
            {children}
            <RadioPlayer />
          </PlayerProvider>
        </SearchProvider>
      </body>
    </html>
  )
}
