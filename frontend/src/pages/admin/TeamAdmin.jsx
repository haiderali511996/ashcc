import { useEffect, useState } from 'react';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../api/client';
import Spinner from '../../components/Spinner';

const emptyForm = {
  name: '',
  designation: '',
  department: '',
  bio: '',
  order: 0,
  isActive: true,
  facebook: '',
  linkedin: '',
  twitter: '',
};

export default function TeamAdmin() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function load() {
    setLoading(true);
    api.get('/team/admin/all').then((res) => setTeam(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setPhotoFile(null);
    setPreview('');
    setModalOpen(true);
  }

  function openEdit(member) {
    setEditing(member);
    setForm({
      name: member.name || '',
      designation: member.designation || '',
      department: member.department || '',
      bio: member.bio || '',
      order: member.order || 0,
      isActive: member.isActive,
      facebook: member.socials?.facebook || '',
      linkedin: member.socials?.linkedin || '',
      twitter: member.socials?.twitter || '',
    });
    setPhotoFile(null);
    setPreview(member.photo || '');
    setModalOpen(true);
  }

  function update(field) {
    return (e) => {
      const value = field === 'isActive' ? e.target.checked : e.target.value;
      setForm((f) => ({ ...f, [field]: value }));
    };
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleDelete(id) {
    if (!confirm('Remove this team member?')) return;
    try {
      await api.delete(`/team/${id}`);
      toast.success('Team member removed');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('designation', form.designation);
      data.append('department', form.department);
      data.append('bio', form.bio);
      data.append('order', form.order);
      data.append('isActive', form.isActive);
      data.append('socials[facebook]', form.facebook);
      data.append('socials[linkedin]', form.linkedin);
      data.append('socials[twitter]', form.twitter);
      if (photoFile) data.append('photo', photoFile);

      if (editing) {
        await api.put(`/team/${editing._id}`, data);
        toast.success('Team member updated');
      } else {
        await api.post('/team', data);
        toast.success('Team member added');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save team member');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Team Members</h1>
          <p className="mt-1 text-ink-500">Manage doctors and staff shown on the website.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <HiPlus /> Add Member
        </button>
      </div>

      {loading ? (
        <div className="mt-12 flex justify-center"><Spinner /></div>
      ) : team.length === 0 ? (
        <p className="mt-12 text-center text-ink-500">No team members yet.</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member._id} className="card p-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-ink-100">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-bold text-ink-400">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-ink-900">{member.name}</p>
                  <p className="truncate text-sm text-brand-500">{member.designation}</p>
                  {!member.isActive && (
                    <span className="text-xs font-semibold text-ink-400">Hidden</span>
                  )}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => openEdit(member)} className="btn-outline flex-1 !py-2 text-xs">
                  <HiPencil className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                >
                  <HiTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink-900">
                {editing ? 'Edit Team Member' : 'Add Team Member'}
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <HiX className="h-5 w-5 text-ink-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Name</label>
                  <input className="input" required value={form.name} onChange={update('name')} />
                </div>
                <div>
                  <label className="label">Designation</label>
                  <input className="input" required value={form.designation} onChange={update('designation')} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Department</label>
                  <input className="input" value={form.department} onChange={update('department')} />
                </div>
                <div>
                  <label className="label">Display Order</label>
                  <input type="number" className="input" value={form.order} onChange={update('order')} />
                </div>
              </div>
              <div>
                <label className="label">Bio</label>
                <textarea className="input" rows={3} value={form.bio} onChange={update('bio')} />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="label">Facebook</label>
                  <input className="input" value={form.facebook} onChange={update('facebook')} />
                </div>
                <div>
                  <label className="label">LinkedIn</label>
                  <input className="input" value={form.linkedin} onChange={update('linkedin')} />
                </div>
                <div>
                  <label className="label">Twitter</label>
                  <input className="input" value={form.twitter} onChange={update('twitter')} />
                </div>
              </div>
              <div>
                <label className="label">Photo</label>
                {preview && <img src={preview} alt="Preview" className="mb-3 h-32 w-32 rounded-full object-cover" />}
                <input type="file" accept="image/*" onChange={handleFile} />
              </div>
              <label className="flex items-center gap-2 text-sm font-medium text-ink-700">
                <input type="checkbox" checked={form.isActive} onChange={update('isActive')} />
                Visible on website
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
