import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a USD price as ₹X,XXX by multiplying the value by 83.
 */
export function formatPrice(price: number): string {
  const inINR = price * 83;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inINR);
}

/**
 * Calculates the price after discount.
 */
export function getDiscountedPrice(price: number, discount: number): number {
  if (!discount || discount <= 0) return price;
  const discounted = price - (price * discount) / 100;
  return Math.round(discounted * 100) / 100;
}

/**
 * Truncates a string to the specified length and appends an ellipsis.
 */
export function truncate(str: string, length: number): string {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
