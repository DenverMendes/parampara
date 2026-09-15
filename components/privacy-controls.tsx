'use client';

import { useState } from 'react';
import { Check, Eye, GraduationCap, LockKeyhole, MousePointer2, ShieldCheck, Sparkles } from 'lucide-react';

type Visibility = 'Public' | 'Ask me' | 'Private';

const initialItems: { name: string; note: string; visibility: Visibility }[] = [
  { name: 'About me', note: 'Your introduction and public name', visibility: 'Public' },
  { name: 'Tradition overview', note: 'A simple explanation for learners', visibility: 'Public' },
  { name: 'Performance films', note: 'Visitors request access from you', visibility: 'Ask me' },
  { name: 'Ritual details', note: 'Sacred knowledge stays with you', visibility: 'Private' },
  { name: 'Personal stories', note: 'Approve each person who asks', visibility: 'Ask me' },
];

const visibilityMeta = {
  Public: { icon: Eye, copy: 'Anyone can learn from this' },
  'Ask me': { icon: MousePointer2, copy: 'You approve every request' },
  Private: { icon: LockKeyhole, copy: 'Only you can see this' },
};

export function PrivacyControls() {
  const [items, setItems] = useState(initialItems);
  const [saved, setSaved] = useState(false);
  const [uses, setUses] = useState({ education: true, ai: false, downloads: false });

  const updateVisibility = (index: number, visibility: Visibility) => {
    setSaved(false);
    setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, visibility } : item));
  };

  const toggleUse = (key: keyof typeof uses) => {
    setSaved(false);
    setUses((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <section className="privacy-shell">
      <header>
        <div><p>Sharing controls</p><h1>You decide<br /><em>what leaves the room.</em></h1></div>
        <aside><ShieldCheck /><p><strong>Your culture. Your rules.</strong><span>Nothing changes without your action.</span></p></aside>
      </header>

      <div className="privacy-table">
        <div className="privacy-table-head"><span>Content</span><span>Who can see it?</span></div>
        {items.map((item, index) => {
          const MetaIcon = visibilityMeta[item.visibility].icon;
          return (
            <div className="privacy-row" key={item.name}>
              <div><span className={`privacy-icon privacy-${item.visibility.toLowerCase().replace(' ', '-')}`}><MetaIcon /></span><p><strong>{item.name}</strong><small>{item.note}</small></p></div>
              <div className="visibility-options" aria-label={`${item.name} visibility`}>
                {(['Public', 'Ask me', 'Private'] as Visibility[]).map((option) => (
                  <button key={option} className={item.visibility === option ? 'active' : ''} onClick={() => updateVisibility(index, option)} aria-pressed={item.visibility === option}>{option}</button>
                ))}
              </div>
              <small className="visibility-help">{visibilityMeta[item.visibility].copy}</small>
            </div>
          );
        })}
      </div>

      <div className="use-controls">
        <div className="use-control-intro"><p>Beyond visibility</p><h2>Choose how your work can be used.</h2><span>Each choice is separate. “Off” is always a valid answer.</span></div>
        <div className="use-control-list">
          <label><span><GraduationCap /><p><strong>Educational use</strong><small>Schools may include approved public stories</small></p></span><button type="button" className={`use-switch ${uses.education ? 'active' : ''}`} role="switch" aria-checked={uses.education} aria-label="Educational use" onClick={() => toggleUse('education')}><i /></button></label>
          <label><span><Sparkles /><p><strong>AI training</strong><small>Your media will not train any model</small></p></span><button type="button" className={`use-switch ${uses.ai ? 'active' : ''}`} role="switch" aria-checked={uses.ai} aria-label="AI training" onClick={() => toggleUse('ai')}><i /></button></label>
          <label><span><Eye /><p><strong>Allow downloads</strong><small>People can view, but cannot save files</small></p></span><button type="button" className={`use-switch ${uses.downloads ? 'active' : ''}`} role="switch" aria-checked={uses.downloads} aria-label="Allow downloads" onClick={() => toggleUse('downloads')}><i /></button></label>
        </div>
      </div>

      <div className="privacy-save">
        <p>{saved ? <><Check /> Choices saved. You can change them anytime.</> : 'Review each choice, then save when it feels right.'}</p>
        <button onClick={() => setSaved(true)}>{saved ? 'Saved' : 'Save my choices'} <Check /></button>
      </div>
    </section>
  );
}
