'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AlertCircle, ArrowRight, Check, FileText, Languages, Mic, MicOff, Pause, Play, RotateCcw, ShieldCheck, Sparkles, Square, WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Mode = 'idle' | 'recording' | 'processing' | 'review' | 'approved';
type StorySource = 'voice' | 'sample' | 'text';

type RecognitionResult = {
  isFinal: boolean;
  0: { transcript: string; confidence: number };
};

type RecognitionResultList = {
  length: number;
  [index: number]: RecognitionResult;
};

type RecognitionEvent = Event & {
  resultIndex: number;
  results: RecognitionResultList;
};

type RecognitionErrorEvent = Event & {
  error: string;
};

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};

type RecognitionConstructor = new () => Recognition;

declare global {
  interface Window {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  }
}

const originalStory = 'I first watched Yakshagana beside my grandmother when I was six. The colours drew me in, but it was the discipline behind the performance that made me stay. Today I teach young performers so they understand both the story and the responsibility they inherit.';
const languageOptions = [
  { label: 'Kannada', code: 'kn-IN' },
  { label: 'Tulu', code: 'tcy-IN', note: 'beta' },
  { label: 'English', code: 'en-IN' },
];

const recognitionErrors: Record<string, string> = {
  'not-allowed': 'Microphone access is off. Allow it in your browser, then try again.',
  'service-not-allowed': 'Voice recognition is blocked in this browser. You can still type your story.',
  'audio-capture': 'I cannot find a working microphone. Check your device and try again.',
  network: 'Voice recognition lost its connection. Your words so far are still here.',
  'language-not-supported': 'This browser cannot recognise that language yet. Try another language or type your story.',
  'no-speech': 'I did not hear words yet. Take your time, then continue speaking.',
};

const subscribeToVoiceSupport = () => () => undefined;
const getVoiceSupport = (): boolean | null => Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
const getServerVoiceSupport = (): boolean | null => null;

export function StoryStudioFlow() {
  const [mode, setMode] = useState<Mode>('idle');
  const [seconds, setSeconds] = useState(0);
  const [stage, setStage] = useState(0);
  const [story, setStory] = useState(originalStory);
  const [paused, setPaused] = useState(false);
  const [playingPreview, setPlayingPreview] = useState(false);
  const [language, setLanguage] = useState('Kannada');
  const [source, setSource] = useState<StorySource>('sample');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [recognitionError, setRecognitionError] = useState('');
  const [requestingMic, setRequestingMic] = useState(false);
  const recognitionRef = useRef<Recognition | null>(null);
  const finalTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');
  const sourceDraftRef = useRef(originalStory);
  const keepListeningRef = useRef(false);
  const pausedRef = useRef(false);
  const recognitionSupported = useSyncExternalStore(subscribeToVoiceSupport, getVoiceSupport, getServerVoiceSupport);
  const stages = [`Transcribing your ${language} audio`, 'Finding the themes you emphasised', 'Structuring the story in your voice', 'Preparing a clear English translation'];

  useEffect(() => {
    return () => {
      keepListeningRef.current = false;
      recognitionRef.current?.abort();
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    if (mode !== 'recording' || paused) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [mode, paused]);

  useEffect(() => {
    if (mode !== 'processing') return;
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
  }, [mode, stages.length]);

  const selectedLanguage = languageOptions.find((item) => item.label === language) ?? languageOptions[0];

  const startRecognition = () => {
    const RecognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!RecognitionApi) {
      setRecognitionError('Live voice recognition is not available in this browser. Open the text editor instead.');
      return;
    }

    const recognition = new RecognitionApi();
    recognition.lang = selectedLanguage.code;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      let finalChunk = '';
      let liveChunk = '';

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const words = result[0]?.transcript?.trim() ?? '';
        if (result.isFinal) finalChunk += `${words} `;
        else liveChunk += `${words} `;
      }

      if (finalChunk.trim()) {
        finalTranscriptRef.current = `${finalTranscriptRef.current} ${finalChunk}`.trim();
        setStory(finalTranscriptRef.current);
      }
      interimTranscriptRef.current = liveChunk.trim();
      setInterimTranscript(liveChunk.trim());
      setRecognitionError('');
    };
    recognition.onerror = (event) => {
      if (event.error === 'aborted') return;
      setRecognitionError(recognitionErrors[event.error] ?? 'I could not understand that moment. Your words so far are safe—please try again.');
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'language-not-supported') {
        keepListeningRef.current = false;
        pausedRef.current = true;
        setPaused(true);
      }
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      if (keepListeningRef.current && !pausedRef.current) {
        window.setTimeout(startRecognition, 220);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setRecognitionError('The microphone is already starting. Give it a moment, then speak naturally.');
    }
  };

  const beginVoiceStory = () => {
    if (!(window.SpeechRecognition || window.webkitSpeechRecognition)) {
      setRecognitionError('Live voice recognition is not available in this browser. Open the text editor instead.');
      return;
    }

    setRequestingMic(true);
    setRecognitionError('');
    finalTranscriptRef.current = '';
    interimTranscriptRef.current = '';
    keepListeningRef.current = true;
    pausedRef.current = false;
    setStory('');
    setInterimTranscript('');
    setSeconds(0);
    setPaused(false);
    setSource('voice');
    setMode('recording');
    window.setTimeout(() => {
      startRecognition();
      setRequestingMic(false);
    }, 0);
  };

  const togglePause = () => {
    if (paused) {
      pausedRef.current = false;
      keepListeningRef.current = true;
      setPaused(false);
      setRecognitionError('');
      startRecognition();
      return;
    }
    pausedRef.current = true;
    keepListeningRef.current = false;
    setPaused(true);
    recognitionRef.current?.stop();
  };

  const finishVoiceStory = () => {
    keepListeningRef.current = false;
    pausedRef.current = false;
    recognitionRef.current?.stop();
    window.setTimeout(() => {
      const finishedStory = `${finalTranscriptRef.current} ${interimTranscriptRef.current}`.trim();
      if (!finishedStory) {
        pausedRef.current = true;
        setPaused(true);
        setRecognitionError('I did not catch any words yet. Tap continue and speak again, or open the text editor.');
        return;
      }
      setStory(finishedStory);
      sourceDraftRef.current = finishedStory;
      setInterimTranscript('');
      setStage(0);
      setMode('processing');
    }, 320);
  };

  const openTextEditor = (keepRecognisedWords = false) => {
    keepListeningRef.current = false;
    pausedRef.current = true;
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    const existingWords = keepRecognisedWords ? `${finalTranscriptRef.current} ${interimTranscriptRef.current}`.trim() : '';
    setSource('text');
    setStory(existingWords);
    sourceDraftRef.current = existingWords;
    setMode('review');
  };

  const trySampleStory = () => {
    setSource('sample');
    setStory(originalStory);
    sourceDraftRef.current = originalStory;
    setSeconds(134);
    setStage(0);
    setMode('processing');
  };

  const playTranscriptPreview = () => {
    if (!('speechSynthesis' in window)) return;
    if (playingPreview) {
      window.speechSynthesis.cancel();
      setPlayingPreview(false);
      return;
    }
    const preview = new SpeechSynthesisUtterance(story);
    preview.lang = source === 'voice' ? selectedLanguage.code : 'en-IN';
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
        <span>Your transcript, edits, and consent choices stay together as one private draft.</span>
        <div><Link href="/permissions">Choose who can see it <ArrowRight /></Link><Link href="/dashboard">Go to dashboard</Link></div>
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
        <>
          <div className="studio-guide" aria-label="How Story Studio works">
            <div><span>1</span><p><strong>Tell it naturally</strong><small>Speak, type, or use video</small></p></div>
            <div><span>2</span><p><strong>Review every word</strong><small>AI suggests; you edit</small></p></div>
            <div><span>3</span><p><strong>Choose who sees it</strong><small>Nothing auto-publishes</small></p></div>
          </div>
          <div className="record-stage">
            <p>Speak in the language that feels like home.</p>
            <h1>Tell your story<br /><em>without filling a form.</em></h1>
            <div className="story-language-row"><span><Languages /> I’ll speak in</span>{languageOptions.map((item) => <button key={item.label} className={language === item.label ? 'active' : ''} onClick={() => setLanguage(item.label)} aria-pressed={language === item.label}>{item.label}{item.note && <small>{item.note}</small>}</button>)}</div>
            <button className="record-button" onClick={beginVoiceStory} aria-label={`Start voice recognition in ${language}`} disabled={requestingMic}>
              <Mic /><span>{requestingMic ? 'Opening mic…' : 'Tap to speak'}</span>
            </button>
            <output className={`voice-readiness ${recognitionSupported === false ? 'unavailable' : ''}`}><span>{recognitionSupported === false ? <MicOff /> : <ShieldCheck />}{recognitionSupported === false ? 'Voice recognition unavailable here' : 'Microphone is used only while you are speaking'}</span><small>Audio is not published or saved by this prototype.</small></output>
            {recognitionError && <p className="recognition-error" role="alert"><AlertCircle /> {recognitionError}</p>}
            <div className="record-alternatives"><button onClick={() => openTextEditor()}><FileText /> Open text editor</button><button onClick={trySampleStory}><Play /> Try a sample story</button></div>
          </div>
        </>
      )}

      {mode === 'recording' && (
        <div className="record-stage recording" aria-live="polite">
          <p>{paused ? 'Voice recognition paused' : 'Listening in real time'}</p>
          <div className="waveform" aria-hidden="true">
            {Array.from({ length: 34 }).map((_, index) => <i key={index} style={{ animationDelay: `${index * -0.06}s` }} />)}
          </div>
          <strong className="record-time">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</strong>
          <span>Recognising {language} as you speak. Pauses are completely fine.</span>
          <div className="live-transcript">
            <div><span className={paused ? 'paused' : ''}>{paused ? <Pause /> : <Mic />}{paused ? 'Paused' : 'Listening'}</span><small>Live transcript</small></div>
            <p>{story || interimTranscript ? <>{story} <em>{interimTranscript}</em></> : 'Your words will appear here…'}</p>
          </div>
          {recognitionError && <p className="recognition-error compact" role="alert"><AlertCircle /> {recognitionError}</p>}
          <div className="record-controls"><button onClick={togglePause} aria-label={paused ? 'Continue voice recognition' : 'Pause voice recognition'}>{paused ? <Play className="fill-current" /> : <Pause />}</button><button onClick={finishVoiceStory} aria-label="Finish and review transcript"><Square className="fill-current" /></button></div>
          <button className="recording-text-fallback" onClick={() => openTextEditor(true)}><FileText /> Finish by typing instead</button>
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
            <p>{source === 'voice' ? 'Review recognised words' : source === 'text' ? 'Write in your own words' : 'Explore a sample'}</p>
            <h2>{source === 'text' ? 'Begin where it feels natural.' : 'Does this sound like you?'}</h2>
            <span>{source === 'voice' ? 'These words came from your live voice transcript. Correct anything the microphone misheard.' : source === 'text' ? 'Start with one memory. There is no form and no perfect way to tell it.' : 'This sample shows how a spoken memory can become a clear story. Edit every word if you like.'} Nothing publishes automatically.</span>
            <div className="review-audio"><button onClick={playTranscriptPreview} aria-label={playingPreview ? 'Pause transcript preview' : 'Play transcript preview'} disabled={!story.trim()}>{playingPreview ? <Pause /> : <Play className="fill-current" />}</button><p><strong>{story.trim() ? (playingPreview ? 'Playing your draft' : 'Listen to your draft') : 'Audio preview appears as you write'}</strong><small>{source === 'voice' ? `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')} · Recognised from ${language}` : source === 'text' ? 'Typed by you · Private draft' : 'Sample story · English'}</small></p></div>
          </aside>
          <div className="review-editor">
            <label htmlFor="story-review">Your editable story draft</label>
            <textarea id="story-review" value={story} onChange={(event) => setStory(event.target.value)} placeholder="Begin with a memory, a person, a place, or the first time you encountered this tradition…" />
            <p className="editor-status"><ShieldCheck /> Private draft · {story.length} characters · Changes save in this demo</p>
            <div><Button variant="ghost" onClick={() => setStory(sourceDraftRef.current)}><RotateCcw /> {source === 'voice' ? 'Restore transcript' : source === 'sample' ? 'Restore sample' : 'Clear changes'}</Button><Button className="rounded-full" onClick={() => setMode('approved')} disabled={!story.trim()}><Check /> Approve these words</Button></div>
          </div>
        </div>
      )}
    </section>
  );
}
