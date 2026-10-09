import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { getAllCategories, getAllProducts, Category, Product } from '@/lib/api';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'বাজার দর (BazarDor) — প্রয়োজনীয় পণ্যের বাজার দর এক নজরে',
  description: 'সারা বাংলাদেশের চাল, ডাল, তেল, সবজি, মাছ ও মাংসের দৈনিক আপডেট খুচরা ও পাইকারি বাজার দর।',
  keywords: ['বাজার দর', 'BazarDor', 'bazar price bangladesh', 'চাল ডাল তেল দাম', 'দৈনিক বাজারদর'],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categories: Category[] = [];
  let products: Product[] = [];
  
  try {
    [categories, products] = await Promise.all([
      getAllCategories(),
      getAllProducts(),
    ]);
  } catch (error) {
    console.error('Failed to fetch navbar data in RootLayout:', error);
  }

  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#1e293b',
                color: '#fff',
                borderRadius: '12px',
                padding: '12px 18px',
                fontSize: '14px',
                fontWeight: '600',
              },
            }}
          />
          <Suspense fallback={<div className="h-16 bg-white border-b border-slate-200" />}>
            <Navbar categories={categories} tickerProducts={products} />
          </Suspense>
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
