'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import Spinner from '@/components/Spinner';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';

const fields = [
  { key: 'siteName', label: 'Site Name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'aboutText', label: 'About Text', textarea: true },
  { key: 'mission', label: 'Mission', textarea: true },
  { key: 'vision', label: 'Vision', textarea: true },
  { key: 'address', label: 'Address' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'whatsapp', label: 'WhatsApp Number (with country code, no +)' },
  { key: 'email', label: 'Email' },
  { key: 'openingHours', label: 'Opening Hours' },
  { key: 'mapEmbedUrl', label: 'Google Maps Embed URL' },
  { key: 'facebook', label: 'Facebook URL' },
  { key: 'instagram', label: 'Instagram URL' },
  { key: 'twitter', label: 'Twitter / X URL' },
  { key: 'youtube', label: 'YouTube URL' },
];

export default function SettingsAdmin() {
  const { refreshSettings } = useSettings();
  const { admin } = useAuth();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '' });
  const [pwSubmitting, setPwSubmitting] = useState(false);

  useEffect(() => {
    api.get('/settings').then((res) => setForm(res.data)).finally(() => setLoading(false));
  }, []);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', form);
      await refreshSettings();
      toast.success('Settings updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setPwSubmitting(true);
    try {
      await api.put('/auth/change-password', pwForm);
      toast.success('Password updated');
      setPwForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPwSubmitting(false);
    }
  }

  if (loading) return <div className="flex justify-center py-24"><Spinner /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Site Settings</h1>
      <p className="mt-1 text-ink-500">Content shown across the public website.</p>

      <form onSubmit={handleSubmit} className="card mt-6 max-w-3xl space-y-5 p-8">
        {fields.map(({ key, label, textarea }) => (
          <div key={key}>
            <label className="label">{label}</label>
            {textarea ? (
              <textarea className="input" rows={4} value={form[key] || ''} onChange={update(key)} />
            ) : (
              <input className="input" value={form[key] || ''} onChange={update(key)} />
            )}
          </div>
        ))}
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>

      {admin && (
        <form onSubmit={handlePasswordChange} className="card mt-6 max-w-3xl space-y-5 p-8">
          <h2 className="text-lg font-bold text-ink-900">Change Password</h2>
          <div>
            <label className="label">Current Password</label>
            <input
              type="password"
              className="input"
              required
              value={pwForm.currentPassword}
              onChange={(e) => setPwForm((f) => ({ ...f, currentPassword: e.target.value }))}
            />
          </div>
          <div>
            <label className="label">New Password</label>
            <input
              type="password"
              className="input"
              required
              minLength={6}
              value={pwForm.newPassword}
              onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))}
            />
          </div>
          <button type="submit" disabled={pwSubmitting} className="btn-outline">
            {pwSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}
    </div>
  );
}
