import { Link } from 'react-router-dom';
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from '../Logo';
import { useSettings } from '../../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  const socials = [
    { url: settings.facebook, Icon: FaFacebookF, label: 'Facebook' },
    { url: settings.instagram, Icon: FaInstagram, label: 'Instagram' },
    { url: settings.twitter, Icon: FaTwitter, label: 'Twitter' },
    { url: settings.youtube, Icon: FaYoutube, label: 'YouTube' },
  ].filter((s) => s.url);

  return (
    <footer className="bg-ink-900 text-white">
      <div className="container-app grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm text-white/60">
            {settings.tagline || 'Compassionate Care, Trusted Excellence'}
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {socials.map(({ url, Icon, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand-500 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-400">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/team" className="hover:text-white">Our Team</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/appointment" className="hover:text-white">Book Appointment</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-400">
            Contact Info
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-3">
              <HiLocationMarker className="h-5 w-5 shrink-0 text-brand-400" />
              <span>{settings.address || 'Lahore, Pakistan'}</span>
            </li>
            {settings.phone && (
              <li className="flex gap-3">
                <HiPhone className="h-5 w-5 shrink-0 text-brand-400" />
                <a href={`tel:${settings.phone}`} className="hover:text-white">{settings.phone}</a>
              </li>
            )}
            {settings.email && (
              <li className="flex gap-3">
                <HiMail className="h-5 w-5 shrink-0 text-brand-400" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a>
              </li>
            )}
            {settings.openingHours && (
              <li className="flex gap-3">
                <HiClock className="h-5 w-5 shrink-0 text-brand-400" />
                <span>{settings.openingHours}</span>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-400">
            Emergency
          </h4>
          <p className="mt-4 text-sm text-white/70">
            Need urgent care? Reach out to us any time.
          </p>
          {settings.whatsapp && (
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-4 w-full"
            >
              WhatsApp Us
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-app text-center text-xs text-white/50">
          &copy; {year} {settings.siteName || 'Al Sadiq Health Care Centre'}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
