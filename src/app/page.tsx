import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, getAllCategories, Product, Category } from '@/lib/api';
import { TrendingUp, TrendingDown, LayoutGrid, Search, Filter } from 'lucide-react';
import Link from 'next/link';


export default async function HomePage() {
  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    [products, categories] = await Promise.all([
      getAllProducts(),
      getAllCategories(),
    ]);
  } catch (error) {
    console.error('Failed to load products for homepage:', error);
  }

  // Filter top 6 risers (Section A)
  const risers = products
    .filter((p) => p.change?.dir === 'up')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // Filter top 6 fallers (Section B)
  const fallers = products
    .filter((p) => p.change?.dir === 'down')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner Component */}
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section A: আজ দাম বেড়েছে ▲ */}
        {risers.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold shadow-xs">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    আজ দাম বেড়েছে <span className="text-rose-600">▲</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    যেসব পণ্যের দাম গতকালের তুলনায় সবচেয়ে বেশি বৃদ্ধি পেয়েছে (টপ ৬)
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {risers.map((product) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section B: আজ দাম কমেছে ▼ */}
        {fallers.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    আজ দাম কমেছে <span className="text-emerald-600">▼</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    যেসব পণ্যের দাম গতকালের তুলনায় হ্রাস পেয়েছে (টপ ৬)
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fallers.map((product) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section C: সব পণ্য (#সব-পণ্য) */}
        <section id="সব-পণ্য" className="space-y-8 scroll-mt-24">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>সামগ্রিক ক্যাটালগ</span>
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight">
                  সকল নিত্যপ্রয়োজনীয় পণ্য
                </h2>
                <p className="text-sm text-slate-300">
                  সর্বমোট {products.length} টি পণ্যের প্রতিদিনের বাজার দর ও পরিবর্তন তালিকা
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-colors"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* All Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
