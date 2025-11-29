'use client';

import { useState, useCallback, useEffect } from 'react';
import { PDFEditorWrapper } from '@/components/pdf-editor';
import FileUpload from '@/components/shared/FileUpload';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';

export default function PDFEditorClient() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [showUpload, setShowUpload] = useState(true);

  // Check for file data from sessionStorage on mount
  useEffect(() => {
    const storedData = sessionStorage.getItem('pdfData');
    const storedFileName = sessionStorage.getItem('pdfFileName');

    if (storedData && storedFileName) {
      try {
        // Convert base64 back to ArrayBuffer
        const binaryString = atob(storedData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const arrayBuffer = bytes.buffer;

        // Create a File object from the data
        const file = new File([arrayBuffer], storedFileName, { type: 'application/pdf' });

        setPdfFile(file);
        setPdfData(arrayBuffer);
        setShowUpload(false);

        // Clear sessionStorage after loading
        sessionStorage.removeItem('pdfData');
        sessionStorage.removeItem('pdfFileName');
      } catch (error) {
        console.error('Error loading PDF from sessionStorage:', error);
        sessionStorage.removeItem('pdfData');
        sessionStorage.removeItem('pdfFileName');
      }
    }
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    setPdfFile(file);
    const arrayBuffer = await file.arrayBuffer();
    setPdfData(arrayBuffer);
    setShowUpload(false);
  }, []);

  const handleSave = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfFile?.name.replace('.pdf', '_edited.pdf') || 'edited.pdf';
    a.click();
    URL.revokeObjectURL(url);
  }, [pdfFile]);

  const handleNewFile = useCallback(() => {
    setPdfFile(null);
    setPdfData(null);
    setShowUpload(true);
  }, []);

  if (showUpload || !pdfData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
          <div className="max-w-2xl w-full space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Edit PDF</h1>
              <p className="text-lg text-muted-foreground">
                Upload your PDF file to start editing. Add text, images, signatures, and more.
              </p>
            </div>

            <FileUpload
              onFileSelect={handleFileSelect}
              maxSizeMB={50}
            />

            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">✏️ Text Editing</h3>
                  <p className="text-sm text-muted-foreground">
                    Add, edit, and format text with various fonts and colors
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🖼️ Images</h3>
                  <p className="text-sm text-muted-foreground">
                    Insert and position images anywhere on your PDF
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">✍️ Signatures</h3>
                  <p className="text-sm text-muted-foreground">
                    Draw or upload signatures and stamps
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🎨 Annotations</h3>
                  <p className="text-sm text-muted-foreground">
                    Highlight, underline, and add comments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header Actions */}
      <div className="border-b p-4 flex items-center justify-between bg-background">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">
            {pdfFile?.name || 'Editing PDF'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewFile}
          >
            <Upload className="h-4 w-4 mr-2" />
            New File
          </Button>
        </div>
      </div>

      {/* PDF Editor */}
      <div className="flex-1 overflow-hidden">
        <PDFEditorWrapper
          pdfData={pdfData}
          tools={['mouse', 'text', 'image', 'highlight', 'underline', 'strikethrough', 'line', 'eraser', 'signature', 'stamp']}
          locale="en"
          onSave={handleSave}
          onError={(error) => {
            console.error('PDF Editor Error:', error);
            // Error will be displayed in PDFEditorWrapper's error UI
          }}
          className="h-full"
        />
      </div>
    </div>
  );
}
