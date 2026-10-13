# 气象行业情报监测平台

自动抓取气象公司动态，使用 Claude AI 进行智能分析。

## 🚀 快速开始

### 1. 安装依赖

```bash
cd ~/Desktop/weather-intelligence-platform
npm install
```

### 2. 配置 API Key

已在 GitHub Secrets 中配置 `ANTHROPIC_API_KEY`

### 3. 本地测试运行

```bash
npm run update
```

或直接运行：

```bash
node update-daily.js
```

## 📊 功能特性

### 监测的公司

**国际公司：**
- AccuWeather
- The Weather Channel / The Weather Company
- Windy.com
- Weathernews (WNI)
- Clime
- Tomorrow.io
- Weather Underground
- WeatherBug

**国内公司：**
- 彩云天气
- 中国天气通
- 知天气
- 天气通
- 最美天气
- 2345天气王

### 数据抓取

- 🔍 自动搜索各公司的最新新闻
- 📰 从 Google News 获取行业动态
- 🕷️ 智能爬虫提取新闻内容

### AI 分析

- 🤖 使用 Claude Opus 5.5 进行深度分析
- 📊 自动评级（S=重大 / A=重要 / B=一般）
- 💡 生成对墨迹天气的影响分析
- 🎯 智能分类（AI/产品/商业/技术）

### 自动化

- ⏰ GitHub Actions 每天北京时间 9:00 自动运行
- 🔄 自动更新网站数据
- 📝 保留最近 50 条情报

## 🛠️ 技术架构

- **前端**: HTML + CSS + JavaScript (原生)
- **数据**: JSON 格式存储在 data.js
- **AI**: Anthropic Claude API
- **爬虫**: Axios + Cheerio
- **部署**: GitHub Pages
- **自动化**: GitHub Actions

## 📁 项目结构

```
weather-intelligence-platform/
├── index.html              # 主页面
├── app.js                  # 前端逻辑
├── styles.css              # 样式
├── data.js                 # 情报数据
├── update-daily.js         # 每日更新脚本 ⭐
├── package.json            # 依赖配置
└── .github/workflows/
    └── daily-update.yml    # 自动化配置
```

## 🔧 本地开发

### 测试数据更新

```bash
# 方式1: 使用真实的 Claude API (需要在环境变量设置 ANTHROPIC_API_KEY)
export ANTHROPIC_API_KEY="your-api-key-here"
node update-daily.js

# 方式2: 无 API key 时会使用简化分析
node update-daily.js
```

### 查看网站

```bash
# 用浏览器打开
open index.html

# 或使用简单服务器
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 🌐 在线访问

https://mabel-ops.github.io/weather-intelligence-platform/

## 📅 更新频率

- **自动更新**: 每天 9:00 AM (北京时间)
- **手动触发**: GitHub Actions 页面点击 "Run workflow"

## ⚙️ GitHub Actions 配置

在仓库的 Settings → Secrets and variables → Actions 中配置：

- `ANTHROPIC_API_KEY`: Claude API 密钥 ✅ 已配置

## 📝 数据格式

每条情报包含：

```json
{
  "id": 1234567890,
  "title": "情报标题",
  "company": "公司名称",
  "field": "ToC/ToB",
  "date": "2026-10-12",
  "type": "AI/产品/商业/技术",
  "rating": "S/A/B",
  "summary": "情报摘要",
  "source": "来源链接",
  "aiAnalysis": "AI分析",
  "impactOnMoji": "对墨迹天气的影响",
  "ratingReason": "评级理由"
}
```

## 🔍 工作原理

1. **数据抓取**: 搜索各公司的最新新闻（最近一周）
2. **智能筛选**: 使用 Claude AI 筛选有价值的情报
3. **深度分析**: AI 分析行业影响和对墨迹天气的启示
4. **数据更新**: 合并新旧数据，保持最新 50 条
5. **自动部署**: GitHub Pages 自动发布更新

## 💰 成本估算

- **Claude API**: 每天调用 1 次，约 $0.2-0.5/天
- **月成本**: 约 $6-15
- **GitHub**: 免费

## 🐛 故障排查

### 依赖安装失败

```bash
rm -rf node_modules package-lock.json
npm install
```

### API 调用失败

- 检查 ANTHROPIC_API_KEY 是否正确配置
- 检查 API 额度是否充足
- 查看错误日志

### 数据未更新

- 检查 GitHub Actions 运行日志
- 手动运行 `node update-daily.js` 测试
- 确认网络连接正常

## 📮 联系

有问题或建议？欢迎提 Issue！

---

🤖 Powered by Claude AI & GitHub Actions
