'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type {
  PDFReaderInstance,
  PDFEditorInstance,
  PDFEditorWrapperProps,
} from './types';

type PdfJsLib = {
  getDocument: (src: unknown) => { promise: Promise<unknown>; onPassword?: unknown };
  GlobalWorkerOptions: { workerSrc: string };
  PasswordResponses?: { NEED_PASSWORD: unknown; INCORRECT_PASSWORD: unknown };
};

type PDFReaderCtor = new (options: unknown, pdfjsLib: PdfJsLib, password?: string | null) => PDFReaderInstance;
type PDFEditorCtor = new (options: unknown, pdfData: unknown, reader: PDFReaderInstance) => PDFEditorInstance;

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
  const [instanceKey, setInstanceKey] = useState(0);

  // Initialize PDF editor
  useEffect(() => {
    if (!containerRef.current) return;

    const initEditor = async () => {
      try {
        // Clean up any existing instances first
        if (readerRef.current) {
          console.log('[usePDFEditor] Cleaning up existing reader instance');
          readerRef.current.destroy?.();
          readerRef.current = null;
        }
        if (editorRef.current) {
          console.log('[usePDFEditor] Cleaning up existing editor instance');
          editorRef.current.destroy?.();
          editorRef.current = null;
        }
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
          blobUrlRef.current = null;
        }

        console.log('[usePDFEditor] Starting initialization...', { pdfUrl, pdfData: !!pdfData });
        setIsLoading(true);
        setIsReady(false);
        setError(null);

        // Load PDF editor CSS
        if (!document.querySelector('link[href="/css/pdfeditor.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/css/pdfeditor.css';
          document.head.appendChild(link);
        }
        // Local font faces used by editor tools (keeps PDF editing fully client-side)
        if (!document.querySelector('link[href="/assets/fonts.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/assets/fonts.css';
          document.head.appendChild(link);
        }
        // Pickr (color picker) theme CSS used by multiple tools
        if (!document.querySelector('link[href="/css/pickr-classic.min.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/css/pickr-classic.min.css';
          document.head.appendChild(link);
        }

        // Dynamically import pdfeditor modules
        const { PDFReader, PDFEditor, PDFEvent, Events, Font } = await import('@/lib/pdfeditor');
        // Ensure font remote API is disabled by default (pure frontend)
        Font.fontUrl = '';
        // Avoid duplicated pdfeditor event handlers when re-initializing
        PDFEvent.reset?.();

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
          (window.pdfjsLib as unknown as PdfJsLib).GlobalWorkerOptions.workerSrc = '/assets/js/pdfjs/pdf.worker.min.js';
        }
        const pdfjsLib = window.pdfjsLib as unknown as PdfJsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/js/pdfjs/pdf.worker.min.js';

        // Initialize PDFReader
        const readerContainer = containerRef.current?.querySelector('.pdf-viewer') as HTMLElement;
        const thumbsContainer = containerRef.current?.querySelector('.pdf-thumbs') as HTMLElement;

        // Validate DOM elements exist
        if (!readerContainer || !thumbsContainer) {
          throw new Error('PDF editor DOM containers not found. Required: .pdf-viewer and .pdf-thumbs');
        }

        const Reader = PDFReader as unknown as PDFReaderCtor;
        const reader = new Reader({
          url: pdfUrlToUse,
          main: readerContainer,
          thumbs: thumbsContainer,
          renderType: 'html',
          cMapUrl: '/assets/js/pdfjs/cmaps/',
          standardFontDataUrl: '/assets/js/pdfjs/standard_fonts/',
          usePageBase: false,
          expandThumbs: true,
        }, pdfjsLib);

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

        const Editor = PDFEditor as unknown as PDFEditorCtor;
        const editor = new Editor({
          tools: tools,
          toolbar: toolbarContainer,
          locale: locale,
          history: true,
        }, pdfUrlToUse, reader);

        console.log('[usePDFEditor] Initializing PDFEditor...');
        await editor.init();
        console.log('[usePDFEditor] PDFEditor initialized successfully');
        editorRef.current = editor;

        // Expose for debugging and legacy bridges
        (window as unknown as { PDFEvent?: unknown }).PDFEvent = PDFEvent;

        // Listen for download-complete events (blob ready)
        const handleDownloadComplete = (e: unknown) => {
          const evt = e as { data?: unknown } | undefined;
          const payload = evt?.data as { blob?: unknown } | undefined;
          const blob = payload?.blob instanceof Blob ? payload.blob : payload;
          if (blob instanceof Blob) onSave?.(blob);
        };
        if (onSave) {
          PDFEvent.on(Events.DOWNLOAD_COMPLETE, handleDownloadComplete);
        }

        const handleEngineError = (e: unknown) => {
          const evt = e as { data?: unknown } | undefined;
          const err = evt?.data instanceof Error ? evt.data : new Error('PDF editor error');
          onError?.(err);
        };
        PDFEvent.on(Events.ERROR, handleEngineError);

        setIsReady(true);
        setIsLoading(false);
        console.log('[usePDFEditor] Initialization complete!', { isReady: true, isLoading: false });
        setInstanceKey(prev => prev + 1);

        return () => {
          if (onSave) {
            PDFEvent.unbind(Events.DOWNLOAD_COMPLETE, handleDownloadComplete);
          }
          PDFEvent.unbind(Events.ERROR, handleEngineError);
        };
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize PDF editor');
        console.error('[usePDFEditor] Initialization failed:', error);
        setError(error);
        setIsLoading(false);
        onError?.(error);
      }
    };

    let cleanupDownloadListener: (() => void) | undefined;
    initEditor().then(cleanup => {
      cleanupDownloadListener = cleanup;
    });

    // Cleanup
    return () => {
      cleanupDownloadListener?.();
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
    editorRef,  // Expose the ref itself for toolbar bridge
    reader: readerRef.current,
    editor: editorRef.current,
    isLoading,
    isReady,
    error,
    instanceKey,
    save,
    download,
    undo,
    redo,
    clear,
  };
}
