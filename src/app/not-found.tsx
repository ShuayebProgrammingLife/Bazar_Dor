import React from 'react';
import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
        
        <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center font-black text-3xl shadow-inner">
          <FileQuestion className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black px-3 py-1 bg-rose-100 text-rose-800 rounded-full uppercase tracking-wider">
            ৪০৪ ত্রুটি (404 Not Found)
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            পৃষ্ঠাটি পাওয়া যায়নি
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি স্থানান্তরিত হয়েছে, মুছে ফেলা হয়েছে অথবা ভুল ইউআরএল প্রদান করা হয়েছে।
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
