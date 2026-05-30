'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Heart, User, ShoppingBag, Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  isTransparent?: boolean;
}

export default function Navbar({ isTransparent = false }: NavbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Track page scroll to toggle sticky styling when transparent prop is enabled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initialize state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update query state when URL query changes
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'New Arrivals', slug: 'all' },
    { name: 'Sarees', slug: 'womens-dresses' },
    { name: 'Suits & Dresses', slug: 'womens-dresses' },
    { name: 'Wedding Collections', slug: 'womens-jewellery' },
  ];

  const currentCategory = searchParams.get('category');

  // Determine styling states based on scroll and transparency prop
  const activeTransparent = isTransparent && !isScrolled;

  return (
    <div className="w-full flex flex-col">
      {/* Top Announcement Bar */}
      <div className="w-full bg-brand-charcoal text-white text-[9px] sm:text-xs tracking-[0.25em] uppercase text-center py-2.5 px-4 font-body select-none">
        ✦ Free shipping on orders above ₹2,999 &middot; New SS&apos;25 Collection Now Live ✦
      </div>

      <header
        className={cn(
          'sticky top-0 w-full z-50 transition-all duration-300',
          activeTransparent
            ? 'bg-transparent text-white'
            : 'bg-white/95 backdrop-blur-md text-brand-charcoal border-b border-gray-100 shadow-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('flex items-center justify-between transition-all duration-300', activeTransparent ? 'h-16' : 'h-16')}>
            {/* Left: Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center tracking-tight select-none">
                <span className="font-display font-bold text-2xl text-brand-rose italic tracking-tight border-b-2 border-brand-gold pb-0.5">GG</span>
                <span
                  className={cn(
                    'font-display font-light text-xl ml-1 transition-colors duration-300',
                    activeTransparent ? 'text-white' : 'text-brand-charcoal'
                  )}
                >
                  Fashion
                </span>
              </Link>

              {/* Desktop Navigation Links */}
              <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => {
                  const isActive = currentCategory === link.slug;
                  return (
                    <Link
                      key={link.name}
                      href={`/search?category=${link.slug}`}
                      className={cn(
                        'text-sm font-body tracking-wide font-medium relative py-1 transition-colors hover:text-brand-rose after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-brand-rose after:transition-all after:duration-300 hover:after:w-full',
                        isActive
                          ? 'text-brand-rose after:w-full'
                          : activeTransparent
                          ? 'text-white/90 hover:text-white after:bg-white'
                          : 'text-brand-charcoal/80'
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center: Search Box (desktop) */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sarees, lehengas, suits..."
                  className={cn(
                    'w-full pl-10 pr-4 py-1.5 text-sm rounded-full border outline-none transition-all focus:ring-2 focus:ring-brand-rose/30 focus:shadow-lg focus:shadow-brand-rose/10 focus:border-transparent',
                    activeTransparent
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white focus:text-brand-charcoal focus:placeholder-gray-400'
                      : 'bg-gray-50 border-gray-200 text-brand-charcoal placeholder-gray-400 focus:bg-white'
                  )}
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center"
                >
                  <Search
                    size={16}
                    className={cn(
                      'transition-colors',
                      activeTransparent ? 'text-white/60' : 'text-gray-400 hover:text-brand-charcoal'
                    )}
                  />
                </button>
              </form>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop only buttons */}
              <button
                aria-label="Add to wishlist"
                className={cn(
                  'hidden md:block p-1.5 rounded-full transition-colors',
                  activeTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-brand-charcoal'
                )}
              >
                <Heart size={20} />
              </button>
              <button
                aria-label="Account"
                className={cn(
                  'hidden md:block p-1.5 rounded-full transition-colors',
                  activeTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-brand-charcoal'
                )}
              >
                <User size={20} />
              </button>

              {/* Shopping Bag (always visible) */}
              <button
                aria-label="Shopping cart"
                className={cn(
                  'relative p-1.5 rounded-full transition-colors',
                  activeTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-brand-charcoal'
                )}
              >
                <ShoppingBag size={20} />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-rose rounded-full" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'md:hidden p-1.5 rounded-full transition-colors',
                  activeTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-brand-charcoal'
                )}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 shadow-lg text-brand-charcoal animate-slideIn origin-top">
            <div className="px-4 pt-3 pb-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sarees, lehengas, suits..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-brand-rose/30 focus:shadow-lg focus:shadow-brand-rose/10 focus:border-transparent"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center"
                >
                  <Search size={16} className="text-gray-400" />
                </button>
              </form>

              {/* Mobile Links */}
              <nav className="flex flex-col space-y-3 font-body">
                {navLinks.map((link) => {
                  const isActive = currentCategory === link.slug;
                  return (
                    <Link
                      key={link.name}
                      href={`/search?category=${link.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'text-sm tracking-wide font-medium py-1.5 border-b border-gray-50 transition-colors',
                        isActive ? 'text-brand-rose font-semibold' : 'text-brand-charcoal/80'
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Extra Wishlist / User links for Mobile Menu Drawer */}
              <div className="flex items-center gap-4 pt-2">
                <button className="flex items-center gap-2 text-sm text-brand-charcoal/80">
                  <Heart size={18} />
                  <span>Wishlist</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-brand-charcoal/80">
                  <User size={18} />
                  <span>Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
