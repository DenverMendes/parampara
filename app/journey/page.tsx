import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { VisitorJourney } from '@/components/visitor-journey';

export const metadata: Metadata = {
  title: 'My Cultural Journey',
  description: 'Your saved voices, respectful visits, and direct cultural impact on Parampara.',
};

export default function JourneyPage() {
  return (
    <main className="visitor-page">
      <SiteHeader activeHref="/journey" />
      <VisitorJourney />
      <SiteFooter />
    </main>
  );
}
