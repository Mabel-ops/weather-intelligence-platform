// 气象行业情报监测平台 - 主应用逻辑

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
        // 导航切换 - 主菜单
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

        // 导航切换 - 子菜单
        document.querySelectorAll('.sub-menu a').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                if (page) {
                    this.renderPage(page);
                    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                    document.querySelectorAll('.sub-menu a').forEach(nav => nav.classList.remove('active'));
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
                container.innerHTML = this.renderToCPage();
                this.attachToCEventListeners();
                break;
            case 'tob':
                container.innerHTML = this.renderToBPage();
                break;
            case 'tob-metro':
                container.innerHTML = this.renderToBIndustryPage('地铁', MOCK_DATA.tobIntelligence.metro);
                break;
            case 'tob-aviation':
                container.innerHTML = this.renderToBIndustryPage('航空', MOCK_DATA.tobIntelligence.aviation);
                break;
            case 'tob-energy':
                container.innerHTML = this.renderToBIndustryPage('能源', MOCK_DATA.tobIntelligence.energy);
                break;
            case 'trends':
                container.innerHTML = this.renderTrendsPage();
                this.attachTrendsEventListeners();
                break;
            case 'companies':
                container.innerHTML = this.renderCompaniesPage();
                // 使用setTimeout确保DOM渲染完成后再绑定事件
                setTimeout(() => this.attachCompaniesEventListeners(), 0);
                break;
            case 'ai':
                container.innerHTML = this.renderAIPage();
                this.attachAIEventListeners();
                break;
            case 'library':
                container.innerHTML = this.renderLibraryPage();
                this.attachLibraryEventListeners();
                break;
            case 'reports':
                container.innerHTML = this.renderReportsPage();
                break;
            default:
                container.innerHTML = this.renderHomePage();
        }
    }

    navigateTo(page) {
        this.renderPage(page);
        // 更新导航菜单高亮
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll('.sub-menu a').forEach(nav => nav.classList.remove('active'));
        const targetNav = document.querySelector(`[data-page="${page}"]`);
        if (targetNav) {
            targetNav.classList.add('active');
        }
    }

    // 首页
    renderHomePage() {
        return `
            <div class="page-header">
                <h1 class="page-title">气象行业情报中心</h1>
                <p class="page-subtitle">AI驱动的天气竞品与气象行业趋势监测平台</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">本周新增情报</div>
                    <div class="stat-value">${MOCK_DATA.stats.weeklyIntel}</div>
                    <div class="stat-change">较上周 +8</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">重点情报 (S/A级)</div>
                    <div class="stat-value">${MOCK_DATA.stats.keyIntel}</div>
                    <div class="stat-change">较上周 +3</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">监测企业</div>
                    <div class="stat-value">${MOCK_DATA.stats.companies}</div>
                    <div class="stat-change">覆盖ToC+ToB</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">识别趋势</div>
                    <div class="stat-value">${MOCK_DATA.stats.trends}</div>
                    <div class="stat-change">3个加速中</div>
                </div>
            </div>

            <div class="ai-summary-card">
                <h3>🤖 AI本周摘要</h3>
                <p>${MOCK_DATA.aiWeeklySummary}</p>
            </div>

            <section style="margin-bottom: 3rem;">
                <h2 class="section-title">📌 本周重点情报</h2>
                ${this.renderIntelList(this.getKeyIntel())}
            </section>

            <section style="margin-bottom: 3rem;">
                <h2 class="section-title">📱 ToC竞品动态</h2>
                ${this.renderIntelList(MOCK_DATA.tocIntelligence.slice(0, 3))}
            </section>

            <section style="margin-bottom: 3rem;">
                <h2 class="section-title">🏢 ToB行业动态</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
                    ${this.renderToBPreview('地铁', MOCK_DATA.tobIntelligence.metro.slice(0, 2))}
                    ${this.renderToBPreview('航空', MOCK_DATA.tobIntelligence.aviation.slice(0, 2))}
                    ${this.renderToBPreview('能源', MOCK_DATA.tobIntelligence.energy.slice(0, 2))}
                </div>
            </section>

            <section>
                <h2 class="section-title">📈 近期行业趋势</h2>
                ${this.renderTrendsList(MOCK_DATA.trends.slice(0, 3))}
            </section>
        `;
    }

    // ToC竞品页面
    renderToCPage() {
        return `
            <div class="page-header">
                <h1 class="page-title">ToC天气产品竞品监测</h1>
                <p class="page-subtitle">全球主流天气APP动态追踪</p>
            </div>

            <div class="tab-container">
                <div class="tab-buttons">
                    <button class="tab-btn active" data-tab="appUpdates">App版本更新</button>
                    <button class="tab-btn" data-tab="companyNews">公司动态</button>
                </div>

                <div class="tab-content">
                    <!-- App版本更新Tab -->
                    <div id="appUpdatesTab" class="tab-pane active">
                        <div class="filter-bar">
                            <div class="filter-row">
                                <div class="filter-group">
                                    <label>公司筛选</label>
                                    <select id="appCompanyFilter">
                                        <option value="">全部公司</option>
                                        <option value="AccuWeather">AccuWeather</option>
                                        <option value="The Weather Channel">The Weather Channel</option>
                                        <option value="Windy.com">Windy.com</option>
                                        <option value="彩云天气">彩云天气</option>
                                        <option value="Weather & Radar">Weather & Radar</option>
                                        <option value="Weathernews">Weathernews</option>
                                        <option value="天气通">天气通</option>
                                        <option value="看天">看天</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label>重要性</label>
                                    <select id="appRatingFilter">
                                        <option value="">全部等级</option>
                                        <option value="S">S级</option>
                                        <option value="A">A级</option>
                                        <option value="B">B级</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="appUpdatesList">${this.renderAppUpdatesList(MOCK_DATA.tocAppUpdates)}</div>
                    </div>

                    <!-- 公司动态Tab -->
                    <div id="companyNewsTab" class="tab-pane">
                        <div class="filter-bar">
                            <div class="filter-row">
                                <div class="filter-group">
                                    <label>公司筛选</label>
                                    <select id="newsCompanyFilter">
                                        <option value="">全部公司</option>
                                        <option value="AccuWeather">AccuWeather</option>
                                        <option value="The Weather Channel">The Weather Channel</option>
                                        <option value="Windy.com">Windy.com</option>
                                        <option value="彩云天气">彩云天气</option>
                                        <option value="Weather & Radar">Weather & Radar</option>
                                        <option value="Weathernews">Weathernews</option>
                                        <option value="天气通">天气通</option>
                                        <option value="看天">看天</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label>动态类型</label>
                                    <select id="newsTypeFilter">
                                        <option value="">全部类型</option>
                                        <option value="战略">战略</option>
                                        <option value="融资">融资</option>
                                        <option value="技术">技术</option>
                                        <option value="合作">合作</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label>重要性</label>
                                    <select id="newsRatingFilter">
                                        <option value="">全部等级</option>
                                        <option value="S">S级</option>
                                        <option value="A">A级</option>
                                        <option value="B">B级</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="companyNewsList">${this.renderCompanyNewsList(MOCK_DATA.tocCompanyNews)}</div>
                    </div>
                </div>
            </div>
        `;
    }

    // ToB行业总览
    renderToBPage() {
        return `
            <div class="page-header">
                <h1 class="page-title">ToB气象行业监测</h1>
                <p class="page-subtitle">地铁、航空、能源三大行业情报追踪</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem;">
                ${this.renderToBIndustryCard('地铁', MOCK_DATA.tobIntelligence.metro, 'tob-metro')}
                ${this.renderToBIndustryCard('航空', MOCK_DATA.tobIntelligence.aviation, 'tob-aviation')}
                ${this.renderToBIndustryCard('能源', MOCK_DATA.tobIntelligence.energy, 'tob-energy')}
            </div>
        `;
    }

    renderToBIndustryCard(name, data, page) {
        const recentCount = data.filter(d => {
            const days = Math.floor((new Date() - new Date(d.date)) / (1000 * 60 * 60 * 24));
            return days <= 7;
        }).length;

        return `
            <div class="company-card" onclick="app.renderPage('${page}')">
                <div class="company-header">
                    <div class="company-logo">${name[0]}</div>
                    <div class="company-info">
                        <div class="company-name">${name}气象</div>
                        <div class="company-field">ToB行业情报</div>
                    </div>
                </div>
                <div class="company-desc">
                    本周新增情报: <strong>${recentCount}</strong> 条<br>
                    总情报数: <strong>${data.length}</strong> 条<br>
                    重点情报: <strong>${data.filter(d => d.rating === 'S' || d.rating === 'A').length}</strong> 条
                </div>
                <div class="company-stats">
                    <span>点击查看详情 →</span>
                </div>
            </div>
        `;
    }

    // ToB行业详情页
    renderToBIndustryPage(industry, data) {
        return `
            <div class="page-header">
                <h1 class="page-title">${industry}气象行业监测</h1>
                <p class="page-subtitle">${industry}领域气象服务动态与趋势分析</p>
            </div>

            <div class="ai-summary-card">
                <h3>🤖 AI行业判断：最近${industry}气象行业正在发生什么变化？</h3>
                <p>${this.getIndustryAIJudgment(industry)}</p>
            </div>

            <section style="margin-bottom: 3rem;">
                <h2 class="section-title">最新动态</h2>
                ${this.renderIntelList(data)}
            </section>
        `;
    }

    getIndustryAIJudgment(industry) {
        const judgments = {
            '地铁': '地铁气象服务正在从单点预警向体系化、智能化演进。多个城市启动智慧气象系统建设，北京、上海等头部城市制定行业标准，显示市场进入规范化发展期。华风气象等服务商通过标杆项目建立行业壁垒，市场集中度提升。防汛、积水预警是当前核心需求，AI预测能力成为竞争关键。',
            '航空': '航空气象服务呈现国际化和AI化两大趋势。外资服务商WNI在国际航线服务上取得突破，国内服务商在本土市场面临竞争压力。民航局AI应用指南显示政策支持AI技术应用，但同时提高了准入门槛。部分航空公司开始自建气象能力，对第三方服务商形成挑战。极端天气决策支持、航路优化是高价值需求方向。',
            '能源': '能源气象服务市场保持高速增长，千万级项目频繁出现。政策收紧功率预测要求（15分钟超短期、90%准确率），倒逼企业升级服务。国能日新、东润环能等头部企业通过技术优势持续扩大市场份额。同时，设备制造商（如远景能源）开始切入气象服务，市场竞争加剧。电力现货交易、虚拟电厂等新场景带来增量需求。'
        };
        return judgments[industry] || '暂无AI判断';
    }

    // 行业趋势页面
    renderTrendsPage() {
        return `
            <div class="page-header">
                <h1 class="page-title">行业趋势分析</h1>
                <p class="page-subtitle">基于多源情报的趋势识别与影响分析</p>
            </div>

            <div class="filter-bar">
                <div class="filter-row">
                    <div class="filter-group">
                        <label>趋势分类</label>
                        <select id="trendCategoryFilter">
                            <option value="">全部趋势</option>
                            <option value="综合">综合</option>
                            <option value="ToC">ToC</option>
                            <option value="ToB">ToB</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>趋势阶段</label>
                        <select id="trendStageFilter">
                            <option value="">全部阶段</option>
                            <option value="emerging">萌芽</option>
                            <option value="accelerating">加速</option>
                            <option value="mature">成熟</option>
                            <option value="cooling">降温</option>
                        </select>
                    </div>
                </div>
            </div>

            <div id="trendsList">${this.renderTrendsList(MOCK_DATA.trends)}</div>
        `;
    }

    renderTrendsList(trends) {
        return trends.map(trend => `
            <div class="trend-card">
                <div class="trend-header">
                    <div class="trend-title">${trend.name}</div>
                    <div class="trend-stage ${trend.stage}">${this.getTrendStageText(trend.stage)}</div>
                </div>
                <div class="trend-meta">
                    <span>首次识别: ${trend.firstSeen}</span>
                    <span>最近更新: ${trend.lastUpdate}</span>
                    <span>相关事件: ${trend.relatedEvents}条</span>
                    <div class="trend-strength">
                        <span>趋势强度:</span>
                        <div class="strength-bar">
                            ${[1,2,3,4,5].map(i => `<div class="strength-dot ${i <= trend.strength ? 'active' : ''}"></div>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="trend-desc">${trend.description}</div>
                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--primary-color);">AI判断：</strong>
                    ${trend.aiJudgment}
                </div>
                <div class="trend-companies">
                    <span style="font-size: 0.9rem; color: var(--text-secondary); margin-right: 0.5rem;">涉及企业:</span>
                    ${trend.companies.map(c => `<span class="company-tag">${c}</span>`).join('')}
                </div>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); font-size: 0.9rem; color: var(--text-secondary);">
                    ${trend.impactOnMoji}
                </div>
            </div>
        `).join('');
    }

    getTrendStageText(stage) {
        const stages = {
            'emerging': '萌芽',
            'accelerating': '加速',
            'mature': '成熟',
            'cooling': '降温'
        };
        return stages[stage] || stage;
    }

    // 重点企业页面
    renderCompaniesPage() {
        return `
            <div class="page-header">
                <h1 class="page-title">重点企业监测</h1>
                <p class="page-subtitle">ToC天气企业与ToB气象服务商动态追踪</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
                ${MOCK_DATA.companies.map(company => `
                    <div class="company-card" style="cursor: pointer; transition: transform 0.2s;" data-company-name="${company.name}">
                        <div class="company-header">
                            <div class="company-logo">${company.logo}</div>
                            <div class="company-info">
                                <div class="company-name">${company.name}</div>
                                <div class="company-field">${company.field.join(' / ')}</div>
                            </div>
                        </div>
                        <div class="company-desc">
                            <strong>核心产品:</strong> ${company.products.join('、')}<br>
                            <strong>商业模式:</strong> ${company.businessModel}
                        </div>
                        <div class="company-stats">
                            <span>近期动态: ${company.recentActivity}条</span>
                            <span>AI关注度: ${company.aiScore}/100</span>
                        </div>
                        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                            <strong style="color: var(--primary-color); font-size: 0.9rem;">近期战略方向:</strong>
                            <p style="font-size: 0.9rem; line-height: 1.6; margin-top: 0.5rem; color: var(--text-secondary);">
                                ${company.recentStrategy}
                            </p>
                        </div>
                        <div style="text-align: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); color: var(--primary-color); font-size: 0.9rem;">
                            点击查看详细情报 →
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    attachCompaniesEventListeners() {
        const cards = document.querySelectorAll('.company-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const companyName = card.getAttribute('data-company-name');
                this.showCompanyDetail(companyName);
            });
        });
    }

    showCompanyDetail(companyName) {
        // 收集该公司的所有情报
        const tocIntel = [...MOCK_DATA.tocAppUpdates, ...MOCK_DATA.tocCompanyNews].filter(item => item.company === companyName);
        const tobIntel = [
            ...MOCK_DATA.tobIntelligence.metro,
            ...MOCK_DATA.tobIntelligence.aviation,
            ...MOCK_DATA.tobIntelligence.energy
        ].filter(item => item.company === companyName);

        const allIntel = [...tocIntel, ...tobIntel].sort((a, b) => new Date(b.date) - new Date(a.date));

        const company = MOCK_DATA.companies.find(c => c.name === companyName);

        if (!company) return;

        const detailHTML = `
            <div class="page-header">
                <button onclick="app.navigateTo('companies')" style="background: none; border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; margin-bottom: 1rem;">
                    ← 返回企业列表
                </button>
                <h1 class="page-title">${company.name}</h1>
                <p class="page-subtitle">${company.field.join(' / ')} · AI关注度 ${company.aiScore}/100</p>
            </div>

            <div class="ai-summary-card" style="margin-bottom: 2rem;">
                <h3>📊 企业概览</h3>
                <div style="margin-top: 1rem; line-height: 1.8;">
                    <strong>核心产品：</strong>${company.products.join('、')}<br>
                    <strong>主要客户：</strong>${company.customers.join('、')}<br>
                    <strong>商业模式：</strong>${company.businessModel}<br>
                    <strong>近期动态数：</strong>${company.recentActivity}条<br><br>
                    <strong style="color: var(--primary-color);">近期战略方向：</strong><br>
                    ${company.recentStrategy}
                </div>
            </div>

            <h2 style="font-size: 1.3rem; margin-bottom: 1rem;">相关情报动态（${allIntel.length}条）</h2>
            ${allIntel.length > 0 ? allIntel.map(intel => {
                if (intel.version) {
                    // App更新
                    return `
                        <div class="intel-card">
                            <div class="intel-header">
                                <div>
                                    <span class="badge badge-field">App版本更新</span>
                                    <span class="badge badge-rating-${intel.rating.toLowerCase()}">${intel.rating}级</span>
                                    <span style="margin-left: 0.5rem; color: var(--text-secondary);">${intel.version}</span>
                                </div>
                                <span style="color: var(--text-secondary);">${intel.date}</span>
                            </div>
                            <div class="intel-body">
                                <h3 class="intel-title">${intel.company} ${intel.version} 版本更新</h3>
                                <div style="margin-top: 1rem;">
                                    <strong>更新内容：</strong>
                                    <div style="white-space: pre-line; line-height: 1.8; color: var(--text-secondary);">${intel.updateContent}</div>
                                </div>
                            </div>
                        </div>
                    `;
                } else if (intel.type) {
                    // 公司动态或ToB情报
                    return `
                        <div class="intel-card">
                            <div class="intel-header">
                                <div>
                                    <span class="badge badge-field">${intel.field || 'ToC'}</span>
                                    <span class="badge badge-type">${intel.type}</span>
                                    <span class="badge badge-rating-${intel.rating.toLowerCase()}">${intel.rating}级</span>
                                </div>
                                <span style="color: var(--text-secondary);">${intel.date}</span>
                            </div>
                            <div class="intel-body">
                                <h3 class="intel-title">${intel.title}</h3>
                                <div style="margin-top: 1rem; line-height: 1.8; color: var(--text-secondary);">
                                    ${intel.content || intel.summary}
                                </div>
                            </div>
                        </div>
                    `;
                }
            }).join('') : '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">暂无相关情报</p>'}
        `;

        document.getElementById('pageContainer').innerHTML = detailHTML;
    }

    // AI分析页面
    renderAIPage() {
        return `
            <div class="page-header">
                <h1 class="page-title">AI情报助手</h1>
                <p class="page-subtitle">基于情报库的智能问答与分析</p>
            </div>

            <div class="ai-summary-card" style="margin-bottom: 2rem;">
                <h3>💡 你可以问我这些问题：</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1rem;">
                    <button class="report-btn" onclick="app.askAI('最近天气竞品都在做什么AI功能？')" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);">最近天气竞品都在做什么AI功能？</button>
                    <button class="report-btn" onclick="app.askAI('AccuWeather最近三个月重点在做什么？')" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);">AccuWeather最近三个月重点在做什么？</button>
                    <button class="report-btn" onclick="app.askAI('最近航空公司有哪些新的气象需求？')" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);">最近航空公司有哪些新的气象需求？</button>
                    <button class="report-btn" onclick="app.askAI('能源行业功率预测近期有什么政策变化？')" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);">能源行业功率预测近期有什么政策变化？</button>
                </div>
            </div>

            <div class="ai-chat-container">
                <div class="chat-messages" id="chatMessages">
                    <div class="chat-message ai">
                        <div class="message-header">AI情报助手</div>
                        <div class="message-content">您好！我是AI情报助手，可以帮您分析气象行业情报。请输入您的问题，我会基于平台已有情报为您提供分析。</div>
                    </div>
                </div>
                <div class="chat-input-container">
                    <input type="text" class="chat-input" id="aiInput" placeholder="输入您的问题...">
                    <button class="chat-send-btn" onclick="app.sendAIMessage()">发送</button>
                </div>
            </div>
        `;
    }

    askAI(question) {
        document.getElementById('aiInput').value = question;
        this.sendAIMessage();
    }

    sendAIMessage() {
        const input = document.getElementById('aiInput');
        const question = input.value.trim();
        if (!question) return;

        const messagesContainer = document.getElementById('chatMessages');

        // 用户消息
        messagesContainer.innerHTML += `
            <div class="chat-message user">
                <div class="message-header">您</div>
                <div class="message-content">${question}</div>
            </div>
        `;

        // AI回答
        const answer = this.generateAIAnswer(question);
        setTimeout(() => {
            messagesContainer.innerHTML += `
                <div class="chat-message ai">
                    <div class="message-header">AI情报助手</div>
                    <div class="message-content">${answer}</div>
                </div>
            `;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 800);

        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateAIAnswer(question) {
        // 简化的AI回答生成逻辑
        if (question.includes('AI功能')) {
            return `
                <strong>核心结论：</strong>天气竞品正在将AI从辅助工具升级为核心功能，主要集中在三个方向：<br><br>

                <strong>1. AI预警预测</strong><br>
                • AccuWeather推出AI极端天气预警系统，准确率提升40%<br>
                • 多家企业强化AI驱动的分钟级降水预测<br><br>

                <strong>2. 生成式AI交互</strong><br>
                • The Weather Channel集成ChatGPT提供对话式天气查询<br>
                • 彩云天气推出AI气象播报员<br><br>

                <strong>3. AI个性化推荐</strong><br>
                • 基于用户行为的AI天气建议<br>
                • AI驱动的穿衣、出行建议<br><br>

                <strong>趋势判断：</strong>生成式AI正在从尝鲜功能向核心交互方式演进，未来天气获取可能以对话为主要入口。<br><br>

                <strong>对墨迹影响：</strong>需要加快AI产品化进程，重点关注中文场景下的AI体验优化。<br><br>

                <strong>来源：</strong>基于平台近30天情报，涉及AccuWeather、The Weather Channel、彩云天气等5家企业。
            `;
        } else if (question.includes('AccuWeather')) {
            return `
                <strong>核心结论：</strong>AccuWeather近3个月战略重点明确聚焦在AI能力建设上。<br><br>

                <strong>事实依据：</strong><br>
                • 9月5日：推出AI极端天气预警系统<br>
                • 8月中旬：上线生成式AI天气摘要功能<br>
                • 7月底：发布AI驱动的过敏指数预测<br><br>

                <strong>典型案例：</strong>AI极端天气预警系统是其核心突破，可提前72小时预测极端天气，准确率提升40%，已在美国、欧洲市场上线。<br><br>

                <strong>趋势判断：</strong>AccuWeather明确将AI定位为核心竞争力，通过AI提升预测准确性和用户体验，建立技术护城河。<br><br>

                <strong>对墨迹影响：</strong>AccuWeather在AI预警能力上形成领先优势，墨迹需要评估自身AI预警能力差距。<br><br>

                <strong>来源：</strong>基于AccuWeather官方信息和行业报道，共3条情报。
            `;
        } else if (question.includes('航空') && question.includes('需求')) {
            return `
                <strong>核心结论：</strong>航空公司的气象需求正在从"数据提供"向"决策支持"演进。<br><br>

                <strong>识别到的新需求：</strong><br>
                1. <strong>极端天气AI决策支持</strong>（出现15次）<br>
                   航空公司需要AI在极端天气下提供航班调度、航路优化等综合决策建议<br><br>

                2. <strong>全球航线气象服务</strong>（出现8次）<br>
                   国际航线需要全球数据覆盖和多语言支持<br><br>

                3. <strong>航路燃油优化</strong>（出现6次）<br>
                   结合天气和燃油成本的航路优化需求<br><br>

                <strong>典型案例：</strong><br>
                • 国航与WNI合作，覆盖200+国际航线<br>
                • 东航自建航路天气风险评估系统，延误率下降15%<br><br>

                <strong>对墨迹影响：</strong>航空气象是高价值市场，但需要全球数据能力和航空行业深度理解，进入门槛较高。<br><br>

                <strong>来源：</strong>基于近60天航空行业情报，涉及国航、东航、WNI等。
            `;
        } else if (question.includes('能源') && question.includes('政策')) {
            return `
                <strong>核心结论：</strong>能源行业功率预测政策正在收紧，技术要求显著提升。<br><br>

                <strong>最新政策变化：</strong><br>
                <strong>《新能源功率预测管理办法（2026年修订版）》</strong><br>
                发布时间：2026年9月4日<br>
                实施时间：2027年1月1日<br><br>

                <strong>核心变化：</strong><br>
                • 超短期预测时间间隔：30分钟 → 15分钟<br>
                • 短期预测准确率要求：85% → 90%<br>
                • 新增对AI算法的明确规范<br><br>

                <strong>政策影响分析：</strong><br>
                1. 倒逼新能源企业升级预测系统<br>
                2. 提高气象服务商技术门槛<br>
                3. 带来市场需求升级和服务溢价<br><br>

                <strong>市场反应：</strong><br>
                • 国能日新等头部企业已达标，加速市场拓展<br>
                • 部分中小服务商面临技术升级压力<br><br>

                <strong>对墨迹影响：</strong>政策变化提升了进入门槛，如考虑进入需要满足更高技术标准。<br><br>

                <strong>来源：</strong>国家能源局官方文件及行业分析。
            `;
        }

        return `基于您的问题"${question}"，我正在分析平台情报库中的相关信息。这是Demo版本，实际部署后会提供基于真实情报的深度分析。`;
    }

    attachAIEventListeners() {
        document.getElementById('aiInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendAIMessage();
            }
        });
    }

    // 情报库页面
    renderLibraryPage() {
        const allIntel = [
            ...MOCK_DATA.tocIntelligence,
            ...MOCK_DATA.tobIntelligence.metro,
            ...MOCK_DATA.tobIntelligence.aviation,
            ...MOCK_DATA.tobIntelligence.energy
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        return `
            <div class="page-header">
                <h1 class="page-title">情报库</h1>
                <p class="page-subtitle">完整情报数据库，支持多维度检索</p>
            </div>

            <div class="filter-bar">
                <div class="filter-row">
                    <div class="filter-group">
                        <label>业务领域</label>
                        <select id="libraryFieldFilter">
                            <option value="">全部领域</option>
                            <option value="ToC">ToC</option>
                            <option value="地铁">地铁</option>
                            <option value="航空">航空</option>
                            <option value="能源">能源</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>信息类型</label>
                        <select id="libraryTypeFilter">
                            <option value="">全部类型</option>
                            <option value="产品">产品</option>
                            <option value="AI">AI</option>
                            <option value="技术">技术</option>
                            <option value="商业化">商业化</option>
                            <option value="合作">合作</option>
                            <option value="政策">政策</option>
                            <option value="中标">中标</option>
                            <option value="战略">战略</option>
                            <option value="融资">融资</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>重要性</label>
                        <select id="libraryRatingFilter">
                            <option value="">全部等级</option>
                            <option value="S">S级</option>
                            <option value="A">A级</option>
                            <option value="B">B级</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>时间范围</label>
                        <select id="libraryTimeFilter">
                            <option value="">全部时间</option>
                            <option value="7">近7天</option>
                            <option value="30">近30天</option>
                            <option value="90">近90天</option>
                        </select>
                    </div>
                </div>
            </div>

            <div id="libraryTableContainer">
                ${this.renderLibraryTable(allIntel)}
            </div>
        `;
    }

    renderLibraryTable(intel) {
        return `
            <div class="intel-table">
                <table>
                    <thead>
                        <tr>
                            <th>时间</th>
                            <th>公司</th>
                            <th>领域</th>
                            <th>标题</th>
                            <th>类型</th>
                            <th>重要性</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${intel.map(item => `
                            <tr>
                                <td>${item.date}</td>
                                <td>${item.company}</td>
                                <td><span class="badge badge-field">${item.field}</span></td>
                                <td>${item.title || item.company + ' ' + (item.version || '动态')}</td>
                                <td><span class="badge badge-type">${item.type}</span></td>
                                <td><span class="badge badge-rating-${item.rating.toLowerCase()}">${item.rating}级</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // 报告中心页面
    renderReportsPage() {
        return `
            <div class="page-header">
                <h1 class="page-title">报告中心</h1>
                <p class="page-subtitle">情报周报、月报与专题分析生成</p>
            </div>

            ${MOCK_DATA.reports.map(report => `
                <div class="report-card">
                    <div class="report-header">
                        <div>
                            <div class="report-title">${report.title}</div>
                            <div class="report-desc" style="margin-top: 0.75rem;">${report.description}</div>
                        </div>
                        <button class="report-btn" onclick="alert('报告生成功能开发中...')">生成报告</button>
                    </div>
                    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                        <strong style="font-size: 0.9rem; color: var(--text-secondary);">报告结构：</strong>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                            ${report.structure.map(s => `<span class="company-tag">${s}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
    }

    // 辅助方法
    renderIntelList(intelList) {
        return intelList.map(intel => `
            <div class="intel-card">
                <div class="intel-header">
                    <div class="intel-title">${intel.title}</div>
                    <div class="intel-meta">
                        <span class="badge badge-company">${intel.company}</span>
                        <span class="badge badge-field">${intel.field}</span>
                        <span class="badge badge-type">${intel.type}</span>
                        <span class="badge badge-rating-${intel.rating.toLowerCase()}">${intel.rating}级</span>
                        <span class="intel-date">${intel.date}</span>
                    </div>
                </div>
                <div class="intel-summary">${intel.summary}</div>
                <div class="intel-footer">
                    <div class="intel-analysis">
                        <strong>AI分析：</strong>${intel.aiAnalysis}
                    </div>
                    <div class="intel-analysis" style="background: #fef3f7;">
                        <strong>对墨迹影响：</strong>${intel.impactOnMoji}
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="intel-source">
                            来源: <a href="${intel.source}" target="_blank">查看原文</a>
                        </div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary);">
                            评级原因: ${intel.ratingReason}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderToBPreview(industry, data) {
        return `
            <div style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: var(--shadow);">
                <h3 style="font-size: 1.2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--border-color);">
                    ${industry}气象
                </h3>
                ${data.map(intel => `
                    <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                            <div style="font-weight: 600; flex: 1;">${intel.title}</div>
                            <span class="badge badge-rating-${intel.rating.toLowerCase()}">${intel.rating}级</span>
                        </div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                            ${intel.summary.substring(0, 100)}...
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getKeyIntel() {
        return [
            ...MOCK_DATA.tocIntelligence,
            ...MOCK_DATA.tobIntelligence.metro,
            ...MOCK_DATA.tobIntelligence.aviation,
            ...MOCK_DATA.tobIntelligence.energy
        ].filter(intel => intel.rating === 'S' || intel.rating === 'A')
         .sort((a, b) => new Date(b.date) - new Date(a.date))
         .slice(0, 5);
    }

    handleSearch() {
        const query = document.getElementById('globalSearch').value;
        if (query) {
            alert(`搜索功能开发中...\n搜索关键词: ${query}`);
        }
    }

    attachToCEventListeners() {
        // Tab切换
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                // 更新按钮状态
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // 切换Tab内容
                document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                if (targetTab === 'appUpdates') {
                    document.getElementById('appUpdatesTab').classList.add('active');
                } else if (targetTab === 'companyNews') {
                    document.getElementById('companyNewsTab').classList.add('active');
                }
            });
        });

        // App版本更新筛选
        ['appCompanyFilter', 'appRatingFilter'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    this.filterAppUpdates();
                });
            }
        });

        // 公司动态筛选
        ['newsCompanyFilter', 'newsTypeFilter', 'newsRatingFilter'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    this.filterCompanyNews();
                });
            }
        });
    }

    filterAppUpdates() {
        const companyFilter = document.getElementById('appCompanyFilter').value;
        const ratingFilter = document.getElementById('appRatingFilter').value;

        let filtered = MOCK_DATA.tocAppUpdates.filter(update => {
            const matchCompany = !companyFilter || update.company === companyFilter;
            const matchRating = !ratingFilter || update.rating === ratingFilter;
            return matchCompany && matchRating;
        });

        document.getElementById('appUpdatesList').innerHTML = this.renderAppUpdatesList(filtered);
    }

    filterCompanyNews() {
        const companyFilter = document.getElementById('newsCompanyFilter').value;
        const typeFilter = document.getElementById('newsTypeFilter').value;
        const ratingFilter = document.getElementById('newsRatingFilter').value;

        let filtered = MOCK_DATA.tocCompanyNews.filter(news => {
            const matchCompany = !companyFilter || news.company === companyFilter;
            const matchType = !typeFilter || news.type === typeFilter;
            const matchRating = !ratingFilter || news.rating === ratingFilter;
            return matchCompany && matchType && matchRating;
        });

        document.getElementById('companyNewsList').innerHTML = this.renderCompanyNewsList(filtered);
    }

    attachTrendsEventListeners() {
        ['trendCategoryFilter', 'trendStageFilter'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    this.filterTrends();
                });
            }
        });
    }

    filterTrends() {
        const categoryFilter = document.getElementById('trendCategoryFilter').value;
        const stageFilter = document.getElementById('trendStageFilter').value;

        let filtered = MOCK_DATA.trends.filter(trend => {
            const matchCategory = !categoryFilter || trend.category === categoryFilter;
            const matchStage = !stageFilter || trend.stage === stageFilter;
            return matchCategory && matchStage;
        });

        document.getElementById('trendsList').innerHTML = this.renderTrendsList(filtered);
    }

    attachLibraryEventListeners() {
        ['libraryFieldFilter', 'libraryTypeFilter', 'libraryRatingFilter', 'libraryTimeFilter'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    this.filterLibrary();
                });
            }
        });
    }

    filterLibrary() {
        const fieldFilter = document.getElementById('libraryFieldFilter').value;
        const typeFilter = document.getElementById('libraryTypeFilter').value;
        const ratingFilter = document.getElementById('libraryRatingFilter').value;
        const timeFilter = document.getElementById('libraryTimeFilter').value;

        let allIntel = [
            ...MOCK_DATA.tocAppUpdates,
            ...MOCK_DATA.tocCompanyNews,
            ...MOCK_DATA.tocIntelligence,
            ...MOCK_DATA.tobIntelligence.metro,
            ...MOCK_DATA.tobIntelligence.aviation,
            ...MOCK_DATA.tobIntelligence.energy
        ];

        let filtered = allIntel.filter(intel => {
            const matchField = !fieldFilter || intel.field === fieldFilter;
            const matchType = !typeFilter || intel.type === typeFilter;
            const matchRating = !ratingFilter || intel.rating === ratingFilter;

            let matchTime = true;
            if (timeFilter) {
                const days = parseInt(timeFilter);
                const intelDate = new Date(intel.date);
                const now = new Date();
                const diffDays = Math.floor((now - intelDate) / (1000 * 60 * 60 * 24));
                matchTime = diffDays <= days;
            }

            return matchField && matchType && matchRating && matchTime;
        });

        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        document.getElementById('libraryTableContainer').innerHTML = this.renderLibraryTable(filtered);
    }

    filterToCIntelligence() {
        const companyFilter = document.getElementById('tocCompanyFilter').value;
        const typeFilter = document.getElementById('tocTypeFilter').value;
        const ratingFilter = document.getElementById('tocRatingFilter').value;

        let filtered = MOCK_DATA.tocIntelligence.filter(intel => {
            const matchCompany = !companyFilter || intel.company === companyFilter;
            const matchType = !typeFilter || intel.type === typeFilter;
            const matchRating = !ratingFilter || intel.rating === ratingFilter;
            return matchCompany && matchType && matchRating;
        });

        document.getElementById('tocIntelList').innerHTML = this.renderIntelList(filtered);
    }

    // 渲染App版本更新列表
    renderAppUpdatesList(updates) {
        return updates.map(update => `
            <div class="intel-card">
                <div class="intel-header">
                    <div>
                        <span class="badge badge-field">${update.company}</span>
                        <span class="badge badge-rating-${update.rating.toLowerCase()}">${update.rating}级</span>
                        <span style="margin-left: 0.5rem; color: var(--text-secondary); font-size: 0.9rem;">${update.version}</span>
                    </div>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">${update.date}</span>
                </div>
                <div class="intel-body">
                    <h3 class="intel-title">${update.company} ${update.version} 版本更新</h3>
                    <div style="margin-top: 1rem;">
                        <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">📋 更新内容：</div>
                        <div style="white-space: pre-line; line-height: 1.8; color: var(--text-secondary);">${update.updateContent}</div>
                    </div>
                    <div style="margin-top: 1rem;">
                        <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">✨ 功能亮点：</div>
                        <div style="line-height: 1.6; color: var(--text-secondary);">${update.highlights}</div>
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-left: 3px solid #3b82f6; border-radius: 4px;">
                        <div style="font-weight: 600; color: #1e40af; margin-bottom: 0.5rem;">💡 对墨迹天气的启示：</div>
                        <div style="line-height: 1.6; color: #1e3a8a;">${update.insightForMoji}</div>
                    </div>
                    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-secondary);">
                        数据来源: ${update.source}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 渲染公司动态列表
    renderCompanyNewsList(news) {
        return news.map(item => `
            <div class="intel-card">
                <div class="intel-header">
                    <div>
                        <span class="badge badge-field">${item.company}</span>
                        <span class="badge badge-type">${item.type}</span>
                        <span class="badge badge-rating-${item.rating.toLowerCase()}">${item.rating}级</span>
                    </div>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">${item.date}</span>
                </div>
                <div class="intel-body">
                    <h3 class="intel-title">${item.title}</h3>
                    <div style="margin-top: 1rem; line-height: 1.8; color: var(--text-secondary);">
                        ${item.content}
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-left: 3px solid #3b82f6; border-radius: 4px;">
                        <div style="font-weight: 600; color: #1e40af; margin-bottom: 0.5rem;">💡 对墨迹天气的影响：</div>
                        <div style="line-height: 1.6; color: #1e3a8a;">${item.impactOnMoji}</div>
                    </div>
                    <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-secondary);">
                        来源: ${item.source}
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateTime() {
        setInterval(() => {
            const now = new Date();
            const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
            document.getElementById('lastUpdate').textContent = timeStr;
        }, 60000);
    }
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new WeatherIntelligencePlatform();
});
