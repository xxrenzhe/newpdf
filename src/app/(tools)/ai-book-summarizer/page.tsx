import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Book Summarizer - NewPDF',
  description: 'Summarize books with AI',
};

export default function ai_book_summarizerPage() {
  return (
    <ToolPageTemplate
      title="AI Book Summarizer"
      description="Summarize books with AI"
      comingSoon={true}
    />
  );
}
