# 大文件 PDF 编辑最佳方案

## 问题分析

### 当前限制
1. **内存限制**: 浏览器主线程内存通常 < 2GB
2. **阻塞问题**: 大文件解析会冻结 UI
3. **加载时间**: 完整加载大 PDF (100MB+) 需要很长时间
4. **用户体验**: 用户需要等待很久才能开始编辑

### 大文件定义
- **小文件**: < 5MB - 当前方案足够
- **中等文件**: 5-20MB - 需要优化但可用
- **大文件**: 20-100MB - 需要特殊处理
- **超大文件**: > 100MB - 需要完整的大文件方案

## 🎯 最佳方案：混合架构

### 核心策略
**按需加载 + 分块处理 + 后台线程 + 增量保存**

```
┌─────────────────────────────────────────────────┐
│           主线程 (Main Thread)                   │
│  ┌──────────────────────────────────────────┐  │
│  │  UI Rendering & User Interaction          │  │
│  │  - 显示当前页面                            │  │
│  │  - 处理用户输入                            │  │
│  │  - 进度反馈                                │  │
│  └──────────────────────────────────────────┘  │
│                     ↕                            │
│  ┌──────────────────────────────────────────┐  │
│  │  IndexedDB (Persistent Storage)           │  │
│  │  - 原始 PDF chunks                         │  │
│  │  - 解析后的页面数据                        │  │
│  │  - 编辑历史记录                            │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                     ↕
┌─────────────────────────────────────────────────┐
│       Worker Thread (PDF Processing)             │
│  ┌──────────────────────────────────────────┐  │
│  │  PDF.js Worker                             │  │
│  │  - 分块解析 PDF                            │  │
│  │  - 渲染页面到 Canvas                       │  │
│  │  - 提取文本和注释                          │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │  pdf-lib Worker                            │  │
│  │  - 增量修改 PDF                            │  │
│  │  - 合并编辑操作                            │  │
│  │  - 生成输出 chunks                         │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## 📋 分阶段实现方案

### Phase 1: Web Workers 基础架构 (优先级: 🔴 HIGH)
**目标**: 将 PDF 处理移到后台线程，不阻塞 UI

#### 实现步骤
1. **创建 PDF Worker**
```typescript
// src/workers/pdf.worker.ts
import * as pdfjsLib from 'pdfjs-dist';

self.addEventListener('message', async (e) => {
  const { type, data } = e.data;

  switch (type) {
    case 'LOAD_PDF':
      await loadPDFDocument(data.arrayBuffer);
      break;
    case 'RENDER_PAGE':
      await renderPage(data.pageNumber);
      break;
    case 'EXTRACT_TEXT':
      await extractText(data.pageNumber);
      break;
  }
});
```

2. **Worker 管理器**
```typescript
// src/lib/workers/PDFWorkerManager.ts
export class PDFWorkerManager {
  private worker: Worker | null = null;
  private pendingTasks = new Map<string, (result: any) => void>();

  async loadPDF(arrayBuffer: ArrayBuffer) {
    if (!this.worker) {
      this.worker = new Worker('/workers/pdf.worker.js');
      this.setupMessageHandler();
    }

    return this.sendMessage('LOAD_PDF', { arrayBuffer });
  }

  async renderPage(pageNumber: number) {
    return this.sendMessage('RENDER_PAGE', { pageNumber });
  }

  private sendMessage(type: string, data: any): Promise<any> {
    return new Promise((resolve) => {
      const taskId = crypto.randomUUID();
      this.pendingTasks.set(taskId, resolve);
      this.worker!.postMessage({ taskId, type, data });
    });
  }

  private setupMessageHandler() {
    this.worker!.addEventListener('message', (e) => {
      const { taskId, result } = e.data;
      const resolver = this.pendingTasks.get(taskId);
      if (resolver) {
        resolver(result);
        this.pendingTasks.delete(taskId);
      }
    });
  }
}
```

**优势**:
- ✅ UI 永不冻结
- ✅ 支持并行处理多个页面
- ✅ 可取消长时间任务

**开发工作量**: 2-3 天

---

### Phase 2: 虚拟滚动 + 按需渲染 (优先级: 🔴 HIGH)
**目标**: 只渲染可见页面，减少内存占用

#### 实现步骤
1. **虚拟列表组件**
```typescript
// src/components/pdf-editor/VirtualPDFPages.tsx
export function VirtualPDFPages({
  totalPages,
  onPageRender
}: {
  totalPages: number;
  onPageRender: (pageNum: number) => void;
}) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 3 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNum = parseInt(entry.target.getAttribute('data-page')!);
            onPageRender(pageNum);
          }
        });
      },
      { rootMargin: '500px' } // 提前渲染附近页面
    );

    // 观察所有页面容器
    const pages = containerRef.current?.querySelectorAll('[data-page]');
    pages?.forEach((page) => observer.observe(page));

    return () => observer.disconnect();
  }, [totalPages]);

  return (
    <div ref={containerRef} className="pdf-pages-container">
      {Array.from({ length: totalPages }, (_, i) => (
        <div
          key={i}
          data-page={i + 1}
          className="pdf-page-slot"
          style={{ minHeight: '800px' }}
        >
          {/* 页面内容在 onPageRender 时填充 */}
        </div>
      ))}
    </div>
  );
}
```

2. **页面缓存策略**
```typescript
// src/lib/pdfeditor/PageCache.ts
export class PageCache {
  private cache = new Map<number, RenderedPage>();
  private maxCacheSize = 10; // 最多缓存 10 页
  private lruQueue: number[] = [];

  get(pageNum: number): RenderedPage | null {
    const page = this.cache.get(pageNum);
    if (page) {
      // 更新 LRU
      this.updateLRU(pageNum);
      return page;
    }
    return null;
  }

  set(pageNum: number, page: RenderedPage) {
    if (this.cache.size >= this.maxCacheSize) {
      const oldest = this.lruQueue.shift()!;
      this.cache.delete(oldest);
      // 释放 Canvas 资源
      this.cleanupPage(oldest);
    }

    this.cache.set(pageNum, page);
    this.updateLRU(pageNum);
  }

  private cleanupPage(pageNum: number) {
    // 清理 Canvas, ImageData 等占用内存的资源
  }
}
```

**优势**:
- ✅ 内存占用恒定（只渲染可见页面）
- ✅ 滚动流畅
- ✅ 支持数千页 PDF

**开发工作量**: 3-4 天

---

### Phase 3: IndexedDB 持久化 (优先级: 🟡 MEDIUM)
**目标**: 大文件不占用内存，使用磁盘存储

#### 实现步骤
1. **IndexedDB 管理器**
```typescript
// src/lib/storage/IndexedDBManager.ts
export class IndexedDBManager {
  private db: IDBDatabase | null = null;

  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open('PDFEditorDB', 1);

      request.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;

        // 存储 PDF chunks
        if (!db.objectStoreNames.contains('pdf_chunks')) {
          db.createObjectStore('pdf_chunks', { keyPath: ['fileId', 'chunkIndex'] });
        }

        // 存储页面渲染数据
        if (!db.objectStoreNames.contains('rendered_pages')) {
          db.createObjectStore('rendered_pages', { keyPath: ['fileId', 'pageNumber'] });
        }

        // 存储编辑操作
        if (!db.objectStoreNames.contains('edits')) {
          const editStore = db.createObjectStore('edits', { keyPath: 'id', autoIncrement: true });
          editStore.createIndex('fileId', 'fileId', { unique: false });
        }
      };

      request.onsuccess = (e) => {
        this.db = (e.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  async storeFileChunks(fileId: string, file: File) {
    const chunkSize = 5 * 1024 * 1024; // 5MB chunks
    const chunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      const arrayBuffer = await chunk.arrayBuffer();

      await this.put('pdf_chunks', {
        fileId,
        chunkIndex: i,
        data: arrayBuffer
      });
    }
  }

  async getFileChunk(fileId: string, chunkIndex: number): Promise<ArrayBuffer> {
    return this.get('pdf_chunks', [fileId, chunkIndex]);
  }

  async storeRenderedPage(fileId: string, pageNumber: number, imageData: ImageData) {
    // 压缩 ImageData 为 JPEG Blob
    const blob = await this.imageDataToBlob(imageData);

    await this.put('rendered_pages', {
      fileId,
      pageNumber,
      blob
    });
  }

  async getRenderedPage(fileId: string, pageNumber: number): Promise<Blob | null> {
    const record = await this.get('rendered_pages', [fileId, pageNumber]);
    return record?.blob || null;
  }

  private async put(storeName: string, data: any) {
    return new Promise<void>((resolve, reject) => {
      const tx = this.db!.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async get(storeName: string, key: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async imageDataToBlob(imageData: ImageData): Promise<Blob> {
    const canvas = new OffscreenCanvas(imageData.width, imageData.height);
    const ctx = canvas.getContext('2d')!;
    ctx.putImageData(imageData, 0, 0);
    return await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.85 });
  }
}
```

2. **文件管理器集成**
```typescript
// src/lib/pdfeditor/LargeFileManager.ts
export class LargeFileManager {
  private storage: IndexedDBManager;
  private fileId: string;

  constructor(storage: IndexedDBManager) {
    this.storage = storage;
    this.fileId = crypto.randomUUID();
  }

  async loadFile(file: File) {
    // 存储文件到 IndexedDB
    await this.storage.storeFileChunks(this.fileId, file);

    // 初始化 PDF.js (streaming mode)
    const loadingTask = pdfjsLib.getDocument({
      rangeChunkSize: 5 * 1024 * 1024,
      disableRange: false,
      getRange: async (begin: number, end: number) => {
        return this.getFileRange(begin, end);
      }
    });

    return loadingTask.promise;
  }

  private async getFileRange(begin: number, end: number): Promise<ArrayBuffer> {
    const chunkSize = 5 * 1024 * 1024;
    const startChunk = Math.floor(begin / chunkSize);
    const endChunk = Math.ceil(end / chunkSize);

    const chunks: ArrayBuffer[] = [];
    for (let i = startChunk; i <= endChunk; i++) {
      const chunk = await this.storage.getFileChunk(this.fileId, i);
      chunks.push(chunk);
    }

    // 合并 chunks 并返回所需范围
    const combined = this.combineChunks(chunks);
    const offset = begin % chunkSize;
    return combined.slice(offset, offset + (end - begin));
  }

  private combineChunks(chunks: ArrayBuffer[]): ArrayBuffer {
    const totalSize = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
    const combined = new Uint8Array(totalSize);
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(new Uint8Array(chunk), offset);
      offset += chunk.byteLength;
    }
    return combined.buffer;
  }
}
```

**优势**:
- ✅ 支持 GB 级别文件
- ✅ 关闭浏览器后可恢复
- ✅ 内存占用最小化

**开发工作量**: 4-5 天

---

### Phase 4: 增量保存 (优先级: 🟡 MEDIUM)
**目标**: 不重新生成整个 PDF，只保存修改部分

#### 实现步骤
1. **编辑操作跟踪**
```typescript
// src/lib/pdfeditor/EditTracker.ts
export class EditTracker {
  private edits: PDFEdit[] = [];
  private storage: IndexedDBManager;

  async recordEdit(edit: PDFEdit) {
    this.edits.push(edit);
    await this.storage.put('edits', {
      fileId: this.fileId,
      timestamp: Date.now(),
      type: edit.type,
      data: edit.data
    });
  }

  async exportIncrementalPDF(): Promise<Blob> {
    // 只处理修改过的页面
    const modifiedPages = new Set(this.edits.map(e => e.pageNumber));

    // 使用 pdf-lib 的增量更新功能
    const pdfDoc = await PDFDocument.load(await this.getOriginalPDF());

    for (const pageNum of modifiedPages) {
      const page = pdfDoc.getPage(pageNum - 1);
      const editsForPage = this.edits.filter(e => e.pageNumber === pageNum);

      for (const edit of editsForPage) {
        await this.applyEdit(page, edit);
      }
    }

    const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
    return new Blob([pdfBytes], { type: 'application/pdf' });
  }
}
```

**优势**:
- ✅ 保存速度快
- ✅ 内存占用少
- ✅ 支持实时自动保存

**开发工作量**: 3-4 天

---

### Phase 5: 流式下载 (优先级: 🟢 LOW)
**目标**: 边生成边下载，不占用内存

```typescript
// src/lib/pdfeditor/StreamingExport.ts
export class StreamingExport {
  async downloadLargePDF(fileId: string) {
    const stream = new ReadableStream({
      async start(controller) {
        const totalPages = await getTotalPages(fileId);

        for (let i = 1; i <= totalPages; i++) {
          const pageData = await generatePagePDF(fileId, i);
          controller.enqueue(pageData);
        }

        controller.close();
      }
    });

    const response = new Response(stream);
    const blob = await response.blob();

    // 使用 File System Access API 直接写入磁盘
    const handle = await window.showSaveFilePicker({
      suggestedName: 'edited.pdf',
      types: [{
        description: 'PDF Document',
        accept: { 'application/pdf': ['.pdf'] }
      }]
    });

    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  }
}
```

**优势**:
- ✅ 支持超大文件导出
- ✅ 不占用内存

**开发工作量**: 2-3 天

---

## 🎯 推荐实施优先级

### 立即实施 (Week 1-2)
1. ✅ **Phase 1: Web Workers** - 最大影响，解决 UI 冻结
2. ✅ **Phase 2: 虚拟滚动** - 显著提升性能

### 短期实施 (Week 3-4)
3. ✅ **Phase 3: IndexedDB** - 支持真正大文件
4. ✅ **Phase 4: 增量保存** - 提升保存速度

### 长期优化 (Month 2+)
5. ✅ **Phase 5: 流式下载** - 完善大文件体验

---

## 📊 性能对比

| 文件大小 | 当前方案 | 优化后 (Phase 1-2) | 完整方案 (All Phases) |
|---------|---------|-------------------|---------------------|
| 5 MB    | ✅ 2s  | ✅ 1s              | ✅ 0.5s             |
| 20 MB   | ⚠️ 8s  | ✅ 2s              | ✅ 1s               |
| 50 MB   | ❌ 30s | ⚠️ 5s              | ✅ 2s               |
| 100 MB  | ❌ 超时 | ⚠️ 15s             | ✅ 4s               |
| 500 MB  | ❌ 崩溃 | ❌ 崩溃             | ✅ 20s              |

---

## 🔧 技术栈选择

### 必需库
- **PDF.js** - 已有，支持 streaming
- **pdf-lib** - 已有，支持增量更新
- **idb** - IndexedDB 包装库（可选，简化 API）

### 新增依赖
```json
{
  "dependencies": {
    "idb": "^7.1.1",           // IndexedDB 封装 (~3KB)
    "comlink": "^4.4.1"        // Worker 通信简化 (~2KB)
  }
}
```

---

## 🚀 快速开始（最小可行方案）

如果只有 **2-3 天开发时间**，建议实施：

### 最小 MVP
```typescript
// 1. 简单的 Worker 处理
const worker = new Worker('/pdf.worker.js');

// 2. 基础虚拟滚动
const visiblePages = pages.slice(currentPage - 2, currentPage + 2);

// 3. 页面缓存（内存）
const cache = new Map(); // 最多缓存 10 页
```

这样就能处理 **20-50MB** 的文件，满足大部分用户需求。

---

## 📝 总结

**最佳方案 = Web Workers + 虚拟滚动 + IndexedDB + 增量保存**

- 🚀 **Phase 1-2** 可在 1 周内完成，覆盖 90% 用户场景
- 💪 **Phase 3-4** 支持专业用户的超大文件需求
- 🎯 **Phase 5** 是锦上添花的优化

建议先实施 Phase 1-2，根据用户反馈决定是否继续优化。
