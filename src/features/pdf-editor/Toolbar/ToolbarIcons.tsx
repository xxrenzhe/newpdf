/**
 * PDF Editor Toolbar Icons
 * SVG icons for all toolbar tools - migrated from oldcode/pdfeditor/src/assets/img
 */

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Text/Edit Tool Icon
export const TextIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#415267" d="M100.4,200H32c-16.7,0-30.2-12.4-30.2-27.7V27.7C1.8,12.4,15.3,0,32,0h136.8C185.5,0,199,12.4,199,27.7v64.2c0,2.5-2.2,4.5-4.9,4.5s-4.9-2-4.9-4.5V27.7C189.2,17.4,180,9,168.8,9H32c-11.3,0-20.4,8.4-20.4,18.7v144.7c0,10.3,9.1,18.6,20.4,18.7h68.4c2.7,0,4.9,2,4.9,4.5C105.3,198,103.1,200,100.4,200L100.4,200z"/>
    <path fill="#415267" d="M162.6,109.3c5.9-8,17.1-9.7,25-3.8c8,5.9,9.7,17.1,3.8,25l-37.7,51.2c-0.3,0.4-0.7,0.7-1.1,0.9l-23.6,12.6c-4.9,2.6-10.7-1.6-9.7-7.1l5-26.3c0.1-0.5,0.3-0.9,0.6-1.3L162.6,109.3z"/>
    <path fill="#007BBF" d="M54.3,38.9l-3.1,25.1h3.1c0-8.8,6.9-15.7,15.7-15.7h22v80c0,4.4-3.5,7.9-7.9,7.9h-7.8v3.1h50.2v-3.1h-7.8c-4.3,0-7.8-3.4-7.9-7.7c0-0.1,0-0.1,0-0.2V48.4h22c8.8,0,15.7,6.9,15.7,15.7h3.1l-3.1-25.1L54.3,38.9L54.3,38.9z"/>
  </svg>
);

// Add Image Icon
export const AddImageIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#16C4AF" d="M195.1,145.5l-9.6-11.6l-58.4-58.3c-4.6-4.6-12.2-4.6-16.8,0l-32.9,32.8c-0.6,0.6-1.3,0.8-1.6,0.8c-0.4,0-1.1-0.1-1.6-0.8l-9-8.9c-4.6-4.6-12.2-4.6-16.8,0l-34.6,34.6L4,145.6V173c0,10.6,8.5,19.1,19.1,19.1h152.8c10.6,0,19.1-8.5,19.1-19.1V145.5"/>
    <circle fill="#E5404F" cx="56.2" cy="50" r="19.6"/>
    <path fill="#415267" d="M174.3,0.1H25.5C11.4,0.1-0.1,11.6-0.1,25.7v148.8c0,14.1,11.5,25.6,25.6,25.6h148.8c14.1,0,25.6-11.5,25.6-25.6l0-148.8C199.9,11.6,188.4,0.1,174.3,0.1z M190.6,172.8c0,9.9-8.1,18-18,18H27.2c-9.9,0-18-8.1-18-18V27.4c0-9.9,8.1-18,18-18h145.4c9.9,0,18,8.1,18,18V172.8z"/>
  </svg>
);

// Highlight Area Icon
export const HighlightAreaIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <rect x="7.3" y="133.6" fill="#FF8E55" fillOpacity="0.4" width="186.9" height="62.1"/>
    <rect x="73.9" y="41.8" transform="matrix(0.7957 0.6057 -0.6057 0.7957 61.7575 -63.9945)" fill="#FF8E55" width="103.8" height="35.5"/>
    <path fill="#FF8E55" d="M66.5,75.3l-38.9,51.1c-2,2.7,0.2,7.2,4.2,8.7l58.5,18.3c3.1,1.1,6,0.6,7.6-1.5l24.2-31.8C121.9,120,66.5,75.3,66.5,75.3z"/>
    <path fill="#415267" d="M190,71.1l-7-5.3L154.7,103l-3.9-2.9l0,0L76.1,43.2l0,0l-1.9-1.4l27.3-35.8l-7-5.3L62.8,42.2l4.8,3.7L54.7,62.9l-2.6,3.4l0,0l0,0l3.5,2.6l7.1,5.4l-37.9,49.7c-1.5,2-1.7,4.9-0.3,7.7c1.4,2.8,4,5.1,7,6.3l0.1,0l58.5,18.3c4.4,1.6,8.8,0.7,11-2.2c7.8-10.2,16.4-21.7,24.3-32.1l9.2,7l0,0l0.5,0.3l16.5-21.8l6.7,5.1L190,71.1z"/>
  </svg>
);

// Highlight Text Icon
export const HighlightTextIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <rect x="60.6" y="54.4" transform="matrix(0.7957 0.6057 -0.6057 0.7957 70.9832 -59.01)" fill="#FFCF1F" width="124.7" height="42.7"/>
    <path fill="#FFCF1F" d="M51.7,94.6L5,156.1c-2.4,3.2,0.2,8.6,5,10.4l70.3,22c3.7,1.3,7.3,0.7,9.1-1.7l29.1-38.3C118.3,148.4,51.7,94.6,51.7,94.6z"/>
    <path fill="#415267" d="M200.2,89.6l-8.4-6.4l-34,44.7l-4.7-3.5l0,0L63.3,56.1l0,0L61,54.3l32.8-43l-8.4-6.4l-38.1,50l5.8,4.4L37.6,79.8l-3.1,4l0,0l0,0l4.2,3.1l8.6,6.5L1.7,153.3c-1.9,2.4-2,5.9-0.3,9.3c1.6,3.3,4.8,6.2,8.5,7.5l0.1,0.1l70.3,22c5.3,1.9,10.5,0.9,13.2-2.6c9.3-12.2,19.7-26,29.2-38.6l11,8.4l0,0l0.6,0.4l19.8-26.2l8.1,6.2L200.2,89.6z"/>
  </svg>
);

// Underline Icon
export const UnderlineIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 4v6a5 5 0 0 0 10 0V4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Strikethrough Icon
export const StrikethroughIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12h16" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 4h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Search Icon
export const SearchIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// Thumbnails/Pages Panel Icon
export const ThumbnailsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

// History Panel Icon
export const HistoryPanelIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1 0 3-6.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Eraser Icon
export const EraserIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <rect x="60.9" y="25.4" transform="matrix(0.7071 0.7071 -0.7071 0.7071 91.0202 -59.2568)" fill="#B4FFC7" width="112.3" height="109.7"/>
    <path fill="#415267" d="M113,163l1,1c0.8,0.8,1.9,1.3,3.1,1.3c1.1,0,2.2-0.4,3.1-1.3l71.1-71.1c7.3-7.3,7.3-19.1,0-26.4l-61-61c-3.5-3.5-8.2-5.5-13.2-5.5s-9.7,1.9-13.2,5.5L32.8,76.6c-0.8,0.8-1.3,1.9-1.3,3.1c0,1.2,0.5,2.2,1.3,3.1l1,1l-23.4,23.4c-3.5,3.5-5.5,8.2-5.5,13.2s1.9,9.7,5.5,13.2l52.9,52.9c2.5,2.5,5.7,4.3,9.1,5H8.3c-2.4,0-4.3,1.9-4.3,4.3s1.9,4.3,4.3,4.3h175.4c2.4,0,4.3-1.9,4.3-4.3s-1.9-4.3-4.3-4.3H80.5c3.4-0.8,6.6-2.5,9.1-5L113,163L113,163z"/>
  </svg>
);

// Shapes Icon
export const ShapesIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <circle fill="#74B3FF" cx="123" cy="122.8" r="71.7"/>
    <path fill="#415267" d="M18.1,125.4c-4.6,0-8.3-3.7-8.3-8.3V16.7c0-4.6,3.7-8.3,8.3-8.3h100.4c4.6,0,8.3,3.7,8.3,8.3v21.7c2.8,0.4,5.6,0.9,8.4,1.6V16.7c0-9.2-7.5-16.7-16.7-16.7H18.1C8.9,0,1.4,7.5,1.4,16.7v100.4c0,9.2,7.5,16.7,16.7,16.7h17.4c-0.5-2.7-0.9-5.5-1.1-8.4H18.1z"/>
    <path fill="#415267" d="M121.5,45.7c-42.5,0-77.1,34.6-77.1,77.2c0,42.6,34.6,77.2,77.1,77.2c42.5,0,77.1-34.6,77.1-77.2S164,45.7,121.5,45.7z M121.5,191.8c-38,0-69-31-69-69c0-38.1,30.9-69,69-69c38,0,69,31,69,69C190.4,160.9,159.5,191.8,121.5,191.8z"/>
  </svg>
);

// Draw Icon
export const DrawIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <rect x="44.2" y="62.3" transform="matrix(0.7073 0.707 -0.707 0.7073 94.8041 -55.9827)" fill="#C26AFF" width="141.6" height="48.4"/>
    <polygon fill="#4E4A6B" points="191.8,106.5 149.7,148.9 51,50.9 93.4,8.2 85.2,0.1 42.8,42.8 34.9,50.7 34.7,50.9 141.5,157.1 149.7,165.2 157.8,157 200,114.6"/>
    <path fill="#4E4A6B" d="M42,44.7l-1.7,1.7L0,199.9l152.4-39.7l2.5-0.8L42,44.7z M75.7,163l-39.3-38.2l14.8-57.6l82,80.6C133.2,147.8,75.7,163,75.7,163z"/>
    <path fill="#C26AFF" d="M27.1,185.4c-4.5-4.4-8.9-8.7-13.4-13.1c2.3-6.9,4.6-13.9,6.9-20.8l27.1,27.1C40.8,180.8,33.9,183.1,27.1,185.4z"/>
  </svg>
);

// Text Box Icon
export const TextBoxIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#4E4A6B" d="M19.7,171.8L19.6,28c3.8-1.5,6.8-4.5,8.3-8.3l144.1,0c1.5,3.8,4.5,6.8,8.3,8.3v31.5h10.4V28c7.5-2.8,11.2-11.2,8.3-18.6S187.8-1.8,180.4,1c-3.8,1.5-6.9,4.5-8.3,8.3l-144.1,0C25.1,1.9,16.7-1.8,9.3,1S-1.9,12.2,1,19.7c1.5,3.8,4.5,6.9,8.3,8.3l0.1,144.3C2,175.5-1.3,184,1.9,191.3c3.2,7.3,11.7,10.6,19.1,7.4c3.5-1.6,6.3-4.5,7.7-8.1h40.5v-10.4H28.7C27.1,176.3,23.8,173.1,19.7,171.8z"/>
    <path fill="#ED9520" d="M96.1,145l70.7-70.7l30.6,30.6l-70.7,70.7L96.1,145z"/>
    <path fill="#D1791A" d="M118.4,167.3l70.7-70.7l8.3,8.3l-70.7,70.7L118.4,167.3z"/>
    <path fill="#565F66" d="M90,168l-4.5,18.2l18.2-4.5L90,168z"/>
  </svg>
);

// Signature Icon
export const SignatureIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#415267" d="M43.6,167.9L43.6,167.9L43.6,167.9z M43.5,167.9L43.5,167.9C43.3,167.4,43.4,167.6,43.5,167.9z M81.1,82.6C81.2,82.7,81.1,82.6,81.1,82.6L81.1,82.6C81.2,82.7,81.1,82.6,81.1,82.6z M82.2,187c0.1,0,0.3,0,0.3,0C82.4,187.1,82.3,187,82.2,187z M185,160.1H82.2v-9.6H185V160.1z M185,197.8H15.8v-9.6H185V197.8z"/>
    <path fill="#D63C3C" d="M100.8,125.6c0.3-0.1,0.5,0,0.7,0c0.1,0,0.5,0.1,0.6,0.1c2.6,0.6,4.5,1.6,6.8,3c3.5,2.4,6.7-4.1,3.2-6.5c-4.5-2.9-9.9-5.5-15-3.5c-3.7,1.5-6.3,4.7-8.8,8.1l-1.8,2.1c-0.3,0.3-0.6,0.7-0.9,1"/>
    <path fill="#108DDC" d="M194,2.4c-2.1-0.3-4.3-0.2-6.3,0.2c-7.4,0.6-16.5,4.8-23.2,10.6c0.9-5.8-7-1.4-10.1,0.2c-9.8,5.2-18.1,12.3-24.8,20.8c-0.4-4.7-5.6-0.6-9,3.8c-6.7,8.7-11.3,18.2-13,28.8c-1.5,9.4,0.7,18,5.9,25.2c8-14.3,15.7-27.9,26.2-42.3c11.8-16.1,27.3-30.2,37.5-33.6c-34.4,28.6-52.4,66.2-69.7,104.3l4.2-2.7"/>
  </svg>
);

// Insert Pages Icon
export const InsertPagesIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#415267" d="M100,199.7H31.7c-16.7,0-30.2-12.4-30.2-27.6V27.6C1.6,12.4,15.1,0,31.7,0h136.6c16.7,0,30.2,12.4,30.2,27.6v64.1c0,2.5-2.2,4.5-4.9,4.5s-4.9-2-4.9-4.5V27.6c0-10.3-9.1-18.6-20.4-18.6H31.7c-11.2,0-20.4,8.3-20.4,18.6v144.5c0,10.3,9.1,18.6,20.4,18.6H100c2.7,0,4.9,2,4.9,4.5C104.9,197.7,102.7,199.7,100,199.7L100,199.7z"/>
    <path fill="#789F7C" d="M137.9,93.9h-34.3V59.6c0-2.7-2.3-5-5-5c-2.7,0-5,2.3-5,5v34.3H59.3c-2.7,0-5,2.3-5,5c0,2.7,2.3,5,5,5h34.3v34.3c0,2.7,2.3,5,5,5c2.7,0,5-2.3,5-5v-34.3h34.3h0c2.7,0,5-2.3,5-5C142.9,96.2,140.6,93.9,137.9,93.9z"/>
    <path fill="#415267" d="M125.6,196c0-2.2,1.5-4,3.3-4h65.3c1.8,0,3.3,1.8,3.3,4s-1.5,4-3.3,4h-65.3C127,200,125.6,198.2,125.6,196z"/>
    <path fill="#415267" d="M125.6,168c0-2.2,1.5-4,3.3-4h65.3c1.8,0,3.3,1.8,3.3,4s-1.5,4-3.3,4h-65.3C127,172,125.6,170.2,125.6,168z"/>
  </svg>
);

// Delete Pages Icon
export const DeletePagesIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#415267" d="M100,199.7H31.7c-16.7,0-30.2-12.4-30.2-27.6V27.6C1.6,12.4,15.1,0,31.7,0h136.6c16.7,0,30.2,12.4,30.2,27.6v64.1c0,2.5-2.2,4.5-4.9,4.5s-4.9-2-4.9-4.5V27.6c0-10.3-9.1-18.6-20.4-18.6H31.7c-11.2,0-20.4,8.3-20.4,18.6v144.5c0,10.3,9.1,18.6,20.4,18.6H100c2.7,0,4.9,2,4.9,4.5C104.9,197.7,102.7,199.7,100,199.7L100,199.7z"/>
    <path fill="#E90006" d="M149.1,54.9h-26.6v-3.8c0-4.8-3.9-8.8-8.8-8.8H87.8c-4.8,0-8.8,3.9-8.8,8.8v3.8H51.8c-1.3,0-2.4,1.1-2.4,2.4s1.1,2.4,2.4,2.4h10.3v78.4c0,7.4,6,13.4,13.4,13.4h50.9c7.4,0,13.4-6,13.4-13.4V59.8h9.2c1.3,0,2.4-1.1,2.4-2.4S150.4,54.9,149.1,54.9z"/>
    <path fill="#E90006" d="M100.4,139.5c1.3,0,2.4-1.1,2.4-2.4V70.3c0-1.3-1.1-2.4-2.4-2.4s-2.4,1.1-2.4,2.4v66.8C97.9,138.5,99,139.5,100.4,139.5z"/>
  </svg>
);

// Watermark Icon
export const WatermarkIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#415267" d="M100.2,1.2c-9,0-71.9,76.4-71.9,125.8c0,39.5,32.3,71.9,71.9,71.9s71.9-32.3,71.9-71.9C172.1,77.5,109.2,1.2,100.2,1.2z M100.2,189.8c-34.6,0-62.9-29.2-62.9-65.1C37.3,82,95.7,12,100.2,12c4.5,0,62.9,70.1,62.9,112.7C163.1,160.6,134.8,189.8,100.2,189.8z"/>
    <path fill="#E95C00" d="M14.7,79.2c0-2.2,3.5-4,7.8-4h155.3c4.3,0,7.8,1.8,7.8,4s-3.5,4-7.8,4H22.5C18.2,83.2,14.7,81.4,14.7,79.2z"/>
    <path fill="#E95C00" d="M14,115.5c0-2.2,3.5-4,7.8-4h155.3c4.3,0,7.8,1.8,7.8,4c0,2.2-3.5,4-7.8,4H21.8C17.5,119.4,14,117.7,14,115.5z"/>
    <path fill="#E95C00" d="M15.1,153.7c0-2.2,3.5-4,7.8-4h155.3c4.3,0,7.8,1.8,7.8,4c0,2.2-3.5,4-7.8,4H22.9C18.6,157.6,15.1,155.9,15.1,153.7z"/>
  </svg>
);

// Page Number Icon
export const PageNumberIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#394E65" d="M33.6,148.1H17.1c-4.5,0-8.2-3.7-8.2-8.2V61.2v0V16.5c0-4.5,3.7-8.2,8.2-8.2h119.1c4.5,0,8.2,3.7,8.2,8.2v9.9h8.2V15.6C152.6,7,145.6,0,137,0L96.7,0h0H16.2C7.6,0,0.6,7,0.6,15.6v125.1c0,8.6,7,15.6,15.6,15.6h17.4V148.1z"/>
    <path fill="#394E65" d="M140.9,195.7c0-2.3-1.8-4.1-4.1-4.1h0h0h0h-73c-4.5,0-8.2-3.7-8.2-8.2v-78.7v0V59.9c0-4.5,3.7-8.2,8.2-8.2h119.1c4.5,0,8.2,3.7,8.2,8.2v79.5c0,2.3,1.8,4.1,4.1,4.1c2.3,0,4.1-1.8,4.1-4.1V59.1c0-8.6-7-15.6-15.6-15.6l-40.3,0h0H63c-8.6,0-15.6,7-15.6,15.6v125.1c0,8.6,7,15.6,15.6,15.6h73.8C139.1,199.8,140.9,198,140.9,195.7"/>
    <path fill="#0EAA00" d="M108.4,160.4v-4.5c13.4-0.9,14.1-1.9,14.1-12.6V98.5c0-7.3-0.4-7.8-6.8-8.1l-7.3-0.2v-3.9c9.4-1.6,17.6-4.3,25-7.5v64.5c0,10.8,0.9,11.7,14.6,12.6v4.5H108.4z"/>
  </svg>
);

// Header & Footer Icon
export const HeaderFooterIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#415267" d="M174.4,0H25.6C11.5,0,0,11.5,0,25.6v148.8C0,188.5,11.5,200,25.6,200h148.8c14.1,0,25.6-11.5,25.6-25.6l0-148.8C200,11.5,188.5,0,174.4,0z"/>
    <path fill="#FFEDAA" d="M190.8,57.9H9.4V27.6c0-9.9,8.1-18,18-18h145.4c9.9,0,18,8.1,18,18V57.9z"/>
    <path fill="#BFFFC2" d="M172.8,191.2H27.4c-9.9,0-18-8.1-18-18V147h181.4v26.3C190.8,183.1,182.7,191.2,172.8,191.2z"/>
    <rect x="9.4" y="64.9" fill="#FFFFFF" width="181.4" height="74.6"/>
  </svg>
);

// Stamp Icon
export const StampIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#666BD9" d="M125.7,106.8v-5c0-6.1,2.4-12,6.8-16.2c9.9-9.5,15.8-23.2,14.5-38.3C145,24.3,126.3,6,103.3,4.4c-27.5-1.9-50.5,19.9-50.5,47c0,13.3,5.5,25.2,14.3,33.8c4.5,4.4,7.1,10.3,7.1,16.5v5c0,8.9-5.2,17-13.2,20.7l-31.7,14.7c-10.1,4.7-16.5,14.8-16.5,25.9v27.5h174.3v-27.5c0-11.1-6.5-21.2-16.5-25.9l-31.7-14.7C130.9,123.8,125.7,115.7,125.7,106.8L125.7,106.8z"/>
    <circle fill="#FFFFFF" cx="68.6" cy="51.4" r="2.9"/>
    <circle fill="#FFFFFF" cx="100" cy="20" r="2.9"/>
    <rect x="10.3" y="165.7" fill="#FFFFFF" width="176" height="28.2"/>
    <path fill="#46596F" d="M172.4,138.4l-31.7-14.7c-6.5-3-10.7-9.6-10.7-16.8v-5c0-5.1,2-9.9,5.4-13.1c11.4-10.8,17.1-26.1,15.8-41.8c-2.1-24.9-22.6-45-47.6-46.7C89.2-0.9,75.5,4,64.9,13.8c-10.4,9.7-16.3,23.4-16.3,37.6c0,14,5.5,27.1,15.6,36.9C68,92,70,96.8,70,101.8v5c0,7.2-4.2,13.8-10.7,16.8l-31.7,14.7c-11.5,5.4-19,17.1-19,29.8v27.5c0,2.4,1.9,4.3,4.3,4.3h174.3c2.4,0,4.3-1.9,4.3-4.3v-27.5C191.4,155.5,184,143.8,172.4,138.4z"/>
  </svg>
);

// Text Art Icon
export const TextArtIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#4E4A6B" d="M174.5,196.6c0,1.6-1.4,3.1-3.5,3.6c-2.5,0.6-5.2-0.6-5.9-2.6c-8.3-22.7-35.4-38.6-65.8-38.6c-30.4,0-57.5,15.9-65.8,38.6c-0.7,2-3.4,3.1-5.9,2.5c0,0,0,0,0,0c-2.5-0.6-4-2.6-3.3-4.6c0,0,0,0,0,0c9.5-25.9,40.3-43.9,75-43.9c34.7,0,65.5,18.1,75,44C174.4,195.9,174.5,196.3,174.5,196.6L174.5,196.6z"/>
    <text x="10" y="121" fill="#0096DF" stroke="#00567F" strokeWidth="7" fontFamily="Arial-BoldMT" fontSize="164">Ta</text>
  </svg>
);

// Forms Icon
export const FormsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className={className}>
    <path fill="#3B444F" d="M174.3,0.2H25.6C11.5,0.2,0,11.6,0,25.7v148.7C0,188.5,11.5,200,25.6,200h148.7c14.1,0,25.6-11.5,25.6-25.6l0-148.7C199.8,11.6,188.4,0.2,174.3,0.2z M190.5,172.7c0,9.9-8.1,18-18,18H27.3c-9.9,0-18-8.1-18-18V27.5c0-9.9,8.1-18,18-18h145.2c9.9,0,18,8.1,18,18V172.7z"/>
    <path fill="#4A555F" d="M163.2,96.5h-3.9v-3.9h3.9V96.5z M155.3,96.5h-3.9v-3.9h3.9V96.5z M147.4,96.5h-3.9v-3.9h3.9V96.5z M139.5,96.5h-3.9v-3.9h3.9V96.5z M131.7,96.5h-3.9v-3.9h3.9V96.5z M123.8,96.5h-3.9v-3.9h3.9V96.5z M115.9,96.5h-3.9v-3.9h3.9V96.5z M108,96.5h-3.9v-3.9h3.9V96.5z"/>
    <rect x="31.1" y="34.5" fill="#F58E6F" width="141.3" height="36.9"/>
  </svg>
);

// Undo Icon
export const UndoIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 1024 1024" width={size} height={size} className={className}>
    <path fill="currentColor" d="M609.28 396.8H193.536l201.728-199.168c17.92-17.92 17.92-43.008 0-60.928s-41.472-18.432-59.392-1.024L62.976 402.432c-17.92 17.92-17.92 41.472 0 59.392l273.408 267.264c17.92 17.92 41.472 17.92 59.392 0s17.92-40.96 0-58.88L193.536 474.112H609.28c166.4 0 311.296 129.536 311.296 289.792v41.472c0 23.552 14.848 41.472 38.912 41.472s38.912-17.92 38.912-41.472v-41.472c-0.512-207.36-175.616-367.104-389.12-367.104z"/>
  </svg>
);

// Redo Icon
export const RedoIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 1024 1024" width={size} height={size} className={className}>
    <path fill="currentColor" d="M438.272 396.8h415.744l-201.728-199.168c-17.92-17.92-17.92-43.008 0-60.928s41.472-18.432 59.392-1.024l272.896 266.752c17.92 17.92 17.92 41.472 0 59.392L711.68 729.088c-17.92 17.92-41.472 17.92-59.392 0s-17.92-40.96 0-58.88l201.728-195.584H438.272c-166.4 0-311.296 129.536-311.296 289.792v41.472c0 23.552-14.848 41.472-38.912 41.472s-38.912-17.92-38.912-41.472v-41.472c0.512-207.872 175.616-367.616 389.12-367.616z"/>
  </svg>
);

// Hand Icon
export const HandIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 1024 1024" width={size} height={size} className={className}>
    <path fill="currentColor" d="M845.312 214.016c-17.408 0-34.304 4.608-48.128 12.8v-61.44c0-53.248-43.52-96.768-96.768-96.768-19.968 0-38.4 6.144-53.76 16.384C633.344 47.616 597.504 20.48 555.008 20.48S477.184 47.616 463.872 84.992c-15.36-10.24-33.792-16.384-53.76-16.384-53.248 0-96.768 43.52-96.768 96.768V522.24L248.32 409.6c-12.8-23.04-33.28-39.424-57.856-46.08-24.064-6.656-49.152-3.072-70.656 9.728-44.032 26.112-60.416 86.016-37.376 132.608 1.536 3.072 32.256 66.048 128.512 258.56 45.568 90.624 95.232 155.648 147.968 192.512 41.472 29.184 70.144 30.72 75.264 30.72H675.84c40.96 0 79.36-13.312 113.664-39.936 32.256-24.576 60.416-60.928 82.944-106.496 45.056-90.112 69.12-215.04 69.12-361.472v-168.96c0.512-53.76-43.008-96.768-96.256-96.768z"/>
  </svg>
);

// Zoom In Icon
export const ZoomInIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);

// Zoom Out Icon
export const ZoomOutIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);

// Chevron Down Icon (for dropdowns)
export const ChevronDownIcon: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// Mouse/Select Icon
export const MouseIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M4 4l7.07 17 2.51-7.39L21 11.07 4 4z"/>
  </svg>
);

// Line Icon
export const LineIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="19" x2="19" y2="5"/>
  </svg>
);

// Arrow Icon
export const ArrowIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="19" x2="19" y2="5"/>
    <polyline points="12 5 19 5 19 12"/>
  </svg>
);

// Rectangle Icon
export const RectIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
  </svg>
);

// Circle Icon
export const CircleIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9"/>
  </svg>
);

// Ellipse Icon
export const EllipseIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="10" ry="6"/>
  </svg>
);

// Download Icon
export const DownloadIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

// Export all icons
export const ToolbarIcons = {
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
  ChevronDownIcon,
  MouseIcon,
  LineIcon,
  ArrowIcon,
  RectIcon,
  CircleIcon,
  EllipseIcon,
  DownloadIcon,
};

export default ToolbarIcons;
