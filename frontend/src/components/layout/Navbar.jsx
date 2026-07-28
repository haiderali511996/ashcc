import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HiMenu, HiX, HiPhone } from 'react-icons/hi';
import Logo from '../Logo';
import { useSettings } from '../../context/SettingsContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/team', label: 'Our Team' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { settings } = useSettings();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-ink-100">
      <div className="container-app flex h-20 items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive ? 'text-brand-500' : 'text-ink-700 hover:text-brand-500'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {settings.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-ink-700"
            >
              <HiPhone className="h-5 w-5 text-brand-500" />
              {settings.phone}
            </a>
          )}
          <Link to="/appointment" className="btn-primary">
            Book Appointment
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-ink-900"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-100 bg-white">
          <nav className="container-app flex flex-col gap-1 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide ${
                    isActive ? 'bg-brand-50 text-brand-500' : 'text-ink-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/appointment"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
