'use client';

import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  AudioLines,
  BookOpen,
  MapPin,
  Mic2,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';

type ExperienceMode = 'visitor' | 'custodian';

const modeContent = {
  visitor: {
    eyebrow: 'India, told from within',
    title: <><span>Culture lives</span><br />in <em>their</em> voice.</>,
    lede: 'Meet the artists, elders, performers, and keepers carrying India’s living traditions forward—on their own terms.',
    primary: { label: 'Enter the living archive', href: '/discover' },
    secondary: { label: 'Book an experience', href: '/book', icon: BookOpen },
    image: '/theyyam-custodian.jpg',
    imageAlt: 'Theyyam custodian wearing traditional ritual makeup and costume',
    featured: 'Featured voice',
    name: 'Kuttan Nair',
    location: 'Kannur, Kerala',
    storyLabel: 'Hear his story',
    storyHref: '/custodians/kuttan-nair#story',
    noteTitle: 'Custodian-controlled',
    note: 'Every story is reviewed, approved, and shared by its owner.',
    signals: [['01', 'People first'], ['02', 'Consent at every step'], ['03', 'Income goes direct']],
  },
  custodian: {
    eyebrow: 'A workspace that speaks your language',
    title: <><span>Your culture.</span><br /><em>Your</em> rules.</>,
    lede: 'Speak naturally. Shape your story with AI. Approve every word and decide exactly what the world may see.',
    primary: { label: 'Start with my voice', href: '/onboarding' },
    secondary: { label: 'Open my workspace', href: '/dashboard', icon: UserRound },
    image: '/bharatanatyam.jpg',
    imageAlt: 'A Parampara custodian preparing to share a living tradition',
    featured: 'Custodian workspace',
    name: 'Asha Rao',
    location: 'Bengaluru, Karnataka',
    storyLabel: 'Open studio',
    storyHref: '/story-studio',
    noteTitle: 'Nothing auto-publishes',
    note: 'Your original voice, edits, and permission choices stay connected.',
    signals: [['01', 'Speak naturally'], ['02', 'Approve every word'], ['03', 'Change access anytime']],
  },
};

export function DualModeHero() {
  const [mode, setMode] = useState<ExperienceMode>('visitor');
  const content = modeContent[mode];
  const SecondaryIcon = content.secondary.icon;

  return (
    <section className={`hero-shell mode-${mode}`} aria-labelledby="hero-title">
      <div className="hero-noise" />
      <div className="hero-copy" key={mode}>
        <div className="experience-switch" role="group" aria-label="Choose how you use Parampara">
          <span>I’m here to</span>
          <button className={mode === 'visitor' ? 'active' : ''} onClick={() => setMode('visitor')} aria-pressed={mode === 'visitor'}><BookOpen /> Discover culture</button>
          <button className={mode === 'custodian' ? 'active' : ''} onClick={() => setMode('custodian')} aria-pressed={mode === 'custodian'}><Mic2 /> Share my culture</button>
        </div>
        <p className="eyebrow"><Sparkles /> {content.eyebrow}</p>
        <h1 id="hero-title">{content.title}</h1>
        <p className="hero-lede">{content.lede}</p>
        <div className="hero-actions">
          <a className="hero-primary" href={content.primary.href}>{content.primary.label} <ArrowRight /></a>
          <a className="hero-secondary" href={content.secondary.href}><SecondaryIcon /> {content.secondary.label}</a>
        </div>
      </div>

      <div className="hero-portrait" aria-label={content.featured} key={`${mode}-portrait`}>
        <div className="portrait-sun" />
        <div className="portrait-frame">
          <img src={content.image} alt={content.imageAlt} />
          <div className="portrait-copy">
            <span>{content.featured}</span>
            <strong>{content.name}</strong>
            <p><MapPin /> {content.location}</p>
          </div>
        </div>
        <a className="story-orbit" href={content.storyHref} aria-label={content.storyLabel}><AudioLines /><span>{content.storyLabel}</span></a>
      </div>

      <aside className="hero-note" key={`${mode}-note`}>
        <ShieldCheck />
        <p><span>{content.noteTitle}</span> {content.note}</p>
        <ArrowDownRight />
      </aside>

      <div className="hero-signals" aria-label={`${mode === 'visitor' ? 'Visitor' : 'Custodian'} mode principles`}>
        {content.signals.map(([number, label]) => <div key={number}><span>{number}</span><p>{label}</p></div>)}
      </div>
    </section>
  );
}
