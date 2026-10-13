#!/bin/bash

echo "=== 气象情报平台 - 安装和测试 ==="
echo ""

# 检查当前目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

echo "📦 步骤 1/3: 安装依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "✅ 依赖安装完成"
echo ""

echo "🧪 步骤 2/3: 测试运行..."
echo "提示：如果没有设置 ANTHROPIC_API_KEY 环境变量，将使用简化分析模式"
echo ""

# 运行更新脚本
node update-daily.js

if [ $? -ne 0 ]; then
    echo "❌ 测试运行失败"
    exit 1
fi

echo ""
echo "✅ 测试运行成功"
echo ""

echo "🌐 步骤 3/3: 查看结果..."
echo ""
echo "数据已更新到 data.js"
echo ""
echo "你可以："
echo "  1. 在浏览器中打开 index.html 查看网站"
echo "  2. 或运行: python3 -m http.server 8000"
echo "     然后访问: http://localhost:8000"
echo ""
echo "✨ 全部完成！"
