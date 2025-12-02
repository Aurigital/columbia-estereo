'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { WordPressPost } from '@/types/wordpress';
import { memo } from 'react';

interface NewsCardProps {
  post: WordPressPost;
  priority?: boolean;
  index?: number;
}

import WordPressService from '@/lib/wordpressService';

function NewsCard({ post, priority = false, index = 0 }: NewsCardProps) {
  const featuredImage = WordPressService.getFeaturedImage(post);
  const formatDate = WordPressService.formatDate;
  const cleanTitle = WordPressService.cleanHtml;

  return (
    <Link href={`/news/${post.slug}`}>
      <article
        className="group overflow-hidden hover:scale-[1.02] transition-all duration-500 opacity-0 animate-fadeInUp !text-left"
        style={{
          animationDelay: `${Math.min(index * 75, 400)}ms`,
          animationFillMode: 'forwards'
        }}
      >
        <div className="relative aspect-[16/11] overflow-visible bg-[#fafafa]">
          <Image
            src={featuredImage}
            alt={cleanTitle(post.title.rendered)}
            fill
            className="object-cover rounded-2xl -translate-x-[0.2px]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            quality={75}
          />


          <div className="flex flex-row items-end absolute bottom-0 right-0 overflow-visible translate-x-[1px] translate-y-[1px]">

            <div
              className="w-6 h-6 translate-x-[1px] translate-y-[1px]"
              style={{
                background: 'radial-gradient(circle at top left, transparent 0, transparent 24px, #fafafa 24px, #fafafa 100%)'
              }}
            />


            <div className="flex flex-col items-end">
              <div
                className="w-6 h-6 translate-y-[1px]"
                style={{
                  background: 'radial-gradient(circle at top left, transparent 0, transparent 24px, #fafafa 24px, #fafafa 100%)'
                }}
              />

              <div className="bg-[#fafafa] rounded-tl-3xl items-center justify-center p-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7A00] via-[#FF3D34] to-[#FF0F8C] text-white shadow-[0_12px_30px_-12px_rgba(255,61,98,0.75)] transition-all duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100">
                  <FiArrowUpRight className="h-6 w-6" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3">
          <span className="text-sm font-medium text-[#8A8A8E]">
            {formatDate(post.date)}
          </span>

          <h3 className="text-sm md:text-base -leading-5 font-bold text-[#121212] line-clamp-2 transition-colors duration-300 group-hover:text-[#FF3D34]">
            {cleanTitle(post.title.rendered)}
          </h3>
        </div>
      </article>
    </Link>
  );
}

export default memo(NewsCard);