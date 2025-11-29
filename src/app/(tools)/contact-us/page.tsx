import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Contact Us - NewPDF',
  description: 'Get in touch with our team',
};

export default function contact_usPage() {
  return (
    <ToolPageTemplate
      title="Contact Us"
      description="Get in touch with our team"
      comingSoon={true}
    />
  );
}
