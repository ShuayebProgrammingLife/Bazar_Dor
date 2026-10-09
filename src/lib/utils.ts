// Utility helper functions for BazarDor
import { Product } from './api';

/**
 * Converts English digits to Bengali digits with comma formatting
 */
export function toBengaliNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null || num === '') return '০';

  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  const numVal = typeof num === 'number' ? num : parseFloat(num.toString());

  let formattedStr: string;
  if (!isNaN(numVal)) {
    formattedStr = numVal.toLocaleString('en-IN', { maximumFractionDigits: 1 });
  } else {
    formattedStr = num.toString();
  }

  return formattedStr.replace(/[0-9]/g, (digit) => banglaDigits[parseInt(digit, 10)]);
}

/**
 * Maps unit string code to Bengali phrase
 */
export function getUnitBn(unitStr: string | undefined): string {
  if (!unitStr) return 'প্রতি কেজি';
  const lower = unitStr.toLowerCase().trim();
  if (lower === 'kg' || lower === 'কেজি') return 'প্রতি কেজি';
  if (lower === 'liter' || lower === 'litre' || lower === 'লিটার') return 'প্রতি লিটার';
  if (lower === 'piece' || lower === 'pcs' || lower === 'পিস') return 'প্রতি পিস';
  if (lower === 'dozen' || lower === 'ডজন') return 'প্রতি ডজন';
  if (lower === 'gram' || lower === 'গ্রাম') return 'প্রতি ১০০ গ্রাম';
  return `প্রতি ${unitStr}`;
}

/**
 * Returns formatted current Bengali date
 */
export function getBanglaDate(): string {
  const daysBn = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const monthsBn = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  const now = new Date();
  const dayName = daysBn[now.getDay()];
  const dateNum = toBengaliNumber(now.getDate());
  const monthName = monthsBn[now.getMonth()];
  const yearNum = toBengaliNumber(now.getFullYear());

  return `${dayName}, ${dateNum} ${monthName} ${yearNum}`;
}

/**
 * Returns exact matching icon for products to match Figma design
 */
export function getProductIcon(product: Partial<Product> | undefined | null): string {
  if (!product) return '🛒';

  const slug = (product.slug || '').toLowerCase();
  const name = (product.nameBn || '').toLowerCase();

  // Specific Product Icon Map matching Figma precisely
  if (slug.includes('alu') || name.includes('আলু')) return '🥔';
  if (slug.includes('peyaj') || name.includes('পেঁয়াজ')) return '🧅';
  if (slug.includes('moric') || name.includes('মরিচ') || name.includes('কাঁচামরিচ')) return '🌶️';
  if (slug.includes('begun') || name.includes('বেগুন')) return '🍆';
  if (slug.includes('dhenders') || name.includes('ঢেঁড়স')) return '🌱';
  if (slug.includes('ada') || name.includes('আদা')) return '🫚';
  if (slug.includes('roshun') || name.includes('রসুন')) return '🧄';
  if (slug.includes('dhanepata') || name.includes('ধনে')) return '🌿';
  if (slug.includes('sorishar-tel') || name.includes('সরিষা')) return '🫙';
  if (slug.includes('pam-tel') || name.includes('পাম')) return '🛢️';
  if (slug.includes('chal') || name.includes('চাল')) return '🍚';
  if (slug.includes('dal') || name.includes('ডাল') || name.includes('ছোলা')) return '🫘';
  if (slug.includes('ilish') || name.includes('ইলিশ')) return '🐠';
  if (slug.includes('chingri') || name.includes('চিংড়ি')) return '🦐';
  if (slug.includes('mach') || name.includes('মাছ') || name.includes('রুই') || name.includes('কাতলা')) return '🐟';
  if (slug.includes('goru') || name.includes('গরু')) return '🥩';
  if (slug.includes('khasi') || name.includes('খাসি')) return '🍖';
  if (slug.includes('murgi') || name.includes('মুরগি')) return '🍗';
  if (slug.includes('hanse') || name.includes('হাঁস')) return '🦆';
  if (slug.includes('dim') || name.includes('ডিম')) return '🥚';
  if (slug.includes('dudh') || name.includes('দুধ')) return '🥛';
  if (slug.includes('doi') || name.includes('দই')) return '🥣';
  if (slug.includes('mokhhan') || name.includes('মাখন')) return '🧈';

  // Fallbacks: product.image -> product.categoryIcon -> default
  if (product.image && product.image !== '🟢') return product.image;
  if (product.categoryIcon) return product.categoryIcon;

  return '🛒';
}
