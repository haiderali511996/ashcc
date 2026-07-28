export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 text-center text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700/40 via-ink-900 to-ink-900" />
      <div className="container-app relative">
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 text-4xl md:text-5xl font-bold">{title}</h1>
        {subtitle && <p className="mt-4 mx-auto max-w-2xl text-white/70">{subtitle}</p>}
      </div>
    </section>
  );
}
