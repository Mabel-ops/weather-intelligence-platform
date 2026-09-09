// 气象行业情报监测平台 - 模拟数据

const MOCK_DATA = {
    // 首页统计
    stats: {
        weeklyIntel: 51,
        keyIntel: 14,
        companies: 19,
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
        },
        {
            id: 6,
            title: "Weathernews强化台风路径预测精度，新版本上线",
            company: "Weathernews",
            field: "ToC",
            date: "2026-08-30",
            type: "产品",
            rating: "A",
            summary: "日本气象服务商Weathernews发布最新版本，强化台风路径预测功能。结合日本气象厅数据和自有AI模型，台风路径预测准确率达行业领先水平。新版本还优化了海洋天气服务和降雪预报可视化。",
            source: "https://weathernews.jp/news",
            aiAnalysis: "Weathernews在亚太地区台风预测领域积累深厚，其专业化和本地化策略值得关注。针对台风等高关注天气场景的深度优化能够建立竞争壁垒。",
            impactOnMoji: "对墨迹天气的影响：台风预测是中国沿海地区用户的核心需求，Weathernews的技术优势显示专业化方向的价值。墨迹可考虑在台风、暴雨等灾害性天气预报上加大投入。",
            ratingReason: "日本头部竞品产品更新，台风预测技术领先"
        },
        {
            id: 7,
            title: "Weather & Radar德国版完成重大更新，用户体验全面升级",
            company: "Weather & Radar",
            field: "ToC",
            date: "2026-08-28",
            type: "产品",
            rating: "A",
            summary: "德国天气应用Weather & Radar（App ID: 545993260）发布v2.48版本，升级多普勒雷达显示效果，支持自定义雷达图层。新版本优化了极端天气推送逻辑，用户可精细化设置预警阈值。",
            source: "https://weatherradar.de/news",
            aiAnalysis: "Weather & Radar通过持续强化雷达可视化建立差异化优势，自定义图层功能满足专业用户需求。其在欧洲市场的成功显示专业工具型产品的市场空间。",
            impactOnMoji: "对墨迹天气的影响：雷达可视化是专业用户和极端天气场景的重要功能。墨迹需要评估雷达地图的产品优先级，以及如何在大众化定位下提供专业功能。",
            ratingReason: "欧洲主流竞品重大更新，雷达技术有特色"
        },
        {
            id: 8,
            title: "天气通优化UI设计，新增语音播报功能",
            company: "天气通",
            field: "ToC",
            date: "2026-08-25",
            type: "产品",
            rating: "B",
            summary: "天气通发布v8.05版本，优化首页布局采用更简洁的卡片式设计，新增语音播报功能支持方言播报。新版本还支持15天趋势预报，并修复了部分机型的闪退问题。",
            source: "https://www.weather.com.cn/app",
            aiAnalysis: "天气通在UI简化和适老化功能上有所探索。语音播报支持方言是针对中老年用户的差异化功能，显示对不同用户群体需求的关注。",
            impactOnMoji: "对墨迹天气的影响：天气通在UI简化和适老化方面的尝试值得参考。墨迹可考虑针对不同年龄段用户推出差异化功能，如简化版或长辈模式。",
            ratingReason: "国内竞品常规更新，适老化功能有特色"
        },
        {
            id: 9,
            title: "看天专注农业气象，新增农作物病虫害预警",
            company: "看天",
            field: "ToC",
            date: "2026-08-22",
            type: "产品",
            rating: "B",
            summary: "看天发布v3.2版本，专注农业气象服务。新增农作物病虫害预警功能，结合天气数据和农业知识为农户提供实用建议。优化了乡镇级天气预报精度，新增农事建议功能。",
            source: "https://kantian.app/news",
            aiAnalysis: "看天通过深耕农业气象垂直场景建立差异化定位。农作物病虫害预警等专业功能显示对细分用户需求的深度理解，垂直化策略值得关注。",
            impactOnMoji: "对墨迹天气的影响：垂直场景深耕是差异化竞争的有效策略。看天在农业气象上的探索显示细分市场潜力，墨迹可评估是否在某些垂直场景（如户外运动、旅游等）做专业化尝试。",
            ratingReason: "垂直化竞品产品更新，农业气象场景有价值"
        }
    ],

    // ToC竞品 - App版本更新
    tocAppUpdates: [
        {
            id: 1,
            company: "AccuWeather",
            version: "v28.5.0",
            date: "2026-09-05",
            rating: "S",
            updateContent: "• 新增AI极端天气预警系统\n• 支持提前72小时预测极端天气\n• 优化分钟级降水预报准确率\n• 新增自然语言预警推送",
            highlights: "AI预警系统是本次更新的核心亮点，AccuWeather将深度学习模型应用于极端天气预测，准确率提升40%。系统可自动识别用户位置的极端天气风险并主动推送，预警提前量达72小时，在行业内形成明显领先优势。",
            insightForMoji: "AccuWeather将AI能力从辅助工具升级为核心预警功能，显示AI正在成为天气应用的核心竞争力。墨迹天气需要评估自身AI预警能力的差距，考虑加大AI气象预测研发投入，避免在核心功能上被竞品拉开差距。",
            source: "App Store / Google Play"
        },
        {
            id: 2,
            company: "The Weather Channel",
            version: "v52.8.1",
            date: "2026-09-04",
            rating: "A",
            updateContent: "• 集成ChatGPT对话式天气查询\n• 支持30+语言自然语言交互\n• 新增AI穿衣建议和出行规划\n• 优化雷达地图加载速度",
            highlights: "首次将ChatGPT深度集成到天气查询流程中，用户可通过自然对话获取个性化天气建议。支持复杂场景问答，如'明天适合带孩子去公园吗？'系统会综合天气、温度、空气质量给出建议。多语言支持显示其全球化战略。",
            insightForMoji: "生成式AI正在改变用户与天气信息的交互方式，从单向查询向双向对话演进。墨迹需要关注中文场景下的AI对话体验，探索更符合国内用户习惯的交互方式，如结合本地生活场景（外卖、出行、穿搭）提供建议。",
            source: "App Store / Google Play"
        },
        {
            id: 3,
            company: "Windy.com",
            version: "v39.2.0",
            date: "2026-09-03",
            rating: "A",
            updateContent: "• 上线全球实时空气质量3D可视化\n• 整合NASA、ESA卫星数据\n• 支持PM2.5、PM10、臭氧等多污染物展示\n• 新增污染物扩散动画",
            highlights: "Windy.com持续强化其可视化优势，3D空气质量地图可旋转查看不同高度的污染物分布。整合全球权威机构的卫星数据，提升了数据的专业性和权威性。污染物扩散动画帮助用户理解空气质量变化趋势。",
            insightForMoji: "可视化能力是差异化竞争点，但需要平衡专业性与易用性。Windy.com的专业工具定位适合气象爱好者，墨迹作为大众产品需要评估是否在空气质量展示上投入，以及如何简化呈现方式。",
            source: "App Store / Google Play"
        },
        {
            id: 4,
            company: "彩云天气",
            version: "v7.12.0",
            date: "2026-09-02",
            rating: "A",
            updateContent: "• 上线AI虚拟播报员\n• 支持自定义播报风格和内容\n• 优化分钟级降水预报算法\n• 新增天气变化提醒",
            highlights: "AI虚拟播报员基于数字人技术，可生成个性化的语音+视频天气播报。用户可选择播报员形象、声音风格和播报内容重点。功能已向会员开放，日均生成播报视频超10万条，用户接受度较高。",
            insightForMoji: "AI内容生成是创新方向，但需要关注用户真实需求和留存数据。彩云天气的数据显示用户对AI播报有一定接受度。墨迹可小范围测试类似功能，验证用户接受度和付费意愿后再决定是否大规模推广。",
            source: "App Store / 应用宝"
        },
        {
            id: 5,
            company: "Weather & Radar",
            version: "v2.48.5",
            date: "2026-09-01",
            rating: "A",
            updateContent: "• 新增全球闪电实时追踪\n• 升级多普勒雷达显示效果\n• 支持自定义雷达图层\n• 优化极端天气推送逻辑",
            highlights: "Weather & Radar持续强化其雷达可视化核心优势，闪电追踪数据来自全球闪电探测网络，延迟低于5秒。自定义图层功能允许专业用户叠加多种气象要素，满足深度分析需求。极端天气推送支持精细化阈值设置。",
            insightForMoji: "雷达可视化是专业用户和极端天气场景的重要功能。墨迹需要评估在雷达地图上的投入力度，以及如何在大众化产品定位下提供专业功能，可考虑通过会员功能区分普通用户和专业用户需求。",
            source: "App Store / Google Play"
        },
        {
            id: 6,
            company: "Weathernews",
            version: "v5.2.0",
            date: "2026-08-30",
            rating: "A",
            updateContent: "• 强化台风路径预测精度\n• 新增海洋天气专业服务\n• 优化降雪预报可视化\n• 支持Apple Watch独立运行",
            highlights: "Weathernews强化其在亚太地区的台风预测优势，结合日本气象厅数据和自有AI模型，台风路径预测准确率达行业领先水平。海洋天气服务针对渔业、航运等专业用户，显示其垂直化策略。Apple Watch独立应用提升便捷性。",
            insightForMoji: "日本竞品在台风等灾害性天气预报上积累深厚，其专业化路线值得借鉴。墨迹可考虑在台风、暴雨等中国用户高关注的灾害天气场景上做深度优化，建立差异化优势。可穿戴设备支持也是提升用户体验的方向。",
            source: "App Store（日本区）"
        },
        {
            id: 7,
            company: "天气通",
            version: "v8.05",
            date: "2026-08-28",
            rating: "B",
            updateContent: "• 优化首页布局和UI设计\n• 新增语音播报功能\n• 支持15天趋势预报\n• 修复部分机型闪退问题",
            highlights: "UI改版采用更简洁的卡片式设计，减少信息密度，降低认知负担。语音播报功能支持多种方言（粤语、四川话等），针对中老年用户优化。15天预报满足用户对长期天气的关注需求。",
            insightForMoji: "天气通在UI简化和适老化功能上有所探索。语音播报支持方言是针对特定用户群体的差异化功能。墨迹可关注不同年龄段用户的差异化需求，考虑推出简化版、长辈模式或无障碍优化。",
            source: "应用宝 / 华为应用市场"
        },
        {
            id: 8,
            company: "看天",
            version: "v3.2.1",
            date: "2026-08-25",
            rating: "B",
            updateContent: "• 新增农业天气指数\n• 支持农作物病虫害预警\n• 优化乡镇级天气预报\n• 新增农事建议功能",
            highlights: "看天专注农业气象服务，新增的农作物病虫害预警结合天气数据和农业知识，为农户提供实用建议。乡镇级预报精度提升，农事建议涵盖播种、施肥、收割等关键环节。垂直化定位清晰。",
            insightForMoji: "垂直场景的深耕是差异化竞争策略。看天在农业气象上的探索显示细分市场的潜力。墨迹可评估是否在某些垂直场景（如户外运动、旅游、钓鱼等）做专业化尝试，通过深度满足特定用户群体需求建立竞争壁垒。",
            source: "应用宝 / 小米应用商店"
        }
    ],

    // ToC竞品 - 公司动态
    tocCompanyNews: [
        {
            id: 101,
            company: "AccuWeather",
            date: "2026-09-06",
            type: "战略",
            rating: "S",
            title: "AccuWeather宣布AI战略升级，计划3年投入2亿美元",
            content: "AccuWeather宣布全面升级AI战略，未来3年将投入2亿美元用于AI气象预测研发。公司CEO表示，AI将成为AccuWeather的核心竞争力，目标是在2028年实现全球最准确的极端天气预警。投资将重点用于深度学习模型研发、计算基础设施建设和AI人才引进。",
            source: "AccuWeather官网 / TechCrunch",
            impactOnMoji: "头部竞品大举押注AI，显示行业共识：AI是天气服务的未来。墨迹需要评估自身AI研发投入是否足够，避免在技术竞赛中落后。2亿美元投入显示竞争激烈程度，需要思考如何在资源有限的情况下找到差异化的AI应用方向。"
        },
        {
            id: 102,
            company: "The Weather Channel",
            date: "2026-09-03",
            type: "合作",
            rating: "A",
            title: "The Weather Channel x OpenAI：深化AI天气服务合作",
            content: "The Weather Channel与OpenAI达成深度合作协议，OpenAI将为其定制专用AI模型，用于天气解释、风险评估和个性化建议。合作期限3年，金额未披露。双方将共同探索多模态AI在天气服务中的应用，包括图像识别、语音交互等。",
            source: "TechCrunch / The Verge",
            impactOnMoji: "竞品通过与AI头部企业合作快速获得技术能力，避免从零开始自研。墨迹可考虑类似的技术合作路径，如与国内AI大模型厂商（百度、阿里、字节）合作，快速获得生成式AI能力，同时保持产品差异化。"
        },
        {
            id: 103,
            company: "Windy.com",
            date: "2026-08-30",
            type: "技术",
            rating: "B",
            title: "Windy.com开源气象可视化框架WinViz",
            content: "Windy.com宣布开源其内部使用的气象可视化框架WinViz，支持WebGL渲染、多图层叠加、实时数据更新等功能。开源社区反响热烈，已有多家气象机构和开发者采用。Windy.com表示开源是为了推动行业技术进步。",
            source: "Windy.com官网 / GitHub",
            impactOnMoji: "开源策略帮助Windy.com建立技术影响力和开发者生态。墨迹可评估是否开源部分非核心技术（如可视化组件），通过开源社区获得外部贡献和品牌影响力。但需要注意核心技术的保护。"
        },
        {
            id: 104,
            company: "彩云天气",
            date: "2026-08-25",
            type: "合作",
            rating: "A",
            title: "彩云天气 x 华为：共建鸿蒙原生天气服务",
            content: "彩云天气与华为达成战略合作，将为HarmonyOS NEXT开发鸿蒙原生天气应用，深度适配鸿蒙生态。应用将整合华为端侧AI能力，利用鸿蒙分布式特性实现多设备协同。预计2027年Q1上线，华为将在应用市场给予流量扶持。",
            source: "36氪 / 华为官网",
            impactOnMoji: "国内竞品积极拥抱鸿蒙生态，抢占新平台红利。墨迹需要评估鸿蒙原生开发的优先级，避免在新生态中落后。鸿蒙的分布式特性和端侧AI能力可能带来新的产品创新机会，值得重点关注。"
        },
        {
            id: 105,
            company: "Weather & Radar",
            date: "2026-08-20",
            type: "融资",
            rating: "A",
            title: "Weather & Radar完成1500万欧元B轮融资",
            content: "德国天气应用Weather & Radar宣布完成1500万欧元B轮融资，由欧洲气候科技基金Climate Tech Ventures领投，现有投资人跟投。资金将用于扩大欧洲市场份额、强化雷达技术研发和团队扩张。公司透露用户数已突破1000万，付费率达8%。",
            source: "TechCrunch Europe / Crunchbase",
            impactOnMoji: "资本持续看好天气应用赛道，特别是有技术差异化的产品。8%付费率显示专业工具有付费潜力。墨迹需要持续强化自身技术护城河，保持竞争力。可关注欧洲市场对隐私保护、数据透明度的高要求，国内合规趋势可能借鉴。"
        },
        {
            id: 106,
            company: "Weathernews",
            date: "2026-08-15",
            type: "技术",
            rating: "A",
            title: "Weathernews推出新一代台风预测AI模型",
            content: "Weathernews发布新一代台风路径预测AI模型，结合卫星数据、海洋浮标数据和历史台风数据训练。模型在2023-2025年台风数据上的回测显示，72小时路径预测误差比传统方法降低15%。该模型已应用于日本、韩国、台湾等亚太市场。",
            source: "Weathernews技术博客",
            impactOnMoji: "台风预测是亚太地区的核心需求，Weathernews的技术领先值得关注。墨迹可加强台风等灾害性天气的预测能力建设，特别是中国东南沿海地区用户对台风预报的准确性和及时性要求高，这是建立用户信任的关键场景。"
        },
        {
            id: 107,
            company: "天气通",
            date: "2026-08-10",
            type: "合作",
            rating: "B",
            title: "天气通 x 中国气象局：接入权威气象数据",
            content: "天气通宣布与中国气象局达成合作，接入气象局权威气象数据源，包括国家级气象站实测数据、数值预报产品等。合作将提升天气通的预报准确性和数据权威性。气象局表示欢迎更多民营气象企业规范使用官方数据。",
            source: "天气通官方 / 中国气象局",
            impactOnMoji: "权威数据源合作提升产品可信度。墨迹需要关注官方数据接入政策变化，确保数据源的合规性和权威性。官方数据的规范使用可能成为行业准入门槛，需要提前布局合作关系。"
        },
        {
            id: 108,
            company: "看天",
            date: "2026-08-05",
            type: "合作",
            rating: "B",
            title: "看天 x 农业农村部：共建农业气象服务平台",
            content: "看天与农业农村部信息中心达成合作，共建农业气象服务平台。平台将整合气象数据、农业生产数据、市场价格数据，为农户提供从种植决策到市场销售的全链路服务。农业农村部将在全国农技推广体系中推广该平台。",
            source: "农业农村部官网 / 看天官方",
            impactOnMoji: "垂直场景与政府部门合作能快速建立行业壁垒。看天的农业气象路线显示差异化定位的价值。墨迹可思考是否在某些垂直场景与行业主管部门或头部企业合作，通过B端合作带动C端用户增长。"
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
            category: "ToC",
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
            category: "ToB",
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
            category: "ToC",
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
        },
        {
            id: 4,
            name: "Weathernews",
            logo: "WN",
            field: ["ToC"],
            products: ["Weathernews App", "台风预测", "海洋天气"],
            customers: ["日本及亚太地区C端用户", "专业用户"],
            businessModel: "To C订阅会员 + To B专业服务",
            recentActivity: 8,
            aiScore: 90,
            recentStrategy: "Weathernews在亚太地区深耕台风和海洋气象服务，通过专业化和本地化建立竞争优势。近期强化AI台风预测能力，准确率达到行业领先水平。"
        },
        {
            id: 5,
            name: "Weather & Radar",
            logo: "WR",
            field: ["ToC"],
            products: ["Weather & Radar App", "雷达地图", "闪电追踪"],
            customers: ["欧洲C端用户", "专业气象爱好者"],
            businessModel: "To C订阅会员 + 广告",
            recentActivity: 10,
            aiScore: 85,
            recentStrategy: "Weather & Radar专注雷达可视化和极端天气监测，通过技术差异化在欧洲市场占据一席之地。近期获得B轮融资，计划扩大市场份额和强化技术研发。"
        },
        {
            id: 6,
            name: "天气通",
            logo: "天气通",
            field: ["ToC"],
            products: ["天气通App", "语音播报", "15天预报"],
            customers: ["国内C端用户"],
            businessModel: "To C广告 + 增值服务",
            recentActivity: 6,
            aiScore: 75,
            recentStrategy: "天气通在UI简化和适老化功能上有所探索，语音播报支持方言是其特色。产品定位偏向大众化和易用性，关注中老年用户群体。"
        },
        {
            id: 7,
            name: "看天",
            logo: "看天",
            field: ["ToC"],
            products: ["看天App", "农业气象", "病虫害预警"],
            customers: ["农业用户", "乡村用户"],
            businessModel: "To C免费 + To B农业服务",
            recentActivity: 5,
            aiScore: 78,
            recentStrategy: "看天专注农业气象垂直场景，通过深度理解农业用户需求建立差异化定位。乡镇级预报和农事建议是其核心优势，显示垂直化策略的潜力。"
        },
        {
            id: 8,
            name: "The Weather Channel",
            logo: "TWC",
            field: ["ToC"],
            products: ["The Weather Channel App", "Watson AI天气", "Storm Radar"],
            customers: ["全球C端用户", "企业客户"],
            businessModel: "To C订阅会员 + 广告 + To B数据服务",
            recentActivity: 14,
            aiScore: 93,
            recentStrategy: "The Weather Channel近期战略重点是深化AI能力，与OpenAI合作开发定制AI模型，将生成式AI整合到天气查询全流程。通过AI对话提升用户体验，探索天气信息交互的新范式。"
        },
        {
            id: 9,
            name: "Windy.com",
            logo: "Windy",
            field: ["ToC"],
            products: ["Windy App", "气象可视化", "飞行天气"],
            customers: ["专业用户", "户外爱好者", "飞行员"],
            businessModel: "To C订阅会员 + 企业授权",
            recentActivity: 9,
            aiScore: 82,
            recentStrategy: "Windy.com专注气象数据可视化，通过强大的地图和动画展示建立技术壁垒。近期开源可视化框架WinViz，通过开源社区建立技术影响力，同时强化3D空气质量展示等专业功能。"
        },
        {
            id: 10,
            name: "彩云天气",
            logo: "彩云",
            field: ["ToC"],
            products: ["彩云天气App", "分钟级降水预报", "AI播报员"],
            customers: ["国内C端用户"],
            businessModel: "To C会员订阅 + 广告 + To B API服务",
            recentActivity: 11,
            aiScore: 87,
            recentStrategy: "彩云天气近期重点在AI内容生成和鸿蒙生态布局。推出AI虚拟播报员功能，与华为合作开发鸿蒙原生应用。继续强化分钟级降水预报的核心优势，探索AI在天气服务中的创新应用。"
        },
        {
            id: 11,
            name: "WNI",
            logo: "WNI",
            field: ["ToB", "航空"],
            products: ["航空气象服务", "航路优化", "风险评估"],
            customers: ["航空公司", "机场", "物流企业"],
            businessModel: "To B专业服务 + 长期合同",
            recentActivity: 10,
            aiScore: 89,
            recentStrategy: "WNI（Weathernews旗下）在航空气象领域深耕多年，近期与中国国航达成战略合作，为国际航线提供全球气象服务。通过高质量专业服务和全球数据能力建立竞争壁垒。"
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
