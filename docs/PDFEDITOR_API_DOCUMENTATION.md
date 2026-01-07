# PDF Editor 后端 API 接口文档

> 版本: 1.0
> 最后更新: 2024-12-11
> 项目路径: `/oldcode/pdfeditor`

## 目录

1. [项目概述](#项目概述)
2. [架构分析](#架构分析)
3. [后端 API 接口](#后端-api-接口)
4. [前端与后端交互](#前端与后端交互)
5. [核心模块分析](#核心模块分析)
6. [工具栏功能清单](#工具栏功能清单)
7. [事件系统](#事件系统)
8. [数据流分析](#数据流分析)

---

## 项目概述

### 项目类型
这是一个**纯前端 PDF 编辑器库**，基于 JavaScript 构建，主要在客户端浏览器中运行。项目使用 Webpack 5 作为构建工具。

### 技术栈
- **核心框架**: 原生 JavaScript (ES6+)
- **PDF 处理**: PDF.js (pdf.min.js, pdf.worker.min.js)
- **PDF 生成**: pdf-lib
- **字体处理**: opentype.js, @pdf-lib/fontkit
- **构建工具**: Webpack 5
- **UI 组件**: @simonwep/pickr (颜色选择器)
- **文件保存**: file-saver

### 目录结构
```
oldcode/pdfeditor/
├── src/
│   ├── api.js                    # API 类 (空壳，预留扩展)
│   ├── font.js                   # 字体管理 (唯一外部 API 调用)
│   ├── event.js                  # 事件系统
│   ├── locale.js                 # 国际化
│   ├── misc.js                   # 工具函数
│   ├── defines.js                # 常量定义
│   ├── index.js                  # 主入口
│   ├── entry/
│   │   └── index.js              # 应用入口
│   ├── reader/
│   │   ├── index.js              # PDF 阅读器
│   │   ├── document.js           # PDF 文档管理
│   │   └── page.js               # 页面渲染
│   ├── editor/
│   │   ├── index.js              # PDF 编辑器
│   │   ├── document.js           # 编辑文档管理
│   │   ├── page.js               # 编辑页面
│   │   ├── elements.js           # 元素管理
│   │   ├── history.js            # 操作历史
│   │   ├── font_worker.js        # 字体 Web Worker
│   │   ├── toolbar/              # 工具栏
│   │   │   ├── index.js
│   │   │   ├── ToolbarItemBase.js
│   │   │   ├── text/             # 文本工具
│   │   │   ├── image/            # 图片工具
│   │   │   ├── line/             # 线条工具
│   │   │   ├── arrow/            # 箭头工具
│   │   │   ├── rect/             # 矩形工具
│   │   │   ├── circle/           # 圆形工具
│   │   │   ├── ellipse/          # 椭圆工具
│   │   │   ├── highlight/        # 高亮工具
│   │   │   ├── watermark/        # 水印工具
│   │   │   ├── signature/        # 签名工具
│   │   │   ├── stamp/            # 印章工具
│   │   │   ├── forms/            # 表单工具
│   │   │   └── ...               # 其他工具
│   │   └── element/              # 元素类型
│   │       ├── BaseElement.js
│   │       ├── TextElement.js
│   │       ├── ImageElement.js
│   │       └── ...
│   ├── components/
│   │   ├── dialog/               # 对话框组件
│   │   ├── loading/              # 加载组件
│   │   ├── DragElement/          # 拖拽组件
│   │   └── draw/                 # 绘制组件
│   ├── css/                      # 样式文件
│   └── assets/                   # 静态资源
├── font_list.js                  # 字体列表配置
├── webpack.build.js              # Webpack 配置
└── package.json
```

---

## 架构分析

### 整体架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (Client Side)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐ │
│  │  PDFReader  │───▶│  PDFEditor  │───▶│     Toolbar         │ │
│  │  (阅读器)    │    │  (编辑器)    │    │  (27 种工具)        │ │
│  └─────────────┘    └─────────────┘    └─────────────────────┘ │
│         │                  │                     │               │
│         ▼                  ▼                     ▼               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐ │
│  │ PDFDocument │    │  Elements   │    │    Event System     │ │
│  │ (PDF.js)    │    │  (元素管理)  │    │    (事件总线)       │ │
│  └─────────────┘    └─────────────┘    └─────────────────────┘ │
│         │                  │                                     │
│         ▼                  ▼                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                     pdf-lib (PDF 生成/保存)                  ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP POST (仅字体 API)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    External Font Server                          │
│                 https://genfont.qwerpdf.com/                    │
└─────────────────────────────────────────────────────────────────┘
```

### 数据流

```
1. PDF 加载流程:
   用户选择文件 → PDFReader.load() → PDF.js 解析 → 渲染到 Canvas/HTML

2. 编辑流程:
   用户操作工具 → Toolbar 事件 → Element 创建 → 渲染到页面 → 记录历史

3. 保存流程:
   用户点击下载 → flushData() → 字体子集化 → pdf-lib 合成 → Blob 下载
```

---

## 后端 API 接口

### 唯一的外部 API: 字体子集服务

这是整个 PDF 编辑器中**唯一调用外部后端的 API**。

#### 1. 字体子集加载 API

| 属性 | 值 |
|------|-----|
| **端点** | `https://genfont.qwerpdf.com/` |
| **方法** | `POST` |
| **Content-Type** | `application/x-www-form-urlencoded` |
| **源文件** | `/oldcode/pdfeditor/src/font.js:74-109` |

##### 请求参数

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `text` | string | 是 | Unicode 码点列表，格式: `U+0041,U+0042,...` |
| `fontFile` | string | 是 | 字体文件名，如 `Helvetica.ttf`, `unicode.ttf` |

##### 请求示例
```javascript
// 源码: /oldcode/pdfeditor/src/font.js:86-109
const postData = new URLSearchParams({
    text: 'U+48,U+65,U+6c,U+6f',  // "Hello" 的 Unicode 码点
    fontFile: 'Helvetica.ttf'
});

fetch('https://genfont.qwerpdf.com/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: postData
});
```

##### 响应

| 属性 | 值 |
|------|-----|
| **Content-Type** | `application/octet-stream` (二进制字体数据) |
| **状态码** | `200` 成功 / `500` 失败 |
| **响应体** | `ArrayBuffer` (字体文件二进制数据) |

##### 响应处理
```javascript
// 源码: /oldcode/pdfeditor/src/font.js:102-108
if (res.status != 200 || !res.ok) {
    return false;
}
const buffer = await res.arrayBuffer();
Font.setCache(pageId, fontFile, buffer);
return buffer;
```

##### 特殊处理: CJK 字符

当检测到文本包含中日韩字符时，自动切换到 `unicode.ttf` 字体：

```javascript
// 源码: /oldcode/pdfeditor/src/font.js:80-84
const CJK_RANGE = '[\u4E00-\u9FFF]';  // 中日韩统一表意文字范围
let isIncludeCJK = new RegExp(CJK_RANGE);
if (isIncludeCJK.test(text)) {
    fontFile = 'unicode.ttf';  // 强制使用 Unicode 字体
}
```

##### Unicode 码点转换

文本转换为 Unicode 码点的算法：

```javascript
// 源码: /oldcode/pdfeditor/src/font.js:116-122
static text2point(text) {
    // 去重并排序
    text = text.split('').filter((value, index, self) => {
        return self.indexOf(value) === index;
    }).sort().join('');
    // 转换为 U+XXXX 格式
    return text.split('').map(c => 'U+' + c.charCodeAt(0).toString(16)).join(',');
}
```

#### 2. 回退字体加载 (静态资源)

| 属性 | 值 |
|------|-----|
| **端点** | `{ASSETS_URL}temp.otf` |
| **方法** | `GET` |
| **用途** | 加载回退字体，用于补充缺失字符 |
| **源文件** | `/oldcode/pdfeditor/src/font.js:17-23` |

```javascript
// 源码: /oldcode/pdfeditor/src/font.js:17-23
static async fetchFallbackFont() {
    if (Font.#fallbackFont) {
        return Font.#fallbackFont;
    }
    let url = ASSETS_URL + 'temp.otf';
    return fetch(url).then(res => res.arrayBuffer());
}
```

---

## 前端与后端交互

### 完整的字体处理流程

```
┌────────────────────────────────────────────────────────────────┐
│                      字体处理流程                               │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 用户输入文本                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Font.fetchFont(pageId, text, fontFile)                  │   │
│  │  - 检查缓存                                              │   │
│  │  - 检测 CJK 字符                                         │   │
│  │  - 转换文本为 Unicode 码点                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  POST https://genfont.qwerpdf.com/                       │   │
│  │  body: { text: "U+48,U+65,...", fontFile: "xxx.ttf" }   │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  接收 ArrayBuffer (字体子集数据)                          │   │
│  │  - 缓存到 Font.#cache                                   │   │
│  │  - 返回 buffer 用于渲染                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Font.subset(arrayBuffer, objId, fallbackBuffer)         │   │
│  │  - 使用 opentype.js 解析字体                            │   │
│  │  - 创建字体子集                                          │   │
│  │  - 添加到 document.fonts                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### 本地静态资源请求

除了字体 API，还有以下本地资源请求:

| 资源类型 | 路径模式 | 用途 |
|---------|---------|------|
| PDF Worker | `{baseUrl}pdf.worker.min.js` | PDF.js 工作线程 |
| CMap 字符映射 | `{baseUrl}cmaps/*.bcmap` | PDF 字符编码映射 |
| 标准字体 | `{baseUrl}standard_fonts/*` | PDF 标准字体 |
| 预设印章图片 | `/assets/img/approved.png` 等 | 印章预设图片 |
| 回退字体 | `{ASSETS_URL}temp.otf` | 缺失字符回退 |

---

## 核心模块分析

### Font 类 (src/font.js)

字体管理类，负责字体加载、缓存和子集化。

```javascript
export class Font {
    static #cache = {};           // 字体缓存
    static fontUrl = '';          // 字体 API 地址
    static fontkit = null;        // fontkit 实例
    static CHARS = CHARS;         // 常用字符集
    static UNICODE_FONT = 'unicode.ttf';  // CJK 字体
    static CJK_RANGE = '[\u4E00-\u9FFF]'; // CJK 检测范围

    // 主要方法
    static async fetchFallbackFont()           // 获取回退字体
    static async subset(arrayBuffer, objId, fallbackBuffer)  // 字体子集化
    static async fetchFont(pageId, text, fontFile)  // 获取远程字体
    static text2point(text)                    // 文本转 Unicode 码点
    static getCacheAll()                       // 获取所有缓存
    static clear()                             // 清除缓存
    static setCache(pageId, fontFile, buffer)  // 设置缓存
    static getCache(pageId, fontFile)          // 获取缓存
}
```

### PDFReader 类 (src/reader/index.js)

PDF 阅读器，负责 PDF 文件加载和渲染。

```javascript
export class PDFReader {
    options = {
        url: null,              // PDF 文件 URL
        thumbs: null,           // 缩略图容器
        main: null,             // 主视图容器
        renderType: 'canvas',   // 渲染类型: 'canvas' | 'html'
        scale: null,            // 缩放比例
        viewMode: VIEW_MODE.AUTO_ZOOM,  // 视图模式
        cMapUrl: null,          // CMap URL
        standardFontDataUrl: null,      // 标准字体 URL
        usePageBase: true,      // 使用基础页面
        wheel: true,            // 启用滚轮缩放
        expandThumbs: true      // 展开缩略图
    };

    // 主要方法
    async init()                // 初始化阅读器
    async load(url)             // 加载 PDF 文件
    async getData()             // 获取 PDF 数据
    setViewMode(mode)           // 设置视图模式
    zoom(scale, renderType, force)  // 缩放
    to(pageNum)                 // 跳转到指定页
    prev()                      // 上一页
    next()                      // 下一页
    open()                      // 打开文件选择器
}
```

### PDFEditor 类 (src/editor/index.js)

PDF 编辑器，负责编辑功能和工具栏管理。

```javascript
export class PDFEditor {
    options = {
        tools: [...],           // 启用的工具列表
        toolbar: null,          // 工具栏容器
        producer: null,         // PDF producer 元数据
        creator: null,          // PDF creator 元数据
        debug: false,           // 调试模式
        history: false          // 启用历史记录
    };

    reader = null;              // PDFReader 实例
    toolbar = null;             // Toolbar 实例
    pdfDocument = null;         // PDFDocument 实例
    history = null;             // History 实例
    fontWorker = new Worker(...);  // 字体 Web Worker

    // 主要方法
    async init()                // 初始化编辑器
    async initToolbar()         // 初始化工具栏
    async load(pdfData)         // 加载 PDF 数据
    async setDocumentProxy(pdfData)  // 设置 PDF-Lib 文档代理
    async flushData()           // 刷新数据到 PDF
    async reset()               // 重置编辑器
    async download(fileName)    // 下载编辑后的 PDF
}
```

---

## 工具栏功能清单

### 完整工具列表 (27 种)

| 序号 | 工具名 | 目录路径 | 功能描述 |
|------|--------|----------|----------|
| 1 | mouse | toolbar/mouse/ | 选择工具，用于选择和移动元素 |
| 2 | hand | toolbar/hand/ | 手形工具，用于拖拽移动页面 |
| 3 | text | toolbar/text/ | 文本工具，添加和编辑文本 |
| 4 | textbox | toolbar/textbox/ | 文本框工具，带边框的文本区域 |
| 5 | textArt | toolbar/textArt/ | 艺术字工具 |
| 6 | image | toolbar/image/ | 图片工具，插入图片 |
| 7 | signature | toolbar/signature/ | 签名工具，手写签名 |
| 8 | stamp | toolbar/stamp/ | 印章工具，添加印章 |
| 9 | watermark | toolbar/watermark/ | 水印工具，添加文字/图片水印 |
| 10 | highlight | toolbar/highlight/ | 高亮工具，绘制高亮区域 |
| 11 | text_highlight | toolbar/text_highlight/ | 文本高亮，高亮选中文本 |
| 12 | underline | toolbar/underline/ | 下划线工具 |
| 13 | strikethrough | toolbar/strikethrough/ | 删除线工具 |
| 14 | line | toolbar/line/ | 直线工具 |
| 15 | arrow | toolbar/arrow/ | 箭头工具 |
| 16 | rect | toolbar/rect/ | 填充矩形工具 |
| 17 | rect_stroke | toolbar/rect_stroke/ | 矩形边框工具 |
| 18 | circle | toolbar/circle/ | 填充圆形工具 |
| 19 | circle_stroke | toolbar/circle_stroke/ | 圆形边框工具 |
| 20 | ellipse | toolbar/ellipse/ | 填充椭圆工具 |
| 21 | ellipse_stroke | toolbar/ellipse_stroke/ | 椭圆边框工具 |
| 22 | shapes | toolbar/shapes/ | 形状组合工具 |
| 23 | eraser | toolbar/eraser/ | 橡皮擦工具 |
| 24 | forms | toolbar/forms/ | 表单工具 (复选框、单选框、下拉框、文本域) |
| 25 | find | toolbar/find/ | 查找工具，搜索文本 |
| 26 | download | toolbar/download/ | 下载工具 |
| 27 | history | toolbar/history/ | 历史记录工具 |
| 28 | pages | toolbar/pages/ | 页面管理 |
| 29 | insert_pages | toolbar/insert_pages/ | 插入页面 |
| 30 | delete_pages | toolbar/delete_pages/ | 删除页面 |
| 31 | header_footer | toolbar/header_footer/ | 页眉页脚 |
| 32 | page_number | toolbar/page_number/ | 页码 |
| 33 | open_file | toolbar/open_file/ | 打开文件 |
| 34 | radact | toolbar/radact/ | 涂黑工具 |

### 元素类型 (15 种)

| 序号 | 类型 | 文件 | 描述 |
|------|------|------|------|
| 1 | BaseElement | BaseElement.js | 基础元素类 |
| 2 | TextElement | TextElement.js | 文本元素 |
| 3 | TextCanvasElement | TextCanvasElement.js | Canvas 文本元素 |
| 4 | TextArtElement | TextArtElement.js | 艺术字元素 |
| 5 | TextBoxElement | TextBoxElement.js | 文本框元素 |
| 6 | TextFieldElement | TextFieldElement.js | 表单文本域 |
| 7 | ImageElement | ImageElement.js | 图片元素 |
| 8 | RectElement | RectElement.js | 矩形元素 |
| 9 | DrawRectElement | DrawRectElement.js | 绘制矩形元素 |
| 10 | CircleElement | CircleElement.js | 圆形元素 |
| 11 | EllipseElement | EllipseElement.js | 椭圆元素 |
| 12 | SvgPathElement | SvgPathElement.js | SVG 路径元素 |
| 13 | CheckboxElement | CheckboxElement.js | 复选框元素 |
| 14 | RadioGroupElement | RadioGroupElement.js | 单选框组元素 |
| 15 | DropdownElement | DropdownElement.js | 下拉框元素 |

---

## 事件系统

### 事件总线 (src/event.js)

项目使用自定义事件系统进行组件间通信。

### 核心事件列表

| 事件名 | 触发时机 | 数据 |
|--------|----------|------|
| `READER_INIT` | 阅读器初始化完成 | - |
| `TOOLBAR_INIT` | 工具栏初始化完成 | - |
| `PAGE_RENDERED` | 页面渲染完成 | `{ pageNum, scale }` |
| `PAGE_ACTIVE` | 页面激活 | `pageNum` |
| `PAGE_ADD` | 添加页面 | `{ pageNum }` |
| `PAGE_REMOVE` | 删除页面 | `{ pageNum }` |
| `SET_SCALE` | 设置缩放 | `scale` |
| `ELEMENT_CREATE` | 元素创建 | `{ element, page }` |
| `ELEMENT_REMOVE` | 元素删除 | `{ element, page }` |
| `ELEMENT_ACTIVE` | 元素激活 | `{ element }` |
| `ELEMENT_BLUR` | 元素失焦 | `{ element }` |
| `ELEMENT_UPDATE_AFTER` | 元素更新后 | `{ element }` |
| `TOOLBAR_ITEM_ACTIVE` | 工具激活 | `{ name, tool }` |
| `TOOLBAR_ITEM_CLICK` | 工具点击 | `{ name, tool }` |
| `TOOLBAR_ITEM_BLUR` | 工具失焦 | `{ name, tool }` |
| `TOOLBAR_ITEM_OPTION_CLICK` | 工具选项点击 | `{ tool }` |
| `HISTORY_CHANGE` | 历史记录变化 | `{ step, maxStep }` |
| `HISTORY_REMOVE` | 历史记录删除 | `{ element }` |
| `CONVERT_TO_ELEMENT` | 转换为元素 | `{ type, attrs, options }` |
| `SAVE` | 保存 | - |
| `DOWNLOAD` | 下载 | - |
| `ERROR` | 错误 | `error` |
| `PASSWORD_ERROR` | 密码错误 | - |

### 事件使用示例

```javascript
// 监听事件
PDFEvent.on(Events.READER_INIT, () => {
    console.log('Reader initialized');
});

// 带响应的事件监听
PDFEvent.on(Events.CONVERT_TO_ELEMENT, (e, sendResponse) => {
    sendResponse(true);
    // 处理逻辑...
});

// 触发事件
PDFEvent.dispatch(Events.PAGE_RENDERED, {
    pageNum: 1,
    scale: 1.0
});
```

---

## 数据流分析

### PDF 加载流程

```
1. 用户选择 PDF 文件
   ↓
2. PDFReader.load(url)
   ↓
3. pdfjsLib.getDocument(config)
   ↓
4. PDFDocument 实例化
   ↓
5. 初始化缩略图视图 (#initThumbs)
   ↓
6. 初始化主视图 (#initMain)
   ↓
7. 使用 IntersectionObserver 懒加载渲染
   ↓
8. 触发 Events.READER_INIT
```

### PDF 保存流程

```
1. 用户点击下载
   ↓
2. editor.download()
   ↓
3. editor.flushData()
   ├─ 收集所有页面的修改
   └─ 发送 AssemblePDF 到 PDF.js Worker
   ↓
4. editor.setDocumentProxy()
   ├─ PDF-Lib 加载文档
   └─ 注册 fontkit
   ↓
5. PDFEvent.dispatch(Events.SAVE)
   ↓
6. pdfDocument.fixFontData()
   ├─ 收集所有文本元素
   ├─ 按页面和字体分组
   └─ 触发字体子集化 (fontWorker)
   ↓
7. fontWorker 处理完成后
   ↓
8. pdfDocument.save()
   ├─ 嵌入所有元素到 PDF
   └─ 生成最终 Blob
   ↓
9. 通过 postMessage 发送给父窗口
   或直接使用 file-saver 下载
```

### 字体处理流程

```
1. 文本元素创建/编辑
   ↓
2. 检查是否需要加载字体
   ↓
3. Font.fetchFont(pageId, text, fontFile)
   ├─ 检查缓存
   ├─ CJK 检测 (切换到 unicode.ttf)
   └─ 转换文本为 Unicode 码点
   ↓
4. POST 到字体服务器
   https://genfont.qwerpdf.com/
   body: { text: "U+xxxx,...", fontFile: "xxx.ttf" }
   ↓
5. 接收 ArrayBuffer (字体子集)
   ↓
6. Font.subset() (保存时)
   ├─ 使用 opentype.js 解析
   ├─ 创建字体子集
   └─ 添加到 document.fonts
   ↓
7. 使用字体渲染文本
```

---

## 国际化支持

### 支持的语言

| 语言代码 | 语言 |
|---------|------|
| en | English |
| zh | 中文 |
| ja | 日本語 |
| de | Deutsch |
| fr | Français |
| pt | Português |
| pl | Polski |
| fi | Suomi |
| ru | Русский |
| nl | Nederlands |
| tr | Türkçe |

### 配置方式

```javascript
// URL 参数
?lang=zh

// 代码设置
Locale.langCode = 'zh';
Locale.load('zh').then(() => {
    Locale.bind();
});
```

---

## 配置参数

### PDFReader 配置

```javascript
const reader = new PDFReader({
    url: 'path/to/file.pdf',      // PDF 文件路径
    thumbs: '#pdf-thumbs',         // 缩略图容器选择器
    main: '#pdf-main',             // 主视图容器选择器
    renderType: 'html',            // 渲染类型: 'canvas' | 'html'
    viewMode: VIEW_MODE.AUTO_ZOOM, // 视图模式
    cMapUrl: cMapUrl,              // CMap 文件目录
    standardFontDataUrl: standardFontDataUrl, // 标准字体目录
    usePageBase: false,            // 是否使用基础页面
    expandThumbs: false            // 默认展开缩略图
}, pdfjsLib);
```

### PDFEditor 配置

```javascript
const editor = new PDFEditor({
    producer: 'QWERPDF',           // PDF producer 元数据
    creator: 'QWERPDF',            // PDF creator 元数据
    toolbar: true,                 // 启用工具栏
    debug: false,                  // 调试模式
    history: true,                 // 启用历史记录
    tools: [                       // 启用的工具列表
        'mouse', 'hand', 'text', 'image', 'eraser',
        'highlight', 'line', 'download', 'text_highlight',
        'history', 'shapes', 'circle', 'ellipse', 'textbox',
        'find', 'underline', 'strikethrough', 'signature',
        'watermark', 'header_footer', 'page_number', 'forms',
        'insert_pages', 'delete_pages', 'textArt', 'stamp'
    ]
}, null, reader);
```

### Font 配置

```javascript
// 设置字体 API 地址
Font.fontUrl = 'https://genfont.qwerpdf.com/';

// 或使用本地服务
Font.fontUrl = 'http://localhost:3000/api/font/load';
```

---

## 总结

### 后端依赖

这个 PDF 编辑器是一个**几乎完全客户端**的解决方案，只有一个外部 API 依赖:

| API | 端点 | 用途 |
|-----|------|------|
| 字体子集服务 | `https://genfont.qwerpdf.com/` | 动态生成字体子集，支持 CJK 字符 |

### 本地化建议

如需完全本地化部署，需要:

1. **部署字体子集服务**: 实现一个接收 Unicode 码点和字体名，返回字体子集的后端服务
2. **准备字体文件**: 包括常用字体和 `unicode.ttf` (CJK 支持)
3. **修改配置**: 将 `Font.fontUrl` 指向本地服务

### 扩展性

`src/api.js` 文件目前为空类，预留了扩展后端 API 的空间:

```javascript
export class API {
    // 可扩展添加更多后端 API 方法
    // 例如: 保存到服务器、用户认证、文档管理等
}
```
