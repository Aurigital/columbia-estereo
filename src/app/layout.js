import './globals.css'
import { SearchProvider } from '@/lib/SearchContext'
import { PlayerProvider } from '@/lib/PlayerContext'
import RadioPlayer from '@/components/RadioPlayer'
import Script from 'next/script'
import SplashPage from '@/components/SplashPage'  

export const metadata = {
  title: 'Columbia Estéreo 92.7 FM - La Romántica de Costa Rica',
  description: 'Columbia Estéreo 92.7 FM - La romántica con lo mejor de los nuevos lanzamientos musicales de la escena latina e hispanohablante. Con más de 30 años acompañando corazones con los clásicos románticos y lo más actual de la música hispana.',
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
    description: 'La romántica con lo mejor de los nuevos lanzamientos musicales de la escena latina e hispanohablante. Más de 30 años acompañando corazones.',
    url: 'https://columbiaestereo.com',
    siteName: 'Columbia Estéreo',
    images: [
      {
        url: '/assets/Logo.png',
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
    description: 'La romántica con lo mejor de los nuevos lanzamientos musicales de la escena latina e hispanohablante.',
    creator: '@927estereo',
    images: ['/assets/Logo.png'],
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
            "description": "Columbia Estéreo 92.7 FM - La romántica con lo mejor de los nuevos lanzamientos musicales de la escena latina e hispanohablante. Con más de 30 años acompañando corazones.",
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
