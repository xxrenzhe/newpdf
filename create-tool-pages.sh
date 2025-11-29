#!/bin/bash

# Tool page generator script
# Creates placeholder tool pages using ToolPageTemplate

TOOLS=(
  "compress-pdf:Compress PDF:Reduce PDF file size while maintaining quality"
  "split-pdf:Split PDF:Divide your PDF into multiple separate files"
  "merge-pdf:Merge PDF:Combine multiple PDFs into a single document"
  "extract-pdf-pages:Extract PDF Pages:Extract specific pages from your PDF"
  "delete-pdf-pages:Delete PDF Pages:Remove unwanted pages from your PDF"
  "rotate-pdf:Rotate PDF:Rotate pages in your PDF document"
  "create-pdf:Create PDF:Create a new PDF from scratch"
  "organize-pdf:Organize PDF:Reorder and organize PDF pages"
  "password-protect-pdf:Password Protect PDF:Add password protection to your PDF"
  "pdf-ocr:PDF OCR:Convert scanned PDFs to searchable text"
  "image-to-text:Image to Text:Extract text from images using OCR"
  "ai-book-summarizer:AI Book Summarizer:Summarize books with AI"
  "pdf-summarizer:PDF Summarizer:Generate AI-powered PDF summaries"
  "crop-pdf:Crop PDF:Trim margins and crop PDF pages"
  "pdf-to-word:PDF to Word:Convert PDF to Word document"
  "pdf-to-excel:PDF to Excel:Convert PDF tables to Excel"
  "pdf-to-powerpoint:PDF to PowerPoint:Convert PDF to PowerPoint presentation"
  "pdf-to-jpg:PDF to JPG:Convert PDF pages to JPG images"
  "word-to-pdf:Word to PDF:Convert Word documents to PDF"
  "excel-to-pdf:Excel to PDF:Convert Excel spreadsheets to PDF"
  "powerpoint-to-pdf:PowerPoint to PDF:Convert PowerPoint presentations to PDF"
  "jpg-to-pdf:JPG to PDF:Convert JPG images to PDF"
  "png-to-pdf:PNG to PDF:Convert PNG images to PDF"
  "html-to-pdf:HTML to PDF:Convert HTML pages to PDF"
  "unlock-pdf:Unlock PDF:Remove password protection from PDF"
  "add-watermark:Add Watermark:Add text or image watermark to PDF"
  "remove-watermark:Remove Watermark:Remove watermarks from PDF"
  "add-page-numbers:Add Page Numbers:Add page numbers to PDF"
  "remove-page-numbers:Remove Page Numbers:Remove page numbers from PDF"
  "compare-pdf:Compare PDF:Compare two PDF documents"
  "repair-pdf:Repair PDF:Fix corrupted PDF files"
  "flatten-pdf:Flatten PDF:Flatten PDF forms and annotations"
  "redact-pdf:Redact PDF:Permanently remove sensitive information"
  "grayscale-pdf:Grayscale PDF:Convert PDF to grayscale"
  "invert-pdf:Invert PDF:Invert colors in PDF"
  "pdf-to-png:PDF to PNG:Convert PDF pages to PNG images"
  "pdf-to-tiff:PDF to TIFF:Convert PDF to TIFF format"
  "pdf-to-svg:PDF to SVG:Convert PDF to SVG vector format"
  "tiff-to-pdf:TIFF to PDF:Convert TIFF images to PDF"
  "svg-to-pdf:SVG to PDF:Convert SVG graphics to PDF"
  "bmp-to-pdf:BMP to PDF:Convert BMP images to PDF"
  "gif-to-pdf:GIF to PDF:Convert GIF images to PDF"
  "webp-to-pdf:WebP to PDF:Convert WebP images to PDF"
  "heic-to-pdf:HEIC to PDF:Convert HEIC images to PDF"
  "pdf-to-html:PDF to HTML:Convert PDF to HTML format"
  "pdf-to-text:PDF to Text:Extract text from PDF"
  "text-to-pdf:Text to PDF:Convert text files to PDF"
  "csv-to-pdf:CSV to PDF:Convert CSV data to PDF"
  "xml-to-pdf:XML to PDF:Convert XML files to PDF"
  "json-to-pdf:JSON to PDF:Convert JSON data to PDF"
  "markdown-to-pdf:Markdown to PDF:Convert Markdown to PDF"
  "epub-to-pdf:EPUB to PDF:Convert EPUB ebooks to PDF"
  "mobi-to-pdf:MOBI to PDF:Convert MOBI ebooks to PDF"
  "pdf-to-epub:PDF to EPUB:Convert PDF to EPUB ebook"
  "pdf-to-mobi:PDF to MOBI:Convert PDF to MOBI ebook"
  "optimize-pdf:Optimize PDF:Optimize PDF for web and mobile"
  "linearize-pdf:Linearize PDF:Optimize PDF for fast web viewing"
  "validate-pdf:Validate PDF:Check PDF compliance and errors"
  "pdf-metadata:PDF Metadata:View and edit PDF metadata"
  "extract-images:Extract Images:Extract all images from PDF"
  "extract-text:Extract Text:Extract all text from PDF"
  "add-attachments:Add Attachments:Add file attachments to PDF"
  "extract-attachments:Extract Attachments:Extract file attachments from PDF"
  "convert-to-pdfa:Convert to PDF/A:Convert to archival PDF/A format"
  "create-portfolio:Create Portfolio:Create PDF portfolio with multiple files"
)

BASE_DIR="src/app/(tools)"

for tool in "${TOOLS[@]}"; do
  IFS=':' read -r slug title description <<< "$tool"
  DIR="$BASE_DIR/$slug"

  mkdir -p "$DIR"

  cat > "$DIR/page.tsx" << EOF
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '$title - NewPDF',
  description: '$description',
};

export default function ${slug//[-]/_}Page() {
  return (
    <ToolPageTemplate
      title="$title"
      description="$description"
      comingSoon={true}
    />
  );
}
EOF

  echo "Created $DIR/page.tsx"
done

echo "All tool pages created successfully!"
