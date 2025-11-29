import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'About Us - NewPDF',
  description: 'Learn more about our mission',
};

export default function about_usPage() {
  return (
    <ToolPageTemplate
      title="About Us"
      description="Learn more about our mission"
      comingSoon={true}
    />
  );
}
