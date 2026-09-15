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
      <SiteHeader />
      <section className="profile-cover">
        <img src={person.image} alt={`${person.name} practicing ${person.tradition}`} />
        <div className="profile-cover-shade" />
        <div className="profile-identity">
          <p><ShieldCheck /> Custodian voice verified</p>
          <h1>{person.name}</h1>
          <span>{person.tradition} · {person.role}</span>
          <small><MapPin /> {person.location} · {person.languages.join(' · ')}</small>
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
          <p className="story-dropcap">This tradition first entered my life through the people around me. I learned by watching, listening, repeating, and slowly understanding why every detail matters.</p>
          <p>Today, I share it with learners who want more than a photograph. They come to understand the preparation, the discipline, the community, and the responsibility behind what they see.</p>
          <StoryAudioButton
            language={person.languages[0]}
            story={`This tradition first entered my life through the people around me. I learned by watching, listening, repeating, and slowly understanding why every detail matters. Today, I share it with learners who want more than a photograph. They come to understand the preparation, the discipline, the community, and the responsibility behind what they see.`}
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
          <span>It changes carefully, through the people who practice it.</span>
        </div>
        <img src="/weaving-hands.jpg" alt="Close view of handwork showing the detail of a living practice" />
      </section>

      <section className="experience-invite" id="experiences">
        <p>Learn directly from {person.name}</p>
        <h2>A two-hour doorway<br />into {person.tradition}.</h2>
        <div>
          <span><CalendarDays /> Small group · 2 hours</span>
          <strong>₹1,500 <small>per person</small></strong>
          <a href="/book">View the experience <ArrowRight /></a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
