'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HiOutlineViewGrid,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineCog,
  HiOutlineLogout,
  HiExternalLink,
} from 'react-icons/hi';
import Logo from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';

const links = [
  { href: '/admin', label: 'Dashboard', icon: HiOutlineViewGrid },
  { href: '/admin/blogs', label: 'Blog Posts', icon: HiOutlineDocumentText },
  { href: '/admin/team', label: 'Team', icon: HiOutlineUserGroup },
  { href: '/admin/messages', label: 'Messages', icon: HiOutlineMail },
  { href: '/admin/appointments', label: 'Appointments', icon: HiOutlineCalendar },
  { href: '/admin/settings', label: 'Site Settings', icon: HiOutlineCog },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    logout();
    router.push('/admin/login');
  }

  const isActive = (href) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));

  return (
    <div className="flex min-h-screen bg-ink-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-100 bg-white lg:flex">
        <div className="flex h-20 items-center border-b border-ink-100 px-6">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive(href) ? 'bg-brand-500 text-white' : 'text-ink-600 hover:bg-ink-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-ink-100 p-4">
          <a
            href={process.env.NEXT_PUBLIC_SITE_URL || '/'}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-600 hover:bg-ink-100"
          >
            <HiExternalLink className="h-5 w-5" />
            View Website
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-500 hover:bg-brand-50"
          >
            <HiOutlineLogout className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex h-20 items-center justify-between border-b border-ink-100 bg-white px-6 lg:justify-end">
          <div className="lg:hidden"><Logo /></div>
          <div className="text-right">
            <p className="text-sm font-semibold text-ink-900">{admin?.name}</p>
            <p className="text-xs text-ink-400 capitalize">{admin?.role}</p>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
