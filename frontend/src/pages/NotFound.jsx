import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-bold text-brand-500">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink-900">Page Not Found</h1>
      <p className="mt-2 text-ink-500">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}
