import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Noticias',
    description: 'Descubre las últimas noticias y actualidad de Costa Rica en Columbia Estéreo 92.7 FM. Mantente informado con nuestras noticias de música, entretenimiento y más.',
    path: '/news',
    type: 'website',
    keywords: 'noticias, costa rica, actualidad, música, entretenimiento, columbia estereo, 92.7 fm, últimas noticias',
  });
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
