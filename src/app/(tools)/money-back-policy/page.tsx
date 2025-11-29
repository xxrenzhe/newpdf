import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Money-back Policy - NewPDF',
  description: 'Our money-back guarantee',
};

export default function money_back_policyPage() {
  return (
    <ToolPageTemplate
      title="Money-back Policy"
      description="Our money-back guarantee"
      comingSoon={true}
    />
  );
}
