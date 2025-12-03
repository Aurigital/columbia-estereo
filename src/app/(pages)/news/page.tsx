// src/app/(pages)/news/page.tsx
'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsGrid from '@/components/news/NewsGrid';
import { FilterData } from '@/types/wordpress';
import { Search } from 'lucide-react';
import { useSearch } from '@/lib/SearchContext';

export const dynamic = 'force-dynamic';

function NewsContent({ title }: { title: string }) {
  const searchParams = useSearchParams();
  const { setSearchTerm } = useSearch();

  const initialFilters = useMemo(() => {
    const categoriesParam = searchParams?.get('categories');
    const categories = categoriesParam ? categoriesParam.split(',').filter(Boolean) : [];
    return { categories } as FilterData;
  }, [searchParams]);

  const [filters, setFilters] = useState<FilterData>(initialFilters);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const nextSearch = searchParams?.get('search') ?? '';
    setSearchTerm(nextSearch);
  }, [searchParams, setSearchTerm]);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterChange = (newFilters: FilterData) => {
    setFilters({ categories: [...(newFilters.categories ?? [])] });
  };

  return (
    <>
      <div className="min-h-screen overflow-hidden mx-auto sm:px-8 py-8">        
        <div className="flex flex-col lg:flex-row -my-4 gap-6">
          <div className="flex-1">
            <NewsGrid 
              filters={filters} 
              onOpenFilters={() => setIsMobileFiltersOpen(true)}
              title={title}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function NewsPage() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <Suspense fallback={<div />}> 
          <NewsContent
            title="Noticias"
          />
        </Suspense>
      </div>
      <Footer />
    </>
  );
} 