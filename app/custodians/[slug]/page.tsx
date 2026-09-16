import type { Metadata } from 'next';
import { ArrowRight, AudioLines, CalendarDays, MapPin, ShieldCheck } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ShareProfileButton, StoryAudioButton } from '@/components/profile-interactions';
import { custodians } from '@/lib/cultural-data';

export function generateStaticParams() {
  return custodians.map((custodian) => ({ slug: custodian.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const person = custodians.find((item) => item.slug === slug) ?? custodians[0];
  return {
    title: `${person.name} — ${person.tradition}`,
    description: person.quote,
    openGraph: { title: `${person.name} — ${person.tradition}`, description: person.quote, images: [] },
    twitter: { title: `${person.name} — ${person.tradition}`, description: person.quote, images: [] },
  };
}

export default async function CustodianProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = custodians.find((item) => item.slug === slug) ?? custodians[0];

  return (
    <main className="profile-page">
      <SiteHeader activeHref="/discover" />
      <section className="profile-cover">
        <img src={person.image} alt={`${person.name} practicing ${person.tradition}`} />
        <div className="profile-cover-shade" />
        <div className="profile-identity">
          <p><ShieldCheck /> Custodian voice verified</p>
          <h1>{person.name}</h1>
          <span>{person.tradition} · {person.role}</span>
          <small><MapPin /> {person.location} · {person.languages.join(' · ')}</small>
          <a className="profile-cover-action" href={`/book?host=${person.slug}`}>Meet {person.name.split(' ')[0]} <ArrowRight /></a>
        </div>
        <div className="profile-quote">“{person.quote}”</div>
      </section>

      <nav className="profile-nav" aria-label="Profile sections">
        <a className="active" href="#story">Their story</a>
        <a href="#tradition">The tradition</a>
        <a href="#experiences">Experiences</a>
        <a href="/permissions">Sharing choices</a>
        <ShareProfileButton name={person.name} />
      </nav>

      <section className="profile-story" id="story">
        <div className="story-index"><span>01</span><p>In their own words</p></div>
        <div className="story-body">
          <p className="story-dropcap">{person.storyLead}</p>
          <p>{person.storyBody}</p>
          <StoryAudioButton
            language={person.languages[0]}
            story={`${person.storyLead} ${person.storyBody}`}
          />
        </div>
        <aside className="story-fact">
          <AudioLines />
          <p>Original voice preserved</p>
          <span>AI helped structure this story. {person.name} reviewed and approved every word.</span>
        </aside>
      </section>

      <section className="tradition-panel" id="tradition">
        <div>
          <p>02 · The living practice</p>
          <h2>{person.tradition} is not frozen in time.</h2>
          <span>{person.practiceNote}</span>
        </div>
        <img src={person.detailImage} alt={`${person.tradition} as practiced by ${person.name}`} />
      </section>

      <section className="experience-invite" id="experiences">
        <p>Learn directly from {person.name}</p>
        <h2>{person.experience.title}</h2>
        <span className="experience-intro">{person.experience.intro}</span>
        <div>
          <span><CalendarDays /> Small group · {person.experience.duration}</span>
          <strong>₹{person.experience.price.toLocaleString('en-IN')} <small>per person</small></strong>
          <a href={`/book?host=${person.slug}`}>View the experience <ArrowRight /></a>
        </div>
        <small className="experience-trust"><ShieldCheck /> No payment until {person.name.split(' ')[0]} confirms your visit.</small>
      </section>
      <SiteFooter />
    </main>
  );
}
