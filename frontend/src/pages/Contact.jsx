import { useState } from 'react';
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi';
import toast from 'react-hot-toast';
import PageHero from '../components/PageHero';
import { useSettings } from '../context/SettingsContext';
import api from '../api/client';

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const { settings } = useSettings();
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
    <div>
      <PageHero
        eyebrow="Contact Us"
        title="Get In Touch"
        subtitle="Have a question or need to reach us? We're here to help."
      />

      <section className="section">
        <div className="container-app grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="card flex gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                <HiLocationMarker className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-ink-900">Address</h3>
                <p className="mt-1 text-sm text-ink-500">{settings.address}</p>
              </div>
            </div>
            {settings.phone && (
              <div className="card flex gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <HiPhone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-ink-900">Phone</h3>
                  <a href={`tel:${settings.phone}`} className="mt-1 block text-sm text-ink-500 hover:text-brand-500">
                    {settings.phone}
                  </a>
                </div>
              </div>
            )}
            {settings.email && (
              <div className="card flex gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <HiMail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-ink-900">Email</h3>
                  <a href={`mailto:${settings.email}`} className="mt-1 block text-sm text-ink-500 hover:text-brand-500">
                    {settings.email}
                  </a>
                </div>
              </div>
            )}
            {settings.openingHours && (
              <div className="card flex gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <HiClock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-ink-900">Opening Hours</h3>
                  <p className="mt-1 text-sm text-ink-500">{settings.openingHours}</p>
                </div>
              </div>
            )}
            {settings.mapEmbedUrl && (
              <div className="overflow-hidden rounded-2xl border border-ink-100">
                <iframe
                  src={settings.mapEmbedUrl}
                  title="Location Map"
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

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
              <textarea
                className="input"
                rows={5}
                required
                value={form.message}
                onChange={update('message')}
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
