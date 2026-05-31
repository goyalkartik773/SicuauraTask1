import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'New Arrivals', href: '/search?category=all' },
  { label: 'Wedding Collections', href: '/search?category=womens-jewellery' },
  { label: 'About Us', href: '/' },
] as const;

const CUSTOMER_CARE_LINKS = [
  { label: 'Track Order', href: '/' },
  { label: 'Returns & Exchanges', href: '/' },
  { label: 'Size Guide', href: '/' },
  { label: 'Contact Us', href: '/' },
] as const;

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
] as const;

export default function Footer() {
  const linkClass = "text-gray-300 hover:text-brand-gold transition-colors duration-200";
  const socialIconClass = "w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold text-gray-300 transition-all duration-300";
  const columnHeaderClass = "text-sm font-display font-semibold uppercase tracking-widest text-brand-gold after:block after:w-8 after:h-px after:bg-brand-gold after:mt-2";

  return (
    <footer className="bg-gradient-to-b from-brand-charcoal to-[#0f0f0f] text-white pt-16 pb-8 border-t-2 border-brand-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          <div className="space-y-4 border-b border-white/10 pb-6 mb-6 md:border-b-0 md:pb-0 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start tracking-tight select-none">
              <span className="font-display font-bold text-2xl text-brand-rose italic tracking-tight border-b-2 border-brand-gold pb-0.5">GG</span>
              <span className="font-display font-light text-xl text-white ml-1">Fashion</span>
            </div>
            <p className="text-sm font-body text-gray-300 leading-relaxed max-w-xs mx-auto md:mx-0">
              Elegance Redefined. Discover India&apos;s finest ethnic wear, curated with timeless craft and modern elegance.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={socialIconClass}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 border-b border-white/10 pb-6 mb-6 md:border-b-0 md:pb-0 md:mb-0 text-center md:text-left">
            <h2 className={columnHeaderClass}>Quick Links</h2>
            <ul className="space-y-2.5 text-sm font-body">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 border-b border-white/10 pb-6 mb-6 md:border-b-0 md:pb-0 md:mb-0 text-center md:text-left">
            <h2 className={columnHeaderClass}>Customer Care</h2>
            <ul className="space-y-2.5 text-sm font-body">
              {CUSTOMER_CARE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h2 className={columnHeaderClass}>Stay Connected</h2>
            <p className="text-sm font-body text-gray-300 max-w-xs mx-auto md:mx-0">
              Subscribe to receive exclusive offers, new arrival updates, and design highlights.
            </p>
            <div className="flex flex-col md:flex-row gap-2 max-w-sm mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="px-4 py-3 text-sm text-white bg-white/10 border border-white/20 placeholder:text-white/40 rounded-md md:rounded-l-md md:rounded-r-none focus:outline-none focus:border-brand-gold transition-colors w-full min-h-[44px]"
              />
              <button
                type="button"
                className="px-4 py-3 text-sm font-medium text-brand-charcoal bg-brand-gold hover:bg-brand-rose hover:text-white rounded-md md:rounded-r-md md:rounded-l-none transition-colors duration-200 flex-shrink-0 min-h-[44px]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center justify-center gap-1 text-center">
          <p className="text-xs font-body text-gray-400 text-center">
            © 2024 <span className="text-brand-gold mx-1 font-serif">✦</span> GG Fashion <span className="text-brand-gold mx-1 font-serif">✦</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
