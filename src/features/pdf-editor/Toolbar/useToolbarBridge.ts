/**
 * useToolbarBridge - Bridge the legacy PDFEditor event system into React state/actions.
 *
 * The underlying pdfeditor engine is vanilla JS and exposes a global/static event bus.
 * This hook listens to key events and provides a typed-ish action surface to React UI.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export type ToolName =
  | 'mouse'
  | 'hand'
  | 'text'
  | 'image'
  | 'highlight'
  | 'text_highlight'
  | 'eraser'
  | 'shapes'
  | 'textbox'
  | 'signature'
  | 'insert_pages'
  | 'delete_pages'
  | 'watermark'
  | 'page_number'
  | 'header_footer'
  | 'stamp'
  | 'textArt'
  | 'forms'
  | 'line'
  | 'arrow'
  | 'rect'
  | 'rect_stroke'
  | 'circle'
  | 'circle_stroke'
  | 'ellipse'
  | 'ellipse_stroke'
  | 'radact'
  | 'underline'
  | 'strikethrough'
  | 'find'
  | 'download'
  | 'history'
  | 'pages'
  | 'openFile';

export interface EditorState {
  activeTool: ToolName | null;
  canUndo: boolean;
  canRedo: boolean;
  currentPage: number;
  totalPages: number;
  scale: number;
  isLoading: boolean;
  error: string | null;
}

export interface ToolAttributes {
  [key: string]: unknown;
}

type PdfEventBus = {
  on: (type: string, cb: (e: { type: string; data?: unknown }) => void, once?: boolean) => void;
  unbind: (type: string, cb?: (e: { type: string; data?: unknown }) => void) => void;
  dispatch: (type: string, data?: unknown) => void;
};

type PdfEventsMap = Record<string, string>;

type PdfEditorApi = {
  toolbar?: {
    tools?: Record<string, { click?: () => void; setAttrs?: (attrs: unknown) => void }>;
    getActive?: () => { name?: string } | null;
  };
  history?: { undo?: () => void; redo?: () => void };
  reader?: {
    scale: number;
    setViewMode: (scale: number) => void;
    to: (pageNum: number) => void;
    pdfDocument?: { pageCount?: number; pageActive?: number };
  };
  save?: (fileName?: string) => Promise<unknown>;
  download?: (fileName?: string) => Promise<unknown> | void;
};

interface UseToolbarBridgeReturn {
  editorState: EditorState;
  activeToolAttrs: ToolAttributes;
  selectTool: (toolName: ToolName) => void;
  undo: () => void;
  redo: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setScale: (scale: number) => void;
  goToPage: (pageNum: number) => void;
  updateToolAttrs: (attrs: Partial<ToolAttributes>) => void;
  save: () => Promise<void>;
  download: () => Promise<void>;
  dispatchEvent: (eventType: string, data?: unknown) => void;
  addEventListener: (eventType: string, callback: (data: unknown) => void) => () => void;
}

export function useToolbarBridge(
  editorRef: React.MutableRefObject<unknown | null>,
  instanceKey = 0
): UseToolbarBridgeReturn {
  const [editorState, setEditorState] = useState<EditorState>({
    activeTool: null,
    canUndo: false,
    canRedo: false,
    currentPage: 1,
    totalPages: 0,
    scale: 1,
    isLoading: false,
    error: null,
  });

  const [activeToolAttrs, setActiveToolAttrs] = useState<ToolAttributes>({});

  const eventListenersRef = useRef<Map<string, Set<(data: unknown) => void>>>(new Map());
  const pdfEventRef = useRef<PdfEventBus | null>(null);
  const eventsRef = useRef<PdfEventsMap | null>(null);
  const unsubRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    let cancelled = false;
    const unsubscribers = unsubRef.current;
    setEditorState(prev => ({
      ...prev,
      activeTool: null,
      canUndo: false,
      canRedo: false,
      error: null,
      isLoading: false,
    }));

    const bind = async () => {
      try {
        const eventModule = await import('@/lib/pdfeditor/event');
        if (cancelled) return;

        const PDFEvent = eventModule.PDFEvent as unknown as PdfEventBus;
        const Events = eventModule.Events as unknown as PdfEventsMap;
        pdfEventRef.current = PDFEvent;
        eventsRef.current = Events;

        const onToolActive = (e: { type: string; data?: unknown }) => {
          const name = (e.data as { name?: string } | undefined)?.name;
          setEditorState(prev => ({ ...prev, activeTool: (name as ToolName) || null }));
        };
        PDFEvent.on(Events.TOOLBAR_ITEM_ACTIVE, onToolActive);
        unsubscribers.push(() => PDFEvent.unbind(Events.TOOLBAR_ITEM_ACTIVE, onToolActive));

        const onPageActive = (e: { type: string; data?: unknown }) => {
          if (typeof e.data !== 'number') return;
          const pageNum = e.data;
          setEditorState(prev => ({ ...prev, currentPage: pageNum }));
        };
        PDFEvent.on(Events.PAGE_ACTIVE, onPageActive);
        unsubscribers.push(() => PDFEvent.unbind(Events.PAGE_ACTIVE, onPageActive));

        const onScale = (e: { type: string; data?: unknown }) => {
          if (typeof e.data !== 'number') return;
          const scale = e.data;
          setEditorState(prev => ({ ...prev, scale }));
        };
        PDFEvent.on(Events.SET_SCALE, onScale);
        unsubscribers.push(() => PDFEvent.unbind(Events.SET_SCALE, onScale));

        const onHistory = (e: { type: string; data?: unknown }) => {
          const payload = e.data as { step?: number; maxStep?: number } | undefined;
          const step = payload?.step ?? 0;
          const maxStep = payload?.maxStep ?? 0;
          setEditorState(prev => ({
            ...prev,
            canUndo: step > 0,
            canRedo: step < maxStep,
          }));
        };
        PDFEvent.on(Events.HISTORY_CHANGE, onHistory);
        unsubscribers.push(() => PDFEvent.unbind(Events.HISTORY_CHANGE, onHistory));

        const onReaderInit = () => {
          const editor = editorRef.current as PdfEditorApi | null;
          const total = editor?.reader?.pdfDocument?.pageCount;
          setEditorState(prev => ({
            ...prev,
            totalPages: typeof total === 'number' ? total : prev.totalPages,
            isLoading: false,
          }));
        };
        PDFEvent.on(Events.READER_INIT, onReaderInit);
        unsubscribers.push(() => PDFEvent.unbind(Events.READER_INIT, onReaderInit));

        const onError = (e: { type: string; data?: unknown }) => {
          const message = e.data instanceof Error ? e.data.message : 'An error occurred';
          setEditorState(prev => ({ ...prev, error: message, isLoading: false }));
        };
        PDFEvent.on(Events.ERROR, onError);
        unsubscribers.push(() => PDFEvent.unbind(Events.ERROR, onError));

        // Prime state from the current editor instance (helps when event bus is reset).
        const editor = editorRef.current as PdfEditorApi | null;
        const reader = editor?.reader;
        const total = reader?.pdfDocument?.pageCount;
        const pageActive = reader?.pdfDocument?.pageActive;
        const scale = reader?.scale;
        const active = editor?.toolbar?.getActive?.()?.name;
        setEditorState(prev => ({
          ...prev,
          totalPages: typeof total === 'number' ? total : prev.totalPages,
          currentPage: typeof pageActive === 'number' ? pageActive : prev.currentPage,
          scale: typeof scale === 'number' ? scale : prev.scale,
          activeTool: (active as ToolName) || prev.activeTool,
        }));
      } catch (error) {
        console.error('Failed to load PDFEvent module:', error);
      }
    };

    void bind();

    return () => {
      cancelled = true;
      const unsubs = unsubscribers.splice(0, unsubscribers.length);
      unsubs.forEach(fn => fn());
    };
  }, [editorRef, instanceKey]);

  const dispatchEvent = useCallback((eventType: string, data?: unknown) => {
    const PDFEvent = pdfEventRef.current;
    if (PDFEvent) {
      PDFEvent.dispatch(eventType, data);
    }

    const listeners = eventListenersRef.current.get(eventType);
    if (listeners) listeners.forEach(cb => cb(data));
  }, []);

  const addEventListener = useCallback((eventType: string, callback: (data: unknown) => void) => {
    if (!eventListenersRef.current.has(eventType)) {
      eventListenersRef.current.set(eventType, new Set());
    }
    eventListenersRef.current.get(eventType)!.add(callback);
    return () => eventListenersRef.current.get(eventType)?.delete(callback);
  }, []);

  const selectTool = useCallback((toolName: ToolName) => {
    const editor = editorRef.current as PdfEditorApi | null;
    const tool = editor?.toolbar?.tools?.[toolName];
    if (tool?.click) {
      tool.click();
    } else {
      const Events = eventsRef.current;
      if (Events?.TOOLBAR_ITEM_CLICK) {
        dispatchEvent(Events.TOOLBAR_ITEM_CLICK, { name: toolName });
      }
    }

    setEditorState(prev => ({ ...prev, activeTool: toolName }));
  }, [dispatchEvent, editorRef]);

  const undo = useCallback(() => {
    const editor = editorRef.current as PdfEditorApi | null;
    editor?.history?.undo?.();
  }, [editorRef]);

  const redo = useCallback(() => {
    const editor = editorRef.current as PdfEditorApi | null;
    editor?.history?.redo?.();
  }, [editorRef]);

  const zoomIn = useCallback(() => {
    const editor = editorRef.current as PdfEditorApi | null;
    const reader = editor?.reader;
    if (!reader) return;
    const next = Math.min(reader.scale + 0.25, 5);
    reader.setViewMode(next);
  }, [editorRef]);

  const zoomOut = useCallback(() => {
    const editor = editorRef.current as PdfEditorApi | null;
    const reader = editor?.reader;
    if (!reader) return;
    const next = Math.max(reader.scale - 0.25, 0.25);
    reader.setViewMode(next);
  }, [editorRef]);

  const setScale = useCallback((scale: number) => {
    const editor = editorRef.current as PdfEditorApi | null;
    editor?.reader?.setViewMode(scale);
  }, [editorRef]);

  const goToPage = useCallback((pageNum: number) => {
    const editor = editorRef.current as PdfEditorApi | null;
    editor?.reader?.to(pageNum);
  }, [editorRef]);

  const updateToolAttrs = useCallback((attrs: Partial<ToolAttributes>) => {
    setActiveToolAttrs(prev => ({ ...prev, ...attrs }));
    const editor = editorRef.current as PdfEditorApi | null;
    const activeTool = editorState.activeTool;
    if (!activeTool) return;
    editor?.toolbar?.tools?.[activeTool]?.setAttrs?.(attrs);
  }, [editorRef, editorState.activeTool]);

  const save = useCallback(async () => {
    const editor = editorRef.current as PdfEditorApi | null;
    if (!editor?.save) return;
    try {
      setEditorState(prev => ({ ...prev, isLoading: true, error: null }));
      await editor.save();
      setEditorState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save PDF';
      setEditorState(prev => ({ ...prev, isLoading: false, error: message }));
    }
  }, [editorRef]);

  const download = useCallback(async () => {
    const editor = editorRef.current as PdfEditorApi | null;
    if (!editor?.download) return;
    try {
      setEditorState(prev => ({ ...prev, isLoading: true, error: null }));
      await editor.download();
      setEditorState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to download PDF';
      setEditorState(prev => ({ ...prev, isLoading: false, error: message }));
    }
  }, [editorRef]);

  return {
    editorState,
    activeToolAttrs,
    selectTool,
    undo,
    redo,
    zoomIn,
    zoomOut,
    setScale,
    goToPage,
    updateToolAttrs,
    save,
    download,
    dispatchEvent,
    addEventListener,
  };
}

export default useToolbarBridge;
