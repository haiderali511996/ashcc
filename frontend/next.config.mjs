/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a minimal, self-contained .next/standalone/ bundle (only the
  // dependencies actually used, traced automatically) instead of requiring
  // the full node_modules on the deploy target. Built once here/locally and
  // uploaded, since this project's cPanel hosting account has a process
  // limit too low for `next build` itself to run there.
  output: 'standalone',
};

export default nextConfig;
