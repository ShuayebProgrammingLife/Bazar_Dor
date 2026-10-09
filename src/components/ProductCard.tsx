'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/api';
import { toBengaliNumber, getUnitBn, getProductIcon } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pct = product.change?.pct ?? 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
    >
      {/* Top Card Bar: Emoji & Category Tag */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-emerald-100/70 transition-all shadow-inner">
          {getProductIcon(product)}
        </div>

        {/* Change Badge */}
        {isUp && (
          <span className="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            <TrendingUp className="w-3.5 h-3.5" />
            ▲ {toBengaliNumber(pct)}%
          </span>
        )}
        {isDown && (
          <span className="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
            <TrendingDown className="w-3.5 h-3.5" />
            ▼ {toBengaliNumber(pct)}%
          </span>
        )}
        {!isUp && !isDown && (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            <Minus className="w-3.5 h-3.5" />
            — ০.০%
          </span>
        )}
      </div>

      {/* Product Title & Unit */}
      <div className="space-y-1 mb-4">
        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
          {product.nameBn}
        </h3>
        <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
          <span>🏷️ {product.categoryNameBn || 'অন্যান্য'}</span>
          <span>•</span>
          <span>{getUnitBn(product.unit)}</span>
        </p>
      </div>

      {/* Price Block */}
      <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-400 block mb-0.5">আজকের দাম</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {toBengaliNumber(product.today)}
            </span>
            <span className="text-sm font-bold text-slate-600">টাকা</span>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
