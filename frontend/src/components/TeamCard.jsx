import Link from 'next/link';
import { mediaUrl } from '@/lib/config';

export default function TeamCard({ member }) {
  return (
    <Link href={`/team/${member._id}`} className="card group overflow-hidden text-center block">
      <div className="aspect-square w-full overflow-hidden bg-ink-100">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mediaUrl(member.photo)}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-ink-300">
            {member.name?.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-ink-900 group-hover:text-brand-500 transition-colors">{member.name}</h3>
        <p className="mt-1 text-sm font-semibold text-brand-500">{member.designation}</p>
        {member.department && <p className="mt-1 text-xs text-ink-400">{member.department}</p>}
      </div>
    </Link>
  );
}
