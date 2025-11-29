#!/bin/bash

echo "===== 检查所有页面是否包含Header和Footer ====="
echo ""

# 首页
echo "1. 检查首页 (src/app/page.tsx)"
if grep -q "Header" src/app/page.tsx && grep -q "Footer" src/app/page.tsx; then
  echo "   ✅ 首页包含Header和Footer"
else
  echo "   ❌ 首页缺少Header或Footer"
fi

# Edit PDF页面
echo "2. 检查Edit PDF页面 (src/app/(tools)/edit-pdf/PDFEditorClient.tsx)"
if grep -q "Header" src/app/\(tools\)/edit-pdf/PDFEditorClient.tsx && grep -q "Footer" src/app/\(tools\)/edit-pdf/PDFEditorClient.tsx; then
  echo "   ✅ Edit PDF页面包含Header和Footer"
else
  echo "   ❌ Edit PDF页面缺少Header或Footer"
fi

# 检查ToolPageTemplate
echo "3. 检查ToolPageTemplate模板 (src/components/shared/ToolPageTemplate.tsx)"
if grep -q "Header" src/components/shared/ToolPageTemplate.tsx && grep -q "Footer" src/components/shared/ToolPageTemplate.tsx; then
  echo "   ✅ ToolPageTemplate包含Header和Footer"
else
  echo "   ❌ ToolPageTemplate缺少Header或Footer"
fi

# 检查所有使用ToolPageTemplate的页面
echo "4. 检查所有工具页面是否使用ToolPageTemplate"
echo ""

total_pages=0
using_template=0
not_using_template=0

for file in $(find src/app/\(tools\) -name "page.tsx" -type f | grep -v edit-pdf); do
  total_pages=$((total_pages + 1))
  if grep -q "ToolPageTemplate" "$file"; then
    using_template=$((using_template + 1))
  else
    not_using_template=$((not_using_template + 1))
    echo "   ⚠️  未使用ToolPageTemplate: $file"
  fi
done

echo ""
echo "===== 统计结果 ====="
echo "总页面数: $total_pages"
echo "使用ToolPageTemplate: $using_template ✅"
echo "未使用ToolPageTemplate: $not_using_template $([ $not_using_template -eq 0 ] && echo '✅' || echo '❌')"
echo ""

if [ $not_using_template -eq 0 ]; then
  echo "🎉 所有工具页面都正确使用了ToolPageTemplate，因此都包含Header和Footer"
else
  echo "⚠️  有 $not_using_template 个页面需要更新"
fi
