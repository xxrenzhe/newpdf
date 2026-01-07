# PDF可分享链接功能实现文档

## 功能概述

现在PDF编辑器支持可分享的链接功能。每个上传的PDF文件都会获得一个唯一的ID，可以通过特定的URL访问和编辑。

## 实现细节

### 1. 文件上传流程

**路径**: `/api/pdf/upload`

当用户上传PDF文件时：
1. 生成16位十六进制唯一ID（例如：`a1b2c3d4e5f6g7h8`）
2. 文件保存为：`uploads/pdfs/{fileId}_{原始文件名}`
3. 元数据保存为：`uploads/pdfs/{fileId}.json`
4. 返回可分享的URL：`/edit-pdf/{fileId}`

**响应示例**:
```json
{
  "success": true,
  "fileId": "a1b2c3d4e5f6g7h8",
  "fileName": "document.pdf",
  "url": "/edit-pdf/a1b2c3d4e5f6g7h8"
}
```

### 2. 文件访问流程

**路径**: `/api/pdf/[fileId]`

通过fileId获取PDF文件：
1. 验证fileId格式（16位十六进制）
2. 读取元数据文件
3. 读取PDF文件并转换为base64
4. 返回文件数据

**响应示例**:
```json
{
  "success": true,
  "fileId": "a1b2c3d4e5f6g7h8",
  "fileName": "document.pdf",
  "fileData": "base64编码的PDF数据",
  "size": 1024000,
  "uploadedAt": "2025-11-29T15:00:00.000Z"
}
```

### 3. 动态路由

**路径**: `/edit-pdf/[fileId]`

- 接收fileId参数
- 调用API获取PDF文件
- 加载PDF编辑器
- 显示加载状态和错误处理

### 4. 文件结构

```
src/
├── app/
│   ├── (tools)/
│   │   └── edit-pdf/
│   │       ├── page.tsx                    # 原始上传页面
│   │       ├── PDFEditorClient.tsx         # PDF编辑器组件
│   │       └── [fileId]/                   # 动态路由
│   │           ├── page.tsx                # 文件ID页面
│   │           └── PDFEditorWithFile.tsx   # 文件加载组件
│   └── api/
│       └── pdf/
│           ├── upload/
│           │   └── route.ts                # 上传API
│           └── [fileId]/
│               └── route.ts                # 获取文件API
└── components/
    └── shared/
        └── FileUpload.tsx                  # 文件上传组件

uploads/
└── pdfs/
    ├── {fileId}_{filename}.pdf             # PDF文件
    └── {fileId}.json                       # 元数据
```

## 使用方法

### 上传并获取可分享链接

1. 访问 `http://localhost:3100/edit-pdf`
2. 上传PDF文件
3. 自动跳转到 `http://localhost:3100/edit-pdf/{fileId}`
4. 复制URL即可分享

### 通过链接访问

1. 打开分享的链接：`http://localhost:3100/edit-pdf/{fileId}`
2. 系统自动加载PDF文件
3. 开始编辑

## 特性

### ✅ 已实现

- 唯一文件ID生成
- 文件上传和存储
- 元数据管理
- 动态路由访问
- 文件获取API
- 加载状态显示
- 错误处理
- 文件大小限制（50MB）
- 文件类型验证（仅PDF）

### 🔒 安全特性

- fileId格式验证（防止路径遍历）
- 文件类型验证
- 文件大小限制
- 错误信息不泄露系统路径

### 📝 元数据存储

每个上传的文件都有对应的JSON元数据：

```json
{
  "id": "a1b2c3d4e5f6g7h8",
  "originalName": "document.pdf",
  "fileName": "a1b2c3d4e5f6g7h8_document.pdf",
  "size": 1024000,
  "uploadedAt": "2025-11-29T15:00:00.000Z"
}
```

## 测试步骤

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **上传测试文件**
   - 访问 http://localhost:3100/edit-pdf
   - 上传一个PDF文件
   - 观察URL变化为 `/edit-pdf/{fileId}`

3. **测试分享链接**
   - 复制当前URL
   - 在新标签页打开
   - 验证PDF正确加载

4. **测试错误处理**
   - 访问无效的fileId：`/edit-pdf/invalid123`
   - 应显示错误页面

## 注意事项

### 文件存储

- 文件存储在 `uploads/pdfs/` 目录
- 该目录已添加到 `.gitignore`
- 生产环境建议使用云存储（S3、OSS等）

### 文件清理

当前实现没有自动清理机制。建议：
- 添加定时任务清理过期文件
- 或实现文件过期时间
- 或添加用户删除功能

### 性能优化建议

1. **大文件处理**
   - 考虑使用流式传输
   - 实现分块上传

2. **缓存策略**
   - 添加Redis缓存fileId映射
   - 实现CDN缓存

3. **数据库集成**
   - 使用数据库存储元数据
   - 实现用户关联
   - 添加访问统计

## 下一步改进

### 可选功能

- [ ] 文件过期时间设置
- [ ] 访问密码保护
- [ ] 访问次数限制
- [ ] 编辑历史记录
- [ ] 多人协作编辑
- [ ] 文件版本管理
- [ ] 用户账户系统
- [ ] 文件夹组织
- [ ] 批量上传
- [ ] 拖拽排序

### 生产环境部署

1. **环境变量配置**
   ```env
   UPLOAD_DIR=/path/to/uploads
   MAX_FILE_SIZE=52428800
   FILE_EXPIRY_DAYS=7
   ```

2. **云存储集成**
   - AWS S3
   - 阿里云OSS
   - 腾讯云COS

3. **CDN配置**
   - 静态资源CDN
   - 文件下载CDN

## API文档

### POST /api/pdf/upload

上传PDF文件并获取可分享链接

**请求**:
- Content-Type: multipart/form-data
- Body: file (PDF文件)

**响应**:
```json
{
  "success": true,
  "fileId": "string",
  "fileName": "string",
  "url": "string"
}
```

**错误响应**:
```json
{
  "error": "错误信息"
}
```

### GET /api/pdf/[fileId]

获取PDF文件数据

**参数**:
- fileId: 16位十六进制字符串

**响应**:
```json
{
  "success": true,
  "fileId": "string",
  "fileName": "string",
  "fileData": "base64 string",
  "size": number,
  "uploadedAt": "ISO date string"
}
```

**错误响应**:
```json
{
  "error": "错误信息"
}
```

## 故障排除

### 问题：文件上传失败

**可能原因**:
1. uploads目录不存在
2. 权限不足
3. 文件大小超限

**解决方案**:
```bash
mkdir -p uploads/pdfs
chmod 755 uploads/pdfs
```

### 问题：无法访问分享链接

**可能原因**:
1. fileId不存在
2. 文件已被删除
3. 元数据损坏

**解决方案**:
- 检查 `uploads/pdfs/` 目录
- 验证元数据文件存在
- 重新上传文件

## 总结

现在PDF编辑器已经支持完整的可分享链接功能：

1. ✅ 上传文件自动生成唯一ID
2. ✅ 通过URL访问特定文件
3. ✅ 完整的错误处理
4. ✅ 加载状态显示
5. ✅ 安全验证机制

用户可以：
- 上传PDF获取可分享链接
- 通过链接直接访问和编辑PDF
- 分享链接给他人协作

链接格式：`http://localhost:3100/edit-pdf/{fileId}`
