import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Side: Brand info */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-lg shadow-sm">
              🛒
            </div>
            <div>
              <p className="font-extrabold text-white text-lg tracking-tight">
                বাজার দর
              </p>
              <p className="text-xs text-slate-400 font-medium">
                প্রয়োজনীয় পণ্যের দাম এক নজরে।
              </p>
            </div>
          </div>

          {/* Right Side: Disclaimer */}
          <div className="text-center md:text-right max-w-md">
            <p className="text-xs text-slate-400 italic font-medium leading-relaxed bg-slate-800/60 px-4 py-2 rounded-lg border border-slate-700/60">
              “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
            </p>
            <p className="text-[11px] text-slate-500 mt-2 font-semibold">
              © ২০২৬ বাজার দর (BazarDor)। সর্বস্বত্ব সংরক্ষিত।
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
