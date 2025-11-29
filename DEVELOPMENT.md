# NewPDF开发指南

## 快速开始

### 环境要求
- Node.js 18+
- npm/yarn/pnpm/bun

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

### 开发服务器
```bash
npm run dev
# 服务器将在 http://localhost:3000 启动
```

### 构建生产版本
```bash
npm run build
npm run start
```

### 代码检查
```bash
npm run lint
```

### 代码格式化
```bash
npm run format
```

## 项目结构说明

### 核心目录

#### `/src/app`
Next.js 15 App Router页面目录

- `(tools)/` - 所有PDF工具页面 (路由组，不影响URL)
  - `edit-pdf/` - 核心PDF编辑器
  - `annotate-pdf/` - PDF注释工具
  - `sign-pdf/` - PDF签名工具
  - `fill-pdf/` - PDF表单填充
  - 其他66个占位符页面

- `api/` - Next.js API Routes
  - `fonts/route.ts` - 字体子集服务

- `layout.tsx` - 根布局
- `page.tsx` - 首页
- `globals.css` - 全局样式

#### `/src/components`
React组件目录

- `layout/` - 布局组件
  - `Header.tsx` - 页头导航
  - `Footer.tsx` - 页脚信息

- `shared/` - 共享组件
  - `FileUpload.tsx` - 文件上传组件
  - `ToolCard.tsx` - 工具卡片
  - `ToolPageTemplate.tsx` - 工具页面模板

- `pdf-editor/` - PDF编辑器React包装
  - `types.ts` - TypeScript类型定义
  - `usePDFEditor.ts` - React Hook
  - `PDFEditorWrapper.tsx` - 主包装组件
  - `index.ts` - 导出接口

- `ui/` - shadcn/ui基础组件
  - Button, Badge, Accordion等

#### `/src/lib`
库和工具函数

- `pdfeditor/` - 完整的PDFEditor vanilla JS库
  - `index.js` - 主入口
  - `editor/` - PDF编辑器核心
  - `reader/` - PDF渲染引擎
  - `components/` - UI组件
  - `assets/` - 资源文件
  - 更多87个文件...

- `utils.ts` - 工具函数

#### `/src/styles`
样式文件

- `pdfeditor.css` - PDF编辑器样式（从5个CSS文件合并）

#### `/public/assets`
静态资源

- `fonts/` - 字体文件
- `images/` - 图片资源
- `img/` - 额外图片
- `locale/` - 多语言文件
- `js/pdfjs/` - PDF.js库文件
- `temp.otf` - 备用字体

## 开发工作流

### 添加新的PDF工具

#### 1. 创建工具页面
```bash
# 创建目录
mkdir -p src/app/\(tools\)/your-tool-name

# 创建page.tsx
```

```typescript
// src/app/(tools)/your-tool-name/page.tsx
import ToolPageTemplate from '@/components/shared/ToolPageTemplate';
import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Tool - NewPDF',
  description: 'Description of your tool',
};

export default function YourToolPage() {
  return (
    <ToolPageTemplate
      title="Your Tool"
      description="Description of your tool"
      icon={FileText}
      comingSoon={false}  // 设置为false表示工具已实现
      features={[
        {
          title: "Feature 1",
          description: "Feature description"
        }
      ]}
      howToSteps={[
        {
          step: 1,
          title: "Step 1",
          description: "Step description"
        }
      ]}
    />
  );
}
```

#### 2. 实现工具逻辑（如需要）
如果工具需要特殊逻辑，创建客户端组件：

```typescript
// src/app/(tools)/your-tool-name/YourToolClient.tsx
'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/shared/FileUpload';

export default function YourToolClient() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setFile(file);
    // 处理文件逻辑
  };

  return (
    <div>
      <FileUpload onFileSelect={handleFileSelect} />
      {/* 工具UI */}
    </div>
  );
}
```

#### 3. 更新首页工具列表
```typescript
// src/app/page.tsx
const tools = [
  // ... 现有工具
  {
    href: "/your-tool-name",
    icon: YourIcon,
    title: "Your Tool"
  },
];
```

### 使用PDFEditor组件

```typescript
'use client';

import { PDFEditorWrapper } from '@/components/pdf-editor';

export default function MyPDFTool() {
  const handleSave = (blob: Blob) => {
    // 处理保存的PDF
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited.pdf';
    a.click();
  };

  return (
    <PDFEditorWrapper
      pdfUrl="/sample.pdf"           // 或使用pdfData={arrayBuffer}
      tools={['text', 'image', 'highlight']}  // 可用工具列表
      locale="en"                     // 语言设置
      onSave={handleSave}            // 保存回调
      onError={(err) => console.error(err)}
      className="h-full"
    />
  );
}
```

### 可用工具类型
```typescript
type PDFToolType =
  | 'text'          // 文本编辑
  | 'image'         // 图片插入
  | 'highlight'     // 高亮
  | 'underline'     // 下划线
  | 'strikethrough' // 删除线
  | 'draw'          // 绘图
  | 'eraser'        // 橡皮擦
  | 'signature'     // 签名
  | 'stamp'         // 印章
  | 'link'          // 链接
  | 'comment'       // 评论
  | 'shape';        // 形状
```

## API开发

### 字体API使用示例

```typescript
// 客户端调用
const formData = new FormData();
formData.append('text', '12345,20013');  // Unicode码点
formData.append('fontFile', 'unicode.ttf');

const response = await fetch('/api/fonts', {
  method: 'POST',
  body: formData,
});

const fontBuffer = await response.arrayBuffer();
// 使用fontBuffer
```

### 添加新API路由

```typescript
// src/app/api/your-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // GET逻辑
  return NextResponse.json({ data: 'value' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // POST逻辑
  return NextResponse.json({ success: true });
}
```

## 样式开发

### 使用Tailwind CSS
```tsx
<div className="flex items-center justify-center p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
  Content
</div>
```

### 主题颜色
```typescript
// tailwind.config.ts定义的颜色
background    // 背景色
foreground    // 前景色
primary       // 主色调
secondary     // 次要色
muted         // 柔和色
accent        // 强调色
destructive   // 危险/删除色
border        // 边框色
input         // 输入框色
ring          // 聚焦环色
```

### PDF编辑器样式
PDF编辑器使用独立的CSS文件，避免与Tailwind冲突：
```tsx
import '@/styles/pdfeditor.css';

<div className="pdf-editor-container">
  {/* PDF编辑器内容 */}
</div>
```

## 类型定义

### PDF编辑器类型
```typescript
import type {
  PDFEditorWrapperProps,
  PDFToolType,
  PDFLocale,
  PDFReaderInstance,
  PDFEditorInstance
} from '@/components/pdf-editor';
```

### 常用Next.js类型
```typescript
import type { Metadata } from 'next';
import type { NextRequest, NextResponse } from 'next/server';
```

## 测试

### TypeScript类型检查
```bash
npm run lint  # 包含tsc --noEmit
```

### 本地测试
```bash
# 开发模式
npm run dev

# 生产构建测试
npm run build
npm run start
```

### 测试清单
- [ ] 首页加载正常
- [ ] 工具卡片点击跳转
- [ ] 文件上传功能
- [ ] PDF编辑器加载
- [ ] 保存/下载功能
- [ ] 响应式布局
- [ ] 各工具页面访问

## 部署

### Vercel部署
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 环境变量
如需配置环境变量，创建`.env.local`：
```env
# .env.local
NEXT_PUBLIC_API_URL=https://your-api.com
```

### 构建优化
- 字体文件已配置缓存
- 图片使用Next.js Image组件优化
- 代码自动分割
- CSS自动压缩

## 常见问题

### Q: PDF编辑器加载失败？
A: 检查pdfjs库是否正确加载：
```typescript
// 确保 public/assets/js/pdfjs/ 目录存在
// pdf.min.js 和 pdf.worker.min.js
```

### Q: 字体显示异常？
A: 检查字体文件路径和API路由：
```bash
# 确保字体文件存在
ls public/assets/fonts/
ls public/assets/temp.otf

# 测试API
curl -X POST http://localhost:3000/api/fonts \
  -F "text=12345" \
  -F "fontFile=unicode.ttf"
```

### Q: TypeScript错误？
A: 运行类型检查：
```bash
npm run lint
# 查看具体错误信息
```

### Q: 样式冲突？
A: PDF编辑器样式使用`.pdf-editor-container`作用域隔离，确保包装容器有此类名。

## 贡献指南

### 代码规范
- 使用TypeScript严格模式
- 遵循ESLint规则
- 使用Biome格式化代码
- 组件文件使用PascalCase命名
- 工具函数使用camelCase命名

### Git提交规范
```bash
feat: 添加新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建配置等
```

### Pull Request流程
1. Fork项目
2. 创建功能分支
3. 提交代码
4. 创建PR并描述变更

## 资源链接

- [Next.js文档](https://nextjs.org/docs)
- [Tailwind CSS文档](https://tailwindcss.com/docs)
- [shadcn/ui文档](https://ui.shadcn.com)
- [pdf-lib文档](https://pdf-lib.js.org)
- [PDF.js文档](https://mozilla.github.io/pdf.js/)
- [opentype.js文档](https://opentype.js.org)

## 支持

如遇问题，请查看：
- PROJECT_STATUS.md - 项目状态报告
- README.md - 项目概述
- GitHub Issues - 提交问题

---

Happy Coding! 🚀
