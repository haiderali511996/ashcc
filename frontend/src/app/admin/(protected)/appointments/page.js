'use client';

import { useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import api from '@/lib/api';
import Spinner from '@/components/Spinner';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
};

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api.get('/appointments').then((res) => setAppointments(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function updateStatus(id, status) {
    try {
      await api.put(`/appointments/${id}/status`, { status });
      toast.success('Appointment updated');
      load();
    } catch {
      toast.error('Failed to update appointment');
    }
  }

  async function remove(id) {
    if (!confirm('Delete this appointment?')) return;
    try {
      await api.delete(`/appointments/${id}`);
      toast.success('Appointment deleted');
      load();
    } catch {
      toast.error('Failed to delete appointment');
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Appointments</h1>
      <p className="mt-1 text-ink-500">Appointment requests from patients.</p>

      <div className="card mt-6 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center p-12"><Spinner /></div>
        ) : appointments.length === 0 ? (
          <p className="p-12 text-center text-ink-500">No appointments yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-100 text-xs uppercase text-ink-400">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Date / Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {appointments.map((appt) => (
                <tr key={appt._id}>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-ink-900">{appt.patientName}</p>
                    <p className="text-xs text-ink-500">{appt.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-ink-500">{appt.department}</td>
                  <td className="px-6 py-4 text-ink-500">
                    {format(new Date(appt.preferredDate), 'MMM d, yyyy')}
                    {appt.preferredTime && ` • ${appt.preferredTime}`}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={appt.status}
                      onChange={(e) => updateStatus(appt._id, e.target.value)}
                      className={`rounded-full border-0 px-3 py-1 text-xs font-semibold ${statusColors[appt.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => remove(appt._id)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 ml-auto"
                    >
                      <HiTrash className="h-4 w-4" />
                    </button>
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
