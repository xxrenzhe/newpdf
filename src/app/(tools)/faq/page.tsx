import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'FAQ - NewPDF',
  description: 'Frequently asked questions',
};

export default function faqPage() {
  return (
    <ToolPageTemplate
      title="FAQ"
      description="Frequently asked questions"
      comingSoon={true}
    />
  );
}
