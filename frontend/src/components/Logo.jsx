export default function Logo({ variant = 'dark', className = '' }) {
  const textColor = variant === 'light' ? 'text-white' : 'text-ink-900';
  const subColor = variant === 'light' ? 'text-white/70' : 'text-ink-500';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          variant === 'light' ? 'bg-white p-1' : ''
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-icon.png" alt="Al Sadiq Health Care Centre logo" className="h-full w-full object-contain" />
      </span>
      <div className="leading-tight">
        <p className={`text-lg font-bold tracking-wide ${textColor}`}>AL SADIQ</p>
        <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${subColor}`}>
          Health Care Centre
        </p>
      </div>
    </div>
  );
}
