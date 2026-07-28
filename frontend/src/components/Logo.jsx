export default function Logo({ variant = 'dark', className = '' }) {
  const textColor = variant === 'light' ? 'text-white' : 'text-ink-900';
  const subColor = variant === 'light' ? 'text-white/70' : 'text-ink-500';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-10 w-10 shrink-0" aria-hidden="true">
        <path
          d="M64 10 C42 10 24 28 24 52 C24 76 42 94 64 94 C50 88 40 71 40 52 C40 33 50 16 64 10 Z"
          fill="#C8102E"
        />
        <path
          d="M16 68 C28 78 44 80 50 70 C56 80 72 78 84 68 C76 74 62 72 58 66 L54 76 L50 66 L46 76 L42 66 C38 72 24 74 16 68 Z"
          fill={variant === 'light' ? '#ffffff' : '#111111'}
        />
        <circle cx="50" cy="72" r="4.5" fill="#C8102E" />
      </svg>
      <div className="leading-tight">
        <p className={`text-lg font-bold tracking-wide ${textColor}`}>AL SADIQ</p>
        <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${subColor}`}>
          Health Care Centre
        </p>
      </div>
    </div>
  );
}
