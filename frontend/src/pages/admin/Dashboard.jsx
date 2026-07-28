import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineMail,
  HiOutlineCalendar,
} from 'react-icons/hi';
import api from '../../api/client';
import Spinner from '../../components/Spinner';

const cards = [
  { key: 'totalBlogs', label: 'Total Blog Posts', icon: HiOutlineDocumentText, to: '/admin/blogs' },
  { key: 'publishedBlogs', label: 'Published Posts', icon: HiOutlineDocumentText, to: '/admin/blogs' },
  { key: 'totalTeam', label: 'Team Members', icon: HiOutlineUserGroup, to: '/admin/team' },
  { key: 'newMessages', label: 'New Messages', icon: HiOutlineMail, to: '/admin/messages' },
  { key: 'pendingAppointments', label: 'Pending Appointments', icon: HiOutlineCalendar, to: '/admin/appointments' },
  { key: 'totalAppointments', label: 'Total Appointments', icon: HiOutlineCalendar, to: '/admin/appointments' },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/dashboard/stats')
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Dashboard</h1>
      <p className="mt-1 text-ink-500">Overview of your website content and activity.</p>

      {loading ? (
        <div className="mt-12 flex justify-center"><Spinner /></div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ key, label, icon: Icon, to }) => (
            <Link key={key} to={to} className="card flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-ink-900">{stats?.[key] ?? 0}</p>
                <p className="text-sm text-ink-500">{label}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
