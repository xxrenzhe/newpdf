import type { Metadata } from 'next';
import PDFEditorClient from '../edit-pdf/PDFEditorClient';

export const metadata: Metadata = {
  title: 'Annotate PDF - NewPDF',
  description: 'Annotate PDF files with highlights, comments, and markup tools.',
};

export default function AnnotatePDFPage() {
  return <PDFEditorClient />;
}
