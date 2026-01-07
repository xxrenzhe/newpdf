/**
 * UnifiedToolbar - A single "Edit" tab toolbar integrating all PDF editing tools
 *
 * This toolbar combines all functionality from the original Edit and Insert tabs
 * into a single unified interface, organized by tool groups.
 */

'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  DropdownMenuItem,
} from './ToolbarButton';
import {
  TextIcon,
  AddImageIcon,
  HighlightAreaIcon,
  HighlightTextIcon,
  UnderlineIcon,
  StrikethroughIcon,
  SearchIcon,
  ThumbnailsIcon,
  HistoryPanelIcon,
  EraserIcon,
  ShapesIcon,
  DrawIcon,
  TextBoxIcon,
  SignatureIcon,
  InsertPagesIcon,
  DeletePagesIcon,
  WatermarkIcon,
  PageNumberIcon,
  HeaderFooterIcon,
  StampIcon,
  TextArtIcon,
  FormsIcon,
  UndoIcon,
  RedoIcon,
  HandIcon,
  ZoomInIcon,
  ZoomOutIcon,
  MouseIcon,
  LineIcon,
  ArrowIcon,
  RectIcon,
  CircleIcon,
  EllipseIcon,
  DownloadIcon,
} from './ToolbarIcons';
import { useToolbarBridge, ToolName } from './useToolbarBridge';

interface UnifiedToolbarProps {
  editorRef: React.MutableRefObject<unknown | null>;
  instanceKey?: number;
  className?: string;
  hideDownload?: boolean;
}

export const UnifiedToolbar: React.FC<UnifiedToolbarProps> = ({
  editorRef,
  instanceKey = 0,
  className = '',
  hideDownload = false,
}) => {
  const {
    editorState,
    selectTool,
    undo,
    redo,
    goToPage,
    zoomIn,
    zoomOut,
    download,
  } = useToolbarBridge(editorRef, instanceKey);

  const { activeTool, canUndo, canRedo, scale, currentPage, totalPages } = editorState;
  const [pageValue, setPageValue] = useState('1');

  useEffect(() => {
    setPageValue(String(currentPage || 1));
  }, [currentPage]);

  // Handle tool selection
  const handleToolClick = useCallback((toolName: ToolName) => {
    selectTool(toolName);
  }, [selectTool]);

  const clickToolAction = useCallback((selector: string) => {
    const root = document.getElementById('pdf-el-actions');
    const el = root?.querySelector(selector) as HTMLElement | null;
    if (!el) return false;
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    return true;
  }, []);

  const selectShapesAction = useCallback((actionClass: string) => {
    selectTool('shapes');
    if (clickToolAction(`.${actionClass}`)) return;
    requestAnimationFrame(() => clickToolAction(`.${actionClass}`));
  }, [clickToolAction, selectTool]);

  const selectFormsAction = useCallback((actionClass: string) => {
    selectTool('forms');
    if (clickToolAction(`.${actionClass}`)) return;
    requestAnimationFrame(() => clickToolAction(`.${actionClass}`));
  }, [clickToolAction, selectTool]);

  const togglePanel = useCallback((panelId: 'pdf_thumbs_slider' | 'history_slider' | 'forms_slider') => {
    (document.getElementById(panelId) as HTMLElement | null)?.click();
  }, []);

  // Shapes dropdown content
  const shapesDropdown = useMemo(() => (
    <div className="py-1">
      <DropdownMenuItem
        icon={<RectIcon size={20} />}
        label="Rectangle (Fill)"
        onClick={() => handleToolClick('rect')}
        isActive={activeTool === 'rect'}
      />
      <DropdownMenuItem
        icon={<RectIcon size={20} />}
        label="Rectangle (Outline)"
        onClick={() => selectShapesAction('draw_rect')}
        isActive={activeTool === 'rect_stroke'}
      />
      <DropdownMenuItem
        icon={<CircleIcon size={20} />}
        label="Circle (Fill)"
        onClick={() => handleToolClick('circle')}
        isActive={activeTool === 'circle'}
      />
      <DropdownMenuItem
        icon={<CircleIcon size={20} />}
        label="Circle (Outline)"
        onClick={() => selectShapesAction('draw_circle')}
        isActive={activeTool === 'circle_stroke'}
      />
      <DropdownMenuItem
        icon={<EllipseIcon size={20} />}
        label="Ellipse (Fill)"
        onClick={() => handleToolClick('ellipse')}
        isActive={activeTool === 'ellipse'}
      />
      <DropdownMenuItem
        icon={<EllipseIcon size={20} />}
        label="Ellipse (Outline)"
        onClick={() => selectShapesAction('draw_ellipse')}
        isActive={activeTool === 'ellipse_stroke'}
      />
      <DropdownMenuItem
        icon={<LineIcon size={20} />}
        label="Line"
        onClick={() => selectShapesAction('draw_line')}
        isActive={activeTool === 'line'}
      />
      <DropdownMenuItem
        icon={<ArrowIcon size={20} />}
        label="Arrow"
        onClick={() => selectShapesAction('draw_arrow')}
        isActive={activeTool === 'arrow'}
      />
    </div>
  ), [activeTool, handleToolClick, selectShapesAction]);

  // Forms dropdown content
  const formsDropdown = useMemo(() => (
    <div className="py-1">
      <DropdownMenuItem
        label="Text Field"
        onClick={() => selectFormsAction('forms_textfield')}
        isActive={activeTool === 'forms'}
      />
      <DropdownMenuItem
        label="Checkbox"
        onClick={() => selectFormsAction('forms_checkbox')}
      />
      <DropdownMenuItem
        label="Radio Button"
        onClick={() => selectFormsAction('forms_radiogroup')}
      />
      <DropdownMenuItem
        label="Dropdown"
        onClick={() => selectFormsAction('forms_dropdown')}
      />
    </div>
  ), [activeTool, selectFormsAction]);

  return (
    <div className={`unified-toolbar bg-white border-b border-gray-200 ${className}`}>
      {/* Main Toolbar */}
      <div className="flex items-center px-3 py-2 gap-1 overflow-x-auto">
        {/* Left Controls: Undo/Redo */}
        <ToolbarGroup>
          <ToolbarButton
            icon={<UndoIcon size={20} />}
            label="Undo"
            toolName="undo"
            onClick={undo}
            disabled={!canUndo}
            shortcut="Ctrl+Z"
          />
          <ToolbarButton
            icon={<RedoIcon size={20} />}
            label="Redo"
            toolName="redo"
            onClick={redo}
            disabled={!canRedo}
            shortcut="Ctrl+Y"
          />
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Navigation Tools */}
        <ToolbarGroup>
          <ToolbarButton
            icon={<MouseIcon size={20} />}
            label="Select"
            toolName="mouse"
            isActive={activeTool === 'mouse'}
            onClick={() => handleToolClick('mouse')}
            shortcut="V"
          />
          <ToolbarButton
            icon={<HandIcon size={20} />}
            label="Hand"
            toolName="hand"
            isActive={activeTool === 'hand'}
            onClick={() => handleToolClick('hand')}
            shortcut="H"
          />
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Text Tools */}
        <ToolbarGroup label="Text">
          <ToolbarButton
            icon={<TextIcon size={24} />}
            label="Text"
            toolName="text"
            isActive={activeTool === 'text'}
            onClick={() => handleToolClick('text')}
            shortcut="T"
          />
          <ToolbarButton
            icon={<TextBoxIcon size={24} />}
            label="Text Box"
            toolName="textbox"
            isActive={activeTool === 'textbox'}
            onClick={() => handleToolClick('textbox')}
          />
          <ToolbarButton
            icon={<TextArtIcon size={24} />}
            label="Text Art"
            toolName="textArt"
            isActive={activeTool === 'textArt'}
            onClick={() => handleToolClick('textArt')}
          />
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Media Tools */}
        <ToolbarGroup label="Media">
          <ToolbarButton
            icon={<AddImageIcon size={24} />}
            label="Image"
            toolName="image"
            isActive={activeTool === 'image'}
            onClick={() => handleToolClick('image')}
            shortcut="I"
          />
          <ToolbarButton
            icon={<StampIcon size={24} />}
            label="Stamp"
            toolName="stamp"
            isActive={activeTool === 'stamp'}
            onClick={() => handleToolClick('stamp')}
          />
          <ToolbarButton
            icon={<SignatureIcon size={24} />}
            label="Signature"
            toolName="signature"
            isActive={activeTool === 'signature'}
            onClick={() => handleToolClick('signature')}
          />
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Annotation Tools */}
        <ToolbarGroup label="Annotate">
          <ToolbarButton
            icon={<HighlightAreaIcon size={24} />}
            label="Highlight"
            toolName="highlight"
            isActive={activeTool === 'highlight'}
            onClick={() => handleToolClick('highlight')}
          />
          <ToolbarButton
            icon={<HighlightTextIcon size={24} />}
            label="Highlight Text"
            toolName="text_highlight"
            isActive={activeTool === 'text_highlight'}
            onClick={() => handleToolClick('text_highlight')}
          />
          <ToolbarButton
            icon={<UnderlineIcon size={22} />}
            label="Underline"
            toolName="underline"
            isActive={activeTool === 'underline'}
            onClick={() => handleToolClick('underline')}
          />
          <ToolbarButton
            icon={<StrikethroughIcon size={22} />}
            label="Strike"
            toolName="strikethrough"
            isActive={activeTool === 'strikethrough'}
            onClick={() => handleToolClick('strikethrough')}
          />
          <ToolbarButton
            icon={<DrawIcon size={24} />}
            label="Draw"
            toolName="line"
            isActive={activeTool === 'line'}
            onClick={() => handleToolClick('line')}
            shortcut="D"
          />
          <ToolbarButton
            icon={<RectIcon size={24} />}
            label="Redact"
            toolName="radact"
            isActive={activeTool === 'radact'}
            onClick={() => handleToolClick('radact')}
          />
          <ToolbarButton
            icon={<ShapesIcon size={24} />}
            label="Shapes"
            toolName="shapes"
            isActive={['shapes', 'rect', 'rect_stroke', 'circle', 'circle_stroke', 'ellipse', 'ellipse_stroke', 'arrow'].includes(activeTool || '')}
            hasDropdown
            dropdownContent={shapesDropdown}
            onClick={() => handleToolClick('shapes')}
          />
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Page Tools */}
        <ToolbarGroup label="Page">
          <ToolbarButton
            icon={<InsertPagesIcon size={24} />}
            label="Insert"
            toolName="insert_pages"
            isActive={activeTool === 'insert_pages'}
            onClick={() => handleToolClick('insert_pages')}
          />
          <ToolbarButton
            icon={<DeletePagesIcon size={24} />}
            label="Delete"
            toolName="delete_pages"
            isActive={activeTool === 'delete_pages'}
            onClick={() => handleToolClick('delete_pages')}
          />
          <ToolbarButton
            icon={<WatermarkIcon size={24} />}
            label="Watermark"
            toolName="watermark"
            isActive={activeTool === 'watermark'}
            onClick={() => handleToolClick('watermark')}
          />
          <ToolbarButton
            icon={<PageNumberIcon size={24} />}
            label="Page #"
            toolName="page_number"
            isActive={activeTool === 'page_number'}
            onClick={() => handleToolClick('page_number')}
          />
          <ToolbarButton
            icon={<HeaderFooterIcon size={24} />}
            label="Header"
            toolName="header_footer"
            isActive={activeTool === 'header_footer'}
            onClick={() => handleToolClick('header_footer')}
          />
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Editing Tools */}
        <ToolbarGroup label="Edit">
          <ToolbarButton
            icon={<EraserIcon size={24} />}
            label="Eraser"
            toolName="eraser"
            isActive={activeTool === 'eraser'}
            onClick={() => handleToolClick('eraser')}
            shortcut="E"
          />
          <ToolbarButton
            icon={<FormsIcon size={24} />}
            label="Forms"
            toolName="forms"
            isActive={activeTool === 'forms'}
            hasDropdown
            dropdownContent={formsDropdown}
            onClick={() => handleToolClick('forms')}
          />
        </ToolbarGroup>

        <ToolbarDivider />

        {/* View & Panels */}
        <ToolbarGroup label="View">
          <ToolbarButton
            icon={<SearchIcon size={20} />}
            label="Find"
            toolName="find"
            isActive={activeTool === 'find'}
            onClick={() => handleToolClick('find')}
            shortcut="Ctrl+F"
          />
          <ToolbarButton
            icon={<ThumbnailsIcon size={20} />}
            label="Thumbs"
            toolName="thumbs"
            onClick={() => togglePanel('pdf_thumbs_slider')}
          />
          <ToolbarButton
            icon={<HistoryPanelIcon size={20} />}
            label="History"
            toolName="history_panel"
            onClick={() => togglePanel('history_slider')}
          />
          <ToolbarButton
            icon={<FormsIcon size={20} />}
            label="Forms Panel"
            toolName="forms_panel"
            onClick={() => togglePanel('forms_slider')}
          />
        </ToolbarGroup>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Controls: Page & Zoom */}
        <ToolbarGroup>
          <div className="flex items-center gap-1 px-2">
            <input
              className="w-12 px-1.5 py-1 text-sm text-gray-700 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={pageValue}
              inputMode="numeric"
              aria-label="Current page"
              onChange={(e) => setPageValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                const value = Number(pageValue);
                if (!Number.isFinite(value)) return;
                if (value < 1 || (totalPages > 0 && value > totalPages)) return;
                goToPage(value);
              }}
            />
            <span className="text-xs text-gray-500">/ {totalPages || '—'}</span>
          </div>

          <ToolbarButton
            icon={<ZoomOutIcon size={20} />}
            label="Zoom Out"
            toolName="zoom_out"
            onClick={zoomOut}
            shortcut="Ctrl+-"
          />

          <button
            className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded min-w-[60px] text-center"
            onClick={() => {}}
          >
            {Math.round(scale * 100)}%
          </button>

          <ToolbarButton
            icon={<ZoomInIcon size={20} />}
            label="Zoom In"
            toolName="zoom_in"
            onClick={zoomIn}
            shortcut="Ctrl++"
          />
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Download */}
        {!hideDownload && (
          <ToolbarButton
            icon={<DownloadIcon size={20} />}
            label="Download"
            toolName="download"
            onClick={download}
            shortcut="Ctrl+S"
            className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
          />
        )}
      </div>
    </div>
  );
};

export default UnifiedToolbar;
