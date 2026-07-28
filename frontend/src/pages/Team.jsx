import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import TeamCard from '../components/TeamCard';
import Spinner from '../components/Spinner';
import api from '../api/client';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/team')
      .then((res) => setTeam(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Our Team"
        title="Meet Our Medical Experts"
        subtitle="Qualified, experienced professionals committed to your health and wellbeing."
      />
      <section className="section">
        <div className="container-app">
          {loading ? (
            <div className="flex justify-center"><Spinner /></div>
          ) : team.length === 0 ? (
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
