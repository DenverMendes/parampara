'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Languages, MapPin, Minus, Plus, ShieldCheck, Users } from 'lucide-react';

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
  const base = 1500 * people;
  const fee = 150 * people;

  if (booked) {
    return (
      <section className="booking-success" aria-live="polite">
        <div><Check /></div>
        <p>Request sent to Meenakshi</p>
        <h1>Your doorway into<br /><em>Yakshagana is open.</em></h1>
        <span>No payment was taken. Meenakshi will confirm the time first.</span>
        <article><strong>{dates[selectedDate].fullDay}, {dates[selectedDate].date} {dates[selectedDate].fullMonth}</strong><small>10:30 AM · {people} {people === 1 ? 'person' : 'people'} · Udupi, Karnataka</small></article>
        <a href="/dashboard">See request in dashboard <ArrowRight /></a>
      </section>
    );
  }

  return (
    <section className="booking-shell">
      <a className="booking-back" href="/custodians/meenakshi-bhat"><ArrowLeft /> Back to Meenakshi</a>
      <div className="booking-experience">
        <div className="booking-image">
          <img src="/og.png" alt="Yakshagana custodian preparing for a cultural experience" />
          <span><ShieldCheck /> Hosted by a verified custodian</span>
        </div>
        <div className="booking-copy">
          <p>Small-group cultural experience</p>
          <h1>Inside<br /><em>Yakshagana</em></h1>
          <blockquote>“Not a performance watched from a seat—a tradition understood from inside the room.”</blockquote>
          <div className="experience-facts">
            <span><Clock3 /><p><strong>2 hours</strong><small>Unhurried and interactive</small></p></span>
            <span><Users /><p><strong>1–6 people</strong><small>Small by design</small></p></span>
            <span><Languages /><p><strong>Kannada · English</strong><small>Tulu on request</small></p></span>
            <span><MapPin /><p><strong>Udupi, Karnataka</strong><small>Accessible venue</small></p></span>
          </div>
        </div>
      </div>

      <aside className="booking-panel">
        <p><CalendarDays /> Choose your visit</p>
        <h2>₹1,500 <small>per person</small></h2>
        <div className="date-strip" aria-label="Available dates">
          {dates.map((date, index) => <button key={date.date} className={selectedDate === index ? 'active' : ''} onClick={() => setSelectedDate(index)}><span>{date.day}</span><strong>{date.date}</strong><small>{date.month}</small></button>)}
        </div>
        <label>People <span><button onClick={() => setPeople(Math.max(1, people - 1))} aria-label="Remove one person"><Minus /></button><strong>{people}</strong><button onClick={() => setPeople(Math.min(6, people + 1))} aria-label="Add one person"><Plus /></button></span></label>
        <div className="price-lines">
          <p><span>Goes to Meenakshi</span><strong>₹{base.toLocaleString('en-IN')}</strong></p>
          <p><span>Platform support</span><strong>₹{fee.toLocaleString('en-IN')}</strong></p>
          <p><span>Total</span><strong>₹{(base + fee).toLocaleString('en-IN')}</strong></p>
        </div>
        <small className="fee-note">91% goes directly to the custodian. No payment until she confirms.</small>
        <button className="booking-submit" onClick={() => setBooked(true)}>Request this experience <ArrowRight /></button>
      </aside>
    </section>
  );
}
