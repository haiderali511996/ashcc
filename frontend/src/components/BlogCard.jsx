import Link from 'next/link';
import { format } from 'date-fns';
import { mediaUrl } from '@/lib/config';

export default function BlogCard({ blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="card group flex flex-col overflow-hidden">
      <div className="aspect-video w-full overflow-hidden bg-ink-100">
        {blog.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mediaUrl(blog.coverImage)}
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
