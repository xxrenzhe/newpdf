'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type {
  PDFReaderInstance,
  PDFEditorInstance,
  PDFEditorWrapperProps,
} from './types';

export function usePDFEditor({
  pdfUrl,
  pdfData,
  tools = ['text', 'image', 'highlight', 'eraser'],
  locale = 'en',
  onSave,
  onError,
}: PDFEditorWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<PDFReaderInstance | null>(null);
  const editorRef = useRef<PDFEditorInstance | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Initialize PDF editor
  useEffect(() => {
    if (!containerRef.current) return;

    const initEditor = async () => {
      try {
        console.log('[usePDFEditor] Starting initialization...', { pdfUrl, pdfData: !!pdfData });
        setIsLoading(true);
        setError(null);

        // Load PDF editor CSS
        if (!document.querySelector('link[href="/css/pdfeditor.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/css/pdfeditor.css';
          document.head.appendChild(link);
        }

        // Dynamically import pdfeditor modules
        const { PDFReader, PDFEditor } = await import('@/lib/pdfeditor');

        // Convert pdfData to URL if provided
        let pdfUrlToUse = pdfUrl;
        if (pdfData && !pdfUrl) {
          // Create Blob URL from ArrayBuffer/Uint8Array
          const blob = new Blob([pdfData], { type: 'application/pdf' });
          pdfUrlToUse = URL.createObjectURL(blob);
          blobUrlRef.current = pdfUrlToUse;
          console.log('[usePDFEditor] Created Blob URL from pdfData:', pdfUrlToUse);
        }

        // Wait for pdfjs library to load
        if (!window.pdfjsLib) {
          // Load pdfjs library
          const script = document.createElement('script');
          script.src = '/assets/js/pdfjs/pdf.min.js';
          script.async = true;
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });

          // Set worker path
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/js/pdfjs/pdf.worker.min.js';
        }

        // Initialize PDFReader
        const readerContainer = containerRef.current?.querySelector('.pdf-viewer') as HTMLElement;
        const thumbsContainer = containerRef.current?.querySelector('.pdf-thumbs') as HTMLElement;

        // Validate DOM elements exist
        if (!readerContainer || !thumbsContainer) {
          throw new Error('PDF editor DOM containers not found. Required: .pdf-viewer and .pdf-thumbs');
        }

        const reader = new (PDFReader as any)({
          url: pdfUrlToUse,
          main: readerContainer,
          thumbs: thumbsContainer,
        }, window.pdfjsLib);

        console.log('[usePDFEditor] Initializing PDFReader...');
        await reader.init();
        console.log('[usePDFEditor] PDFReader initialized successfully');
        readerRef.current = reader;

        // Initialize PDFEditor
        const toolbarContainer = containerRef.current?.querySelector('.pdf-toolbar') as HTMLElement;

        // Validate toolbar container exists
        if (!toolbarContainer) {
          throw new Error('PDF editor toolbar container not found. Required: .pdf-toolbar');
        }

        const editor = new (PDFEditor as any)({
          tools: tools,
          toolbar: toolbarContainer,
          locale: locale,
        }, pdfUrlToUse, reader);

        console.log('[usePDFEditor] Initializing PDFEditor...');
        await editor.init();
        console.log('[usePDFEditor] PDFEditor initialized successfully');
        editorRef.current = editor;

        // Listen for save events
        if (onSave && window.PDFEvent) {
          window.PDFEvent.on('DOWNLOAD', (e: any, blob: Blob) => {
            onSave(blob);
          });
        }

        setIsReady(true);
        setIsLoading(false);
        console.log('[usePDFEditor] Initialization complete!', { isReady: true, isLoading: false });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize PDF editor');
        console.error('[usePDFEditor] Initialization failed:', error);
        setError(error);
        setIsLoading(false);
        onError?.(error);
      }
    };

    initEditor();

    // Cleanup
    return () => {
      if (window.PDFEvent && onSave) {
        window.PDFEvent.off('DOWNLOAD');
      }
      readerRef.current?.destroy?.();
      editorRef.current?.destroy?.();
      // Release Blob URL if created
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [pdfUrl, pdfData, tools, locale, onSave, onError]);

  // Helper methods
  const save = useCallback(async () => {
    if (!editorRef.current) return null;
    return await editorRef.current.save();
  }, []);

  const download = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.download();
  }, []);

  const undo = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.undo();
  }, []);

  const redo = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.redo();
  }, []);

  const clear = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.clear();
  }, []);

  return {
    containerRef,
    reader: readerRef.current,
    editor: editorRef.current,
    isLoading,
    isReady,
    error,
    save,
    download,
    undo,
    redo,
    clear,
  };
}
