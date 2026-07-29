import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi';
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
            <div className="card flex gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                <HiLocationMarker className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-ink-900">Address</h3>
                <p className="mt-1 text-sm text-ink-500">{settings?.address}</p>
              </div>
            </div>
            {settings?.phone && (
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
            {settings?.email && (
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
            {settings?.openingHours && (
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
            {settings?.mapEmbedUrl && (
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

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
