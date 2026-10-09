'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export default function HeroBanner() {
  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('সব-পণ্য');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-slate-900 to-slate-950 text-white py-12 md:py-20 lg:py-24 border-b border-slate-800">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>নিত্যপ্রয়োজনীয় দ্রব্যের নির্ভরযোগ্য বাজারদর</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              সঠিক দামে কেনাকাটা করুন, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                আপনার শহরের বাজারদর জানুন
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              সারা বাংলাদেশের স্থানীয় ও পাইকারি বাজারের চাল, ডাল, তেল, সবজি, মাছ ও মাংসের প্রতিদিনের সঠিক দামের হালনাগাদ তথ্য এক নজরে পরখ করুন।
            </p>

            {/* Features badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs sm:text-sm font-medium text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>দৈনিক পরিবর্তন ট্র্যাকিং</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>বাজারভিত্তিক তুলনা</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#সব-পণ্য"
                onClick={scrollToProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base transition-all transform hover:-translate-y-0.5 shadow-lg shadow-emerald-500/25 cursor-pointer"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Image Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/30 rounded-3xl blur-2xl transform scale-95"></div>
              
              <div className="relative bg-slate-800/60 p-4 sm:p-6 rounded-3xl border border-slate-700/80 backdrop-blur-md shadow-2xl overflow-hidden">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজার দর হিরো চিত্র"
                  width={600}
                  height={400}
                  priority
                  className="w-full h-auto object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
