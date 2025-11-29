import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Terms of Use - NewPDF',
  description: 'Terms of use for our services',
};

export default function termsPage() {
  return (
    <ToolPageTemplate
      title="Terms of Use"
      description="Terms of use for our services"
      comingSoon={true}
    />
  );
}
