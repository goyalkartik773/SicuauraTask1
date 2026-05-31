import Link from 'next/link';

export default function FeaturedBanner() {
  return (
    <section 
      className="w-full bg-gradient-to-br from-brand-charcoal via-[#2a1a1f] to-[#1a0f13] text-white py-12 px-5 md:py-16 md:px-8 lg:py-24 text-center relative overflow-hidden flex items-center justify-center border-b border-white/5"
      style={{ 
        backgroundImage: 'radial-gradient(circle, rgba(212,168,83,0.08) 1px, transparent 1px), linear-gradient(to bottom right, #1c1c1e, #2a1a1f, #1a0f13)', 
        backgroundSize: '30px 30px, 100% 100%' 
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-brand-gold/10 absolute -right-40 -top-40" />
        <div className="w-80 h-80 rounded-full border border-brand-rose/10 absolute -left-20 bottom-0" />
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-rose/5 rounded-full blur-3xl pointer-events-none" />

      <span className="text-brand-gold/30 text-6xl absolute top-8 left-12 font-serif select-none pointer-events-none hidden md:block">✦</span>
      <span className="text-brand-gold/20 text-[10rem] absolute -bottom-10 right-8 font-serif select-none pointer-events-none hidden md:block">✦</span>

      <div className="max-w-2xl mx-auto z-10 relative xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <span className="text-xs tracking-[0.4em] text-brand-gold uppercase font-medium mb-6 block">
          Limited Edition
        </span>

        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 tracking-wide leading-tight select-none">
          <span className="block font-light text-white">Wedding Season</span>
          <span className="block font-extralight italic text-brand-gold mt-2">Collection</span>
        </h2>

        <p className="text-sm px-2 md:px-0 font-body text-gray-300 max-w-lg mx-auto mb-8 leading-relaxed">
          Handcrafted lehengas and bridal sarees, curated for your most memorable moments and traditional celebrations.
        </p>

        <Link
          href="/search?category=womens-jewellery"
          className="group flex md:inline-flex w-full md:w-auto items-center justify-center gap-2 border border-brand-gold text-brand-gold px-8 py-3 text-xs tracking-[0.2em] font-semibold uppercase hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 shadow-sm"
        >
          <span>Explore Collection</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
