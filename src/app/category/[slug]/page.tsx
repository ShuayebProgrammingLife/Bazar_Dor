import React, { Suspense, use } from 'react';
import CategoryClient from './CategoryClient';
import { getAllCategories } from '@/lib/api';

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((cat) => ({
      slug: cat.slug || cat.id,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams for categories:', error);
    return [];
  }
}

function CategoryWrapper({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <CategoryClient slug={slug} />;
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-slate-600">ক্যাটাগরি ডেটা লোড হচ্ছে...</p>
        </div>
      }
    >
      <CategoryWrapper params={params} />
    </Suspense>
  );
}
