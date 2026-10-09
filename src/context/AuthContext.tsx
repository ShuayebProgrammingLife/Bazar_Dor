'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getBanglaDate } from '@/lib/utils';
import { Category, Product } from '@/lib/api';
import PriceTicker from './PriceTicker';
import { User as UserIcon, LogOut, Calendar, Menu, X } from 'lucide-react';

interface NavbarProps {
  categories: Category[];
  tickerProducts?: Product[];
}

export default function Navbar({ categories, tickerProducts = [] }: NavbarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [banglaDate, setBanglaDate] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBanglaDate(getBanglaDate());
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Bangla Date */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🛒</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                  বাজার দর
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  লাইভ
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 font-medium mt-0.5">
                <Calendar className="w-3 h-3 text-emerald-600" />
                {banglaDate}
              </p>
            </div>
          </Link>

          {/* Right: User Auth & Profile Actions (Hydration safe with mounted state) */}
          <div className="hidden md:flex items-center gap-3">
            {!mounted ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm shadow-emerald-600/30 transition-all"
                >
                  সাইন আপ
                </Link>
              </div>
            ) : user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200 text-slate-800 text-sm font-semibold"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-slate-300"
                    />
                  ) : (
                    <UserIcon className="w-4 h-4 text-emerald-600" />
                  )}
                  <span>{user.name}</span>
                </Link>
                
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors text-sm font-semibold border border-rose-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>সাইন আউট</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm shadow-emerald-600/30 transition-all"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Middle Row: Category Navigation Links */}
      <nav className="bg-slate-50/90 border-t border-slate-200/80 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-1.5 min-w-max">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-md text-sm font-semibold transition-all ${
                pathname === '/'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
              }`}
            >
              সব পণ্য
            </Link>

            {categories &&
              categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.id || cat.slug}
                    href={`/category/${cat.slug}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                );
              })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          <div className="pt-2 pb-3 border-b border-slate-100 flex flex-col gap-2">
            {mounted && user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-lg">
                  <UserIcon className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{user.name}</span>
                  <span className="text-xs text-slate-500">({user.email})</span>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-lg"
                >
                  মাই প্রোফাইল
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-rose-600 bg-rose-50 rounded-lg"
                >
                  সাইন আউট
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Marquee Ticker Strip */}
      <PriceTicker products={tickerProducts} />
    </header>
  );
}
