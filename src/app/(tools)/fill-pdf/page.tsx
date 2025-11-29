import type { Metadata } from 'next';
import PDFEditorClient from '../edit-pdf/PDFEditorClient';

export const metadata: Metadata = {
  title: 'Fill PDF Forms - NewPDF',
  description: 'Fill out PDF forms online with text fields, checkboxes, and more.',
};

export default function FillPDFPage() {
  return <PDFEditorClient />;
}
