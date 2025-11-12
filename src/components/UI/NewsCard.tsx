'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { WordPressPost } from '@/types/wordpress';

interface NewsCardProps {
  post: WordPressPost;
}

import WordPressService from '@/lib/wordpressService';

export default function NewsCard({ post }: NewsCardProps) {
  const featuredImage = WordPressService.getFeaturedImage(post);
  const formatDate = WordPressService.formatDate;
  const cleanTitle = WordPressService.cleanHtml;

  return (
    <Link href={`/news/${post.slug}`}>
      <article className="group overflow-hidden hover:scale-[1.02] transition-all duration-700">
        <div className="relative aspect-[16/11]">
          <Image
            src={featuredImage}
            alt={cleanTitle(post.title.rendered)}
            fill
            className="object-cover rounded-2xl"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7A00] via-[#FF3D34] to-[#FF0F8C] text-white shadow-[0_12px_30px_-12px_rgba(255,61,98,0.75)] transition-transform duration-500 group-hover:scale-105">
            <FiArrowUpRight className="h-5 w-5" />
          </span>
        </div>

        <div className="pt-3">
          <span className="text-sm font-medium text-[#8A8A8E]">
            {formatDate(post.date)}
          </span>

          <h3 className="text-sm md:text-base -leading-5 font-bold text-[#121212] line-clamp-2">
            {cleanTitle(post.title.rendered)}
          </h3>
        </div>
      </article>
    </Link>
  );
}