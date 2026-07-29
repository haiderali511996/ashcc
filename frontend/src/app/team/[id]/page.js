import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { serverFetch } from '@/lib/serverApi';
import { mediaUrl } from '@/lib/config';

async function getMember(id) {
  return serverFetch(`/team/${id}`, { revalidate: 60 });
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) return { title: 'Team Member Not Found' };

  return {
    title: `${member.name} — ${member.designation}`,
    description: member.bio || `${member.name}, ${member.designation} at Al Sadiq Health Care Centre.`,
  };
}

export default async function TeamMemberDetail({ params }) {
  const { id } = await params;
  const member = await getMember(id);

  if (!member) notFound();

  const socials = [
    { url: member.socials?.facebook, Icon: FaFacebookF, label: 'Facebook' },
    { url: member.socials?.linkedin, Icon: FaLinkedinIn, label: 'LinkedIn' },
    { url: member.socials?.twitter, Icon: FaTwitter, label: 'Twitter' },
  ].filter((s) => s.url);

  return (
    <article>
      <div className="bg-ink-900 py-16 text-white">
        <div className="container-app max-w-4xl">
          <Link href="/team" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <HiArrowLeft /> Back to Our Team
          </Link>
        </div>
      </div>

      <div className="section">
        <div className="container-app max-w-4xl">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-ink-100 shadow-lg">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={mediaUrl(member.photo)} alt={member.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-ink-300">
                    {member.name?.charAt(0)}
                  </div>
                )}
              </div>
              {socials.length > 0 && (
                <div className="mt-5 flex gap-2">
                  {socials.map(({ url, Icon, label }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-100 text-ink-600 hover:bg-brand-500 hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-ink-900">{member.name}</h1>
              <p className="mt-2 text-lg font-semibold text-brand-500">{member.designation}</p>
              {member.department && (
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-ink-400">
                  {member.department}
                </p>
              )}
              {member.bio && (
                <p className="mt-6 whitespace-pre-line leading-relaxed text-ink-600">{member.bio}</p>
              )}
              <Link href="/appointment" className="btn-primary mt-8">
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
