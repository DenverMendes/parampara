import { StoryStudioFlow } from '@/components/story-studio-flow';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Story Studio — Parampara',
  description: 'Tell your cultural story in your own language and approve every word.',
};

export default function StoryStudioPage() {
  return (
    <main className="flow-page story-studio-page">
      <SiteHeader activeHref="/story-studio" />
      <StoryStudioFlow />
    </main>
  );
}
