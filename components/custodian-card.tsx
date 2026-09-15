'use client';

import { useState } from 'react';
import { ArrowUpRight, Bookmark, MapPin, ShieldCheck } from 'lucide-react';
import type { Custodian } from '@/lib/cultural-data';

export function CustodianCard({
  custodian,
  index,
}: {
  custodian: Custodian;
  index: number;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="custodian-card" style={{ '--card-accent': custodian.color } as React.CSSProperties}>
      <a
        href={`/custodians/${custodian.slug}`}
        className="custodian-image"
        aria-label={`Open ${custodian.name}'s profile`}
      >
        <img src={custodian.image} alt={`${custodian.name}, ${custodian.tradition} custodian`} />
        <span className="card-number">0{index + 1}</span>
        <span className="verified"><ShieldCheck /> Voice verified</span>
        <ArrowUpRight className="card-arrow" />
      </a>
      <div className="custodian-meta">
        <div>
          <p>{custodian.tradition}</p>
          <h3>{custodian.name}</h3>
          <span><MapPin /> {custodian.location}</span>
        </div>
        <button
          className={saved ? 'saved' : ''}
          onClick={() => setSaved((value) => !value)}
          aria-label={saved ? `Remove ${custodian.name} from saved` : `Save ${custodian.name}`}
          aria-pressed={saved}
        ><Bookmark className={saved ? 'fill-current' : ''} /></button>
      </div>
      <blockquote>“{custodian.quote}”</blockquote>
    </article>
  );
}
