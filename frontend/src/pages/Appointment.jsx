import { useState } from 'react';
import toast from 'react-hot-toast';
import PageHero from '../components/PageHero';
import api from '../api/client';

const emptyForm = {
  patientName: '',
  email: '',
  phone: '',
  department: 'General',
  doctor: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
};

const departments = [
  'General',
  'Cardiology',
  'Dermatology',
  'Gynecology',
  'Pediatrics',
  'Orthopedics',
  'ENT',
  'Dental',
];

export default function Appointment() {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/appointments', form);
      toast.success(res.data.message || 'Appointment requested successfully!');
      setForm(emptyForm);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <PageHero
        eyebrow="Book Appointment"
        title="Schedule Your Visit"
        subtitle="Fill in your details below and our team will confirm your appointment."
      />

      <section className="section">
        <div className="container-app max-w-3xl">
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label">Patient Name</label>
                <input className="input" required value={form.patientName} onChange={update('patientName')} />
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input className="input" required value={form.phone} onChange={update('phone')} />
              </div>
            </div>
            <div>
              <label className="label">Email (optional)</label>
              <input type="email" className="input" value={form.email} onChange={update('email')} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label">Department</label>
                <select className="input" value={form.department} onChange={update('department')}>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Preferred Doctor (optional)</label>
                <input className="input" value={form.doctor} onChange={update('doctor')} />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label">Preferred Date</label>
                <input
                  type="date"
                  className="input"
                  required
                  min={today}
                  value={form.preferredDate}
                  onChange={update('preferredDate')}
                />
              </div>
              <div>
                <label className="label">Preferred Time</label>
                <input
                  type="time"
                  className="input"
                  value={form.preferredTime}
                  onChange={update('preferredTime')}
                />
              </div>
            </div>
            <div>
              <label className="label">Additional Notes (optional)</label>
              <textarea className="input" rows={4} value={form.message} onChange={update('message')} />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? 'Submitting...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
