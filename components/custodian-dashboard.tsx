'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Eye,
  IndianRupee,
  LayoutDashboard,
  MessageCircle,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from 'lucide-react';

const demoSteps = [
  { label: 'Problem', title: 'A custodian has a story—but no safe, simple way to publish it.', copy: 'Meenakshi speaks naturally in Kannada. Parampara keeps her original recording private while AI prepares an editable draft.', accent: '#c9603c' },
  { label: 'Assist', title: 'AI structures the story without claiming authorship.', copy: 'The system identifies themes, creates sections, and prepares a translation. Original audio stays attached as the source.', accent: '#d79651' },
  { label: 'Approve', title: 'Meenakshi reviews every word before anything moves.', copy: 'She edits the draft, compares it with her recording, and explicitly marks it as accurate.', accent: '#547c67' },
  { label: 'Control', title: 'Sharing choices stay separate and understandable.', copy: 'Her introduction is public. Performance media requires permission. Ritual details remain private.', accent: '#6d7fb2' },
  { label: 'Outcome', title: 'The story creates respect, access, and direct income.', copy: 'A visitor discovers her profile, requests a workshop, and sees exactly how the booking supports her.', accent: '#b66b45' },
];

export function CustodianDashboard() {
  const [demoStep, setDemoStep] = useState(-1);
  const [showWhy, setShowWhy] = useState(false);
  const [noticeRead, setNoticeRead] = useState(false);
  const [topNotice, setTopNotice] = useState('');
  const [messageOpen, setMessageOpen] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(false);

  const advanceDemo = () => {
    if (demoStep >= demoSteps.length - 1) setDemoStep(-1);
    else setDemoStep((value) => value + 1);
  };

  return (
    <section className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <a href="/" className="dash-brand"><span>प</span><strong>Parampara</strong></a>
        <nav>
          <a className="active" href="/dashboard"><LayoutDashboard /> Overview</a>
          <a href="/story-studio"><BookOpen /> My stories</a>
          <a href="/book"><CalendarDays /> Experiences</a>
          <a href="/permissions"><ShieldCheck /> Cultural controls</a>
          <a href="#messages"><MessageCircle /> Messages <span>2</span></a>
        </nav>
        <a className="dash-profile" href="/?choose=1" aria-label="Switch from the custodian experience">
          <div>MB</div><p><strong>Meenakshi Bhat</strong><span>Custodian profile · Switch experience</span></p><ChevronRight />
        </a>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <p>Tuesday, 15 September</p>
          <div><a href="/?choose=1" aria-label="Switch experience"><UserRound /></a><button onClick={() => setTopNotice('Every decision stays reversible. The guided demo is the fastest way to explore Parampara.')} aria-label="Help"><CircleHelp /></button><button onClick={() => setTopNotice('2 updates: a new message and one workshop request. Both are shown in Recent activity.')} aria-label="Notifications"><Bell /><span /></button></div>
        </header>

        {topNotice && <div className="dashboard-notice" role="status"><span>{topNotice}</span><button onClick={() => setTopNotice('')} aria-label="Dismiss notice">Dismiss</button></div>}

        <div className="dashboard-greeting">
          <div><p>Namaskara, Meenakshi.</p><h1>Here&apos;s what matters<br /><em>today.</em></h1></div>
          <button onClick={() => setDemoStep(0)}><Play className="fill-current" /><span><strong>See how Parampara works</strong><small>5 guided steps · about 2 minutes</small></span></button>
        </div>

        <section className="dashboard-quick-actions" aria-label="Recommended next actions">
          <header><p>Start here</p><span>Everything important is one tap away.</span></header>
          <div>
            <a href="/story-studio"><BookOpen /><p><strong>Tell a new story</strong><small>Speak naturally; review every word</small></p><ArrowRight /></a>
            <a href="/permissions"><ShieldCheck /><p><strong>Review 3 access requests</strong><small>You decide who may watch</small></p><ArrowRight /></a>
            <a href="/book"><CalendarDays /><p><strong>Check your next visit</strong><small>Saturday · 4 guests confirmed</small></p><ArrowRight /></a>
          </div>
        </section>

        {demoStep >= 0 && (
          <section className="demo-rail" aria-live="polite" style={{ '--demo-accent': demoSteps[demoStep].accent } as React.CSSProperties}>
            <header><p><Sparkles /> Guided product tour</p><span>{demoStep + 1} / {demoSteps.length}</span></header>
            <div className="demo-progress">{demoSteps.map((step, index) => <i key={step.label} className={index <= demoStep ? 'active' : ''} />)}</div>
            <div className="demo-content"><span>{demoSteps[demoStep].label}</span><h2>{demoSteps[demoStep].title}</h2><p>{demoSteps[demoStep].copy}</p></div>
            <footer><button onClick={() => setDemoStep(-1)}>Exit demo</button><button onClick={advanceDemo}>{demoStep === demoSteps.length - 1 ? <><RotateCcw /> Restart later</> : <>Next: {demoSteps[demoStep + 1].label} <ArrowRight /></>}</button></footer>
          </section>
        )}

        <section className="metric-grid" aria-label="Profile overview">
          <article><span><Eye /></span><p><small>Profile views</small><strong>1,284</strong><em>+18% this month</em></p></article>
          <article><span><CalendarDays /></span><p><small>Workshop bookings</small><strong>5</strong><em>2 this week</em></p></article>
          <article><span><Users /></span><p><small>Access requests</small><strong>3</strong><em>Needs your choice</em></p></article>
          <article><span><IndianRupee /></span><p><small>Earned directly</small><strong>₹6,750</strong><em>This month</em></p></article>
        </section>

        <div className="dashboard-columns">
          <section className="attention-panel">
            <header><div><Sparkles /><p><small>Parampara AI suggestion</small><strong>One choice needs your attention</strong></p></div><span>High confidence</span></header>
            <h2>Two educators requested access to your performance film.</h2>
            <p>Both requests are from verified institutions and describe how the film will be used in class.</p>
            {showWhy && <div className="why-panel"><strong>Why this was surfaced</strong><span>Requesters verified · Educational purpose stated · Your setting requires approval</span></div>}
            <footer><button onClick={() => setShowWhy(!showWhy)}>{showWhy ? 'Hide explanation' : 'Why this suggestion?'}</button><a href="/permissions">Review requests <ArrowRight /></a></footer>
          </section>

          <section className="upcoming-panel">
            <header><p>Next experience</p><a href="/book">View all</a></header>
            <div className="date-tile"><strong>21</strong><span>Nov<br />10:30</span></div>
            <h2>Inside Yakshagana</h2>
            <p><UserRound /> Rahul & family · 4 guests</p>
            <span><Check /> Venue and accessibility confirmed</span>
          </section>
        </div>

        <section className="activity-panel" id="messages">
          <header><div><p>Recent activity</p><h2>Small moments of impact.</h2></div><button onClick={() => setHistoryExpanded((value) => !value)}>{historyExpanded ? 'Hide history' : 'View history'}</button></header>
          <div className="activity-list">
            <article><span><MessageCircle /></span><p><strong>“Your story helped my daughter understand the performance.”</strong><small>Message from Ananya · 24 minutes ago</small>{messageOpen && <em>“She noticed the meaning behind each gesture. Thank you for making it feel personal.”</em>}</p><button onClick={() => setMessageOpen((value) => !value)} aria-label={messageOpen ? 'Close message' : 'Open message'}>{messageOpen ? <Check /> : <ChevronRight />}</button></article>
            <article><span><CalendarDays /></span><p><strong>A new workshop request arrived</strong><small>Rahul & family · Saturday, 21 November</small></p><a href="/book" aria-label="Open booking"><ChevronRight /></a></article>
            <article className={noticeRead ? 'read' : ''}><span><ShieldCheck /></span><p><strong>Your sharing choices are working</strong><small>3 private items stayed protected this week</small></p><button onClick={() => setNoticeRead(true)} aria-label="Mark notice read">{noticeRead ? <Check /> : <ChevronRight />}</button></article>
            {historyExpanded && <><article className="read"><span><BookOpen /></span><p><strong>Your Yakshagana introduction was approved</strong><small>You reviewed every word · 8 September</small></p><a href="/story-studio" aria-label="Open approved story"><ChevronRight /></a></article><article className="read"><span><IndianRupee /></span><p><strong>₹4,500 transferred directly</strong><small>Workshop with Manipal students · 2 September</small></p><a href="/book" aria-label="Open earning details"><ChevronRight /></a></article></>}
          </div>
        </section>
      </main>

      <nav className="dashboard-mobile-nav" aria-label="Dashboard navigation">
        <a className="active" href="/dashboard"><LayoutDashboard /><span>Home</span></a>
        <a href="/story-studio"><BookOpen /><span>Stories</span></a>
        <button onClick={() => setDemoStep(0)}><Sparkles /><span>Demo</span></button>
        <a href="/book"><CalendarDays /><span>Bookings</span></a>
        <a href="/permissions"><ShieldCheck /><span>Controls</span></a>
      </nav>
    </section>
  );
}
