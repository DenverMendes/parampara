'use client';

import { ArrowRight, RotateCcw } from 'lucide-react';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="route-error">
      <span>प</span>
      <p>The thread paused</p>
      <h1>This story is still here.</h1>
      <small>Something interrupted the page, but nothing you entered was published.</small>
      <div>
        <button onClick={reset}><RotateCcw /> Try again</button>
        <a href="/">Return home <ArrowRight /></a>
      </div>
    </main>
  );
}
