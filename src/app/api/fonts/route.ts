import { NextRequest, NextResponse } from 'next/server';
import opentype from 'opentype.js';
import { readFile } from 'fs/promises';
import path from 'path';

const CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 's', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'S', 'Y', 'Z', ' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '~', '!', '@', '#', '$', '%', '^', '&', '(', ')', '_', '+', '-', '=', '{', '}', '|', '[', ']', ';', "'", ':', '"', ',', '.', '/', '<', '>', '?', '*'];
const CJK_RANGE = /[\u4E00-\u9FFF]/;
const UNICODE_FONT = 'unicode.ttf';

// Text to Unicode code points
function text2point(text: string): string {
  let points: number[] = [];
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    if (!points.includes(code)) {
      points.push(code);
    }
  }
  return points.join(',');
}

// Unicode code points to text
function point2text(points: string): string {
  return points.split(',').map(p => String.fromCharCode(parseInt(p))).join('');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const textPoints = formData.get('text') as string;
    let fontFile = formData.get('fontFile') as string;

    if (!textPoints) {
      return NextResponse.json(
        { error: 'Missing text parameter' },
        { status: 400 }
      );
    }

    const text = point2text(textPoints);

    // Check if text contains CJK characters
    if (CJK_RANGE.test(text)) {
      fontFile = UNICODE_FONT;
    }

    // Load font file from public/assets/fonts
    const fontPath = path.join(process.cwd(), 'public', 'assets', 'fonts', fontFile);
    const fallbackPath = path.join(process.cwd(), 'public', 'assets', 'temp.otf');

    const [fontBuffer, fallbackBuffer] = await Promise.all([
      readFile(fontPath),
      readFile(fallbackPath),
    ]);

    // Parse fonts using opentype.js
    const font = opentype.parse(fontBuffer.buffer);
    const fallbackFont = opentype.parse(fallbackBuffer.buffer);

    // Create subset font with requested characters
    const notdefGlyph = fallbackFont.glyphs.get(0);
    const subGlyphs = [notdefGlyph];

    // Add glyphs for the requested text
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const glyph = font.charToGlyph(char);
      if (glyph && glyph.unicode) {
        subGlyphs.push(glyph);
      }
    }

    // Add basic ASCII characters from fallback font if not in main font
    let missingChars = '';
    CHARS.forEach(char => {
      const glyph = font.charToGlyph(char);
      if (!glyph || !glyph.unicode) {
        missingChars += char;
      }
    });

    if (missingChars) {
      subGlyphs.push(...fallbackFont.stringToGlyphs(missingChars));
    }

    // Create subset font
    const familyName = font.getEnglishName('postScriptName') || 'CustomFont';
    const subsetFont = new opentype.Font({
      familyName: familyName,
      styleName: 'normal',
      unitsPerEm: font.unitsPerEm,
      ascender: font.ascender,
      descender: font.descender,
      glyphs: subGlyphs,
    });

    // Convert to ArrayBuffer
    const buffer = subsetFont.toArrayBuffer();

    // Return font file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'font/ttf',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Font subsetting error:', error);
    return NextResponse.json(
      { error: 'Failed to process font' },
      { status: 500 }
    );
  }
}
