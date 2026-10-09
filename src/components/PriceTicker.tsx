'use client';

import React from 'react';
import { Product } from '../lib/api';
import { toBengaliNumber, getUnitBn, getProductIcon } from '../lib/utils';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate the array to create a seamless infinite scrolling effect
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-slate-900 text-slate-100 py-2.5 overflow-hidden border-y border-slate-800 shadow-inner">
      <div className="flex items-center">
        <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-r-md uppercase tracking-wider z-10 shrink-0 shadow-md ml-2 md:ml-4 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          লাইভ দর
        </div>

        <div className="overflow-hidden w-full relative">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {tickerItems.map((item, idx) => {
              const isUp = item.change?.dir === 'up';
              const isDown = item.change?.dir === 'down';
              const pct = item.change?.pct ?? 0;

              return (
                <Link
                  key={`${item.id}-${idx}`}
                  href={`/product/${item.slug}`}
                  className="inline-flex items-center gap-2 mx-5 text-sm hover:text-emerald-400 transition-colors group cursor-pointer"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">{getProductIcon(item)}</span>
                  <span className="font-medium text-slate-200">{item.nameBn}</span>
                  <span className="text-slate-400 text-xs">({getUnitBn(item.unit)}):</span>
                  <span className="font-bold text-white">{toBengaliNumber(item.today)} টাকা</span>
                  
                  {isUp && (
                    <span className="inline-flex items-center text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
                      <TrendingUp className="w-3 h-3 mr-0.5" />
                      ▲ {toBengaliNumber(pct)}%
                    </span>
                  )}
                  {isDown && (
                    <span className="inline-flex items-center text-xs text-rose-400 font-semibold bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800/50">
                      <TrendingDown className="w-3 h-3 mr-0.5" />
                      ▼ {toBengaliNumber(pct)}%
                    </span>
                  )}
                  {!isUp && !isDown && (
                    <span className="inline-flex items-center text-xs text-slate-400 font-semibold bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                      <Minus className="w-3 h-3 mr-0.5" />
                      — ০.০%
                    </span>
                  )}
                  
                  <span className="text-slate-700 ml-4">•</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
