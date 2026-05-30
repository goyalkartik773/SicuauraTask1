import Link from 'next/link';

export default function FeaturedBanner() {
  return (
    <section className="w-full bg-brand-charcoal text-white py-20 px-8 text-center relative overflow-hidden flex items-center justify-center border-b border-white/5">
      {/* Editorial Decorative Overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-rose/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto z-10 relative">
        {/* Eyebrow Label */}
        <span className="text-xs tracking-[0.4em] text-brand-gold uppercase font-medium mb-4 block animate-pulse">
          Limited Edition
        </span>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-5xl font-light mb-6 tracking-wide leading-tight">
          Wedding Season Collection
        </h2>

        {/* Subtext Copy */}
        <p className="text-sm sm:text-base font-body text-gray-300 max-w-lg mx-auto mb-8 leading-relaxed">
          Handcrafted lehengas and bridal sarees, curated for your most memorable moments and traditional celebrations.
        </p>

        {/* CTA Button */}
        <Link
          href="/search?category=womens-jewellery"
          className="inline-block border border-brand-gold text-brand-gold px-8 py-3 text-xs tracking-[0.2em] font-semibold uppercase hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 shadow-sm"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}
