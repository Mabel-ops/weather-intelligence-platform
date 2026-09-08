// 气象行业情报监测平台 - 模拟数据

const MOCK_DATA = {
    // 首页统计
    stats: {
        weeklyIntel: 47,
        keyIntel: 12,
        companies: 15,
        trends: 8
    },

    // AI本周摘要
    aiWeeklySummary: "本周ToC天气产品领域，AccuWeather推出AI驱动的极端天气预警功能，The Weather Channel强化了生成式AI天气解释能力；ToB行业方面，地铁领域出现3个新的气象预警项目招标，航空气象服务商WNI与国航达成深度合作，能源领域国能日新中标两个大型功率预测项目。行业趋势上，生成式AI在天气服务中的应用正从辅助功能向核心链路演进，ToB气象服务呈现明显的AI化和定制化趋势。",

    // ToC竞品情报
    tocIntelligence: [
        {
            id: 1,
            title: "AccuWeather推出AI驱动的极端天气预警系统",
            company: "AccuWeather",
            field: "ToC",
            date: "2026-09-05",
            type: "AI",
            rating: "S",
            summary: "AccuWeather宣布推出新一代AI极端天气预警系统，基于深度学习模型分析气象数据，可提前72小时预测极端天气事件，准确率提升40%。系统已在美国、欧洲市场上线，支持自然语言预警推送。",
            source: "https://www.accuweather.com/news",
            aiAnalysis: "这是AccuWeather在AI气象预测领域的重大突破，将AI能力从辅助分析提升到核心预警链路。72小时提前量和40%准确率提升具有明显竞争优势。",
            impactOnMoji: "对墨迹天气的影响：竞品在AI预警能力上形成领先优势，墨迹需要评估自身AI预警能力的差距，考虑是否加大AI气象预测投入。",
            ratingReason: "重大产品功能发布，涉及核心竞争力，对行业竞争格局有明显影响"
        },
        {
            id: 2,
            title: "The Weather Channel集成ChatGPT提供对话式天气查询",
            company: "The Weather Channel",
            field: "ToC",
            date: "2026-09-04",
            type: "AI",
            rating: "A",
            summary: "The Weather Channel在iOS和Android应用中集成OpenAI ChatGPT，用户可通过自然语言对话获取天气信息、出行建议和穿衣指南。功能支持30+语言，已在全球市场上线。",
            source: "https://weather.com/news",
            aiAnalysis: "生成式AI正在成为天气APP的标配功能，从单向信息展示向双向对话交互演进。The Weather Channel此举进一步强化了其在AI应用方面的领先地位。",
            impactOnMoji: "对墨迹天气的影响：竞品通过对话式交互提升用户体验，墨迹需要评估是否引入类似能力，以及如何在中文场景下提供更优质的对话体验。",
            ratingReason: "重要AI功能上线，提升用户交互体验，具有较强参考价值"
        },
        {
            id: 3,
            title: "Windy.com上线全球实时空气质量3D可视化",
            company: "Windy.com",
            field: "ToC",
            date: "2026-09-03",
            type: "产品",
            rating: "A",
            summary: "Windy.com推出全球空气质量3D可视化功能，整合NASA、ESA等机构的卫星数据，提供PM2.5、PM10、臭氧等污染物的实时3D地图展示。用户可旋转查看不同高度的空气质量分布。",
            source: "https://windy.com/news",
            aiAnalysis: "Windy.com持续强化其可视化优势，3D空气质量展示提升了数据呈现的专业性和直观性，符合其专业气象工具的产品定位。",
            impactOnMoji: "对墨迹天气的影响：可视化能力是差异化竞争点，墨迹需要评估是否在空气质量展示上投入，以及如何平衡专业性与易用性。",
            ratingReason: "重要产品功能，强化竞品差异化优势"
        },
        {
            id: 4,
            title: "彩云天气推出「AI气象播报员」功能",
            company: "彩云天气",
            field: "ToC",
            date: "2026-09-02",
            type: "AI",
            rating: "A",
            summary: "彩云天气上线AI虚拟播报员，基于数字人技术生成语音+视频天气播报，支持自定义播报内容和风格。功能已向会员用户开放，日均生成播报视频超10万条。",
            source: "https://caiyunapp.com/news",
            aiAnalysis: "彩云天气将AI应用于内容生成场景，通过数字人提升内容表现形式。虽然技术成熟度尚待验证，但探索了AI在气象内容生产上的新方向。",
            impactOnMoji: "对墨迹天气的影响：AI内容生成是潜在的差异化方向，墨迹可关注用户对此类功能的接受度，评估是否跟进。",
            ratingReason: "国内竞品AI功能创新，具有一定参考价值"
        },
        {
            id: 5,
            title: "Weather & Radar新增闪电追踪实时地图",
            company: "Weather & Radar",
            field: "ToC",
            date: "2026-09-01",
            type: "产品",
            rating: "B",
            summary: "Weather & Radar在雷达地图中新增全球闪电实时追踪功能，数据来自全球闪电探测网络，延迟低于5秒。用户可查看闪电密度、频率和移动方向。",
            source: "https://weatherradar.com/news",
            aiAnalysis: "闪电追踪是雷达地图的常规功能扩展，技术壁垒不高，但对关注极端天气的用户有一定价值。",
            impactOnMoji: "对墨迹天气的影响：功能性补充，可根据用户需求评估是否引入。",
            ratingReason: "常规功能更新，行业普遍趋势"
        }
    ],

    // ToB行业情报
    tobIntelligence: {
        metro: [
            {
                id: 101,
                title: "北京地铁与华风气象达成战略合作，共建智慧防汛系统",
                company: "华风气象",
                field: "地铁",
                date: "2026-09-06",
                type: "合作",
                rating: "S",
                summary: "北京地铁集团与华风气象签署战略合作协议，双方将共建覆盖全线网的智慧防汛气象保障系统。系统整合气象雷达、水文监测、AI预测模型，可提前2小时预警积水风险，预计2027年Q2投入使用。合同金额未披露。",
                source: "https://www.bjsubway.com/news",
                aiAnalysis: "这是地铁气象服务领域的标杆性合作，华风气象通过与头部客户的深度合作，建立了行业壁垒。项目涉及多系统集成和AI能力，代表了地铁气象服务的新标准。",
                impactOnMoji: "对墨迹天气的影响：地铁防汛是高价值ToB场景，华风气象已形成先发优势。墨迹如果计划进入地铁领域，需要差异化切入点和足够的技术积累。",
                ratingReason: "头部客户重大合作，行业标杆项目，明确展示客户需求"
            },
            {
                id: 102,
                title: "上海地铁发布《城市轨道交通气象灾害预警技术规范》",
                company: "上海地铁",
                field: "地铁",
                date: "2026-09-04",
                type: "政策",
                rating: "A",
                summary: "上海地铁发布企业标准《城市轨道交通气象灾害预警技术规范》，明确了暴雨、台风、高温等气象灾害的预警等级、响应流程和技术要求。该标准将向全国地铁行业推广。",
                source: "https://www.shmetro.com/policy",
                aiAnalysis: "行业标准的制定意味着地铁气象服务需求从零散项目向体系化、标准化演进，为气象服务商提供了明确的产品方向。上海地铁作为行业标杆，其标准具有风向意义。",
                impactOnMoji: "对墨迹天气的影响：标准明确了行业准入门槛和技术要求，墨迹如进入该领域需要对标相关规范进行产品设计。",
                ratingReason: "行业标准发布，影响后续市场格局"
            },
            {
                id: 103,
                title: "深圳地铁启动「智慧气象调度平台」招标",
                company: "深圳地铁",
                field: "地铁",
                date: "2026-09-02",
                type: "中标",
                rating: "A",
                summary: "深圳地铁集团发布「智慧气象调度平台」公开招标，项目预算1200万元，要求建设覆盖全线网的气象监测、预警、调度一体化平台，支持暴雨、台风、雷电等多场景，建设周期18个月。",
                source: "https://www.szmc.net/tender",
                aiAnalysis: "1200万预算显示地铁行业对气象服务的高价值认可。招标需求中明确要求AI预测能力和多系统集成，反映了行业对气象服务商的技术能力要求正在提升。",
                impactOnMoji: "对墨迹天气的影响：地铁行业项目金额大、技术要求高，具有ToB业务吸引力，但需要完整的解决方案能力和行业经验。",
                ratingReason: "高价值项目招标，明确展示客户需求和预算规模"
            }
        ],
        aviation: [
            {
                id: 201,
                title: "中国国航与WNI签署航空气象服务战略合作协议",
                company: "WNI",
                field: "航空",
                date: "2026-09-05",
                type: "合作",
                rating: "S",
                summary: "中国国际航空与日本气象服务商WNI签署五年战略合作协议，WNI将为国航提供全球航线气象服务，包括航危天气预警、航路优化建议、燃油优化等。合作覆盖国航200+条国际航线。",
                source: "https://www.airchina.com/news",
                aiAnalysis: "这是外资气象服务商在中国航空市场的重大突破。WNI在航空气象领域积累深厚，此次合作显示航空公司愿意为高质量气象服务付费，也反映了国内航空气象服务商在国际航线服务上的不足。",
                impactOnMoji: "对墨迹天气的影响：航空气象是高壁垒、高价值市场，需要全球数据能力和航空行业深度理解。如墨迹考虑进入，需要评估自身全球气象数据能力。",
                ratingReason: "头部客户重大合作，外资竞品突破，行业格局变化"
            },
            {
                id: 202,
                title: "民航局发布《航空气象服务AI应用指南》征求意见稿",
                company: "中国民航局",
                field: "航空",
                date: "2026-09-03",
                type: "政策",
                rating: "S",
                summary: "中国民航局发布《航空气象服务AI应用指南》征求意见稿，明确了AI在航空气象预测、风险评估、辅助决策等场景的应用规范、数据要求和安全标准。文件强调AI系统必须经过民航局认证。",
                source: "https://www.caac.gov.cn/policy",
                aiAnalysis: "民航局首次系统性规范AI在航空气象中的应用，标志着AI航空气象从探索期进入规范化发展期。认证要求提高了行业准入门槛，有利于头部企业建立优势。",
                impactOnMoji: "对墨迹天气的影响：政策明确了AI航空气象的发展方向和准入标准，如墨迹有意进入需要提前布局认证流程和技术能力。",
                ratingReason: "行业重大政策，明确AI应用规范和准入门槛"
            },
            {
                id: 203,
                title: "东航开发自主航路天气风险评估系统，降低延误率15%",
                company: "中国东方航空",
                field: "航空",
                date: "2026-09-01",
                type: "产品",
                rating: "A",
                summary: "中国东方航空自主开发的「航路天气风险评估系统」投入使用，系统整合气象数据、历史航班数据和机器学习模型，可提前24小时评估航路天气风险。使用该系统后，东航国内航线延误率下降15%。",
                source: "https://www.ceair.com/news",
                aiAnalysis: "航空公司开始自建气象能力，显示出对第三方服务商的不满或成本考虑。东航的成功案例可能推动其他航司跟进，对专业气象服务商形成压力。",
                impactOnMoji: "对墨迹天气的影响：客户自建能力是ToB市场的常见挑战，气象服务商需要提供客户难以自建的差异化价值（如全球数据、行业经验、持续优化）。",
                ratingReason: "客户自建能力，反映市场需求和竞争格局变化"
            }
        ],
        energy: [
            {
                id: 301,
                title: "国能日新中标国家电投5GW新能源功率预测项目",
                company: "国能日新",
                field: "能源",
                date: "2026-09-06",
                type: "中标",
                rating: "S",
                summary: "国能日新成功中标国家电投集团5GW新能源功率预测服务项目，合同金额8500万元，服务期5年。项目覆盖风电、光伏两大类型，要求预测准确率≥90%，支持超短期（15分钟级）、短期和中长期预测。",
                source: "https://www.gnsrn.com/news",
                aiAnalysis: "8500万大单显示能源气象服务的高价值属性。国家电投作为五大发电集团之一，此次采购规模巨大，显示新能源企业对专业功率预测服务的刚需。90%准确率要求体现行业技术壁垒。",
                impactOnMoji: "对墨迹天气的影响：能源气象是高价值ToB市场，但技术壁垒极高，需要深厚的气象数据、算法能力和行业经验。墨迹如考虑进入，需要长期技术积累和团队建设。",
                ratingReason: "超大金额中标，头部客户，明确展示市场规模和技术要求"
            },
            {
                id: 302,
                title: "国家能源局发布《新能源功率预测管理办法》修订版",
                company: "国家能源局",
                field: "能源",
                date: "2026-09-04",
                type: "政策",
                rating: "S",
                summary: "国家能源局发布《新能源功率预测管理办法（2026年修订版）》，将超短期预测时间间隔从30分钟缩短至15分钟，短期预测准确率要求从85%提升至90%。新规将于2027年1月1日实施。",
                source: "https://www.nea.gov.cn/policy",
                aiAnalysis: "政策收紧预测要求，将倒逼新能源企业升级预测系统或采购更高质量服务。15分钟超短期预测对数据更新频率和算法能力提出更高要求，行业技术门槛进一步提升。",
                impactOnMoji: "对墨迹天气的影响：政策变化带来市场需求升级，但也提高了进入门槛。墨迹如进入需要满足更高的技术标准。",
                ratingReason: "行业重大政策，提升技术要求，影响市场格局"
            },
            {
                id: 303,
                title: "远景能源推出AI功率预测平台，准确率达92%",
                company: "远景能源",
                field: "能源",
                date: "2026-09-02",
                type: "产品",
                rating: "A",
                summary: "远景能源发布新一代AI功率预测平台，基于Transformer架构深度学习模型，整合数值天气预报、卫星云图、实测数据，功率预测准确率达92%，超过行业平均水平5个百分点。平台已在远景自有风场部署。",
                source: "https://www.envisioncn.com/news",
                aiAnalysis: "设备制造商切入气象服务领域，显示能源气象市场的高价值吸引力。远景能源具备设备数据和客户资源优势，对专业气象服务商形成竞争压力。",
                impactOnMoji: "对墨迹天气的影响：能源气象市场竞争加剧，跨界竞争者增多，需要建立独特竞争优势。",
                ratingReason: "重要产品发布，跨界竞争者进入，市场格局变化"
            }
        ]
    },

    // 行业趋势
    trends: [
        {
            id: 1,
            name: "生成式AI进入天气服务核心链路",
            stage: "accelerating",
            strength: 4,
            firstSeen: "2026-07-15",
            lastUpdate: "2026-09-05",
            relatedEvents: 12,
            companies: ["AccuWeather", "The Weather Channel", "Google", "Tomorrow.io", "彩云天气"],
            description: "多家头部天气服务商开始将生成式AI应用于天气摘要、自然语言问答、极端天气解释等核心场景，AI正在从辅助工具向用户获取天气信息的主要入口演进。AccuWeather的AI预警、The Weather Channel的ChatGPT集成都是典型案例。",
            aiJudgment: "生成式AI在天气服务中的应用已从实验阶段进入规模化部署阶段。多家企业同时布局表明这是行业共识而非个别尝试。AI能力正在成为天气产品的核心竞争力之一，不具备AI能力的竞品可能面临用户体验劣势。",
            impactOnMoji: "对墨迹天气的影响：需要加快生成式AI的产品化落地，重点关注中文场景下的AI交互体验优化，避免在AI能力上被竞品拉开差距。"
        },
        {
            id: 2,
            name: "ToB气象服务向定制化、高精度方向演进",
            stage: "accelerating",
            strength: 4,
            firstSeen: "2026-06-20",
            lastUpdate: "2026-09-06",
            relatedEvents: 18,
            companies: ["华风气象", "WNI", "国能日新", "东润环能"],
            description: "地铁、航空、能源等ToB行业对气象服务的需求从通用预报向定制化、高精度、场景化方向发展。客户愿意为高质量服务支付更高费用，千万级项目频繁出现，行业整体向高价值方向升级。",
            aiJudgment: "ToB气象服务正在从标准化产品向解决方案转型，技术壁垒和行业壁垒同时提升。能够提供定制化、高精度服务的企业将获得更高溢价，通用化服务商面临价格压力。",
            impactOnMoji: "对墨迹天气的影响：如果墨迹计划拓展ToB业务，需要建立场景化、定制化服务能力，单纯的API接口难以满足高端客户需求。需要投入行业研究、技术研发和解决方案团队。"
        },
        {
            id: 3,
            name: "空气质量可视化成为天气APP新战场",
            stage: "emerging",
            strength: 3,
            firstSeen: "2026-08-10",
            lastUpdate: "2026-09-03",
            relatedEvents: 6,
            companies: ["Windy.com", "Weather & Radar", "彩云天气"],
            description: "多家天气APP强化空气质量展示能力，从简单数值向3D可视化、实时监测、污染物分层展示等方向升级。Windy.com的3D空气质量地图是代表性案例。",
            aiJudgment: "空气质量关注度上升推动产品功能升级，可视化能力成为差异化竞争点。但该趋势目前仍处于萌芽期，尚未形成用户刚需，更多是产品差异化尝试。",
            impactOnMoji: "对墨迹天气的影响：可根据用户反馈评估是否跟进，非核心功能，优先级相对较低。"
        }
    ],

    // 重点企业
    companies: [
        {
            id: 1,
            name: "AccuWeather",
            logo: "AW",
            field: ["ToC"],
            products: ["AccuWeather App", "MinuteCast", "RealFeel Temperature"],
            customers: ["全球C端用户", "媒体合作伙伴"],
            businessModel: "To C订阅会员 + 广告 + To B数据授权",
            recentActivity: 15,
            aiScore: 95,
            recentStrategy: "近3个月AccuWeather重点在AI能力建设上，先后推出AI极端天气预警、生成式AI天气摘要、AI驱动的过敏指数预测等功能。公司明确将AI定位为核心竞争力，通过AI提升预测准确性和用户体验。"
        },
        {
            id: 2,
            name: "华风气象",
            logo: "华风",
            field: ["ToB", "地铁", "航空"],
            products: ["气象预警平台", "防灾减灾系统", "专业气象服务"],
            customers: ["政府部门", "交通行业", "能源企业"],
            businessModel: "To B项目制 + 长期服务合同",
            recentActivity: 12,
            aiScore: 88,
            recentStrategy: "近6个月华风气象重点拓展地铁气象服务市场，与北京地铁、上海地铁建立战略合作，打造行业标杆案例。公司策略是通过头部客户建立行业壁垒，形成可复制的解决方案。"
        },
        {
            id: 3,
            name: "国能日新",
            logo: "国能",
            field: ["ToB", "能源"],
            products: ["新能源功率预测", "气象预报服务", "智慧能源平台"],
            customers: ["发电集团", "新能源企业", "电网公司"],
            businessModel: "To B软件授权 + 服务订阅",
            recentActivity: 18,
            aiScore: 92,
            recentStrategy: "国能日新近期密集中标大型功率预测项目，市场份额持续提升。公司策略是通过技术领先（90%+准确率）和持续服务能力建立客户粘性，同时向电力交易、虚拟电厂等新场景延伸。"
        }
    ],

    // 客户需求
    customerNeeds: [
        {
            id: 1,
            industry: "航空",
            need: "极端天气AI决策支持",
            frequency: 15,
            trend: "上升",
            relatedCustomers: 8,
            description: "航空公司需要AI系统在极端天气条件下提供航班调度、航路优化、旅客服务等综合决策建议，而非仅提供气象数据。"
        },
        {
            id: 2,
            industry: "能源",
            need: "超短期功率预测（15分钟级）",
            frequency: 12,
            trend: "上升",
            relatedCustomers: 10,
            description: "新能源企业需要更高频的超短期功率预测，以适应电力市场现货交易和双细则考核要求。"
        },
        {
            id: 3,
            industry: "地铁",
            need: "暴雨积水风险预警",
            frequency: 10,
            trend: "稳定",
            relatedCustomers: 6,
            description: "地铁运营商需要精准到站点的暴雨积水风险预警，结合地形、排水等数据提供风险评估和应急建议。"
        }
    ],

    // 报告
    reports: [
        {
            id: 1,
            type: "ToC周报",
            title: "ToC天气产品竞品周报",
            description: "监测全球主流天气APP产品动态、公司战略、市场数据，识别行业趋势，提供竞品分析和业务建议。",
            structure: ["核心洞察", "市场数据", "APP更新", "公司动态", "合作动态", "行业趋势", "对墨迹建议"]
        },
        {
            id: 2,
            type: "ToB周报",
            title: "气象行业ToB业务周报",
            description: "覆盖地铁、航空、能源三大行业，监测政策变化、客户需求、竞品动态、中标信息，识别商业机会。",
            structure: ["行业重点动态", "政策/标准", "客户需求", "竞品动态", "中标/合作", "行业趋势", "业务影响"]
        },
        {
            id: 3,
            type: "月度趋势",
            title: "气象行业月度趋势报告",
            description: "基于一个月情报数据，系统性分析ToC和ToB领域的结构性变化、新兴趋势和战略机会。",
            structure: ["趋势总览", "ToC市场变化", "ToB市场变化", "技术趋势", "政策影响", "战略机会", "风险提示"]
        }
    ]
};
