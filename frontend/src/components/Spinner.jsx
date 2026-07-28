export default function Spinner({ className = 'h-8 w-8' }) {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-ink-200 border-t-brand-500 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
