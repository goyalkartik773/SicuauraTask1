import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (typeof price !== 'number' || isNaN(price)) return '₹0';
  const validPrice = Math.max(0, price);
  const inINR = validPrice * 83;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inINR);
}

export function getDiscountedPrice(price: number, discount: number): number {
  if (!discount || discount <= 0) return price;
  const discounted = price - (price * discount) / 100;
  return Math.round(discounted * 100) / 100;
}

export function truncate(str: string, length: number): string {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
