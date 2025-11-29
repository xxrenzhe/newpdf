import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Subscription Terms - NewPDF',
  description: 'Subscription terms and conditions',
};

export default function subscription_termsPage() {
  return (
    <ToolPageTemplate
      title="Subscription Terms"
      description="Subscription terms and conditions"
      comingSoon={true}
    />
  );
}
