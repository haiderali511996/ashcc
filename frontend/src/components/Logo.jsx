export default function Logo({ variant = 'dark', className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span
        className={`flex items-center justify-center rounded-lg ${
          variant === 'light' ? 'bg-white p-1.5' : ''
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-full.jpeg"
          alt="Al Sadiq Health Care Centre"
          className="h-16 w-auto object-contain"
        />
      </span>
    </div>
  );
}
