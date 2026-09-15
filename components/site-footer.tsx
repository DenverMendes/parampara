import { ArrowUpRight } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-mark">प</div>
      <div>
        <p>Parampara</p>
        <h2>Keep culture<br /><em>in human hands.</em></h2>
      </div>
      <div className="footer-links">
        <a href="/discover">Discover <ArrowUpRight /></a>
        <a href="/onboarding">Share your tradition <ArrowUpRight /></a>
        <a href="/dashboard">Judge demo <ArrowUpRight /></a>
        <small>Built for custodians. Designed with consent.</small>
      </div>
    </footer>
  );
}
