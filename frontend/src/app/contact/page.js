import { HiLocationMarker, HiPhone, HiMail, HiClock, HiGlobeAlt } from 'react-icons/hi';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { serverFetch } from '@/lib/serverApi';

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Al Sadiq Health Care Centre in Lahore — address, phone, email, opening hours, and a contact form.',
};

export default async function Contact() {
  const settings = await serverFetch('/settings');

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
            <div className="card p-6">
              <h3 className="text-lg font-bold text-ink-900">Visit Us</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                    <HiLocationMarker className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Address</p>
                    <p className="mt-0.5 text-sm text-ink-700">{settings?.address}</p>
                  </div>
                </li>
                {settings?.phone && (
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                      <HiPhone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Phone</p>
                      <a href={`tel:${settings.phone}`} className="mt-0.5 block text-sm text-ink-700 hover:text-brand-500">
                        {settings.phone}
                      </a>
                    </div>
                  </li>
                )}
                {settings?.email && (
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                      <HiMail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Email</p>
                      <a href={`mailto:${settings.email}`} className="mt-0.5 block text-sm text-ink-700 hover:text-brand-500">
                        {settings.email}
                      </a>
                    </div>
                  </li>
                )}
                {settings?.openingHours && (
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                      <HiClock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Opening Hours</p>
                      <p className="mt-0.5 text-sm text-ink-700">{settings.openingHours}</p>
                    </div>
                  </li>
                )}
                {settings?.facebook && (
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                      <HiGlobeAlt className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Website</p>
                      <a
                        href={settings.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-0.5 block text-sm text-ink-700 hover:text-brand-500"
                      >
                        {settings.facebook.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </li>
                )}
              </ul>

              {settings?.mapEmbedUrl && (
                <div className="mt-6 overflow-hidden rounded-xl border border-ink-100">
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
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
