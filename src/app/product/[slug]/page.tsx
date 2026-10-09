import React, { Suspense, use } from 'react';
import ProductDetailClient from './ProductDetailClient';
import { getAllProducts } from '@/lib/api';

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((prod) => ({
      slug: prod.slug || prod.id.toString(),
    }));
  } catch (error) {
    console.error('Error in generateStaticParams for products:', error);
    return [];
  }
}

function ProductDetailWrapper({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <ProductDetailClient slug={slug} />;
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-slate-600">পণ্যের বিস্তারিত লোড হচ্ছে...</p>
        </div>
      }
    >
      <ProductDetailWrapper params={params} />
    </Suspense>
  );
}
