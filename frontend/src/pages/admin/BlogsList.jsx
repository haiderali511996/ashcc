import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import api from '../../api/client';
import Spinner from '../../components/Spinner';

export default function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api
      .get('/blogs/admin/all')
      .then((res) => setBlogs(res.data))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id) {
    if (!confirm('Delete this blog post? This cannot be undone.')) return;
    try {
      await api.delete(`/blogs/${id}`);
      toast.success('Blog post deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Blog Posts</h1>
          <p className="mt-1 text-ink-500">Manage your published and draft articles.</p>
        </div>
        <Link to="/admin/blogs/new" className="btn-primary">
          <HiPlus /> New Post
        </Link>
      </div>

      <div className="card mt-6 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center p-12"><Spinner /></div>
        ) : blogs.length === 0 ? (
          <p className="p-12 text-center text-ink-500">No blog posts yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-100 text-xs uppercase text-ink-400">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="px-6 py-4 font-semibold text-ink-900">{blog.title}</td>
                  <td className="px-6 py-4 text-ink-500">{blog.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        blog.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-ink-100 text-ink-600'
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink-500">
                    {format(new Date(blog.updatedAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/blogs/${blog._id}/edit`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-100 text-ink-600 hover:bg-ink-200"
                      >
                        <HiPencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <HiTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
