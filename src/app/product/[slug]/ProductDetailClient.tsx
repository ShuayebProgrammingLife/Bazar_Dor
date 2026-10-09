'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getSingleProduct, Product } from '@/lib/api';
import { toBengaliNumber, getUnitBn, getProductIcon } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  Lock,
  Building2,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  CheckCircle2,
  BarChart3
} from 'lucide-react';

export default function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [marketSearch, setMarketSearch] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('পণ্যভিত্তিক বিস্তারিত বিবরণ দেখতে অনুগ্রহ করে সাইন ইন করুন');
      router.push('/signin');
      return;
    }

    async function fetchProduct() {
      setLoading(true);
      try {
        const data = await getSingleProduct(slug);
        setProduct(data);
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProduct();
    }
  }, [slug, user, authLoading, router]);

  if (authLoading || (loading && user)) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-semibold text-slate-600">পণ্যের বিস্তারিত ডেটা লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-5 shadow-lg">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">সুরক্ষিত পৃষ্ঠা</h2>
          <p className="text-sm text-slate-600">
            বাজারভিত্তিক বিস্তারিত দাম দেখতে আপনাকে সাইন ইন করতে হবে।
          </p>
        </div>
        <Link
          href="/signin"
          className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto my-16 p-10 bg-white rounded-3xl border border-slate-200 text-center space-y-5 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-sm text-slate-500">অনুরোধকৃত পণ্যটির সঠিক তথ্য পাওয়া যায়নি।</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const markets = product.markets || [];
  let minPrice = product.today;
  let maxPrice = product.today;
  let avgPrice = product.today;

  if (markets.length > 0) {
    const minValues = markets.map((m) => m.min).filter(Boolean);
    const maxValues = markets.map((m) => m.max).filter(Boolean);
    if (minValues.length) minPrice = Math.min(...minValues);
    if (maxValues.length) maxPrice = Math.max(...maxValues);
    const sum = markets.reduce((acc, curr) => acc + ((curr.min + curr.max) / 2), 0);
    avgPrice = Math.round(sum / markets.length);
  }

  const divisions = Array.from(new Set(markets.map((m) => m.division))).filter(Boolean);

  const filteredMarkets = markets.filter((m) => {
    const matchesDiv = selectedDivision === 'all' || m.division === selectedDivision;
    const matchesSearch =
      m.market.toLowerCase().includes(marketSearch.toLowerCase()) ||
      m.division.toLowerCase().includes(marketSearch.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pct = product.change?.pct ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>সকল পণ্যের তালিকায় ফিরে যান</span>
      </Link>

      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-inner">
              {getProductIcon(product)}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  {product.categoryNameBn || 'অন্যান্য'}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">
                  {getUnitBn(product.unit)}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {product.nameBn}
              </h1>

              <p className="text-sm text-slate-300 max-w-xl">
                আজকের গড় খুচরা বাজার দর: <span className="font-bold text-emerald-400">{toBengaliNumber(product.today)} টাকা</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 flex flex-col items-center justify-center text-center space-y-1 min-w-[200px]">
            <span className="text-xs font-semibold text-slate-400">গতকালের তুলনায় পরিবর্তন</span>
            {isUp && (
              <span className="inline-flex items-center gap-1 text-lg font-black text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                ▲ {toBengaliNumber(pct)}% বৃদ্ধি
              </span>
            )}
            {isDown && (
              <span className="inline-flex items-center gap-1 text-lg font-black text-rose-400">
                <TrendingDown className="w-5 h-5" />
                ▼ {toBengaliNumber(pct)}% হ্রাস
              </span>
            )}
            {!isUp && !isDown && (
              <span className="inline-flex items-center gap-1 text-lg font-black text-slate-400">
                <Minus className="w-5 h-5" />
                — ০.০% অপরিবর্তিত
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">সর্বনিম্ন বাজার দর</p>
            <p className="text-3xl font-black text-emerald-600">{toBengaliNumber(minPrice)} <span className="text-sm font-bold text-slate-700">টাকা</span></p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">সর্বোচ্চ বাজার দর</p>
            <p className="text-3xl font-black text-rose-600">{toBengaliNumber(maxPrice)} <span className="text-sm font-bold text-slate-700">টাকা</span></p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">গড় বাজার দর</p>
            <p className="text-3xl font-black text-slate-900">{toBengaliNumber(avgPrice)} <span className="text-sm font-bold text-slate-700">টাকা</span></p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Building2 className="w-6 h-6 text-emerald-600" />
              <span>বাজারভিত্তিক আজকের দাম</span>
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              বিভিন্ন শহরের সুনির্দিষ্ট বাজারের খুচরা মূল্যতালিকা
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedDivision('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedDivision === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
              }`}
            >
              সকল বিভাগ
            </button>
            {divisions.map((div) => (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  selectedDivision === div
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {div}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 uppercase font-extrabold text-xs border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">বাজারের নাম</th>
                  <th className="px-6 py-4">বিভাগ</th>
                  <th className="px-6 py-4">সর্বনিম্ন দাম</th>
                  <th className="px-6 py-4">সর্বোচ্চ দাম</th>
                  <th className="px-6 py-4">পরিস্থিতি</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {filteredMarkets.length > 0 ? (
                  filteredMarkets.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 text-slate-900 font-bold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{m.market}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{m.division}</td>
                      <td className="px-6 py-4 text-emerald-600 font-extrabold">
                        {toBengaliNumber(m.min)} টাকা
                      </td>
                      <td className="px-6 py-4 text-rose-600 font-extrabold">
                        {toBengaliNumber(m.max)} টাকা
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          স্বাভাবিক
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500 font-medium">
                      এই বিভাগে কোনো বাজারের তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
