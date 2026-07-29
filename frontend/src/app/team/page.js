import PageHero from '@/components/PageHero';
import TeamCard from '@/components/TeamCard';
import { serverFetch } from '@/lib/serverApi';

export const metadata = {
  title: 'Our Team',
  description:
    'Meet the doctors, nurses, and staff of Al Sadiq Health Care Centre in Lahore — experienced, qualified professionals committed to your health.',
};

export default async function Team() {
  const team = (await serverFetch('/team')) || [];

  return (
    <div>
      <PageHero
        eyebrow="Our Team"
        title="Meet Our Medical Experts"
        subtitle="Qualified, experienced professionals committed to your health and wellbeing."
      />
      <section className="section">
        <div className="container-app">
          {team.length === 0 ? (
            <p className="text-center text-ink-500">Team information coming soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <TeamCard key={member._id} member={member} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
