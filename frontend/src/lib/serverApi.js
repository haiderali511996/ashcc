import { apiUrl } from './config';

// Fetch helper for Server Components. Revalidates every 60s by default so
// public pages stay reasonably fresh without hitting the API on every request.
export async function serverFetch(path, { params, revalidate = 60, ...init } = {}) {
  let url = apiUrl(path);
  if (params) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
    ).toString();
    if (qs) url += `?${qs}`;
  }

  try {
    const res = await fetch(url, {
      next: { revalidate },
      ...init,
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
