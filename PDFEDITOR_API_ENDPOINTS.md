# PDF Editor API Endpoints - Quick Reference

## Summary

The oldcode/pdfeditor contains **ONE backend API endpoint**:

---

## API Endpoint Details

### Font Loading Service

**Endpoint:** `https://genfont.qwerpdf.com/`

**HTTP Method:** POST

**Content-Type:** `application/x-www-form-urlencoded`

**Request Parameters:**
```
text: string (comma-separated Unicode code points)
fontFile: string (font filename)
```

**Parameter Format:**
- **text**: Unicode code points in format "U+XXXX,U+YYYY,..."
  - Example: "U+41,U+42,U+43" (for characters A, B, C)
  - Auto-converts to "U+" prefix format from text
  - Special handling for CJK (Chinese/Japanese/Korean) text

- **fontFile**: Font filename
  - Examples: "Arial.ttf", "Helvetica.ttf", "Times.ttf", "unicode.ttf"
  - Auto-switches to "unicode.ttf" for CJK text

**Response:**
- Type: Binary ArrayBuffer
- Format: TTF/OTF font subset
- HTTP 200: Success
- HTTP 500 or network error: Failure

**Source File:**
```
/Users/jason/Documents/Kiro/newpdf/oldcode/pdfeditor/src/font.js
Lines: 74-109 (fetchFont method)
```

**Implementation Code:**
```javascript
static async fetchFont(pageId, text, fontFile) {
    if (!trimSpace(text)) return null;
    
    // Auto-switch to unicode.ttf for CJK text
    let isIncludeCJK = new RegExp('[\u4E00-\u9FFF]');
    if (isIncludeCJK.test(text)) {
        fontFile = UNICODE_FONT;  // 'unicode.ttf'
    }

    const url = this.fontUrl;  // https://genfont.qwerpdf.com/
    const postData = new URLSearchParams({
        text: this.text2point(text),      // "U+41,U+42,U+43" format
        fontFile: fontFile
    });
    
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postData
    }).catch(e => {
        return { status: 500 }
    });
    
    if (res.status != 200 || !res.ok) {
        return false;
    }

    const buffer = await res.arrayBuffer();
    Font.setCache(pageId, fontFile, buffer);
    return buffer;
}
```

**Helper Method - Text to Unicode Points:**
```javascript
static text2point(text) {
    // Remove duplicates and sort
    text = text.split('').filter((value, index, self) => {
        return self.indexOf(value) === index;
    }).sort().join('');
    
    // Convert to U+XXXX format
    return text.split('').map(c => 'U+'+c.charCodeAt(0).toString(16)).join(',');
}
```

**Usage Context:**
- Called automatically during PDF page rendering when text is encountered
- Caches results in memory (cache[pageId][fontFile])
- Graceful fallback if service is unavailable

**Configuration:**
```javascript
// src/entry/index.js, line 52
Font.fontUrl = 'https://genfont.qwerpdf.com/';
```

---

## Other Communication Methods

### 1. Window Message API (IPC)
**File:** `src/entry/index.js` (lines 211-218)

**Message Types:**
```javascript
// Load PDF from blob
window.postMessage({
    type: 'load-pdf',
    blob: pdfBlob
}, '*');

// Trigger download
window.postMessage({
    type: 'download'
}, '*');
```

### 2. Static Assets (Not API Endpoints)
- Locale files: `/src/assets/locale/*.json`
- Icons/Images: `/src/assets/images/*`, `/src/assets/img/*`
- PDF.js library: `/src/assets/js/pdfjs/*`
- Font maps: `/src/assets/js/pdfjs/cmaps/*`

---

## Key Observations

1. **Single External Dependency:** Only one backend service call
2. **No Authentication:** Font API is public/unauthenticated
3. **Client-Side Caching:** Avoids repeated requests for same fonts
4. **Graceful Degradation:** Falls back if service unavailable
5. **CJK Optimization:** Auto-uses unicode.ttf for non-ASCII text
6. **No CRUD Operations:** No file storage or database operations

---

## Migration Considerations

If implementing in current Next.js project:

1. **Option 1: Keep External Service**
   - Continue using genfont.qwerpdf.com
   - Simplest migration path

2. **Option 2: Move to Backend**
   - Implement font subsetting on server
   - Reduce client-side work
   - Better control and caching

3. **Option 3: Use Browser APIs**
   - CSS Font Loader API
   - Less control but modern approach
   - Requires font files as assets

---

## File Locations

**Primary API File:**
- `/Users/jason/Documents/Kiro/newpdf/oldcode/pdfeditor/src/font.js`

**Integration Point:**
- `/Users/jason/Documents/Kiro/newpdf/oldcode/pdfeditor/src/entry/index.js`

**Configuration:**
- Line 52 of entry/index.js: `Font.fontUrl = 'https://genfont.qwerpdf.com/';`

---

## No Other Backend Endpoints

This PDF editor library is **completely client-side** and requires NO backend service other than the font loading endpoint. All PDF editing, rendering, and manipulation happens in the browser using:
- PDF.js for viewing
- PDF-lib for editing and generation
- JavaScript for tool implementations

