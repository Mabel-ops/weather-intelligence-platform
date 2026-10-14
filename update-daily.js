#!/usr/bin/env node

/**
 * 气象行业情报监测平台 - 每日数据更新脚本
 *
 * 功能：
 * 1. 从多个可靠数据源抓取气象公司的最新动态
 * 2. 使用 Claude API 进行智能分析
 * 3. 生成结构化的情报数据
 */

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const axios = require('axios');
const cheerio = require('cheerio');

// 监测的公司和数据源 - ToC
const NEWS_SOURCES = [
    // 科技新闻 - 商业和产品动态
    {
        type: 'google_rss',
        name: 'Weather Company News',
        category: 'toc',
        url: 'https://news.google.com/rss/search?q=(AccuWeather+OR+"Weather+Channel"+OR+Windy+OR+Tomorrow.io)+(launch+OR+feature+OR+partnership+OR+funding+OR+acquisition)&hl=en-US&gl=US&ceid=US:en',
        keywords: []
    },
    {
        type: 'google_rss',
        name: 'Weather Tech & Business',
        category: 'toc',
        url: 'https://news.google.com/rss/search?q="weather+app"+(AI+OR+technology+OR+acquisition+OR+funding+OR+release)+-forecast+-tomorrow+-today&hl=en-US&gl=US&ceid=US:en',
        keywords: []
    },
    // 中文新闻
    {
        type: 'google_rss',
        name: '气象科技新闻',
        category: 'toc',
        url: 'https://news.google.com/rss/search?q=(彩云天气+OR+墨迹天气+OR+天气通)+(发布+OR+融资+OR+合作+OR+功能)&hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
        keywords: []
    },
    // TechCrunch (过滤更严格)
    {
        type: 'rss',
        name: 'TechCrunch',
        category: 'toc',
        url: 'https://techcrunch.com/feed/',
        keywords: ['AccuWeather', 'weather app', 'weather company', 'Windy', 'Tomorrow.io', 'ClimaCell']
    }
];

// ToB 行业新闻数据源
const TOB_NEWS_SOURCES = [
    // 航空气象
    {
        type: 'google_rss',
        name: 'Aviation Weather Services',
        category: 'aviation',
        url: 'https://news.google.com/rss/search?q=("aviation+weather"+OR+"flight+weather"+OR+"airport+weather")+(service+OR+system+OR+technology+OR+contract)&hl=en-US&gl=US&ceid=US:en',
        keywords: [],
        timeRange: 'qdr:m2' // 近2个月
    },
    // 能源气象
    {
        type: 'google_rss',
        name: 'Energy Weather Services',
        category: 'energy',
        url: 'https://news.google.com/rss/search?q=("renewable+energy"+OR+"wind+power"+OR+"solar+energy")+(weather+forecast+OR+weather+data+OR+meteorological)&hl=en-US&gl=US&ceid=US:en',
        keywords: [],
        timeRange: 'qdr:m2'
    },
    // 交通气象
    {
        type: 'google_rss',
        name: 'Transportation Weather',
        category: 'transportation',
        url: 'https://news.google.com/rss/search?q=("railway+weather"+OR+"metro+weather"+OR+"transportation+weather")+(service+OR+system+OR+forecast)&hl=en-US&gl=US&ceid=US:en',
        keywords: [],
        timeRange: 'qdr:m2'
    }
];

// 行业趋势数据源
const TREND_SOURCES = [
    {
        type: 'google_rss',
        name: 'Weather Industry Trends',
        category: 'trend',
        url: 'https://news.google.com/rss/search?q=("weather+industry"+OR+"meteorology+industry")+(trend+OR+report+OR+analysis+OR+forecast+OR+"market+research")&hl=en-US&gl=US&ceid=US:en',
        keywords: [],
        timeRange: 'qdr:m2'
    },
    {
        type: 'google_rss',
        name: 'Climate Tech Trends',
        category: 'trend',
        url: 'https://news.google.com/rss/search?q="climate+tech"+(trend+OR+investment+OR+"market+report"+OR+growth)&hl=en-US&gl=US&ceid=US:en',
        keywords: [],
        timeRange: 'qdr:m2'
    },
    {
        type: 'google_rss',
        name: 'AI Weather Trends',
        category: 'trend',
        url: 'https://news.google.com/rss/search?q=("AI+weather"+OR+"artificial+intelligence+meteorology")+(breakthrough+OR+innovation+OR+trend)&hl=en-US&gl=US&ceid=US:en',
        keywords: [],
        timeRange: 'qdr:m2'
    }
];

// 重点监测公司
const TARGET_COMPANIES = [
    'AccuWeather', 'Weather Channel', 'Weather Company', 'Windy', 'Weathernews',
    'WNI', 'Clime', 'Tomorrow.io', 'ClimaCell', 'Weather Underground', 'WeatherBug',
    '彩云天气', 'ColorfulClouds', '中国天气', '知天气', '天气通', '最美天气', '2345天气'
];

class WeatherIntelUpdater {
    constructor() {
        this.dataPath = path.join(__dirname, 'data.js');
        this.today = new Date().toISOString().split('T')[0];
        this.apiKey = process.env.ANTHROPIC_API_KEY;

        if (this.apiKey) {
            this.anthropic = new Anthropic({ apiKey: this.apiKey });
        }
    }

    /**
     * 主更新流程
     */
    async update() {
        console.log('=== 气象情报平台 - 每日数据更新 ===');
        console.log(`更新时间: ${new Date().toLocaleString('zh-CN')}`);
        console.log(`生成日期: ${this.today}`);

        try {
            // 读取现有数据
            const currentData = this.loadCurrentData();

            // 1. 抓取 ToC 新闻数据
            console.log('\n📱 抓取 ToC 竞品新闻...');
            const tocNews = await this.fetchNews(NEWS_SOURCES);
            console.log(`✓ ToC: 抓取到 ${tocNews.length} 条相关新闻`);

            // 2. 抓取 ToB 行业新闻
            console.log('\n🏢 抓取 ToB 行业新闻...');
            const tobNews = await this.fetchNews(TOB_NEWS_SOURCES);
            console.log(`✓ ToB: 抓取到 ${tobNews.length} 条相关新闻`);

            // 3. 抓取行业趋势
            console.log('\n📈 抓取行业趋势报告...');
            const trendNews = await this.fetchNews(TREND_SOURCES);
            console.log(`✓ 趋势: 抓取到 ${trendNews.length} 条相关新闻`);

            // 如果都没抓到数据，使用模拟数据
            if (tocNews.length === 0 && tobNews.length === 0 && trendNews.length === 0) {
                console.log('⚠️ 未抓取到任何新闻，使用模拟数据');
                const mockIntel = this.generateMockIntel();
                const updatedData = this.mergeData(currentData, { tocIntelligence: mockIntel, tobIntelligence: [], trends: [] });
                this.saveData(updatedData);
                console.log('✓ 数据更新完成（模拟数据）');
                return;
            }

            // 使用 Claude AI 分析各类数据
            console.log('\n🤖 AI 分析中...');
            const tocIntel = tocNews.length > 0 ? await this.analyzeWithClaude(tocNews, 'toc') : [];
            const tobIntel = tobNews.length > 0 ? await this.analyzeToBNews(tobNews) : { aviation: [], energy: [], subway: [] };
            const trends = trendNews.length > 0 ? await this.analyzeTrends(trendNews) : [];

            console.log(`✓ ToC情报: ${tocIntel.length} 条`);
            console.log(`✓ ToB情报: 航空 ${tobIntel.aviation.length}, 能源 ${tobIntel.energy.length}, 地铁 ${tobIntel.subway.length}`);
            console.log(`✓ 趋势: ${trends.length} 条`);

            // 更新数据
            const updatedData = this.mergeData(currentData, { tocIntelligence: tocIntel, tobIntelligence: tobIntel, trends: trends });

            // 保存数据
            this.saveData(updatedData);

            console.log('\n✅ 数据更新完成');

        } catch (error) {
            console.error('✗ 更新失败:', error.message);
            console.error(error);
            process.exit(1);
        }
    }

    /**
     * 抓取新闻数据
     */
    async fetchNews(sources) {
        const allNews = [];

        for (const source of sources) {
            try {
                let news = [];

                if (source.type === 'rss' || source.type === 'google_rss') {
                    news = await this.fetchRSS(source);
                }

                // 为每条新闻添加类别标记
                news.forEach(item => {
                    item.category = source.category;
                });

                allNews.push(...news);
                console.log(`  ✓ ${source.name}: ${news.length} 条`);

                // 避免请求过快
                await this.sleep(500);
            } catch (error) {
                console.error(`  ✗ ${source.name} 抓取失败:`, error.message);
            }
        }

        console.log(`  原始新闻总数: ${allNews.length}`);

        // 统计各类别
        const categories = {};
        allNews.forEach(n => {
            categories[n.category] = (categories[n.category] || 0) + 1;
        });
        console.log(`  类别分布:`, categories);

        // 过滤相关新闻
        const relevantNews = this.filterRelevantNews(allNews);
        console.log(`  过滤后: ${relevantNews.length} 条`);

        // 过滤后的类别统计
        const filteredCategories = {};
        relevantNews.forEach(n => {
            filteredCategories[n.category] = (filteredCategories[n.category] || 0) + 1;
        });
        console.log(`  过滤后类别:`, filteredCategories);

        // 去重
        const uniqueNews = this.deduplicateNews(relevantNews);

        // 对于 ToB 和趋势，返回所有去重后的数据（不限制数量）
        // 对于 ToC，限制为 20 条
        const category = sources[0]?.category;
        if (category === 'toc') {
            return uniqueNews.slice(0, 20);
        } else {
            // ToB 和趋势返回全部数据，让后续方法按类别处理
            return uniqueNews;
        }
    }

    /**
     * 抓取 RSS 源
     */
    async fetchRSS(source) {
        const news = [];

        try {
            // 如果有时间范围参数，添加到 URL
            let url = source.url;
            if (source.timeRange) {
                url = url.includes('?')
                    ? `${url}&tbs=${source.timeRange}`
                    : `${url}?tbs=${source.timeRange}`;
            }

            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                },
                timeout: 15000
            });

            const $ = cheerio.load(response.data, { xmlMode: true });

            $('item').each((i, elem) => {
                // 移除数量限制，抓取 RSS 源中的所有新闻

                const $item = $(elem);
                const title = $item.find('title').text().trim();
                const link = $item.find('link').text().trim();
                const description = $item.find('description').text().trim();
                const pubDate = $item.find('pubDate').text().trim();

                if (title) {
                    // 检查是否相关
                    const isRelevant = source.keywords.length === 0 ||
                        source.keywords.some(kw =>
                            title.toLowerCase().includes(kw.toLowerCase()) ||
                            description.toLowerCase().includes(kw.toLowerCase())
                        );

                    if (isRelevant) {
                        news.push({
                            title,
                            snippet: this.cleanHTML(description),
                            source: link,
                            date: this.parseDate(pubDate),
                            rawText: title + ' ' + description
                        });
                    }
                }
            });
        } catch (error) {
            throw new Error(`RSS fetch failed: ${error.message}`);
        }

        return news;
    }

    /**
     * 过滤相关新闻
     */
    filterRelevantNews(newsItems) {
        return newsItems.filter(item => {
            const text = (item.title + ' ' + item.snippet).toLowerCase();

            // 对于 ToB 和趋势类新闻，使用更宽松的过滤
            if (item.category === 'aviation' || item.category === 'energy' ||
                item.category === 'transportation' || item.category === 'trend') {

                // 排除明显不相关的天气预报
                const isForecastNews = text.includes('degrees') ||
                                      text.includes('celsius') ||
                                      text.includes('tomorrow will be') ||
                                      text.includes('today\'s weather');

                return !isForecastNews;
            }

            // ToC 新闻的原有严格过滤
            const hasCompany = TARGET_COMPANIES.some(company =>
                text.includes(company.toLowerCase())
            );

            if (!hasCompany) return false;

            // 排除天气预报类新闻（更严格）
            const forecastKeywords = [
                'forecast', 'hurricane', 'storm', 'rain', 'snow', 'temperature',
                'degrees', 'celsius', 'fahrenheit', 'weather today', 'weather tomorrow',
                'cold front', 'warm front', 'high pressure', 'low pressure',
                '飓风', '暴风', '降雨', '降温', '天气预报', '今日天气', '明日天气'
            ];

            const isForecastNews = forecastKeywords.some(kw => text.includes(kw));

            // 必须包含商业/产品关键词
            const businessKeywords = [
                'launch', 'release', 'funding', 'acquisition', 'partnership', 'feature',
                'ai', 'app', 'update', 'version', 'technology', 'innovation',
                '发布', '融资', '收购', '合作', '功能', '更新', '版本', '技术', '创新'
            ];

            const hasBusinessKeyword = businessKeywords.some(kw => text.includes(kw));

            return !isForecastNews && hasBusinessKeyword;
        });
    }

    /**
     * 使用 Claude AI 分析新闻
     */
    async analyzeWithClaude(newsItems, category = 'toc') {
        if (!this.anthropic) {
            console.log('  未检测到 ANTHROPIC_API_KEY，使用简化分析');
            return this.fallbackAnalysis(newsItems, category);
        }

        console.log('→ 调用 Claude API 分析新闻...');

        const prompt = this.buildAnalysisPrompt(newsItems);

        try {
            const message = await this.anthropic.messages.create({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 4096,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            });

            const responseText = message.content[0].text;

            // 解析 JSON 响应
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const result = JSON.parse(jsonMatch[0]);
                return result.intelligence || [];
            }

            console.warn('  ⚠ Claude 响应格式不正确，使用简化分析');
            return this.fallbackAnalysis(newsItems, category);

        } catch (error) {
            console.error('  ✗ Claude API 调用失败:', error.message);
            return this.fallbackAnalysis(newsItems, category);
        }
    }

    /**
     * 构建 Claude 分析 Prompt
     */
    buildAnalysisPrompt(newsItems) {
        const newsText = newsItems.map((item, i) =>
            `${i + 1}. ${item.title}\n   ${item.snippet}\n   来源: ${item.source}`
        ).join('\n\n');

        return `你是气象行业情报分析专家。请分析以下气象公司的最新新闻，筛选出有价值的情报。

今天日期：${this.today}

监测公司：AccuWeather, The Weather Channel, Windy, Weathernews, Tomorrow.io, 彩云天气等气象服务企业

新闻列表：
${newsText}

任务要求：
1. 从以上新闻中筛选出 3-5 条最有价值的情报
2. 评估每条情报的重要性（S=重大/A=重要/B=一般）
3. 分析对墨迹天气的影响和启示
4. 只选择真正有价值的新闻（重大功能发布、战略合作、融资、技术突破等）

输出 JSON 格式：
{
  "intelligence": [
    {
      "id": <时间戳>,
      "title": "<简洁标题，20字内>",
      "company": "<公司名>",
      "field": "ToC",
      "date": "${this.today}",
      "type": "AI/产品/商业/技术",
      "rating": "S/A/B",
      "summary": "<情报摘要，80字内>",
      "source": "<原始链接>",
      "aiAnalysis": "<深层分析，50字内>",
      "impactOnMoji": "对墨迹天气的影响：<具体影响，60字内>",
      "ratingReason": "<评级理由，40字内>"
    }
  ]
}`;
    }

    /**
     * 备用分析方法
     */
    fallbackAnalysis(newsItems, category = 'toc') {
        const intelligence = [];

        // 对于 ToB 和趋势，所有通过过滤的新闻都保留
        const isToB = category.startsWith('tob-');
        const isTrend = category === 'trend';

        const importantKeywords = ['AI', 'artificial intelligence', '融资', 'funding', '收购', 'acquire',
                                   '合作', 'partner', 'launch', 'release', '发布', 'new feature', '功能',
                                   'system', 'service', 'technology', 'innovation', 'contract'];

        for (const news of newsItems) {
            const text = news.title + ' ' + news.snippet;

            // ToB 和趋势新闻：更宽松，只要不是明显无关就保留
            const shouldInclude = isToB || isTrend ||
                importantKeywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()));

            if (shouldInclude && intelligence.length < 20) {
                const company = this.extractCompany(text);

                intelligence.push({
                    id: Date.now() + Math.random() * 1000,
                    title: news.title.substring(0, 60),
                    company: company,
                    field: isToB ? "ToB" : "ToC",
                    date: this.today,
                    type: this.guessType(text),
                    rating: "B",
                    summary: news.snippet.substring(0, 150),
                    source: news.source,
                    aiAnalysis: isToB ? `${category.split('-')[1]}气象领域的最新动态` :
                               isTrend ? '行业趋势值得关注' :
                               `${company}的最新动态值得关注`,
                    impactOnMoji: isToB ? "对墨迹天气的影响：可关注ToB业务拓展机会" :
                                 isTrend ? "对墨迹天气的影响：行业趋势洞察" :
                                 "对墨迹天气的影响：建议持续跟踪该公司动态",
                    ratingReason: "行业动态，具有参考价值"
                });
            }
        }

        return intelligence;
    }

    /**
     * 提取公司名
     */
    extractCompany(text) {
        for (const company of TARGET_COMPANIES) {
            if (text.includes(company)) {
                return company;
            }
        }
        return '气象公司';
    }

    /**
     * 猜测类型
     */
    guessType(text) {
        text = text.toLowerCase();
        if (text.includes('ai') || text.includes('intelligence') || text.includes('machine learning')) return 'AI';
        if (text.includes('partner') || text.includes('合作') || text.includes('funding') || text.includes('融资')) return '商业';
        if (text.includes('feature') || text.includes('product') || text.includes('功能') || text.includes('产品')) return '产品';
        return '技术';
    }

    /**
     * 生成模拟情报
     */
    generateMockIntel() {
        const companies = ['AccuWeather', 'The Weather Channel', 'Windy.com', '彩云天气'];
        const types = ['AI', '产品', '商业', '技术'];
        const updates = [
            '推出AI驱动的新预测功能',
            '优化用户界面体验',
            '扩展国际市场',
            '升级预测算法精度'
        ];

        const intel = [];
        for (let i = 0; i < 3; i++) {
            const company = companies[i % companies.length];
            const type = types[i % types.length];

            intel.push({
                id: Date.now() + i,
                title: `${company}${updates[i]}`,
                company: company,
                field: "ToC",
                date: this.today,
                type: type,
                rating: "B",
                summary: `${company}近期${updates[i]}，旨在提升用户体验和预测准确率。`,
                source: `https://${company.toLowerCase().replace(/\s+/g, '')}.com`,
                aiAnalysis: `${company}此举反映了行业向智能化方向发展的趋势`,
                impactOnMoji: "对墨迹天气的影响：可作为产品规划参考",
                ratingReason: "常规功能更新，行业普遍趋势"
            });
        }

        return intel;
    }

    // 工具方法
    cleanHTML(html) {
        return html.replace(/<[^>]*>/g, '').substring(0, 200);
    }

    parseDate(dateStr) {
        try {
            const date = new Date(dateStr);
            return date.toISOString().split('T')[0];
        } catch {
            return this.today;
        }
    }

    deduplicateNews(newsItems) {
        const seen = new Set();
        return newsItems.filter(item => {
            const key = item.title.toLowerCase().substring(0, 30);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    /**
     * 合并新旧数据
     */
    mergeData(currentData, newData) {
        // 合并 ToC 情报
        const allTocIntel = [...(newData.tocIntelligence || []), ...(currentData.tocIntelligence || [])];
        const uniqueTocIntel = this.deduplicateByTitle(allTocIntel).slice(0, 50);

        // 合并 ToB 情报
        const tobIntelligence = newData.tobIntelligence || currentData.tobIntelligence || { aviation: [], energy: [], subway: [] };
        const tobIndustry = {
            aviation: this.deduplicateByTitle([...(tobIntelligence.aviation || []), ...(currentData.tobIndustry?.aviation || [])]).slice(0, 20),
            energy: this.deduplicateByTitle([...(tobIntelligence.energy || []), ...(currentData.tobIndustry?.energy || [])]).slice(0, 20),
            subway: this.deduplicateByTitle([...(tobIntelligence.subway || []), ...(currentData.tobIndustry?.subway || [])]).slice(0, 20)
        };

        // 合并行业趋势
        const allTrends = [...(newData.trends || []), ...(currentData.industryTrends || [])];
        const uniqueTrends = this.deduplicateByTitle(allTrends).slice(0, 20);

        // 统计数据
        const stats = {
            weeklyIntel: this.countThisWeek(uniqueTocIntel),
            keyIntel: uniqueTocIntel.filter(i => i.rating === 'S' || i.rating === 'A').length,
            companies: 19,
            trends: uniqueTrends.length
        };

        const aiWeeklySummary = this.generateWeeklySummary(uniqueTocIntel);

        return {
            stats,
            aiWeeklySummary,
            tocIntelligence: uniqueTocIntel,
            tobIndustry: tobIndustry,
            industryTrends: uniqueTrends
        };
    }

    deduplicateByTitle(items) {
        const seen = new Set();
        return items.filter(item => {
            const key = item.title.substring(0, 20);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    countThisWeek(items) {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return items.filter(item => new Date(item.date) >= weekAgo).length;
    }

    generateWeeklySummary(items) {
        const recent = items.slice(0, 10);
        const aiItems = recent.filter(i => i.type === 'AI');

        return `本周气象行业ToC领域，主要竞品在${aiItems.length > 0 ? 'AI技术' : '产品功能'}方面持续投入。${
            recent.length > 0 ? recent[0].company + '等厂商' : '各大厂商'
        }发布了多项更新，行业整体呈现智能化、精细化发展趋势。`;
    }

    loadCurrentData() {
        try {
            const content = fs.readFileSync(this.dataPath, 'utf-8');
            const dataMatch = content.match(/const MOCK_DATA = ({[\s\S]*});?\s*$/m);
            if (dataMatch) {
                return eval('(' + dataMatch[1] + ')');
            }
        } catch (error) {
            console.error('读取数据失败:', error);
        }
        return this.getDefaultStructure();
    }

    getDefaultStructure() {
        return {
            stats: { weeklyIntel: 0, keyIntel: 0, companies: 19, trends: 0 },
            aiWeeklySummary: "",
            tocIntelligence: [],
            tobIndustry: { subway: [], aviation: [], energy: [] },
            industryTrends: []
        };
    }

    saveData(data) {
        const content = `// 气象行业情报监测平台 - 数据文件\n// 最后更新: ${new Date().toLocaleString('zh-CN')}\n\nconst MOCK_DATA = ${JSON.stringify(data, null, 4)};\n`;
        fs.writeFileSync(this.dataPath, content, 'utf-8');
        console.log(`  数据已保存到: ${this.dataPath}`);
    }

    /**
     * 分析 ToB 行业新闻
     */
    async analyzeToBNews(newsItems) {
        const aviation = newsItems.filter(n => n.category === 'aviation');
        const energy = newsItems.filter(n => n.category === 'energy');
        const transportation = newsItems.filter(n => n.category === 'transportation');

        console.log(`  分类统计: 航空 ${aviation.length}, 能源 ${energy.length}, 交通 ${transportation.length}`);

        const result = {
            aviation: aviation.length > 0 ? await this.analyzeWithClaude(aviation, 'tob-aviation') : [],
            energy: energy.length > 0 ? await this.analyzeWithClaude(energy, 'tob-energy') : [],
            subway: transportation.length > 0 ? await this.analyzeWithClaude(transportation, 'tob-subway') : []
        };

        return result;
    }

    /**
     * 分析行业趋势
     */
    async analyzeTrends(newsItems) {
        if (!this.anthropic) {
            // 简化分析
            return newsItems.slice(0, 5).map(news => ({
                id: Date.now() + Math.random() * 1000,
                title: news.title.substring(0, 60),
                date: this.today,
                type: '趋势',
                summary: news.snippet.substring(0, 120),
                source: news.source,
                impact: '行业趋势，值得关注'
            }));
        }

        try {
            const prompt = `你是气象行业分析专家。请分析以下行业趋势新闻，提取关键趋势。

今天日期：${this.today}

新闻列表：
${newsItems.map((item, i) => `${i + 1}. ${item.title}\n   ${item.snippet}`).join('\n\n')}

输出 JSON 格式：
{
  "trends": [
    {
      "id": <timestamp>,
      "title": "<趋势标题，30字内>",
      "date": "${this.today}",
      "type": "趋势",
      "summary": "<趋势摘要，100字内>",
      "source": "<原始链接>",
      "impact": "<对行业的影响，60字内>"
    }
  ]
}`;

            const message = await this.anthropic.messages.create({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 4096,
                messages: [{ role: 'user', content: prompt }]
            });

            const responseText = message.content[0].text;
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const result = JSON.parse(jsonMatch[0]);
                return result.trends || [];
            }
        } catch (error) {
            console.error('  ✗ 趋势分析失败:', error.message);
        }

        return [];
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 执行更新
if (require.main === module) {
    const updater = new WeatherIntelUpdater();
    updater.update().catch(error => {
        console.error('更新失败:', error);
        process.exit(1);
    });
}

module.exports = WeatherIntelUpdater;
