'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { User as UserIcon, Mail, ShieldCheck, Edit3, ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-5 shadow-lg">
        <h2 className="text-2xl font-black text-slate-900">সাইন ইন প্রয়োজন</h2>
        <p className="text-sm text-slate-600">প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন।</p>
        <Link
          href="/signin"
          className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Cover Accent */}
        <div className="h-32 bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900"></div>

        <div className="px-8 pb-8 pt-0 relative">
          
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-xl -mt-12 mb-4 border-2 border-emerald-500 inline-block">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-2xl">
                <UserIcon className="w-10 h-10" />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900">{user.name}</h1>
              <p className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5 mt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>যাচাইকৃত ব্যবহারকারী</span>
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  ইমেইল ঠিকানা:
                </span>
                <span className="font-bold text-slate-900">{user.email}</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200/80">
                <span className="text-slate-500 font-medium">লগইন মাধ্যম:</span>
                <span className="font-bold text-slate-900 capitalize">
                  {user.provider || 'ইমেইল'}
                </span>
              </div>
            </div>

            {/* C3 Challenge Update Info Button */}
            <div className="pt-2">
              <Link
                href="/profile/update"
                className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>তথ্য আপডেট করুন (Update Information)</span>
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
