// 气象行业情报监测平台 - 简化版（只显示真实数据）

class WeatherIntelligencePlatform {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.renderPage('home');
        this.updateTime();
    }

    attachEventListeners() {
        // 导航切换
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                if (page) {
                    this.renderPage(page);
                    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                    e.target.classList.add('active');
                }
            });
        });

        // 全局搜索
        document.querySelector('.search-btn').addEventListener('click', () => {
            this.handleSearch();
        });

        document.getElementById('globalSearch').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }

    renderPage(page) {
        this.currentPage = page;
        const container = document.getElementById('pageContainer');

        switch(page) {
            case 'home':
                container.innerHTML = this.renderHomePage();
                break;
            case 'toc':
                container.innerHTML = this.renderIntelligencePage();
                break;
            default:
                container.innerHTML = this.renderComingSoon(page);
        }
    }

    renderHomePage() {
        const recentIntel = MOCK_DATA.tocIntelligence.slice(0, 10);

        return `
            <div class="dashboard">
                <h1>气象行业情报中心</h1>
                <p class="subtitle">实时监测全球气象企业动态</p>

                <!-- 统计卡片 -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${MOCK_DATA.stats.weeklyIntel}</div>
                        <div class="stat-label">本周新增情报</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${MOCK_DATA.stats.keyIntel}</div>
                        <div class="stat-label">重要情报</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${MOCK_DATA.tocIntelligence.length}</div>
                        <div class="stat-label">总情报数</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${MOCK_DATA.stats.companies}</div>
                        <div class="stat-label">监测公司</div>
                    </div>
                </div>

                <!-- AI 周摘要 -->
                <div class="ai-summary-card">
                    <h3>📊 AI 周摘要</h3>
                    <p>${MOCK_DATA.aiWeeklySummary}</p>
                </div>

                <!-- 最新情报 -->
                <div class="section">
                    <h2>📰 最新情报</h2>
                    <div class="intel-list">
                        ${recentIntel.map(item => this.renderIntelCard(item)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderIntelligencePage() {
        const intelligence = MOCK_DATA.tocIntelligence;

        // 按评级分组
        const sRated = intelligence.filter(i => i.rating === 'S');
        const aRated = intelligence.filter(i => i.rating === 'A');
        const bRated = intelligence.filter(i => i.rating === 'B');

        return `
            <div class="intelligence-page">
                <h1>ToC 竞品情报</h1>
                <p class="subtitle">全球气象应用企业动态监测</p>

                <div class="filter-bar">
                    <span>共 ${intelligence.length} 条情报</span>
                    <span>S级: ${sRated.length} | A级: ${aRated.length} | B级: ${bRated.length}</span>
                </div>

                <!-- S级情报 -->
                ${sRated.length > 0 ? `
                    <div class="section">
                        <h2>🔴 S级 - 重大情报</h2>
                        <div class="intel-list">
                            ${sRated.map(item => this.renderIntelCard(item)).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- A级情报 -->
                ${aRated.length > 0 ? `
                    <div class="section">
                        <h2>🟡 A级 - 重要情报</h2>
                        <div class="intel-list">
                            ${aRated.map(item => this.renderIntelCard(item)).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- B级情报 -->
                ${bRated.length > 0 ? `
                    <div class="section">
                        <h2>🟢 B级 - 一般情报</h2>
                        <div class="intel-list">
                            ${bRated.map(item => this.renderIntelCard(item)).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderIntelCard(item) {
        const ratingClass = {
            'S': 'rating-s',
            'A': 'rating-a',
            'B': 'rating-b'
        }[item.rating] || 'rating-b';

        const typeIcon = {
            'AI': '🤖',
            '产品': '📱',
            '商业': '💼',
            '技术': '⚙️'
        }[item.type] || '📄';

        return `
            <div class="intel-card">
                <div class="intel-header">
                    <span class="rating ${ratingClass}">${item.rating}</span>
                    <span class="company">${item.company}</span>
                    <span class="date">${item.date}</span>
                </div>
                <h3 class="intel-title">${typeIcon} ${item.title}</h3>
                <p class="intel-summary">${item.summary}</p>
                <div class="intel-analysis">
                    <strong>AI分析：</strong>${item.aiAnalysis}
                </div>
                <div class="intel-impact">
                    <strong>${item.impactOnMoji}</strong>
                </div>
                <div class="intel-footer">
                    <span class="type-badge">${item.type}</span>
                    <a href="${item.source}" target="_blank" class="source-link">查看原文 →</a>
                </div>
            </div>
        `;
    }

    renderComingSoon(page) {
        const pageNames = {
            'tob': 'ToB 行业情报',
            'trends': '行业趋势',
            'companies': '重点企业',
            'ai': 'AI 分析',
            'library': '情报库',
            'reports': '报告中心'
        };

        return `
            <div class="coming-soon">
                <h1>${pageNames[page] || '功能开发中'}</h1>
                <p class="subtitle">📊 该功能正在开发中，敬请期待</p>
                <p>当前平台专注于 ToC 竞品的真实情报抓取和分析</p>
                <p>随着数据积累，更多功能将陆续上线</p>
                <br>
                <button onclick="window.app.renderPage('home')" class="btn-primary">返回首页</button>
            </div>
        `;
    }

    handleSearch() {
        const query = document.getElementById('globalSearch').value.toLowerCase().trim();

        if (!query) {
            alert('请输入搜索关键词');
            return;
        }

        const results = MOCK_DATA.tocIntelligence.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.company.toLowerCase().includes(query) ||
            item.summary.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
        );

        const container = document.getElementById('pageContainer');
        container.innerHTML = `
            <div class="search-results">
                <h1>搜索结果</h1>
                <p class="subtitle">关键词: "${query}" - 找到 ${results.length} 条结果</p>

                ${results.length > 0 ? `
                    <div class="intel-list">
                        ${results.map(item => this.renderIntelCard(item)).join('')}
                    </div>
                ` : `
                    <div class="no-results">
                        <p>😔 未找到相关情报</p>
                        <p>尝试使用其他关键词，如：公司名、AI、产品、融资等</p>
                    </div>
                `}
            </div>
        `;
    }

    updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('lastUpdate').textContent = timeStr;
    }
}

// 初始化应用
window.addEventListener('DOMContentLoaded', () => {
    window.app = new WeatherIntelligencePlatform();
});
