import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function BlogCard({ blog }) {
  return (
    <Link to={`/blog/${blog.slug}`} className="card group flex flex-col overflow-hidden">
      <div className="aspect-video w-full overflow-hidden bg-ink-100">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-300">
            No Image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-500">
          <span>{blog.category}</span>
          {blog.publishedAt && (
            <>
              <span className="text-ink-300">&bull;</span>
              <span className="text-ink-400">{format(new Date(blog.publishedAt), 'MMM d, yyyy')}</span>
            </>
          )}
        </div>
        <h3 className="mt-2 line-clamp-2 text-lg font-bold text-ink-900 group-hover:text-brand-500 transition-colors">
          {blog.title}
        </h3>
        {blog.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-ink-500">{blog.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
