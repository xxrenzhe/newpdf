import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Privacy Policy - NewPDF',
  description: 'How we protect your data',
};

export default function privacy_policyPage() {
  return (
    <ToolPageTemplate
      title="Privacy Policy"
      description="How we protect your data"
      comingSoon={true}
    />
  );
}
