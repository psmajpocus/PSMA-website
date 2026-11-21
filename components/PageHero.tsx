'use client';

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-slate-950 text-white pt-20 pb-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-slate-500 font-medium mb-6">
          {label}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-400 text-lg leading-relaxed mt-4 whitespace-nowrap">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
