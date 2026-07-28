import { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import PageHero from '../components/PageHero';
import BlogCard from '../components/BlogCard';
import Spinner from '../components/Spinner';
import api from '../api/client';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      api
        .get('/blogs', { params: { search, page, limit: 9 } })
        .then((res) => {
          setBlogs(res.data.blogs || []);
          setPages(res.data.pages || 1);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, page]);

  return (
    <div>
      <PageHero
        eyebrow="Health Blog"
        title="Articles &amp; Health Tips"
        subtitle="Stay informed with the latest health insights from our medical team."
      />
      <section className="section">
        <div className="container-app">
          <div className="mx-auto mb-10 max-w-md relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
            <input
              className="input pl-11"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {loading ? (
            <div className="flex justify-center"><Spinner /></div>
          ) : blogs.length === 0 ? (
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
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`h-10 w-10 rounded-full text-sm font-semibold transition-colors ${
                        p === page ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                      }`}
                    >
                      {p}
                    </button>
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
