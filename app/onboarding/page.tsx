import { CustodianOnboarding } from '@/components/custodian-onboarding';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Become a custodian — Parampara',
  description: 'Create your cultural profile in three simple, private steps.',
};

export default function OnboardingPage() {
  return (
    <main className="flow-page onboarding-page">
      <SiteHeader />
      <CustodianOnboarding />
    </main>
  );
}
