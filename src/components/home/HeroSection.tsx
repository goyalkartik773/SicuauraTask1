'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Authentic Quality' },
  { icon: Truck, label: 'Express Delivery' },
  { icon: RotateCcw, label: 'Easy Returns' },
] as const;

const PULSING_DOTS = [
  { top: '25%', left: '33.33%', delay: '0ms' },
  { top: '28%', left: '35%', delay: '300ms' },
  { top: '23%', left: '38%', delay: '600ms' },
] as const;

export default function HeroSection() {
  const getAnimationDelay = (index: number) => `${index * 150}ms`;

  return (
    <section className="relative min-h-screen lg:h-screen w-full bg-brand-cream overflow-hidden flex items-center bg-[radial-gradient(ellipse_at_top_left,_rgba(197,56,75,0.08)_0%,_transparent_60%)]">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-rose/5 pointer-events-none hidden md:block" />
      <div className="absolute top-20 right-8 w-32 h-32 rounded-full border border-brand-rose/20 animate-[spin_20s_linear_infinite] pointer-events-none hidden md:block" />
      
      {PULSING_DOTS.map((dot, index) => (
        <div 
          key={index} 
          className="absolute w-1.5 h-1.5 rounded-full bg-brand-gold/40 pointer-events-none animate-pulse hidden md:block" 
          style={{ top: dot.top, left: dot.left, animationDelay: dot.delay }} 
        />
      ))}
      
      <div className="absolute bottom-1/4 left-10 w-2.5 h-2.5 rounded-full bg-brand-gold/25 pointer-events-none hidden md:block" />

      <div className="w-full max-w-7xl mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 h-full z-10">
        <div className="flex flex-col justify-center px-5 py-10 sm:px-12 sm:py-24 lg:px-20 h-full relative">
          <div className="flex items-center mb-6 opacity-0 animate-fadeUp" style={{ animationDelay: getAnimationDelay(0), animationFillMode: 'forwards' }}>
            <span className="w-8 h-px bg-brand-gold inline-block mr-3" />
            <span className="text-xs tracking-[0.3em] text-brand-gold font-medium uppercase">
              Celebrate every occasion in style
            </span>
          </div>

          <h1 className="flex flex-col">
            <span 
              className="font-display font-light text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-brand-charcoal leading-none opacity-0 animate-fadeUp"
              style={{ animationDelay: getAnimationDelay(1), animationFillMode: 'forwards' }}
            >
              Elegance
            </span>
            <div 
              className="w-12 h-px bg-brand-gold my-3 opacity-0 animate-fadeUp"
              style={{ animationDelay: getAnimationDelay(1.5), animationFillMode: 'forwards' }}
            />
            <span 
              className="font-display font-bold text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-brand-rose leading-none opacity-0 animate-fadeUp"
              style={{ animationDelay: getAnimationDelay(2), animationFillMode: 'forwards' }}
            >
              Redefined.
            </span>
          </h1>

          <p 
            className="text-gray-500 text-sm sm:text-base leading-relaxed mt-6 max-w-sm font-body opacity-0 animate-fadeUp"
            style={{ animationDelay: getAnimationDelay(3), animationFillMode: 'forwards' }}
          >
            Discover heritage craftsmanship meets contemporary elegance. Shop India&apos;s finest ethnic wear, handcrafted to make every moment memorable.
          </p>

          <div 
            className="mt-10 flex flex-col md:flex-row gap-3 md:gap-6 items-center w-full opacity-0 animate-fadeUp"
            style={{ animationDelay: getAnimationDelay(4), animationFillMode: 'forwards' }}
          >
            <Link 
              href="/search" 
              className="relative overflow-hidden bg-brand-rose text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium shadow-lg shadow-brand-rose/30 hover:shadow-xl hover:shadow-brand-rose/40 hover:-translate-y-0.5 transition-all duration-300 before:absolute before:top-0 before:-left-[100%] before:w-1/2 before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:left-[100%] before:transition-all before:duration-1000 before:ease-in-out w-full md:w-auto text-center animate-fadeIn"
            >
              Shop Collection &rarr;
            </Link>
            <Link 
              href="/search?category=all" 
              className="text-brand-charcoal text-xs tracking-[0.2em] uppercase font-semibold border border-gray-200 bg-white hover:bg-gray-50 py-4 px-8 hover:text-brand-rose transition-colors duration-200 w-full md:w-auto text-center animate-fadeIn"
            >
              View Lookbook
            </Link>
          </div>

          <div 
            className="border-t border-gray-100 pt-8 mt-8 grid grid-cols-3 md:flex md:flex-wrap gap-2 md:gap-8 opacity-0 animate-fadeUp"
            style={{ animationDelay: getAnimationDelay(5), animationFillMode: 'forwards' }}
          >
            {TRUST_BADGES.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div key={index} className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-3 text-[9px] sm:text-[10px] md:text-xs text-gray-400 uppercase tracking-wide">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-rose/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-brand-rose" />
                  </div>
                  <span className="leading-tight">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative h-[50vh] md:h-[60vh] lg:h-full w-full bg-gradient-to-br from-brand-rose/10 to-brand-gold/10 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-8 rounded-full border border-brand-rose/5 bg-brand-rose/5 pointer-events-none" />

          <div className="relative w-full h-full lg:h-[90%] lg:w-[85%] overflow-hidden shadow-2xl lg:rounded-3xl">
            <div className="absolute inset-4 rounded-2xl lg:rounded-3xl border border-brand-gold/30 pointer-events-none z-10" />

            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
              alt="Indian woman in a designer saree"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-700 hover:scale-102"
            />

            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

            <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-2xl shadow-black/10 border border-gray-100/50 flex flex-col select-none animate-fadeUp z-20 hidden md:flex" style={{ animationDelay: getAnimationDelay(6), animationFillMode: 'forwards' }}>
              <span className="font-display text-3xl font-bold text-brand-rose flex items-center gap-0.5 leading-none">
                4.9<span className="text-brand-gold text-xl">&apos;</span>★
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1.5 font-semibold">
                50,000+ Happy Customers
              </span>
            </div>

            <div className="absolute top-8 right-8 bg-brand-rose text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg shadow-brand-rose/40 border border-white/10 select-none animate-[bounce_3s_ease-in-out_infinite] z-20 hidden lg:flex">
              <span className="text-[9px] tracking-widest font-semibold uppercase opacity-90">New</span>
              <span className="font-display text-base font-bold tracking-wide mt-0.5">SS&apos;25</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
