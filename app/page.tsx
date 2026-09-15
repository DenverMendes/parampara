import { SiteHeader } from '@/components/site-header';
import { LandingSections } from '@/components/landing-sections';
import { DualModeHero } from '@/components/dual-mode-hero';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />
      <DualModeHero />
      <LandingSections />
    </main>
  );
}
