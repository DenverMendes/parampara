'use client';

import { useState } from 'react';
import { Check, Pause, Play, Share2 } from 'lucide-react';

export function ShareProfileButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const shareData = {
      title: `${name} on Parampara`,
      text: `Meet ${name} and discover a living tradition on Parampara.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // Closing the native share sheet is a normal user action.
    }
  };

  return (
    <button onClick={share} aria-label={copied ? 'Profile link copied' : 'Share this profile'} title={copied ? 'Link copied' : 'Share profile'}>
      {copied ? <Check /> : <Share2 />}
    </button>
  );
}

export function StoryAudioButton({ language, story }: { language: string; story: string }) {
  const [playing, setPlaying] = useState(false);

  const togglePreview = () => {
    if (!('speechSynthesis' in window)) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    const narration = new SpeechSynthesisUtterance(story);
    narration.lang = 'en-IN';
    narration.rate = 0.88;
    narration.onend = () => setPlaying(false);
    narration.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(narration);
  };

  return (
    <button onClick={togglePreview} aria-label={playing ? 'Pause approved transcript preview' : 'Play approved transcript preview'}>
      {playing ? <Pause /> : <Play className="fill-current" />}
      <span>{playing ? 'Playing approved preview' : `Listen with ${language} source`}<small>2 min 14 sec · Transcript available</small></span>
    </button>
  );
}
