import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { HiArrowLeft } from 'react-icons/hi';
import api from '../api/client';
import Spinner from '../components/Spinner';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="container-app py-24 text-center">
        <h1 className="text-2xl font-bold text-ink-900">Article not found</h1>
        <Link to="/blog" className="btn-primary mt-6 inline-flex">
          <HiArrowLeft /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article>
      <div className="bg-ink-900 py-16 text-white">
        <div className="container-app max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <HiArrowLeft /> Back to Blog
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-brand-400">
            <span>{blog.category}</span>
            {blog.publishedAt && (
              <>
                <span>&bull;</span>
                <span>{format(new Date(blog.publishedAt), 'MMMM d, yyyy')}</span>
              </>
            )}
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold">{blog.title}</h1>
          <p className="mt-3 text-sm text-white/60">By {blog.author}</p>
        </div>
      </div>

      {blog.coverImage && (
        <div className="container-app -mt-10 max-w-4xl">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full rounded-2xl object-cover shadow-xl aspect-video"
          />
        </div>
      )}

      <div className="section">
        <div className="container-app max-w-3xl">
          <div
            className="prose max-w-none prose-headings:text-ink-900 prose-a:text-brand-500"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          {blog.tags?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-600">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
