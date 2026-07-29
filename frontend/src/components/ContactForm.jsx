'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/contact', form);
      toast.success(res.data.message || 'Message sent successfully!');
      setForm(emptyForm);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card lg:col-span-3 p-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">Full Name</label>
          <input className="input" required value={form.name} onChange={update('name')} />
        </div>
        <div>
          <label className="label">Email</label>
          <input type="email" className="input" required value={form.email} onChange={update('email')} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">Phone</label>
          <input className="input" value={form.phone} onChange={update('phone')} />
        </div>
        <div>
          <label className="label">Subject</label>
          <input className="input" value={form.subject} onChange={update('subject')} />
        </div>
      </div>
      <div>
        <label className="label">Message</label>
        <textarea className="input" rows={5} required value={form.message} onChange={update('message')} />
      </div>
      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
