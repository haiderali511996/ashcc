import Link from 'next/link';
import PageHero from '@/components/PageHero';
import BlogCard from '@/components/BlogCard';
import BlogSearchBar from '@/components/BlogSearchBar';
import { serverFetch } from '@/lib/serverApi';

export const metadata = {
  title: 'Health Blog',
  description:
    'Read health articles and tips from Al Sadiq Health Care Centre — heart health, diabetes, preventive care, pediatrics, and more.',
};

export default async function Blog({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || '';

  const data = await serverFetch('/blogs', {
    params: { search, page, limit: 9 },
    revalidate: 30,
  });

  const blogs = data?.blogs || [];
  const pages = data?.pages || 1;

  function pageHref(p) {
    const qs = new URLSearchParams();
    if (search) qs.set('search', search);
    if (p > 1) qs.set('page', String(p));
    const s = qs.toString();
    return `/blog${s ? `?${s}` : ''}`;
  }

  return (
    <div>
      <PageHero
        eyebrow="Health Blog"
        title="Articles & Health Tips"
        subtitle="Stay informed with the latest health insights from our medical team."
      />
      <section className="section">
        <div className="container-app">
          <BlogSearchBar />

          {blogs.length === 0 ? (
            <p className="text-center text-ink-500">No articles found.</p>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
              {pages > 1 && (
                <div className="mt-10 flex justify-center gap-2">
                  {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={pageHref(p)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        p === page ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
