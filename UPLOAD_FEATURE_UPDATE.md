# 首页文件上传功能更新

## 修复内容

修复了首页"Choose File"按钮的功能，现在上传PDF文件后会自动进入PDF编辑页面。

## 修改的文件

### 1. `/src/components/shared/FileUpload.tsx`

**改动**：
- 添加了 `useRouter` hook 用于页面导航
- 修改 `handleFile` 函数为异步函数，添加PDF文件类型验证
- 新增 `navigateToEditor` 函数：
  - 将PDF文件转换为base64格式
  - 存储到sessionStorage中（键：`pdfData` 和 `pdfFileName`）
  - 自动跳转到 `/edit-pdf` 页面
- 进度条完成后自动调用导航函数

**工作流程**：
```
用户选择文件 → 验证PDF类型 → 显示进度条 → 转换为base64 → 存储到sessionStorage → 跳转到编辑页面
```

### 2. `/src/app/(tools)/edit-pdf/PDFEditorClient.tsx`

**改动**：
- 添加 `useEffect` hook 在组件加载时检查sessionStorage
- 如果发现存储的PDF数据：
  - 将base64转换回ArrayBuffer
  - 创建File对象
  - 自动加载到编辑器中
  - 清除sessionStorage数据（避免重复加载）

**工作流程**：
```
页面加载 → 检查sessionStorage → 读取PDF数据 → 转换为ArrayBuffer → 创建File对象 → 加载编辑器 → 清除存储
```

### 3. `/webpack-html-function-loader.js`

**改动**（之前的修复）：
- 修复了模板变量替换问题
- 将 `<%= ASSETS_URL %>` 替换为 `/assets/`
- 保留 `${LANG_MESSAGES.xxx}` 用于运行时替换

### 4. `/package.json`

**改动**：
- 修改开发服务器端口从 `3003` 改为 `3100`

## 技术细节

### 数据传输方式
使用 **sessionStorage** 而非 URL 参数或 localStorage：
- ✅ 不会因为URL过长而出错（base64数据可能很大）
- ✅ 仅在当前会话有效，关闭浏览器后自动清除
- ✅ 页面刷新后不会重复加载文件
- ✅ 比localStorage更安全，不会长期保存敏感数据

### Base64编码
```javascript
// 编码（FileUpload.tsx）
const arrayBuffer = await file.arrayBuffer();
const base64 = btoa(
  new Uint8Array(arrayBuffer).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ''
  )
);

// 解码（PDFEditorClient.tsx）
const binaryString = atob(storedData);
const bytes = new Uint8Array(binaryString.length);
for (let i = 0; i < binaryString.length; i++) {
  bytes[i] = binaryString.charCodeAt(i);
}
const arrayBuffer = bytes.buffer;
```

## 用户体验流程

1. 用户访问首页 `http://localhost:3100`
2. 点击"Choose File"按钮或拖拽PDF文件
3. 系统验证文件类型（仅接受PDF）
4. 显示进度条动画（2秒）
5. 自动跳转到 `/edit-pdf` 页面
6. PDF编辑器自动加载文件
7. 用户可以立即开始编辑

## 测试建议

1. **正常流程测试**：
   - 在首页上传PDF文件
   - 验证是否自动跳转到编辑页面
   - 验证PDF是否正确加载

2. **边界情况测试**：
   - 上传非PDF文件（应显示错误提示）
   - 上传超大文件（>100MB，应显示大小限制提示）
   - 刷新编辑页面（应显示上传界面，不重复加载）

3. **多标签页测试**：
   - 在不同标签页上传文件
   - 验证sessionStorage隔离性

## 服务器状态

✅ 服务已启动在端口 **3100**
✅ 所有页面编译成功
✅ webpack模板变量替换正常工作

访问地址：
- 首页：http://localhost:3100
- 编辑页面：http://localhost:3100/edit-pdf

## 已知优化点

1. 可以添加加载动画在跳转时
2. 可以添加文件大小压缩提示
3. 可以添加上传历史记录功能
4. 可以优化大文件的base64编码性能
