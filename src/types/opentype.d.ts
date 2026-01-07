// Type definitions for opentype.js
declare module 'opentype.js' {
  export interface Glyph {
    unicode?: number;
    unicodes?: number[];
  }

  export class Font {
    unitsPerEm: number;
    ascender: number;
    descender: number;
    glyphs: {
      glyphs: Glyph[];
      get(index: number): Glyph;
    };
    charToGlyph(char: string): Glyph;
    stringToGlyphs(text: string): Glyph[];
    getEnglishName(name: string): string | undefined;

    constructor(options: {
      familyName: string;
      styleName: string;
      unitsPerEm: number;
      ascender: number;
      descender: number;
      glyphs: Glyph[];
    });
    toArrayBuffer(): ArrayBuffer;
  }

  export function parse(buffer: ArrayBuffer): Font;

  const opentype: {
    parse: typeof parse;
    Font: typeof Font;
  };

  export default opentype;
}
