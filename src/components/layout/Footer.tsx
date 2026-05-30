import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-brand-charcoal to-[#0f0f0f] text-white pt-16 pb-8 border-t-2 border-brand-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center tracking-tight select-none">
              <span className="font-display font-bold text-2xl text-brand-rose italic tracking-tight border-b-2 border-brand-gold pb-0.5">GG</span>
              <span className="font-display font-light text-xl text-white ml-1">Fashion</span>
            </div>
            <p className="text-sm font-body text-gray-300 leading-relaxed max-w-xs">
              Elegance Redefined. Discover India&apos;s finest ethnic wear, curated with timeless craft and modern elegance.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold text-gray-300 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold text-gray-300 transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold text-gray-300 transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h2 className="text-sm font-display font-semibold uppercase tracking-widest text-brand-gold after:block after:w-8 after:h-px after:bg-brand-gold after:mt-2">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-sm font-body">
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search?category=all" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/search?category=womens-jewellery" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  Wedding Collections
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-4">
            <h2 className="text-sm font-display font-semibold uppercase tracking-widest text-brand-gold after:block after:w-8 after:h-px after:bg-brand-gold after:mt-2">
              Customer Care
            </h2>
            <ul className="space-y-2.5 text-sm font-body">
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Connected (Subscription) */}
          <div className="space-y-4">
            <h2 className="text-sm font-display font-semibold uppercase tracking-widest text-brand-gold after:block after:w-8 after:h-px after:bg-brand-gold after:mt-2">
              Stay Connected
            </h2>
            <p className="text-sm font-body text-gray-300">
              Subscribe to receive exclusive offers, new arrival updates, and design highlights.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="px-4 py-2 text-sm text-white bg-white/10 border border-white/20 placeholder:text-white/40 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:border-brand-gold transition-colors w-full"
              />
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-brand-charcoal bg-brand-gold hover:bg-brand-rose hover:text-white rounded-md sm:rounded-r-md sm:rounded-l-none transition-colors duration-200 flex-shrink-0"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center">
          <p className="text-xs font-body text-gray-400 text-center">
            © 2024 <span className="text-brand-gold mx-1 font-serif">✦</span> GG Fashion <span className="text-brand-gold mx-1 font-serif">✦</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
