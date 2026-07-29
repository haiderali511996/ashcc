'use client';

import { useEffect, useState } from 'react';
import { HiTrash, HiMail, HiMailOpen } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import api from '@/lib/api';
import Spinner from '@/components/Spinner';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api.get('/contact').then((res) => setMessages(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function markRead(id, status) {
    try {
      await api.put(`/contact/${id}/status`, { status });
      load();
    } catch {
      toast.error('Failed to update message');
    }
  }

  async function remove(id) {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Message deleted');
      load();
    } catch {
      toast.error('Failed to delete message');
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Contact Messages</h1>
      <p className="mt-1 text-ink-500">Messages submitted through the contact form.</p>

      {loading ? (
        <div className="mt-12 flex justify-center"><Spinner /></div>
      ) : messages.length === 0 ? (
        <p className="mt-12 text-center text-ink-500">No messages yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`card p-6 ${msg.status === 'new' ? 'border-brand-200 bg-brand-50/30' : ''}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-ink-900">{msg.name}</p>
                  <p className="text-sm text-ink-500">
                    {msg.email} {msg.phone && `• ${msg.phone}`}
                  </p>
                  {msg.subject && <p className="mt-1 text-sm font-semibold text-brand-500">{msg.subject}</p>}
                </div>
                <p className="text-xs text-ink-400">{format(new Date(msg.createdAt), 'MMM d, yyyy h:mm a')}</p>
              </div>
              <p className="mt-3 text-sm text-ink-600">{msg.message}</p>
              <div className="mt-4 flex gap-2">
                {msg.status === 'new' ? (
                  <button onClick={() => markRead(msg._id, 'read')} className="btn-outline !py-2 text-xs">
                    <HiMailOpen className="h-4 w-4" /> Mark Read
                  </button>
                ) : (
                  <button onClick={() => markRead(msg._id, 'new')} className="btn-outline !py-2 text-xs">
                    <HiMail className="h-4 w-4" /> Mark Unread
                  </button>
                )}
                <button
                  onClick={() => remove(msg._id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                >
                  <HiTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
