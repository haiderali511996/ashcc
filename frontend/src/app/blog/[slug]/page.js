import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { HiArrowLeft } from 'react-icons/hi';
import { serverFetch } from '@/lib/serverApi';
import { mediaUrl } from '@/lib/config';

async function getBlog(slug) {
  return serverFetch(`/blogs/${slug}`, { revalidate: 60 });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Article Not Found' };

  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || blog.excerpt || undefined;
  const image = blog.coverImage ? [mediaUrl(blog.coverImage)] : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: blog.publishedAt,
      images: image,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image,
    },
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  return (
    <article>
      <div className="bg-ink-900 py-16 text-white">
        <div className="container-app max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaUrl(blog.coverImage)}
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
