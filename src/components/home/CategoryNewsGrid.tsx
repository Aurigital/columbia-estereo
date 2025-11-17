'use client';

import { useState, useEffect, useCallback } from 'react';
import NewsCard from '../UI/NewsCard';
import WordPressService from '@/lib/wordpressService';
import { WordPressPost, WordPressCategory } from '@/types/wordpress';
import Link from 'next/link';

interface CategoryNewsGridProps {
  title: string;
  subtitle?: string;
  tagSlug?: string;
  maxPosts?: number;
  showLoadMore?: boolean;
  showCategories?: boolean;
  cardType?: 'default' | 'grid';
  onCategoryChange?: (categorySlug: string) => void;
}

export default function CategoryNewsGrid({
  title,
  subtitle,
  tagSlug,
  showLoadMore = true,
  showCategories = false,
  cardType = 'default',
  onCategoryChange
}: CategoryNewsGridProps) {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [categoryId, setCategoryId] = useState<number | null | undefined>(undefined);
  const [tagId, setTagId] = useState<number | null | undefined>(undefined);
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const POSTS_PER_PAGE = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categories } = await WordPressService.getCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    if (showCategories) {
      fetchCategories();
    }
  }, [showCategories]);

  useEffect(() => {
    const getTagId = async () => {
      try {
        if (!tagSlug) {
          setTagId(null);
          setError(null);
          return;
        }

        const result = await WordPressService.getTags();
        const id = result.tagsMap[tagSlug];
        
        if (id) {
          setTagId(id);
          setError(null);
        } else {
          console.warn(`Tag "${tagSlug}" no encontrado en WordPress`);
          setTagId(null);
        }
      } catch (error) {
        console.error('Error loading tags map:', error);
        setError('Error al cargar los tags');
        setLoading(false);
      }
    };

    getTagId();
  }, [tagSlug]);

  useEffect(() => {
    const getCategoryId = async () => {
      try {
        if (selectedCategory === 'todas') {
          setCategoryId(null);
          setError(null);
          return;
        }

        const { categoriesMap } = await WordPressService.getCategories();
        const id = categoriesMap[selectedCategory];
        
        if (id) {
          setCategoryId(id);
          setError(null);
        } else {
          setError(`Categoría "${selectedCategory}" no encontrada`);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading categories map:', error);
        setError('Error al cargar las categorías');
        setLoading(false);
      }
    };

    if (showCategories) {
      getCategoryId();
    }
  }, [selectedCategory, showCategories]);

  const fetchPosts = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
      }
      setError(null);

      if (tagSlug && !tagId) {
        setPosts([]);
        setTotalPosts(0);
        setHasMore(false);
        return;
      }

      if (showCategories && selectedCategory !== 'todas' && !categoryId) {
        setPosts([]);
        setTotalPosts(0);
        setHasMore(false);
        return;
      }

      const result = await WordPressService.getPosts({
        page: pageNum,
        perPage: POSTS_PER_PAGE,
        categories: showCategories && categoryId ? [categoryId] : [],
        tags: tagId ? [tagId] : [],
        orderBy: 'date'
      });

      if (append) {
        setPosts(prev => [...prev, ...result.posts]);
      } else {
        setPosts(result.posts);
      }

      setTotalPosts(result.totalItems);
      setHasMore(pageNum < result.totalPages);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar noticias');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId, tagId, showCategories, tagSlug, selectedCategory]);

  useEffect(() => {
    if ((tagId !== undefined || !tagSlug) && (categoryId !== undefined || !showCategories) && !error) {
      setPage(1);
      fetchPosts(1, false);
    }
  }, [categoryId, tagId, error, fetchPosts, tagSlug, showCategories]);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    setPosts([]);
    setPage(1);
    if (onCategoryChange) {
      onCategoryChange(slug);
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchPosts(page, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, true);
  };

  if (error) {
    return (
      <div className="flex-1 px-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-7xl mx-auto">
          <div className="rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-[#1B1B1B] mb-2">
              Error al cargar noticias
            </h3>
            <p className="text-[#1B1B1B]/80 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="text-[#717171] border border-[#D4D5DD] px-4 py-2 rounded-md hover:scale-105 transition-all duration-300"
              >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
          <div className="w-full">
            <div className="flex items-center justify-between mb-2 border-b border-[#1B1B1B]/30 pb-2">
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-lg md:text-2xl lg:text-3xl text-[#1B1B1B]">{title}</h2>
                <p className="text-sm md:text-base text-[#1B1B1B]/60 hidden md:block"> {subtitle}</p>
              </div>
              <Link href="/news" className="text-[#717171] border border-[#D4D5DD] rounded-full px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm flex items-center hover:scale-105 transition-all duration-300">
                Ver todas <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        {loading && posts.length === 0 && (
          <>
            {cardType === 'grid' ? (
              <div className="grid grid-cols-1 space-y-4">
                {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 h-32 rounded-2xl"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 aspect-[16/11] rounded-2xl mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-3 w-24"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index + 2} className="animate-pulse">
                      <div className="bg-gray-200 aspect-[16/11] rounded-2xl mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-3 w-20"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {posts.length > 0 && (
          <>
            {cardType === 'grid' ? (
              <div className="grid grid-cols-1">
                {posts.map((post, index) => (
                  <NewsCard key={post.id} post={post} priority={index < 2} index={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {Array.from({ length: Math.ceil(posts.length / 5) }).map((_, groupIndex) => {
                  const startIndex = groupIndex * 5;
                  const groupPosts = posts.slice(startIndex, startIndex + 5);

                  return (
                    <div key={groupIndex} className="space-y-4 sm:space-y-6">
                      {groupPosts.slice(0, 2).length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 [&_article>div:first-child]:!aspect-[16/9]">
                          {groupPosts.slice(0, 2).map((post, idx) => (
                            <NewsCard key={post.id} post={post} priority={startIndex + idx < 2} index={startIndex + idx} />
                          ))}
                        </div>
                      )}

                      {groupPosts.slice(2, 5).length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          {groupPosts.slice(2, 5).map((post, idx) => (
                            <NewsCard key={post.id} post={post} priority={false} index={startIndex + idx + 2} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {hasMore && !loading && showLoadMore && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="text-[#717171] border border-[#D4D5DD] px-4 py-2 rounded-md hover:scale-105 transition-all duration-300"
                >
                  Cargar más noticias
                </button>
              </div>
            )}
          </>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#1B1B1B] text-lg">
              No se encontraron noticias en esta categoría
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 