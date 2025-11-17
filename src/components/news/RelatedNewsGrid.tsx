import Link from 'next/link';
import { WordPressPost } from '@/types/wordpress';
import NewsCard from '../UI/NewsCard';

interface RelatedNewsGridProps {
  posts: WordPressPost[];
}

export default function RelatedNewsGrid({ posts }: RelatedNewsGridProps) {
  return (
    <section className="">
      <div className="py-8">
        <div className="flex items-center justify-between mb-2 border-b border-[#1B1B1B]/30 pb-2">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg md:text-2xl lg:text-3xl text-[#1B1B1B]">Más Noticias</h2>
            <p className="text-sm md:text-base text-[#1B1B1B]/60 hidden md:block">
              {posts.length} noticias relacionadas
            </p>
          </div>
          <Link
            href="/news"
            className="text-[#717171] border border-[#D4D5DD] rounded-full px-4 py-2 text-sm hover:scale-105 transition-all duration-300 font-semibold"
          >
            Ver todas
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {posts.map((post, index) => (
            <NewsCard key={post.id} post={post} priority={index < 3} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 