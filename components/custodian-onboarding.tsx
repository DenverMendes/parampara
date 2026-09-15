'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, AudioLines, Camera, Check, Keyboard, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const steps = ['About you', 'Tell your story', 'Review & share'];

export function CustodianOnboarding() {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState('voice');
  const [complete, setComplete] = useState(false);

  if (complete) {
    return (
      <section className="onboarding-success" aria-live="polite">
        <span><Check /></span>
        <p>Your draft is safe</p>
        <h2>You&apos;re ready to shape<br /><em>your first story.</em></h2>
        <small>Nothing is public yet. You choose what to share after reviewing every word.</small>
        <a href="/story-studio">Open my story studio <ArrowRight /></a>
      </section>
    );
  }

  return (
    <section className="onboarding-card">
      <div className="onboarding-progress">
        {steps.map((label, index) => (
          <div key={label} className={index <= step ? 'active' : ''}>
            <span>{index < step ? <Check /> : index + 1}</span>
            <p>{label}</p>
          </div>
        ))}
      </div>

      <div className="onboarding-stage">
        <aside>
          <span>प</span>
          <blockquote>“You know your culture best. We only help you tell it clearly.”</blockquote>
          <small><ShieldCheck /> Saved privately as you go</small>
        </aside>

        <div className="onboarding-form">
          {step === 0 && (
            <div className="form-step">
              <p>Step 1 of 3</p>
              <h1>Let&apos;s begin with you.</h1>
              <span>Just the essentials. You can add more later.</span>
              <div className="field-grid">
                <label>Your name<Input defaultValue="Meenakshi Bhat" /></label>
                <label>Your place<Input defaultValue="Udupi, Karnataka" /></label>
                <label>Your tradition<Input defaultValue="Yakshagana" /></label>
                <label>Languages<Input defaultValue="Kannada, Tulu, English" /></label>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="form-step">
              <p>Step 2 of 3</p>
              <h1>Tell it your way.</h1>
              <span>No forms. Choose the way that feels most natural.</span>
              <div className="story-methods">
                {[
                  ['voice', AudioLines, 'Speak', 'Best for telling it naturally'],
                  ['video', Camera, 'Show', 'Record a practice or performance'],
                  ['text', Keyboard, 'Write', 'Type in any language'],
                ].map(([id, Icon, label, copy]) => (
                  <button key={String(id)} className={method === id ? 'active' : ''} onClick={() => setMethod(String(id))}>
                    <Icon /><strong>{String(label)}</strong><small>{String(copy)}</small>
                  </button>
                ))}
              </div>
              <div className="ai-assist-note"><Sparkles /><p><strong>AI assists. You decide.</strong><span>We can structure and translate your story. Nothing publishes without approval.</span></p></div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <p>Step 3 of 3</p>
              <h1>Your story. Your rules.</h1>
              <span>These are safe starting choices. Change them anytime.</span>
              <div className="review-choices">
                <div><span>About you</span><strong>Public</strong></div>
                <div><span>Your tradition</span><strong>Public</strong></div>
                <div><span>Performance recordings</span><strong>Ask me first</strong></div>
                <div><span>Sacred or personal details</span><strong>Private</strong></div>
              </div>
              <a href="/permissions">Review every permission <ArrowRight /></a>
            </div>
          )}

          <div className="form-actions">
            <Button variant="ghost" className={step === 0 ? 'invisible' : ''} onClick={() => setStep((value) => Math.max(0, value - 1))}>
              <ArrowLeft /> Back
            </Button>
            <Button className="h-11 rounded-full px-5" onClick={() => step < 2 ? setStep(step + 1) : setComplete(true)}>
              {step < 2 ? 'Continue' : 'Save my private draft'} <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
