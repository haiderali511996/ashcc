import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/client';
import Spinner from '../../components/Spinner';

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  category: 'General',
  tags: '',
  author: 'Al Sadiq Health Care Centre',
  status: 'draft',
};

export default function BlogForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    api
      .get(`/blogs/admin/${id}`)
      .then((res) => {
        const blog = res.data;
        setForm({
          title: blog.title || '',
          excerpt: blog.excerpt || '',
          content: blog.content || '',
          category: blog.category || 'General',
          tags: (blog.tags || []).join(', '),
          author: blog.author || '',
          status: blog.status || 'draft',
        });
        setPreview(blog.coverImage || '');
      })
      .catch(() => toast.error('Failed to load blog post'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (coverFile) data.append('coverImage', coverFile);

      if (isEdit) {
        await api.put(`/blogs/${id}`, data);
        toast.success('Blog post updated');
      } else {
        await api.post('/blogs', data);
        toast.success('Blog post created');
      }
      navigate('/admin/blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save blog post');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div className="flex justify-center py-24"><Spinner /></div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">{isEdit ? 'Edit Blog Post' : 'New Blog Post'}</h1>

      <form onSubmit={handleSubmit} className="card mt-6 max-w-3xl space-y-5 p-8">
        <div>
          <label className="label">Title</label>
          <input className="input" required value={form.title} onChange={update('title')} />
        </div>
        <div>
          <label className="label">Excerpt</label>
          <textarea className="input" rows={2} maxLength={300} value={form.excerpt} onChange={update('excerpt')} />
        </div>
        <div>
          <label className="label">Content (HTML supported)</label>
          <textarea className="input font-mono text-xs" rows={12} required value={form.content} onChange={update('content')} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label">Category</label>
            <input className="input" value={form.category} onChange={update('category')} />
          </div>
          <div>
            <label className="label">Tags (comma separated)</label>
            <input className="input" value={form.tags} onChange={update('tags')} />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label">Author</label>
            <input className="input" value={form.author} onChange={update('author')} />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={update('status')}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Cover Image</label>
          {preview && <img src={preview} alt="Cover preview" className="mb-3 h-40 w-full rounded-lg object-cover" />}
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
          </button>
          <button type="button" onClick={() => navigate('/admin/blogs')} className="btn-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
