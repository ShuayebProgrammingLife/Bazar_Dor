'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import SortDropdown, { SortOption } from '@/components/SortDropdown';
import { getProductsByCategory, getAllCategories, Product, Category } from '@/lib/api';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function CategoryClient({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>('default');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [catProducts, allCats] = await Promise.all([
          getProductsByCategory(slug),
          getAllCategories(),
        ]);

        const currentCat = allCats.find((c) => c.slug === slug || c.id === slug) || null;
        setCategory(currentCat);
        setProducts(catProducts);
      } catch (err) {
        console.error('Error loading category page:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  const getSortedProducts = () => {
    const list = [...products];
    if (sortOption === 'price-asc') {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortOption === 'price-desc') {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>সকল ক্যাটাগরিতে ফিরে যান</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl p-2 bg-emerald-100/80 rounded-2xl border border-emerald-200">
              {category?.icon || '🛒'}
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {category?.nameBn || slug}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {loading
                  ? 'তথ্য লোড হচ্ছে...'
                  : `${sortedProducts.length} টি পণ্য পাওয়া গেছে`}
              </p>
            </div>
          </div>
        </div>

        {!loading && products.length > 0 && (
          <div className="self-start sm:self-center">
            <SortDropdown value={sortOption} onChange={setSortOption} />
          </div>
        )}
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-slate-200 rounded-2xl"></div>
                <div className="w-16 h-6 bg-slate-200 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && sortedProducts.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center max-w-xl mx-auto border border-slate-200 shadow-sm space-y-5 my-12">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              কোনো পণ্য পাওয়া যায়নি
            </h3>
            <p className="text-sm text-slate-500">
              দুঃখিত, এই ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য তালিকাভুক্ত নেই অথবা ভুল লিংক দেওয়া হয়েছে।
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
          >
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      )}

      {!loading && sortedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
