// Base URL of the decoupled Express API (no trailing slash), e.g.
// https://api.alsadiqhealthcare.online — set via NEXT_PUBLIC_API_URL.
// Falls back to same-origin /api for local development against the
// old single-app setup, but production deployments must set this.
export const API_BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

export function apiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}/api${normalized}`;
}

export function mediaUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
