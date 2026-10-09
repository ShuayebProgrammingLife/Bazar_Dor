'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Edit3, User as UserIcon, ArrowLeft, CheckCircle, UploadCloud } from 'lucide-react';

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('শুধু ইমেজ ফাইল নির্বাচন করুন');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setAvatarPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await updateUser(name, avatarPreview || user.avatar);
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
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-emerald-200 bg-slate-100 shadow-sm">
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-emerald-50 text-emerald-700">
                  <UserIcon className="h-8 w-8" />
                </div>
              )}
            </div>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700">
              <UploadCloud className="h-4 w-4" />
              <span>প্রোফাইল ছবি নির্বাচন</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>

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
