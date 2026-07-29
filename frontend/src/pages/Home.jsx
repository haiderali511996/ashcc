import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiArrowRight,
} from 'react-icons/hi';
import api from '../api/client';
import { useSettings } from '../context/SettingsContext';
import BlogCard from '../components/BlogCard';
import TeamCard from '../components/TeamCard';
import Spinner from '../components/Spinner';

const features = [
  {
    icon: HiOutlineHeart,
    title: 'Patient-Centered Care',
    desc: 'Every treatment plan is built around your comfort, dignity and recovery.',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Experienced Team',
    desc: 'Qualified doctors, nurses and staff dedicated to your wellbeing.',
  },
  {
    icon: HiOutlineClock,
    title: 'Timely Appointments',
    desc: 'Book online and get seen quickly, with minimal waiting time.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Trusted Excellence',
    desc: 'Modern facilities and rigorous hygiene standards you can rely on.',
  },
];

export default function Home() {
  const { settings } = useSettings();
  const [blogs, setBlogs] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/blogs', { params: { limit: 3 } }),
      api.get('/team'),
    ])
      .then(([blogRes, teamRes]) => {
        setBlogs(blogRes.data.blogs || []);
        setTeam((teamRes.data || []).slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700/50 via-ink-900 to-ink-900" />
        <div className="container-app relative grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-eyebrow text-brand-400">Al Sadiq Health Care Centre</span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
              {settings.tagline || 'Compassionate Care, Trusted Excellence'}
            </h1>
            <p className="mt-6 max-w-xl text-white/70">
              Serving the Lahore community with quality, affordable and compassionate
              healthcare &mdash; from routine checkups to specialist consultations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/appointment" className="btn-primary">
                Book an Appointment <HiArrowRight />
              </Link>
              <Link to="/about" className="btn-white">
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative mx-auto flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
            <div className="absolute inset-0 rounded-full bg-brand-500/20 blur-3xl" />
            <img
              src="/logo-icon.png"
              alt="Al Sadiq Health Care Centre"
              className="relative h-full w-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container-app">
          <div className="text-center">
            <span className="section-eyebrow">Why Choose Us</span>
            <h2 className="section-title">Healthcare You Can Trust</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold text-ink-900">{title}</h3>
                <p className="mt-2 text-sm text-ink-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="section bg-ink-50">
        <div className="container-app grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-eyebrow">About ASHCC</span>
            <h2 className="section-title">Dedicated to the Health of Our Community</h2>
            <p className="mt-4 text-ink-600">
              {settings.aboutText ||
                'Al Sadiq Health Care Centre is committed to providing accessible, high-quality medical services in Lahore, Pakistan, guided by compassion and clinical excellence.'}
            </p>
            <Link to="/about" className="btn-outline mt-6">
              More About Us <HiArrowRight />
            </Link>
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

      {/* Team preview */}
      {(loading || team.length > 0) && (
        <section className="section">
          <div className="container-app">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="section-eyebrow">Our Team</span>
                <h2 className="section-title">Meet Our Specialists</h2>
              </div>
              <Link to="/team" className="btn-outline">
                View All <HiArrowRight />
              </Link>
            </div>
            {loading ? (
              <div className="mt-12 flex justify-center"><Spinner /></div>
            ) : (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {team.map((member) => (
                  <TeamCard key={member._id} member={member} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Blog preview */}
      {(loading || blogs.length > 0) && (
        <section className="section bg-ink-50">
          <div className="container-app">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="section-eyebrow">Health Blog</span>
                <h2 className="section-title">Latest Articles &amp; Health Tips</h2>
              </div>
              <Link to="/blog" className="btn-outline">
                View All <HiArrowRight />
              </Link>
            </div>
            {loading ? (
              <div className="mt-12 flex justify-center"><Spinner /></div>
            ) : (
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-500">
        <div className="container-app flex flex-col items-center gap-6 py-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Book Your Appointment?</h2>
          <p className="max-w-xl text-white/80">
            Our team is ready to provide the care you need. Schedule your visit today.
          </p>
          <Link to="/appointment" className="btn-white">
            Book Appointment <HiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
