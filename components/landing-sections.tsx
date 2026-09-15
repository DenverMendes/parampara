import {
  ArrowRight,
  AudioLines,
  Check,
  Eye,
  LockKeyhole,
  MousePointer2,
  Play,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import { CustodianCard } from '@/components/custodian-card';
import { SectionHeading } from '@/components/section-heading';
import { SiteFooter } from '@/components/site-footer';
import { custodians, impact } from '@/lib/cultural-data';

export function LandingSections() {
  return (
    <>
      <section className="impact-ribbon" aria-label="Current impact">
        <p>What lives here now</p>
        {impact.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}<small>{item.note}</small></span>
          </div>
        ))}
      </section>

      <section className="page-section" id="discover">
        <SectionHeading
          eyebrow="Enter through a person"
          title="People, not exhibits."
          copy="No anonymous archives. Every tradition begins with the person who carries it—and stays under their control."
          action={{ label: 'Meet all custodians', href: '/discover' }}
        />
        <div className="custodian-grid">
          {custodians.slice(0, 3).map((custodian, index) => (
            <CustodianCard key={custodian.slug} custodian={custodian} index={index} />
          ))}
        </div>
      </section>

      <section className="studio-feature" id="stories">
        <div className="studio-visual">
          <img src="/weaving-hands.jpg" alt="Artisan hands weaving a detailed textile" />
          <div className="studio-orb"><AudioLines /><span>02:14</span></div>
          <p>Original voice · Hindi</p>
        </div>
        <div className="studio-copy">
          <p className="eyebrow"><WandSparkles /> Custodian AI</p>
          <h2>You speak.<br /><em>Your story stays yours.</em></h2>
          <p>Record in any language. Parampara helps structure and translate—then waits for your approval before anything is shared.</p>
          <ol className="story-steps">
            <li><span><AudioLines /></span><div><strong>Tell it naturally</strong><small>Voice, video, or text</small></div><Check /></li>
            <li><span><Sparkles /></span><div><strong>AI assists</strong><small>Structure and translation</small></div><Check /></li>
            <li><span><MousePointer2 /></span><div><strong>You approve</strong><small>Edit every word</small></div><Check /></li>
          </ol>
          <a className="text-link" href="/story-studio">Try the story studio <ArrowRight /></a>
        </div>
      </section>

      <section className="control-section">
        <SectionHeading
          eyebrow="Consent is infrastructure"
          title="Your culture. Your rules."
          copy="Visibility, downloads, commercial use, and AI training are separate choices written in plain language. Change them anytime."
          light
        />
        <div className="control-grid">
          <div className="control-manifesto">
            <p>Ownership doesn&apos;t disappear after upload.</p>
            <strong>It becomes visible.</strong>
            <a href="/permissions">Open cultural controls <ArrowRight /></a>
          </div>
          <div className="permission-preview">
            <div><span><Eye /></span><p><strong>Tradition overview</strong><small>Anyone can learn from this</small></p><em>Public</em></div>
            <div><span><LockKeyhole /></span><p><strong>Ritual details</strong><small>Only you can see this</small></p><em>Private</em></div>
            <div><span><MousePointer2 /></span><p><strong>Performance film</strong><small>You approve each request</small></p><em>Ask me</em></div>
          </div>
        </div>
      </section>

      <section className="judge-section">
        <img src="/og.png" alt="Parampara custodians representing performance and craft traditions" />
        <div className="judge-overlay" />
        <div className="judge-content">
          <p>2-minute presentation mode</p>
          <h2>See the whole promise<br /><em>become a product.</em></h2>
          <a href="/dashboard"><Play className="fill-current" /> Start judge demo</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
