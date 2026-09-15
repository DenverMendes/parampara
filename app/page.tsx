'use client';

import {
  ArrowUpRight,
  Bot,
  Camera,
  Check,
  MapPin,
  Search,
  Share2,
  ShieldCheck,
  Users,
  Video,
} from 'lucide-react';

const permissions = [
  { icon: Camera, label: 'Photography', value: 'Ask first', tone: 'amber' },
  { icon: Video, label: 'Video recording', value: 'Not allowed', tone: 'red' },
  { icon: Share2, label: 'Social sharing', value: 'With credit', tone: 'green' },
  { icon: Bot, label: 'AI training', value: 'Not allowed', tone: 'red' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-forest/10 bg-ivory/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="Parampara home">
            <span className="grid h-10 w-10 place-items-center border border-forest bg-forest text-lg font-semibold text-ivory">प</span>
            <span>
              <span className="block font-display text-xl leading-none text-forest">Parampara</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-forest/55">Culture with consent</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-forest/70 md:flex" aria-label="Main navigation">
            <a href="#discover" className="transition hover:text-forest">Discover</a>
            <a href="#consent" className="transition hover:text-forest">How consent works</a>
            <a href="#impact" className="transition hover:text-forest">Impact</a>
          </nav>

          <div className="flex items-center border border-forest/15 bg-white p-1 text-xs font-bold">
            <button className="bg-forest px-3 py-2 text-white">Visitor</button>
            <button className="px-3 py-2 text-forest/65">Custodian</button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-forest/10">
        <div className="heritage-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
              <span className="h-px w-8 bg-terracotta" /> PS-09 · Culture & Community
            </div>
            <h1 className="max-w-3xl font-display text-5xl leading-[.98] tracking-[-0.035em] text-forest sm:text-6xl lg:text-7xl">
              Culture, shared on its <em className="font-normal text-terracotta">own terms.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-charcoal/70 sm:text-lg">
              Discover living traditions directly from the people who preserve them. Custodians decide the story, the price, and what visitors may record or share.
            </p>

            <div className="mt-8 flex max-w-2xl flex-col gap-3 border border-forest/15 bg-white p-2 shadow-[0_12px_40px_rgba(22,56,44,.08)] sm:flex-row">
              <label className="flex flex-1 items-center gap-3 px-3" htmlFor="experience-search">
                <Search className="h-5 w-5 text-forest/45" />
                <span className="sr-only">Search experiences</span>
                <input id="experience-search" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-charcoal/40" placeholder="Search a tradition, place, or custodian" />
              </label>
              <button className="bg-turmeric px-6 py-3 text-sm font-extrabold text-[#2e1700] transition hover:bg-[#c86e05]">Explore experiences</button>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm text-forest/65">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Custodian-approved stories</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4" /> 95% paid to custodians</span>
            </div>
          </div>

          <aside id="consent" className="self-end border-t-4 border-forest bg-white p-6 shadow-[0_24px_70px_rgba(22,56,44,.12)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-terracotta">Before you participate</p>
                <h2 className="mt-2 font-display text-3xl leading-tight text-forest">Cultural Consent Passport</h2>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center bg-forest/8 text-forest"><ShieldCheck /></span>
            </div>
            <p className="mt-4 text-sm leading-6 text-charcoal/62">Clear rules written by the custodian—so respect is understood before the experience begins.</p>
            <div className="mt-6 divide-y divide-forest/10 border-y border-forest/10">
              {permissions.map(({ icon: Icon, label, value, tone }) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="flex items-center gap-3 text-sm font-semibold text-charcoal/80"><Icon className="h-4 w-4 text-forest/55" />{label}</span>
                  <span className={`permission permission-${tone}`}>{value}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 flex w-full items-center justify-between border border-forest px-4 py-3 text-sm font-extrabold text-forest transition hover:bg-forest hover:text-white">
              See how the passport works <ArrowUpRight className="h-4 w-4" />
            </button>
          </aside>
        </div>
      </section>

      <section id="discover" className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-terracotta">Demo experience</p>
            <h2 className="mt-2 font-display text-3xl text-forest">Hosted by the tradition keeper</h2>
          </div>
          <button className="hidden text-sm font-bold text-forest underline decoration-turmeric decoration-2 underline-offset-4 sm:block">View all experiences</button>
        </div>

        <article className="mt-6 grid overflow-hidden border border-forest/15 bg-white lg:grid-cols-[.8fr_1.2fr]">
          <div className="min-h-60 bg-[linear-gradient(145deg,#16382c_0%,#315b49_55%,#d97706_140%)] p-6 text-white lg:min-h-72">
            <div className="flex h-full flex-col justify-between">
              <span className="w-fit border border-white/35 bg-black/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">Workshop · Demo</span>
              <div><span className="mb-3 block h-px w-16 bg-turmeric" /><p className="font-display text-2xl">A living stage tradition from coastal Karnataka.</p></div>
            </div>
          </div>
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-[0.1em] text-forest/55">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Udupi, Karnataka</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> 6 seats</span>
              </div>
              <h3 className="mt-4 font-display text-3xl text-forest sm:text-4xl">Yakshagana Movement Workshop</h3>
              <p className="mt-3 text-sm leading-6 text-charcoal/65">Learn expressive movement, rhythm, and the meaning behind traditional stage gestures in a small-group session.</p>
            </div>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-forest/10 pt-5">
              <div><p className="text-xs text-charcoal/50">Hosted by</p><p className="font-bold text-forest">Ananya Hegde · Artist & mentor</p></div>
              <button className="flex items-center gap-3 bg-forest px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#0e2a20]">View experience <ArrowUpRight className="h-4 w-4" /></button>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
