'use client';

import React from 'react';
import { ChevronDown, ArrowUpDown } from 'lucide-react';

export type SortOption = 'default' | 'price-asc' | 'price-desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (val: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-flex items-center">
      <div className="absolute left-3 pointer-events-none text-slate-500">
        <ArrowUpDown className="w-4 h-4" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none bg-white border border-slate-300 hover:border-emerald-500 rounded-xl pl-9 pr-10 py-2 text-sm font-semibold text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer transition-colors"
      >
        <option value="default">সাজান: ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>
      <div className="absolute right-3 pointer-events-none text-slate-500">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}
