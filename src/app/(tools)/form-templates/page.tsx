import { Metadata } from 'next';
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';

export const metadata: Metadata = {
  title: 'Form Templates - NewPDF',
  description: 'Browse professional form templates',
};

export default function form_templatesPage() {
  return (
    <ToolPageTemplate
      title="Form Templates"
      description="Browse professional form templates"
      comingSoon={true}
    />
  );
}
