import { PrivacyControls } from '@/components/privacy-controls';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Cultural controls — Parampara',
  description: 'Simple, transparent control over who can see and use your cultural stories.',
};

export default function PermissionsPage() {
  return (
    <main className="flow-page privacy-page">
      <SiteHeader />
      <PrivacyControls />
    </main>
  );
}
