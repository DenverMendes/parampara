import { BookingFlow } from '@/components/booking-flow';
import { SiteHeader } from '@/components/site-header';

export const metadata = {
  title: 'Book a cultural experience — Parampara',
  description: 'Learn directly from a cultural custodian with transparent pricing.',
};

export default function BookPage() {
  return (
    <main className="flow-page booking-page">
      <SiteHeader activeHref="/book" />
      <BookingFlow />
    </main>
  );
}
