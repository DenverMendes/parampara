'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Languages, MapPin, Minus, Plus, ShieldCheck, Users } from 'lucide-react';
import { custodians } from '@/lib/cultural-data';

const dates = [
  { day: 'Thu', fullDay: 'Thursday', date: '19', month: 'Nov', fullMonth: 'November' },
  { day: 'Sat', fullDay: 'Saturday', date: '21', month: 'Nov', fullMonth: 'November' },
  { day: 'Sun', fullDay: 'Sunday', date: '22', month: 'Nov', fullMonth: 'November' },
  { day: 'Wed', fullDay: 'Wednesday', date: '25', month: 'Nov', fullMonth: 'November' },
];

export function BookingFlow() {
  const [selectedDate, setSelectedDate] = useState(1);
  const [people, setPeople] = useState(1);
  const [booked, setBooked] = useState(false);
  const [hostSlug, setHostSlug] = useState('meenakshi-bhat');

  useEffect(() => {
    const requestedHost = new URLSearchParams(window.location.search).get('host');
    if (requestedHost && custodians.some((person) => person.slug === requestedHost)) setHostSlug(requestedHost);
  }, []);

  const person = custodians.find((item) => item.slug === hostSlug) ?? custodians[1];
  const firstName = person.name.split(' ')[0];
  const experienceWords = person.experience.title.split(' ');
  const experienceAccent = experienceWords.pop();
  const experienceLead = experienceWords.join(' ');
  const base = person.experience.price * people;
  const fee = Math.round(base * 0.1);

  if (booked) {
    return (
      <section className="booking-success" aria-live="polite">
        <div><Check /></div>
        <p>Request sent to {firstName}</p>
        <h1>Your doorway into<br /><em>{person.tradition} is open.</em></h1>
        <span>No payment was taken. {firstName} will confirm the time first.</span>
        <article><strong>{dates[selectedDate].fullDay}, {dates[selectedDate].date} {dates[selectedDate].fullMonth}</strong><small>10:30 AM · {people} {people === 1 ? 'person' : 'people'} · {person.location}</small></article>
        <a href="/journey">See it in my journey <ArrowRight /></a>
      </section>
    );
  }

  return (
    <section className="booking-shell">
      <a className="booking-back" href={`/custodians/${person.slug}`}><ArrowLeft /> Back to {firstName}</a>
      <div className="booking-experience">
        <div className="booking-image">
          <img src={person.image} alt={`${person.name} preparing to host a ${person.tradition} cultural experience`} />
          <span><ShieldCheck /> Hosted by a verified custodian</span>
        </div>
        <div className="booking-copy">
          <p>Small-group cultural experience · Hosted by {person.name}</p>
          <h1>{experienceLead}<br /><em>{experienceAccent}</em></h1>
          <blockquote>“{person.experience.quote}”</blockquote>
          <div className="experience-facts">
            <span><Clock3 /><p><strong>{person.experience.duration}</strong><small>Unhurried and interactive</small></p></span>
            <span><Users /><p><strong>1–6 people</strong><small>Small by design</small></p></span>
            <span><Languages /><p><strong>{person.languages.slice(0, 2).join(' · ')}</strong><small>Ask about another language</small></p></span>
            <span><MapPin /><p><strong>{person.location}</strong><small>Accessible venue</small></p></span>
          </div>
        </div>
      </div>

      <aside className="booking-panel">
        <p><CalendarDays /> Choose your visit</p>
        <h2>₹{person.experience.price.toLocaleString('en-IN')} <small>per person</small></h2>
        <div className="date-strip" aria-label="Available dates">
          {dates.map((date, index) => <button key={date.date} className={selectedDate === index ? 'active' : ''} onClick={() => setSelectedDate(index)}><span>{date.day}</span><strong>{date.date}</strong><small>{date.month}</small></button>)}
        </div>
        <label>People <span><button disabled={people === 1} onClick={() => setPeople(Math.max(1, people - 1))} aria-label="Remove one person"><Minus /></button><strong aria-live="polite">{people}</strong><button disabled={people === 6} onClick={() => setPeople(Math.min(6, people + 1))} aria-label="Add one person"><Plus /></button></span></label>
        <div className="price-lines" aria-live="polite">
          <p><span>Goes to {firstName}</span><strong>₹{base.toLocaleString('en-IN')}</strong></p>
          <p><span>Platform support</span><strong>₹{fee.toLocaleString('en-IN')}</strong></p>
          <p><span>Total</span><strong>₹{(base + fee).toLocaleString('en-IN')}</strong></p>
        </div>
        <small className="fee-note">91% goes directly to {firstName}. No payment until the visit is confirmed.</small>
        <ol className="booking-next-steps" aria-label="What happens after your request"><li><span>1</span>{firstName} checks the date.</li><li><span>2</span>You receive a confirmation.</li><li><span>3</span>You pay only after approval.</li></ol>
        <button className="booking-submit" onClick={() => setBooked(true)}>Send request · Pay later <ArrowRight /></button>
      </aside>
    </section>
  );
}
