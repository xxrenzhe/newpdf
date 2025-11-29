import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Terms & Conditions - NewPDF',
  description: 'Terms and conditions of use',
};

export default function terms_and_conditionsPage() {
  return (
    <ToolPageTemplate
      title="Terms & Conditions"
      description="Terms and conditions of use"
      comingSoon={true}
    />
  );
}
