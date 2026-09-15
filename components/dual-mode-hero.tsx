'use client';

import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  AudioLines,
  BookOpen,
  Check,
  Compass,
  HeartHandshake,
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
    secondary: { label: 'My cultural journey', href: '/journey', icon: UserRound },
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
  const [mode, setMode] = useState<ExperienceMode | null>(null);

  useEffect(() => {
    const savedMode = window.sessionStorage.getItem('parampara-mode');
    const forceChoice = new URLSearchParams(window.location.search).has('choose');
    if (!forceChoice && (savedMode === 'visitor' || savedMode === 'custodian')) setMode(savedMode);
  }, []);

  const chooseMode = (nextMode: ExperienceMode) => {
    window.sessionStorage.setItem('parampara-mode', nextMode);
    setMode(nextMode);
    window.dispatchEvent(new CustomEvent('parampara-mode-change', { detail: nextMode }));
  };

  if (!mode) {
    return (
      <section className="experience-gate" aria-labelledby="experience-gate-title">
        <div className="gate-atmosphere" />
        <div className="gate-intro">
          <p><Sparkles /> Before we begin</p>
          <h1 id="experience-gate-title">How are you entering<br /><em>Parampara?</em></h1>
          <span>Choose the experience that belongs to you. You can switch anytime.</span>
        </div>

        <div className="gate-choices">
          <button className="gate-choice gate-visitor" onClick={() => chooseMode('visitor')}>
            <img src="/theyyam-custodian.jpg" alt="A visitor discovering a Theyyam custodian's story" />
            <i />
            <div>
              <span><Compass /> Visitor</span>
              <h2>I’m here<br />to discover.</h2>
              <p>Meet people behind living traditions, save their stories, and learn directly from them.</p>
              <strong>Enter as a visitor <ArrowRight /></strong>
            </div>
          </button>

          <button className="gate-choice gate-custodian" onClick={() => chooseMode('custodian')}>
            <img src="/bharatanatyam.jpg" alt="A cultural custodian preparing to share her tradition" />
            <i />
            <div>
              <span><Mic2 /> Custodian</span>
              <h2>I’m here<br />to share.</h2>
              <p>Tell your story naturally, approve every word, and decide exactly who may access it.</p>
              <strong>Enter as a custodian <ArrowRight /></strong>
            </div>
          </button>
        </div>

        <div className="gate-promise"><HeartHandshake /><span><strong>Two experiences. One promise.</strong> Culture stays in human hands.</span><Check /></div>
      </section>
    );
  }

  const content = modeContent[mode];
  const SecondaryIcon = content.secondary.icon;

  return (
    <section className={`hero-shell mode-${mode}`} aria-labelledby="hero-title">
      <div className="hero-noise" />
      <div className="hero-copy" key={mode}>
        <div className="experience-switch" role="group" aria-label="Choose how you use Parampara">
          <span>I’m here to</span>
          <button className={mode === 'visitor' ? 'active' : ''} onClick={() => chooseMode('visitor')} aria-pressed={mode === 'visitor'}><BookOpen /> Discover culture</button>
          <button className={mode === 'custodian' ? 'active' : ''} onClick={() => chooseMode('custodian')} aria-pressed={mode === 'custodian'}><Mic2 /> Share my culture</button>
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
