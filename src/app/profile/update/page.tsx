'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Edit3, User as UserIcon, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-5">
        <h2 className="text-2xl font-black text-slate-900">সাইন ইন প্রয়োজন</h2>
        <Link href="/signin" className="block py-3 bg-emerald-600 text-white font-bold rounded-xl">
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await updateUser(name);
    setLoading(false);
    if (success) {
      router.push('/profile');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>প্রোফাইলে ফিরে যান</span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold text-xl">
            <Edit3 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            আপনার প্রোফাইলের নাম সংশোধন বা পরিবর্তন করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              সম্পূর্ণ নাম (Name)
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="নতুন নাম লিখুন"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>সংরক্ষণ করা হচ্ছে...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>তথ্য আপডেট করুন (Update Information)</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
