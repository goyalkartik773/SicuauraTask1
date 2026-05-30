'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen lg:h-screen w-full bg-brand-cream overflow-hidden flex items-center">
      {/* Background decorations on left column */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-rose/5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-brand-gold/30 pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-10 w-2.5 h-2.5 rounded-full bg-brand-gold/25 pointer-events-none" />

      {/* Two-Column Layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 h-full z-10">
        
        {/* Left Column: Text & Content */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 sm:py-24 h-full relative">
          
          {/* Small Top Label */}
          <div className="flex items-center mb-6 opacity-0 animate-fadeUp" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
            <span className="w-8 h-px bg-brand-gold inline-block mr-3" />
            <span className="text-xs tracking-[0.3em] text-brand-gold font-medium uppercase">
              Celebrate every occasion in style
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="flex flex-col">
            <span 
              className="font-display font-light text-6xl sm:text-7xl lg:text-8xl text-brand-charcoal leading-none opacity-0 animate-fadeUp"
              style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
            >
              Elegance
            </span>
            <span 
              className="font-display font-bold text-6xl sm:text-7xl lg:text-8xl text-brand-rose leading-none mt-1 opacity-0 animate-fadeUp"
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              Redefined.
            </span>
          </h1>

          {/* Subtext */}
          <p 
            className="text-gray-500 text-sm sm:text-base leading-relaxed mt-6 max-w-sm font-body opacity-0 animate-fadeUp"
            style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}
          >
            Discover heritage craftsmanship meets contemporary elegance. Shop India&apos;s finest ethnic wear, handcrafted to make every moment memorable.
          </p>

          {/* CTA Buttons */}
          <div 
            className="mt-10 flex flex-wrap gap-6 items-center opacity-0 animate-fadeUp"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          >
            <Link 
              href="/search" 
              className="bg-brand-rose text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-brand-charcoal transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Shop Collection &rarr;
            </Link>
            <Link 
              href="/search?category=all" 
              className="text-brand-charcoal text-sm font-medium underline underline-offset-4 hover:text-brand-rose transition-colors duration-200"
            >
              View Lookbook
            </Link>
          </div>

          {/* Trust Badges */}
          <div 
            className="mt-16 flex flex-wrap gap-8 opacity-0 animate-fadeUp"
            style={{ animationDelay: '750ms', animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
              <ShieldCheck size={16} className="text-brand-gold" />
              <span>Authentic Quality</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
              <Truck size={16} className="text-brand-gold" />
              <span>Express Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
              <RotateCcw size={16} className="text-brand-gold" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>

        {/* Right Column: Image & Badges */}
        <div className="relative h-[60vh] lg:h-full w-full bg-gradient-to-br from-brand-rose/10 to-brand-gold/10 flex items-center justify-center overflow-hidden">
          {/* Large decorative circle */}
          <div className="absolute inset-8 rounded-full border border-brand-rose/5 bg-brand-rose/5 pointer-events-none" />

          {/* Main Image */}
          <div className="relative w-full h-full lg:h-[90%] lg:w-[85%] overflow-hidden shadow-2xl lg:rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
              alt="Indian woman in a designer saree"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-700 hover:scale-102"
            />

            {/* Floating Stat Card */}
            <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl flex flex-col border border-white/20 select-none animate-fadeUp" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
              <span className="font-display text-2xl font-bold text-brand-charcoal flex items-center gap-0.5">
                4.9<span className="text-brand-gold text-lg">&apos;</span>★
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                50,000+ Happy Customers
              </span>
            </div>

            {/* Floating NEW SS'25 Badge */}
            <div className="absolute top-8 right-8 bg-brand-rose text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg border border-white/10 select-none animate-pulse">
              <span className="text-[9px] tracking-widest font-semibold uppercase opacity-90">New</span>
              <span className="font-display text-base font-bold tracking-wide mt-0.5">SS&apos;25</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
