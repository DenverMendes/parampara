import { DiscoverExplorer } from '@/components/discover-explorer';
import { InnerHero } from '@/components/inner-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Discover living traditions — Parampara',
  description: 'Meet the people carrying India’s living traditions forward.',
};

export default function DiscoverPage() {
  return (
    <main className="inner-page">
      <SiteHeader activeHref="/discover" />
      <InnerHero
        eyebrow="The living archive"
        title="Find a tradition."
        accent="Meet its person."
        copy="Search through people, not objects. Every profile is told, reviewed, and controlled by the custodian behind it."
        dark
      />
      <DiscoverExplorer />
      <SiteFooter />
    </main>
  );
}
