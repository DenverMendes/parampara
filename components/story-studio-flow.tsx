'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check, FileText, Mic, Pause, Play, RotateCcw, ShieldCheck, Sparkles, Square, WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Mode = 'idle' | 'recording' | 'processing' | 'review' | 'approved';

const stages = ['Transcribing your Kannada audio', 'Finding the themes you emphasized', 'Structuring the story in your voice', 'Preparing an English translation'];
const originalStory = 'I first watched Yakshagana beside my grandmother when I was six. The colours drew me in, but it was the discipline behind the performance that made me stay. Today I teach young performers so they understand both the story and the responsibility they inherit.';

export function StoryStudioFlow() {
  const [mode, setMode] = useState<Mode>('idle');
  const [seconds, setSeconds] = useState(0);
  const [stage, setStage] = useState(0);
  const [story, setStory] = useState(originalStory);
  const [paused, setPaused] = useState(false);
  const [playingPreview, setPlayingPreview] = useState(false);

  useEffect(() => {
    if (mode !== 'recording' || paused) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [mode, paused]);

  useEffect(() => {
    if (mode !== 'processing') return;
    setStage(0);
    const timer = window.setInterval(() => {
      setStage((value) => {
        if (value >= stages.length - 1) {
          window.clearInterval(timer);
          window.setTimeout(() => setMode('review'), 550);
          return value;
        }
        return value + 1;
      });
    }, 650);
    return () => window.clearInterval(timer);
  }, [mode]);

  const playTranscriptPreview = () => {
    if (!('speechSynthesis' in window)) return;
    if (playingPreview) {
      window.speechSynthesis.cancel();
      setPlayingPreview(false);
      return;
    }
    const preview = new SpeechSynthesisUtterance(story);
    preview.lang = 'en-IN';
    preview.rate = 0.88;
    preview.onend = () => setPlayingPreview(false);
    preview.onerror = () => setPlayingPreview(false);
    setPlayingPreview(true);
    window.speechSynthesis.speak(preview);
  };

  if (mode === 'approved') {
    return (
      <section className="studio-success" aria-live="polite">
        <div><Check /></div>
        <p>Approved by you</p>
        <h2>Your story is ready.<br /><em>You still control who sees it.</em></h2>
        <span>The original audio, transcript, edits, and consent choices are saved together.</span>
        <div><a href="/permissions">Choose who can see it <ArrowRight /></a><a href="/dashboard">Go to dashboard</a></div>
      </section>
    );
  }

  return (
    <section className="story-studio">
      <header>
        <div><WandSparkles /><p><strong>Story Studio</strong><span>AI helps. You remain the author.</span></p></div>
        <p><ShieldCheck /> Private draft</p>
      </header>

      {mode === 'idle' && (
        <div className="record-stage">
          <p>Speak in the language that feels like home.</p>
          <h1>Tell your story<br /><em>without filling a form.</em></h1>
          <button className="record-button" onClick={() => { setSeconds(0); setPaused(false); setMode('recording'); }} aria-label="Start a sample recording">
            <Mic /><span>Tap to speak</span>
          </button>
          <div className="record-alternatives"><button onClick={() => setMode('review')}><FileText /> Type instead</button><button onClick={() => setMode('processing')}><Play /> Use sample video</button></div>
        </div>
      )}

      {mode === 'recording' && (
        <div className="record-stage recording" aria-live="polite">
          <p>Recording your story</p>
          <div className="waveform" aria-hidden="true">
            {Array.from({ length: 34 }).map((_, index) => <i key={index} style={{ animationDelay: `${index * -0.06}s` }} />)}
          </div>
          <strong className="record-time">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</strong>
          <span>Speak naturally. Pauses are completely fine.</span>
          <div className="record-controls"><button onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Resume recording' : 'Pause recording'}>{paused ? <Play className="fill-current" /> : <Pause />}</button><button onClick={() => setMode('processing')} aria-label="Finish recording"><Square className="fill-current" /></button></div>
        </div>
      )}

      {mode === 'processing' && (
        <div className="processing-stage" aria-live="polite">
          <div className="ai-pulse"><Sparkles /></div>
          <p>Parampara is listening carefully…</p>
          <h2>Shaping the story<br /><em>around your voice.</em></h2>
          <ul>{stages.map((label, index) => <li key={label} className={index <= stage ? 'done' : ''}><span>{index < stage ? <Check /> : index + 1}</span>{label}</li>)}</ul>
        </div>
      )}

      {mode === 'review' && (
        <div className="review-stage">
          <aside>
            <p>Review in your language</p>
            <h2>Does this sound like you?</h2>
            <span>AI drafted this from your recording. Edit anything. It will never publish automatically.</span>
            <div className="review-audio"><button onClick={playTranscriptPreview} aria-label={playingPreview ? 'Pause transcript preview' : 'Play transcript preview'}>{playingPreview ? <Pause /> : <Play className="fill-current" />}</button><p><strong>{playingPreview ? 'Playing transcript preview' : 'Your original audio'}</strong><small>02:14 · Kannada source</small></p></div>
          </aside>
          <div className="review-editor">
            <label htmlFor="story-review">About me</label>
            <textarea id="story-review" value={story} onChange={(event) => setStory(event.target.value)} />
            <div><Button variant="ghost" onClick={() => setStory(originalStory)}><RotateCcw /> Restore original</Button><Button className="rounded-full" onClick={() => setMode('approved')}><Check /> This sounds like me</Button></div>
          </div>
        </div>
      )}
    </section>
  );
}
