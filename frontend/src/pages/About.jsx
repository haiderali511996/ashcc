import { HiOutlineEye, HiOutlineFlag } from 'react-icons/hi';
import PageHero from '../components/PageHero';
import { useSettings } from '../context/SettingsContext';

export default function About() {
  const { settings } = useSettings();

  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="Who We Are"
        subtitle="Learn more about Al Sadiq Health Care Centre and our commitment to your health."
      />

      <section className="section">
        <div className="container-app grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-eyebrow">Our Story</span>
            <h2 className="section-title">{settings.siteName}</h2>
            <p className="mt-4 whitespace-pre-line text-ink-600">
              {settings.aboutText ||
                'Al Sadiq Health Care Centre (ASHCC) is a trusted healthcare provider based in Lahore, Pakistan, dedicated to delivering compassionate, affordable and quality medical care to the community. Our experienced team of doctors, nurses and support staff work together to ensure every patient receives the attention and treatment they deserve.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card flex flex-col items-center justify-center gap-2 p-8 text-center">
              <p className="text-4xl font-bold text-brand-500">10+</p>
              <p className="text-sm font-semibold text-ink-600">Years of Service</p>
            </div>
            <div className="card flex flex-col items-center justify-center gap-2 p-8 text-center">
              <p className="text-4xl font-bold text-brand-500">1000+</p>
              <p className="text-sm font-semibold text-ink-600">Happy Patients</p>
            </div>
            <div className="card flex flex-col items-center justify-center gap-2 p-8 text-center">
              <p className="text-4xl font-bold text-brand-500">24/7</p>
              <p className="text-sm font-semibold text-ink-600">Emergency Support</p>
            </div>
            <div className="card flex flex-col items-center justify-center gap-2 p-8 text-center">
              <p className="text-4xl font-bold text-brand-500">Expert</p>
              <p className="text-sm font-semibold text-ink-600">Medical Team</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ink-50">
        <div className="container-app grid gap-6 md:grid-cols-2">
          <div className="card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <HiOutlineFlag className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-ink-900">Our Mission</h3>
            <p className="mt-2 text-ink-600">
              {settings.mission ||
                'To provide accessible, high-quality and compassionate healthcare services to every member of our community, regardless of background.'}
            </p>
          </div>
          <div className="card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <HiOutlineEye className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-ink-900">Our Vision</h3>
            <p className="mt-2 text-ink-600">
              {settings.vision ||
                'To be the most trusted healthcare centre in Lahore, recognized for clinical excellence and patient-first care.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
