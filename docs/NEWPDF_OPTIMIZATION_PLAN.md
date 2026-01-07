# NewPDF 深度理解与优化方案（面向聚合型 PDF 工具站）

> 目标：在不修改 `oldcode/pdfguru-clone/**` 与 `oldcode/pdfeditor/**` 的前提下，复用两者能力，在项目根目录重新规划代码结构，把当前项目优化为体验更佳、能力完整、纯前端处理的 PDF 工具聚合网站，并参考 OnlyOffice PDF Editor 的工作台式交互。

---

## 1. 约束、非目标与验收口径

### 1.1 不可变更约束（硬约束）
- 不允许直接修改：`oldcode/pdfguru-clone/**`、`oldcode/pdfeditor/**`
- PDF 编辑必须纯前端：不上传文件、不依赖服务端计算；文件与编辑结果只在浏览器侧产生
- 不实现分享链接
- Delete Pages：
  - 大文件缩略图加载不完整必须修复
  - “Insert Page” 与 “Insert Pages” 语义重叠必须消除
  - 页面按页序展示，不叠加任何编辑内容（只展示原始页面缩略图）
- 编辑器工作台右上角只保留 `Done`（不需要 Search/Print/Download）

### 1.2 非目标（本次明确不做）
- 服务端存储 / 协作 / 生成分享链接 / 账号系统
- 后端队列式处理（压缩/转换等）
- 引擎级别重写 pdfeditor（只做必要兼容与缺陷修复）

### 1.3 验收口径（本次必须满足）
- `oldcode/**` 未被改动
- Edit PDF：pdfeditor 全量能力在前端 UI 有入口且可用（至少通过手工验收矩阵）
- Delete PDF Pages：大文件滚动到底缩略图持续加载；导出 PDF 页序与页数正确
- 全流程纯前端：浏览器侧处理 + 浏览器缓存（IndexedDB）可 Resume / Discard
- 构建与质量门禁：`npm run build`、`npm run lint` 通过

---

## 2. 已落地改造概览（本次实现）

### 2.1 代码结构重规划
- 引入 `src/features/**`：按“工具/特性”组织复杂业务（Edit PDF、Delete Pages 等）
- 将 pdfeditor React 封装迁入：`src/features/pdf-editor/**`
- 引擎代码作为 vendor-like 层：`src/lib/pdfeditor/**`（从 `oldcode/pdfeditor` 拷贝而来，可做 Next 兼容修复）

### 2.2 Edit PDF 工作台（OnlyOffice 风格）
- 顶部应用栏：仅 `Done`（导出），不提供 Search/Print/Download
- React 统一工具栏：按组组织工具（Text / Media / Annotate / Page / Edit / View）
- 隐藏引擎自带 Download 按钮，统一由 `Done` 导出，避免双入口混乱

### 2.3 pdfeditor 对接与导出链路修复
- 新增 `Events.DOWNLOAD_COMPLETE`：引擎导出完成后把 `{blob,fileName}` 发给外部 UI
- React 侧监听 `DOWNLOAD_COMPLETE`：`Done` 调用 `editor.save(fileName)`，拿到 Blob 后下载

### 2.4 Delete PDF Pages 独立工具页（纯前端）
- 使用 PDF.js 渲染缩略图 + IntersectionObserver 懒加载 + 渲染队列并发控制（修复大文件加载不完整）
- 使用 pdf-lib 复制保留页并导出
- UI：按页序网格展示；选择即标记删除；不叠加编辑元素

### 2.5 “Insert Page” 与 “Insert Pages” 重叠处理
- 默认隐藏页内 “Insert Page” 控件（保留 `insert_pages` 工具作为唯一入口）
  - 修复点：移除 `src/lib/pdfeditor/reader/page.js` 中通过 `setTimeout` 强制显示插页/删页控件的逻辑，避免 inline style 覆盖 CSS
- Delete Pages 相关按钮仅在对应工具激活时展示，减少误触
  - `remove_page` 仅在 `__cursor_delete_pages` 时显示（CSS 控制）
  - `insert_page_box` 在 Delete Pages 模式下强制隐藏（CSS `!important`），彻底消除语义重叠

### 2.6 浏览器缓存（IndexedDB）
- `src/lib/workspace/pdfWorkspaceCache.ts`：保存最近一次 PDF（输入与导出结果），工具页提供 Resume / Discard

---

## 3. 新架构与目录规划（根目录）

### 3.1 目录职责
- `src/app/**`：路由与页面组装（Next.js App Router）
- `src/features/**`：每个工具/特性自包含（UI + hook + 纯前端处理逻辑）
  - `src/features/pdf-editor/**`：Edit PDF 工作台（React 工具栏 + 引擎桥接）
  - `src/features/delete-pages/**`：Delete PDF Pages 工具（PDF.js + pdf-lib）
- `src/lib/pdfeditor/**`：pdfeditor 引擎层（大量原生 JS / 模板 / CSS）
- `public/assets/**`：pdfeditor 静态资源（PDF.js、cmaps、standard_fonts、icons、locale）
- `public/css/pdfeditor.css`：引擎 UI 样式入口（由工具页运行时加载）

### 3.2 分层理由
- 引擎层变更慢但体量大：避免污染业务层 ESLint/TS 规则
- 特性层便于“工具站”并行扩展（Merge/Split/Rotate/Extract…）
- 路由层保持薄：避免在 page.tsx 堆积不可测试的复杂逻辑

---

## 4. oldcode/pdfguru-clone 复用策略（站点骨架）

### 4.1 直接复用
- Header/Footer、营销页与工具聚合页信息架构
- Tailwind/shadcn 组件与基础布局
- 现有工具路由结构（工具列表与工具详情页）

### 4.2 需要替换/增强
- comingSoon 工具页逐步替换为真实纯前端实现（优先 P0：Edit、Delete Pages、Merge、Split、Rotate、Extract）
- 工具页统一“工作台体验”：一致的顶部应用栏、错误提示、导出流程与缓存策略

---

## 5. oldcode/pdfeditor 深入解读（模块/接口/能力）

> pdfeditor 是“纯前端 PDF 编辑器引擎”，核心依赖：PDF.js（渲染）、pdf-lib（写回/导出）、opentype.js+fontkit（字体）以及自研事件总线与工具系统。

### 5.1 模块分层
1. 事件系统：`src/lib/pdfeditor/event.js`
   - `Events`：事件常量表
   - `PDFEvent`：`on / dispatch / unbind` 全局事件总线
2. Reader（渲染/导航）：`src/lib/pdfeditor/reader/*`
   - `PDFReader`：加载 PDF.js、管理缩放/翻页/视图模式、懒加载渲染
   - `PDFDocument`：页面缓存、缩略图、查找等
   - `PDFPageBase/PDFPage`：渲染层与（可选）编辑辅助层
3. Editor（元素/导出）：`src/lib/pdfeditor/editor/*`
   - `PDFEditor`：工具栏、actions 面板、history、导出链路
   - `PDFDocument`（editor）+ `element/*`：把“元素模型”写回 pdf-lib
4. Toolbar（工具系统）：`src/lib/pdfeditor/editor/toolbar/*`
   - `Toolbar`：创建工具实例、维护激活态、设置 cursor class
   - `ToolbarItemBase`：工具基类，负责 actions 面板、属性更新、draw handle 生命周期

### 5.2 必要 DOM 约定（否则部分工具会报错）
> pdfeditor 大量使用固定 ID / className 查 DOM。Next.js 集成必须提供这些节点。

| 节点 | 用途 | 关键性 |
|---|---|---|
| `#pdf-main` | 主渲染容器 | 必须 |
| `#pdf-thumbs` | 缩略图容器 | 必须 |
| `#pdf-el-actions-wrapper/#pdf-el-actions` | actions 面板 | 必须 |
| `#pdf_thumbs_slider/#pdf_thumbs_wrapper/#pdf_thumbs_close` | 缩略图侧栏开关 | 建议 |
| `#history_wrapper/#history_slider` | History 侧栏与开关 | 建议（用于完整能力） |
| `#forms_wrapper/#forms_slider` | Forms 侧栏与开关 | 必须（Forms 工具无 null-check） |

对应实现：`src/features/pdf-editor/PDFEditorWrapper.tsx`

### 5.3 关键事件（对接总览）
> 以 `src/lib/pdfeditor/event.js` 为准；这里列出与站内 UI 交互最相关的事件。

| 事件 | 触发方 | 数据 | 目的 | 站内用途 |
|---|---|---|---|---|
| `READER_INIT` | Reader | `void` | Reader 初始化完成 | React 获取页数 |
| `PAGE_ACTIVE` | Reader | `number` | 当前页变化 | 页码输入/显示 |
| `SET_SCALE` | Reader | `number` | 缩放变化 | 百分比显示 |
| `TOOLBAR_ITEM_ACTIVE` | ToolbarItemBase | `tool` | 工具激活 | React 工具栏高亮 |
| `TOOLBAR_ITEM_BLUR` | ToolbarItemBase | `tool` | 工具失焦 | UI 状态清理 |
| `TOOLBAR_ITEM_OPTION_CLICK` | ToolbarItemBase | `{tool,objElement}` | 工具属性变化 | 颜色/线宽等同步（可扩展） |
| `ELEMENT_CREATE` | Editor | `{page,element}` | 新建元素 | History 面板 |
| `HISTORY_CHANGE` | History | `{step,maxStep}` | Undo/Redo 可用性 | React Undo/Redo 禁用态 |
| `SAVE` | Editor | `void` | 导出前准备 | flushData 后触发 |
| `DOWNLOAD` | Editor | `void` | 生成 Blob | 引擎内部导出流程 |
| `DOWNLOAD_COMPLETE` | Editor（本项目新增） | `{blob,fileName}` | Blob 完成 | React `onSave` |
| `ERROR` | 引擎 | `Error` | 错误上报 | React 错误态 |

### 5.4 工具能力清单（必须保留）
> 以 `src/lib/pdfeditor/editor/toolbar/index.js` 为准（本项目中的引擎拷贝）。

#### 5.4.1 基础交互与导航
- `mouse`：选择/编辑元素
- `hand`：拖拽文档
- `find`：查找文本（actions 面板提供输入与跳转）
- `pages`：页码/翻页控件（原生工具栏展示；本项目以 React 页码输入替代）

#### 5.4.2 文本与标注
- `text`：添加文本（字体/字号/颜色/背景/对齐/粗斜体等）
- `textbox`：文本框
- `text_highlight`：文本高亮
- `underline`：下划线
- `strikethrough`：删除线

#### 5.4.3 绘制与形状
- `line`：自由绘制（颜色/线宽/透明度）
- `rect/circle/ellipse`：填充形状
- `shapes`：形状集合工具（通过 actions 子按钮创建描边矩形/描边圆/描边椭圆/直线/箭头）
  - 子能力入口：actions 面板 `.draw_rect/.draw_circle/.draw_ellipse/.draw_line/.draw_arrow`
  - 子工具名称：`rect_stroke/circle_stroke/ellipse_stroke/line/arrow`

#### 5.4.4 图片、签名、印章
- `image`：插入图片
- `signature`：签名
- `stamp`：印章/章

#### 5.4.5 页面与版式
- `insert_pages`：插入页（弹窗选择插入位置）
- `delete_pages`：删除页（切换视图模式 + 页按钮）
- `watermark`：水印
- `page_number`：页码
- `header_footer`：页眉页脚

#### 5.4.6 表单
- `forms`：表单工具（checkbox/radio/textfield/dropdown/sign/date 等）
  - **要求**：必须提供 `#forms_wrapper`，否则 `forms` 工具会在绑定 DOM 时报错

#### 5.4.7 历史与导出
- `history`：历史工具（引擎侧配合 `history_slider/history_wrapper`）
- `download`：导出工具（本项目隐藏 UI 入口，仅由 `Done` 触发）

---

## 6. Edit PDF：工作台 UI 与引擎对接方案

### 6.1 工作台布局（参考 OnlyOffice）
- 顶部应用栏：品牌 + 文件名输入 + 唯一 CTA（Done）
- 工具栏：分组按钮 + 下拉（Shapes / Forms）
- 左侧：缩略图面板（可折叠）
- 顶部 actions：显示当前工具属性（颜色、线宽、字体、对齐…）
- 右侧：History/Forms 面板（可折叠）

### 6.2 关键工程实现点
- 初始化：`src/features/pdf-editor/usePDFEditor.ts`
  - 动态加载引擎：`import('@/lib/pdfeditor')`
  - PDF.js：`/assets/js/pdfjs/pdf.min.js` + worker
  - 关键配置：
    - `renderType: 'html'`：启用 textLayer（Find/文本相关能力）
    - `usePageBase: false`：启用编辑辅助页（清除/隐藏原文等）
    - `cMapUrl/standardFontDataUrl`：保证字符映射与标准字体
  - `history: true`：开启撤销栈（否则导出 reset 会报错，且 Undo/Redo 不可用）
- 大文件渲染稳定性：`src/lib/pdfeditor/reader/index.js`
  - Main/Thumbs 渲染队列 + 并发限制，避免一次性渲染过多页面导致“空白页/不完整”
  - IntersectionObserver 预加载 rootMargin 调整，减少快速滚动时的“白屏等待”
  - **自适应清晰度（outputScale）**：按页像素预算动态降级，避免高缩放/大页面导致内存爆炸与渲染失败（仍保持导出为矢量/可编辑结果）
  - **缩略图轻量渲染**：缩略图不再走整页 `toDataURL`（避免超大 Base64 常驻内存），改为固定高度的小比例 canvas 渲染
  - **离屏页卸载**：页面滚出预加载范围后延迟卸载 canvas/textLayer/annotationLayer，长文档滚动不会累积到“越滚越卡/崩溃”
- Delete Pages（引擎内）：`src/lib/pdfeditor/editor/toolbar/delete_pages/index.js`
  - 进入 Delete Pages 自动降级渲染（`renderType=canvas` + `outputScale=1`）并强制重渲染，显著降低大文件内存占用
  - 离开 Delete Pages 自动恢复（`renderType=html` + 原 `outputScale/viewMode`）并强制重渲染，保证编辑工具可用性
- Header/Footer & Page Number（引擎内）：`src/lib/pdfeditor/editor/toolbar/header_footer/index.js`、`src/lib/pdfeditor/editor/toolbar/page_number/index.js`
  - 补齐“仅弹窗不生效”的缺口：按范围批量添加页眉/页脚与页码
  - 支持离屏页：未渲染页面也可被批量处理（通过 reader 页占位 canvas）
  - 批量操作合并为单条 Undo/Redo（History 自定义操作）
- 元素激活态一致性：`src/lib/pdfeditor/editor/elements.js`、`src/lib/pdfeditor/editor/element/TextElement.js`
  - 修复 `setActive(null)` 不移除 `.active` 导致的“多个元素同时显示 actions 浮条”
  - 修复 Text 失焦时无条件清空 `activeId` 导致的“切换到其它元素选中状态丢失”
- Find（查找）体验：`src/lib/pdfeditor/editor/toolbar/find/index.js`、`public/css/pdfeditor.css`
  - 增加可视高亮样式（`.__pdf_find_highlight`），确保查找结果肉眼可见
  - 工具激活时绑定 `PAGE_RENDERED`、失活解绑，避免长会话/重复初始化造成监听残留
- Insert/Delete Pages（引擎内）：`src/lib/pdfeditor/editor/page.js`、`src/lib/pdfeditor/editor/document.js`
  - 新增页后自动 `observe` 缩略图节点，修复“插入页缩略图不加载”
  - 删除页时对 observer 做 `unobserve`，避免长会话/反复操作导致监听残留
- 字体（纯前端/离线稳定）：`src/lib/pdfeditor/font.js`、`src/features/pdf-editor/usePDFEditor.ts`、`public/assets/fonts/**`
  - 签名/文本艺术等依赖字体全部改为本地资源（不再请求 `fonts.qwerpdf.com`）
  - `Font.fetchFont()` 在 `fontUrl` 为空时从 `/assets/fonts/**` 读取字体，确保编辑与导出全链路纯前端
  - CJK 兜底字体使用 `NotoSansCJKsc-Regular.otf`（体积较大但只在需要时加载）
  - 删除服务端字体接口：`src/app/api/fonts/route.ts`（避免“伪纯前端”）
- DOM Wrapper：`src/features/pdf-editor/PDFEditorWrapper.tsx`
  - 提供 pdfeditor 所需 DOM（thumbs、actions、history/forms wrappers）
- 工具栏桥接：`src/features/pdf-editor/Toolbar/useToolbarBridge.ts`
  - 监听 `TOOLBAR_ITEM_ACTIVE / PAGE_ACTIVE / SET_SCALE / HISTORY_CHANGE`
  - 暴露 `selectTool/undo/redo/goToPage/zoomIn/zoomOut`
- React 工具栏兼容（避免 legacy toolbar 隐藏导致 UI 不可见）：`src/lib/pdfeditor/editor/toolbar/textArt/index.js`、`src/lib/pdfeditor/editor/toolbar/stamp/index.js`
  - dropdown 统一挂载到 `document.body` 并锚定到 React 工具栏按钮（`button[data-tool="..."]`）
- 统一工具栏：`src/features/pdf-editor/Toolbar/UnifiedToolbar.tsx`
  - Shapes/Forms 下拉通过“激活工具 → 点击 actions 子按钮”直达子能力（描边形状、直线、箭头、表单字段）

### 6.3 “右上角只保留 Done”与导出链路
- `Done` 触发：`editor.save(fileName)`（不自动下载）
- 引擎在 `DOWNLOAD_COMPLETE` 事件中回传 Blob；React 下载并回写缓存
- 下载入口去重：隐藏工具栏 Download，避免命名/交互不一致

### 6.4 “Insert Page vs Insert Pages” 重叠处理
- 语义：Insert Pages（批量/位置插入）是唯一入口
- 页内 Insert Page 按钮默认隐藏（避免与 Insert Pages 重叠，且在 Delete Pages 场景误导）

---

## 7. Delete PDF Pages：独立工具页方案（纯前端）

### 7.1 交互目标（满足要求 9/10/11）
- 上传 PDF（或 Resume 最近文件）
- 网格按页序展示缩略图（Page 1..N）
- 点击选择要删除的页（只展示原始页面缩略图，不叠加编辑元素）
- 右上角 `Done`：导出新 PDF 并下载

### 7.2 大文件缩略图不完整：根因与修复策略
常见根因：
- 一次性渲染过多页导致渲染任务堆积（部分页永远排不上队）
- IntersectionObserver root 配置不正确导致“看得见但不算进入视口”
- 并发过高造成主线程/worker 饥饿

落地（已实现）：
- IntersectionObserver：root 绑定到滚动容器（非 viewport）
- 渲染队列：限制并发 `RENDER_CONCURRENCY=2`
- 失败隔离：单页失败不阻塞队列

对应实现：`src/features/delete-pages/DeletePdfPagesClient.tsx`

---

## 8. 浏览器缓存（IndexedDB）方案（已实现）

### 8.1 目标
- 满足“纯前端 + 浏览器缓存”
- 避免 sessionStorage/localStorage 配额与性能问题
- 支持跨工具复用同一文件（聚合站体验）

### 8.2 数据模型与生命周期
- DB：`newpdf`
- Store：`pdf_workspace`
- Key：`workspace`
- Record：`{ fileName, blob, updatedAt }`
- 写入时机：
  - 上传/Resume 成功后：写入输入文件
  - `Done` 导出后：写入导出结果（便于下一步继续处理/跨工具复用）
- 清理：
  - UI 提供 `Discard` 删除缓存
  - 后续可增加“自动过期”（如 7 天）与“清空全部缓存”

实现：`src/lib/workspace/pdfWorkspaceCache.ts`

### 8.3 UX 文案与隐私
- 明确提示：Saved locally / No uploads
- 缓存写入失败不影响主流程（catch 并忽略）

### 8.4 限制与后续增强
- 当前缓存的是“文件快照”（输入/导出 PDF），并未实现“编辑中间态增量保存”
- 若要实现“刷新后恢复到未导出状态”，需要：
  - 引擎提供元素状态序列化/反序列化，或
  - 在每次变更后生成快照（代价高，需节流与进度提示）

---

## 9. 全量验收矩阵（建议作为发布门禁）

### 9.1 Edit PDF（pdfeditor 引擎）
- 初始化：
  - 上传/Resume 可进入编辑器
  - 缩略图可展开/收起
  - actions 面板随工具切换更新
- Text：
  - 添加文本；改字体/字号/颜色/背景；对齐；粗/斜/下划线/删除线；导出后校验
- Text Box / Text Art：
  - 插入、拖拽定位、导出校验
- Image：
  - 插入 PNG/JPG；缩放移动；导出校验
- Highlight：
  - 区域高亮、文本高亮；导出校验
- 文本选区类标注（Text Highlight / Underline / Strikethrough）：
  - 选区后立即转为真实元素（而非依赖 textLayer DOM 包裹）：
    - 翻页/滚动离屏/缩放/重渲染后仍保持可见
    - Undo/Redo 可回退/恢复
- Draw：
  - 自由绘制；导出校验
- Shapes：
  - 填充：Rectangle/Circle/Ellipse（Fill）
  - 描边：Rectangle/Circle/Ellipse（Outline）
  - 直线：Line（Straight）
  - 箭头：Arrow
  - 导出校验
- Redact：
  - 遮挡导出校验
- Signature / Stamp：
  - 插入/位置/导出校验
- Watermark / HeaderFooter / PageNumber：
  - 多种位置/范围；导出校验
- Forms：
  - TextField / Checkbox / RadioGroup / Dropdown / Signature / Date
  - 工具栏下拉入口与右侧 Forms 面板模板入口均可用
  - 导出后在常见阅读器中可交互（若引擎写入为真实表单）
- History：
  - 新增元素后 History 计数递增
  - Undo/Redo 正常可用（按钮禁用态正确）
- 导出：
  - `Done` 下载文件名规则正确
  - 导出后缓存更新（Resume 进入导出版本）

### 9.2 Delete PDF Pages（独立实现）
- 缩略图：
  - 小文件（<30页）：快速全部渲染
  - 大文件（>200页）：滚动到底仍持续渲染，不出现“后半段空白”
  - 反复滚动/快速滚动：不会出现“越滚越卡/白屏时间越来越长”
- 选择：
  - 单页、多页、连续页、首尾页
  - Select all / Invert / Clear 正常
  - 禁止删空（全选删除应提示错误）
- 导出：
  - 页数正确、页序正确、内容无叠加
  - 导出后缓存更新（可 Resume）

---

## 10. 路线图（把聚合站做成真正可用的工具集合）

### 10.1 P0（形成核心闭环，优先实现）
- Merge PDF（pdf-lib 合并）
- Split PDF（按页范围拆分）
- Rotate PDF（按页旋转并导出）
- Extract PDF Pages（抽取页）

### 10.2 P1（统一工作流与体验）
- 单文件工作台：同一文件在多个工具间切换（基于 IndexedDB workspace）
- 统一导出命名、统一错误提示（密码/损坏/超大）
- 统一进度反馈（导出/渲染/复制页）

### 10.3 P2（OnlyOffice 对标体验）
- 左侧可切换面板：Thumbnails / Find / History / Forms
- 选中元素属性栏（更细粒度的 React 侧属性 UI）
- 快捷键提示、对齐吸附、标尺/网格（可选）

---

## 11. 关键代码索引（现项目）

- Edit PDF 页面：`src/app/(tools)/edit-pdf/PDFEditorClient.tsx`
- Delete PDF Pages 页面：`src/app/(tools)/delete-pdf-pages/page.tsx`
- Delete PDF Pages 实现：`src/features/delete-pages/DeletePdfPagesClient.tsx`
- pdfeditor React 封装：`src/features/pdf-editor/PDFEditorWrapper.tsx`
- pdfeditor 初始化：`src/features/pdf-editor/usePDFEditor.ts`
- React 工具栏：`src/features/pdf-editor/Toolbar/UnifiedToolbar.tsx`
- 工具桥接：`src/features/pdf-editor/Toolbar/useToolbarBridge.ts`
- pdfeditor 引擎导出链路：`src/lib/pdfeditor/editor/index.js`
- pdfeditor 事件常量：`src/lib/pdfeditor/event.js`
- 浏览器缓存：`src/lib/workspace/pdfWorkspaceCache.ts`
