import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Summarizer - NewPDF',
  description: 'Generate AI-powered PDF summaries',
};

export default function pdf_summarizerPage() {
  return (
    <ToolPageTemplate
      title="PDF Summarizer"
      description="Generate AI-powered PDF summaries"
      comingSoon={true}
    />
  );
}
