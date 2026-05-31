'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Heart, User, ShoppingBag, Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  isTransparent?: boolean;
}

const NAV_LINKS = [
  { label: 'New Arrivals', href: '/search?category=all' },
  { label: 'Sarees', href: '/search?category=womens-dresses' },
  { label: 'Suits & Dresses', href: '/search?category=womens-dresses' },
  { label: 'Wedding Collections', href: '/search?category=womens-jewellery' },
] as const;

export default function Navbar({ isTransparent = false }: NavbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setIsSearchOverlayOpen(false);
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setIsSearchOverlayOpen(false);
    }
  };

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const currentCategory = searchParams.get('category');
  const activeTransparent = isTransparent && !isScrolled;

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-brand-charcoal text-white text-[10px] md:text-xs tracking-[0.25em] uppercase text-center py-2.5 px-4 font-body select-none truncate">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className="flex items-center justify-between transition-all duration-300 h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center tracking-tight select-none">
                <span className="font-display font-bold text-xl md:text-2xl text-brand-rose italic tracking-tight border-b-2 border-brand-gold pb-0.5">GG</span>
                <span
                  className={cn(
                    'font-display font-light text-lg md:text-xl ml-1 transition-colors duration-300',
                    activeTransparent ? 'text-white' : 'text-brand-charcoal'
                  )}
                >
                  Fashion
                </span>
              </Link>

              <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map((link, index) => {
                  const slug = link.href.split('category=')[1] || '';
                  const isActive = currentCategory === slug;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        'text-sm font-body tracking-wide font-medium relative py-1 transition-colors hover:text-brand-rose after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-brand-rose after:transition-all after:duration-300 hover:after:w-full',
                        isActive
                          ? 'text-brand-rose after:w-full'
                          : activeTransparent
                          ? 'text-white/90 hover:text-white after:bg-white'
                          : 'text-brand-charcoal/80',
                        index >= 2 && 'hidden lg:inline-block'
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
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
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center min-w-[44px] min-h-[44px]"
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

            <div className="flex items-center gap-4">
              <button
                aria-label="Open search"
                onClick={() => setIsSearchOverlayOpen(true)}
                className={cn(
                  'hidden md:block lg:hidden rounded-full transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]',
                  activeTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-brand-charcoal'
                )}
              >
                <Search size={20} />
              </button>

              <button
                aria-label="Add to wishlist"
                className={cn(
                  'hidden md:block rounded-full transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]',
                  activeTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-brand-charcoal'
                )}
              >
                <Heart size={20} />
              </button>
              <button
                aria-label="Account"
                className={cn(
                  'hidden md:block rounded-full transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]',
                  activeTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-brand-charcoal'
                )}
              >
                <User size={20} />
              </button>

              <Link
                href="/cart"
                aria-label="Shopping cart"
                className={cn(
                  'relative rounded-full transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]',
                  activeTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-brand-charcoal'
                )}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-brand-rose text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-[heartPop_0.3s_ease-out]">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={handleMenuToggle}
                className={cn(
                  'md:hidden rounded-full transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]',
                  activeTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-brand-charcoal'
                )}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {isSearchOverlayOpen && (
          <div className="absolute inset-0 bg-white z-50 flex items-center px-4 sm:px-6 md:px-8 animate-fadeIn">
            <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sarees, lehengas, suits..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-brand-rose/30 focus:border-transparent text-brand-charcoal placeholder-gray-400"
                  autoFocus
                />
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOverlayOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-brand-charcoal text-sm font-semibold min-w-[44px] min-h-[44px] flex items-center justify-center animate-fadeIn"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40 transition-opacity animate-fadeIn md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed top-0 left-0 right-0 w-full bg-white z-50 shadow-2xl animate-slideDown md:hidden flex flex-col max-h-[90vh] overflow-y-auto">
              <div className="p-6 relative">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="absolute top-4 right-4 text-brand-charcoal hover:text-brand-rose min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>

                <div className="mt-8 mb-6">
                  <form onSubmit={handleSearch} className="relative w-full">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search sarees, lehengas, suits..."
                      className="w-full pl-10 pr-4 py-3 text-base bg-gray-50 border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-brand-rose/30 focus:border-transparent text-brand-charcoal"
                    />
                    <button
                      type="submit"
                      aria-label="Search"
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center min-w-[44px] min-h-[44px]"
                    >
                      <Search size={18} className="text-gray-400" />
                    </button>
                  </form>
                </div>

                <nav className="flex flex-col font-body">
                  {NAV_LINKS.map((link) => {
                    const slug = link.href.split('category=')[1] || '';
                    const isActive = currentCategory === slug;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'py-4 px-6 border-b border-gray-100 text-base font-medium tracking-wide transition-colors flex items-center justify-between',
                          isActive ? 'text-brand-rose font-semibold' : 'text-brand-charcoal/80 hover:text-brand-rose'
                        )}
                      >
                        <span>{link.label}</span>
                        {isActive && <span className="text-brand-rose">•</span>}
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex flex-col gap-4 pt-6 font-body">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-base text-brand-charcoal/80 py-3 px-6 hover:text-brand-rose transition-colors"
                  >
                    <Heart size={20} />
                    <span>Wishlist</span>
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-base text-brand-charcoal/80 py-3 px-6 hover:text-brand-rose transition-colors"
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}
