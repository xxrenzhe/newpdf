import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Cookie Policy - NewPDF',
  description: 'How we use cookies',
};

export default function cookie_policyPage() {
  return (
    <ToolPageTemplate
      title="Cookie Policy"
      description="How we use cookies"
      comingSoon={true}
    />
  );
}
