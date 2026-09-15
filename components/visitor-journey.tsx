import { ArrowRight, Bookmark, CalendarDays, Check, Compass, HeartHandshake, IndianRupee, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { CustodianCard } from '@/components/custodian-card';
import { custodians } from '@/lib/cultural-data';

const respectPromises = [
  'I ask before photographing or recording.',
  'I follow the custodian’s guidance inside the experience.',
  'I do not copy, resell, or train AI on protected material.',
  'I understand where my payment goes.',
];

export function VisitorJourney() {
  return (
    <section className="journey-shell">
      <header className="journey-hero">
        <div className="journey-profile">
          <span><Compass /></span>
          <p><strong>Visitor profile</strong><small>Your private cultural journey</small></p>
          <a href="/?choose=1">Switch experience</a>
        </div>
        <div className="journey-heading">
          <p><Sparkles /> Welcome back, curious mind</p>
          <h1>Carry a story home.<br /><em>Leave its ownership here.</em></h1>
          <span>Everything you save, request, or learn stays organised around the people who shared it.</span>
          <div><a href="/discover">Continue discovering <ArrowRight /></a><a href="#upcoming">See my visit <CalendarDays /></a></div>
        </div>
      </header>

      <div className="journey-metrics" aria-label="Your journey at a glance">
        <article><Bookmark /><p><strong>2</strong><span>voices saved</span></p></article>
        <article><CalendarDays /><p><strong>1</strong><span>visit requested</span></p></article>
        <article><IndianRupee /><p><strong>₹1,500</strong><span>direct support</span></p></article>
        <article><HeartHandshake /><p><strong>91%</strong><span>reaches custodians</span></p></article>
      </div>

      <section className="journey-upcoming" id="upcoming">
        <div className="journey-upcoming-image">
          <img src="/og.png" alt="Meenakshi Bhat preparing for the Inside Yakshagana cultural experience" />
          <span><ShieldCheck /> Custodian confirmed</span>
        </div>
        <div className="journey-upcoming-copy">
          <p>Your next doorway</p>
          <h2>Inside<br /><em>Yakshagana</em></h2>
          <blockquote>“Arrive curious. Leave understanding the work behind the wonder.”</blockquote>
          <div>
            <span><CalendarDays /> Saturday, 21 November · 10:30 AM</span>
            <span><MapPin /> Udupi, Karnataka · Accessible venue</span>
          </div>
          <a href="/book">View visit details <ArrowRight /></a>
        </div>
      </section>

      <section className="journey-saved">
        <header><div><p>Saved for later</p><h2>Voices you chose<br />to remember.</h2></div><a href="/discover">Find another voice <ArrowRight /></a></header>
        <div>{[custodians[0], custodians[3]].map((custodian, index) => <CustodianCard key={custodian.slug} custodian={custodian} index={index} />)}</div>
      </section>

      <section className="respect-passport">
        <header><p><ShieldCheck /> Your respect passport</p><span>4 of 4 understood</span></header>
        <div>
          <h2>Good visits begin<br /><em>before arrival.</em></h2>
          <p>These promises protect the person, practice, and knowledge behind every Parampara experience.</p>
        </div>
        <ul>{respectPromises.map((promise) => <li key={promise}><Check /> {promise}</li>)}</ul>
      </section>
    </section>
  );
}
