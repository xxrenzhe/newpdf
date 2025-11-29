# NewPDF - PDF Tools Website

A modern PDF tool website built with Next.js 15 and React 18, integrating powerful PDF editing capabilities.

## Tech Stack

### Frontend
- **Framework**: Next.js 15.3 (App Router)
- **React**: 18.3
- **TypeScript**: 5.8
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React

### PDF Engine
- **Rendering**: pdfjs-dist 2.14.305
- **Editing**: pdf-lib 1.17.1
- **Font Processing**: opentype.js 1.3.4, @pdf-lib/fontkit
- **Color Picker**: @simonwep/pickr
- **Path Utilities**: d3-path
- **Selection**: rangy

## Project Structure

```
/newpdf
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── (marketing)/   # Marketing pages
│   │   ├── (tools)/       # PDF tool pages
│   │   └── api/           # API Routes
│   ├── components/
│   │   ├── layout/        # Header, Footer
│   │   ├── shared/        # FileUpload, ToolCard, etc.
│   │   ├── pdf-editor/    # PDFEditor React wrappers
│   │   └── ui/            # shadcn/ui components
│   ├── lib/
│   │   └── pdfeditor/     # PDF editing engine (vanilla JS)
│   └── styles/            # Global styles and PDF editor styles
├── public/
│   └── assets/            # Fonts, images, locale, pdfjs assets
├── server/
│   └── fonts/             # Font subsetting service
└── oldcode/               # Reference codebases (not deployed)
    ├── pdfeditor/         # Original PDF editor
    └── pdfguru-clone/     # Original frontend
```

## Development

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build
```bash
npm run build
npm run start
```

## Features

### Core PDF Editing
- ✅ Text editing with rich formatting
- ✅ Image insertion and manipulation
- ✅ Drawing and annotation tools
- ✅ Digital signatures
- ✅ Form filling
- ✅ Highlighting and markup
- ✅ Page management (rotate, delete, reorder)
- ✅ Undo/Redo support
- ✅ Multi-language support

### Additional Tools (66 total)
- PDF conversion (Word, Excel, PowerPoint, Images)
- PDF compression and optimization
- PDF merging and splitting
- Watermarking and security
- OCR and text extraction
- And more...

## Integration Architecture

### React Wrapper Pattern
The vanilla JavaScript PDF editor is preserved in `src/lib/pdfeditor/` and wrapped with React components for seamless integration:

```typescript
// Example usage
import { PDFEditorWrapper } from '@/components/pdf-editor';

export default function EditPDF() {
  return (
    <PDFEditorWrapper
      pdfUrl="/sample.pdf"
      tools={['text', 'image', 'highlight']}
      onSave={(blob) => {
        // Handle save
      }}
    />
  );
}
```

### API Routes
Font subsetting and PDF operations are handled through Next.js API Routes:

- `/api/fonts` - Font subsetting service
- `/api/pdf/*` - PDF manipulation endpoints

## License

Copyright © 2025 NewPDF. All rights reserved.

## Credits

Built on top of:
- Original PDFEditor engine
- Next.js and React
- pdf-lib and pdfjs-dist
- shadcn/ui component library
