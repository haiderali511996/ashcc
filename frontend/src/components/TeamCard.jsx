import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { mediaUrl } from '@/lib/config';

export default function TeamCard({ member }) {
  const socials = [
    { url: member.socials?.facebook, Icon: FaFacebookF },
    { url: member.socials?.linkedin, Icon: FaLinkedinIn },
    { url: member.socials?.twitter, Icon: FaTwitter },
  ].filter((s) => s.url);

  return (
    <div className="card overflow-hidden text-center">
      <div className="aspect-square w-full overflow-hidden bg-ink-100">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={mediaUrl(member.photo)} alt={member.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-ink-300">
            {member.name?.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-ink-900">{member.name}</h3>
        <p className="mt-1 text-sm font-semibold text-brand-500">{member.designation}</p>
        {member.department && <p className="mt-1 text-xs text-ink-400">{member.department}</p>}
        {socials.length > 0 && (
          <div className="mt-4 flex justify-center gap-2">
            {socials.map(({ url, Icon }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-100 text-ink-600 hover:bg-brand-500 hover:text-white transition-colors"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
