import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value !== undefined ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

const translations = {
  en: {
    nav: {
      home: 'Home',
      mission: 'Mission',
      valueChain: 'Value Chain',
      advantage: 'Advantage',
      team: 'Team',
      analysis: 'Analysis',
      investment: 'Investment',
      vision: 'Vision',
    },
    hero: {
      badge: 'NEXT-GENERATION INTELLIGENCE',
      title: 'Numen Intelligence',
      subtitle: 'Advanced AI-Powered Geopolitical Risk Analysis for Central Asia',
      description: 'Leveraging cutting-edge artificial intelligence and deep regional expertise to deliver unprecedented strategic intelligence for investors, policymakers, and enterprises operating in Central Asian markets.',
      cta: 'Explore Intelligence Platform',
      scroll: 'Scroll to explore',
    },
    mission: {
      badge: 'OUR MISSION',
      title: 'Transforming Uncertainty into Strategic Advantage',
      vision: {
        title: 'Vision',
        content: 'To become the definitive intelligence platform for Central Asia, trusted by global leaders for critical decision-making in one of the world\'s most dynamic emerging regions.',
      },
      mission: {
        title: 'Mission',
        content: 'We empower clients with AI-enhanced intelligence that transcends traditional analysis. By synthesizing vast data streams—from economic indicators and political developments to social media sentiment and satellite imagery—we provide actionable insights that drive strategic success in Central Asian markets.',
      },
      values: {
        title: 'Core Values',
        items: [
          'Precision: Uncompromising accuracy in every analysis',
          'Innovation: Pioneering AI methodologies for geopolitical intelligence',
          'Integrity: Objective, unbiased insights free from political influence',
          'Expertise: Deep regional knowledge combined with technological excellence',
        ],
      },
    },
    valueChain: {
      badge: 'VALUE CHAIN',
      title: 'Three-Pillar Intelligence Architecture',
      description: 'Our comprehensive intelligence ecosystem transforms raw data into strategic advantage through three interconnected phases.',
      collection: {
        title: 'Intelligence Collection',
        subtitle: 'Multi-Source Data Aggregation',
        items: [
          'Open-source intelligence (OSINT) from 10,000+ regional sources',
          'Proprietary economic databases tracking 120+ indicators',
          'Real-time news monitoring in 8 languages',
          'Social media sentiment analysis across major platforms',
          'Satellite imagery and geospatial intelligence',
          'Expert network consultations with regional specialists',
        ],
      },
      processing: {
        title: 'AI Processing Engine',
        subtitle: 'Machine Learning & Natural Language Processing',
        items: [
          'Advanced NLP for multilingual document analysis',
          'Machine learning models trained on 15 years of regional data',
          'Predictive algorithms for risk forecasting',
          'Automated pattern recognition across disparate data sources',
          'Real-time anomaly detection and alert systems',
          'Continuous model refinement through supervised learning',
        ],
      },
      delivery: {
        title: 'Strategic Delivery',
        subtitle: 'Actionable Intelligence Products',
        items: [
          'Daily intelligence briefings and critical alerts',
          'In-depth analytical reports on key developments',
          'Custom risk assessments for specific investments',
          'Interactive dashboards with real-time data visualization',
          'Scenario planning and forecasting tools',
          'Direct analyst consultation for premium clients',
        ],
      },
    },
    advantage: {
      badge: 'COMPETITIVE ADVANTAGE',
      title: 'Why Numen Intelligence Leads the Market',
      description: 'Our unique combination of advanced technology, regional expertise, and proven track record sets us apart in the Central Asian intelligence landscape.',
      aiModule: {
        title: 'Proprietary AI Risk Module',
        accuracy: '89% Prediction Accuracy',
        accuracyDesc: 'Validated against 3+ years of regional events',
        parameters: '120+ Risk Parameters',
        parametersDesc: 'Comprehensive multi-dimensional analysis',
        features: [
          'Political stability indicators and regime risk assessment',
          'Economic volatility forecasting and currency risk models',
          'Social unrest prediction through sentiment analysis',
          'Cross-border trade flow analysis and disruption alerts',
          'Energy security monitoring and pipeline risk assessment',
          'Water resource conflict modeling and environmental risks',
        ],
      },
      partnerships: {
        title: 'Elite Academic & Professional Partnerships',
        description: 'Collaboration with world-leading institutions ensures cutting-edge methodology and credibility.',
        institutions: [
          {
            name: 'Harvard University',
            role: 'Economic Modeling & Research Methodology',
          },
          {
            name: 'MIT',
            role: 'AI Development & Machine Learning Architecture',
          },
          {
            name: 'Nobel Laureates',
            role: 'Economic Advisory Board (2 Nobel Prize winners)',
          },
          {
            name: 'Regional Universities',
            role: 'Local expertise and on-ground intelligence networks',
          },
        ],
      },
      track: {
        title: 'Proven Track Record',
        stats: [
          {
            value: '250+',
            label: 'Daily Intelligence Digests Published',
          },
          {
            value: '89%',
            label: 'Prediction Accuracy Rate',
          },
          {
            value: '50+',
            label: 'Enterprise Clients Served',
          },
          {
            value: '24/7',
            label: 'Real-Time Monitoring',
          },
        ],
      },
    },
    team: {
      badge: 'OUR TEAM',
      title: 'Expert Leadership & Advisory Board',
      description: 'Our team combines decades of experience in geopolitical analysis, regional expertise, and cutting-edge technology to deliver unparalleled intelligence insights for Central Asia.',
      advisoryTitle: 'Advisory Board',
      advisoryDescription: 'Supported by distinguished advisors from Harvard, MIT, and Nobel laureates in Economics',
      institutions: ['Harvard University', 'MIT', 'Nobel Laureates', 'Former Policymakers'],
      expertise: 'Expertise',
      education: 'Education',
      members: [
        {
          name: 'Talgat Kabdygali',
          role: 'CEO, Co-Founder',
          expertise: 'Political Analysis, Infrastructure Investment',
          education: 'Harvard College',
        },
        {
          name: 'Aidynbek Mussa',
          role: 'CTO, Co-Founder',
          expertise: 'AI Applications, Data Science, Machine Learning',
          education: 'Columbia University',
        },
        {
          name: 'Sagit Bakirov',
          role: 'Co-Founder',
          expertise: 'Geopolitical Risk, Energy Security, Public Policy',
          education: 'Harvard Kennedy School',
        },
      ],
    },
    analysis: {
      badge: 'INTELLIGENCE HUB',
      title: 'Central Asian Analysis & Daily Digests',
      description: 'Real-time intelligence, daily digests, and in-depth analysis covering economic trends, geopolitical developments, trade flows, and strategic insights across the Central Asian region.',
      filter: 'Filter by Category:',
      categories: {
        all: 'All',
        economics: 'Economics',
        trade: 'Trade',
        energy: 'Energy',
        geopolitics: 'Geopolitics',
        environment: 'Environment',
        technology: 'Technology',
      },
      readMore: 'Read More',
      stats: {
        digests: 'Daily Digests Published',
        accuracy: 'Prediction Accuracy',
        monitoring: 'Real-Time Monitoring',
      },
      subscribe: {
        title: 'Subscribe to Daily Intelligence Briefings',
        description: 'Receive curated analysis and breaking developments directly to your inbox every morning',
        button: 'Subscribe Now',
      },
    },
    investment: {
      badge: 'INVESTMENT OPPORTUNITY',
      title: 'Seed Round Investment Proposal',
      description: 'Join us in revolutionizing Central Asian intelligence. Strategic seed funding will accelerate platform development, expand our AI capabilities, and establish market dominance.',
      allocation: {
        title: 'Capital Allocation ($2M Seed Round)',
        items: [
          {
            percentage: '40%',
            title: 'AI Platform Development',
            description: 'Enhance machine learning models, expand NLP capabilities, scale infrastructure',
          },
          {
            percentage: '30%',
            title: 'Team Expansion',
            description: 'Hire regional analysts, data scientists, and senior engineers',
          },
          {
            percentage: '20%',
            title: 'Market Development',
            description: 'Client acquisition, strategic partnerships, brand positioning',
          },
          {
            percentage: '10%',
            title: 'Operations & Legal',
            description: 'Office setup, legal framework, compliance infrastructure',
          },
        ],
      },
      revenue: {
        title: 'Revenue Model & Growth Projections',
        streams: [
          {
            title: 'Subscription Tiers',
            items: [
              'Basic: $2,000/month - Daily briefings and reports',
              'Professional: $7,500/month - Full platform access + analyst support',
              'Enterprise: $25,000/month - Custom intelligence + dedicated team',
            ],
          },
          {
            title: 'Custom Consulting',
            items: [
              'Due diligence for M&A transactions',
              'Country-specific risk assessments',
              'Crisis response intelligence',
            ],
          },
          {
            title: 'Data Licensing',
            items: [
              'API access to proprietary datasets',
              'White-label intelligence products',
            ],
          },
        ],
        projections: {
          title: 'Financial Projections',
          year1: { revenue: '$500K', clients: '25' },
          year2: { revenue: '$2.5M', clients: '100' },
          year3: { revenue: '$8M', clients: '250' },
        },
      },
      investor: {
        title: 'Investor Benefits',
        items: [
          'Early access to high-growth emerging market intelligence sector',
          'Proprietary AI technology with defensible moat',
          'Established relationships with elite academic institutions',
          'First-mover advantage in underserved Central Asian market',
          'Clear path to profitability with recurring revenue model',
          'Potential strategic acquisition targets (larger intelligence firms, consultancies)',
        ],
      },
    },
    vision: {
      badge: '2028 VISION',
      title: 'Building the Future of Geopolitical Intelligence',
      description: 'Our roadmap transforms Numen Intelligence into the indispensable platform for Central Asian strategic decision-making.',
      milestones: [
        {
          year: '2025-2026',
          title: 'Platform Excellence',
          items: [
            'Launch full-featured web and mobile platforms',
            'Achieve 100 enterprise clients across finance, energy, and government sectors',
            'Expand coverage to all five Central Asian countries',
            'Establish partnerships with major financial institutions',
          ],
        },
        {
          year: '2026-2027',
          title: 'Regional Dominance',
          items: [
            'Become the recognized leader in Central Asian intelligence',
            '250+ clients including Fortune 500 companies',
            'Open offices in Almaty, Tashkent, and Astana',
            'Launch specialized industry verticals (energy, mining, infrastructure)',
          ],
        },
        {
          year: '2027-2028',
          title: 'Global Expansion',
          items: [
            'Extend coverage to Caucasus region and Mongolia',
            'Strategic partnerships with international intelligence firms',
            'Series B funding round ($15-20M) for geographic expansion',
            'Position for strategic acquisition or IPO',
          ],
        },
      ],
      longTerm: {
        title: 'Long-term Strategic Goals',
        items: [
          'Establish Numen as the global standard for emerging market intelligence',
          'Develop predictive capabilities for global commodity markets',
          'Create the most comprehensive database on Central Asian political economy',
          'Build technology platform licensable to other regional intelligence providers',
        ],
      },
    },
    conclusion: {
      badge: 'THE OPPORTUNITY',
      title: 'Central Asia at a Historic Inflection Point',
      description: 'The convergence of China\'s Belt and Road Initiative, Russia\'s evolving influence, massive energy resources, and growing geopolitical significance makes Central Asia one of the world\'s most critical yet least understood regions.',
      why: {
        title: 'Why Central Asia Matters Now',
        items: [
          'Strategic corridor between Europe and Asia with $1+ trillion in infrastructure investment',
          'Vast untapped energy resources (oil, gas, uranium, rare earth minerals)',
          'Population of 75 million with rapidly growing consumer markets',
          'Geopolitical competition intensifying between China, Russia, US, and EU',
          'Critical role in global supply chains and energy security',
        ],
      },
      gap: {
        title: 'The Intelligence Gap',
        description: 'Despite its importance, Central Asia remains dramatically underserved by existing intelligence providers. Traditional firms lack regional expertise and technological sophistication. Local analysts lack global standards and AI capabilities.',
      },
      solution: {
        title: 'Numen Intelligence: The Solution',
        description: 'We bridge this gap with a unique combination of cutting-edge AI, deep regional expertise, and world-class academic partnerships. Our platform delivers the precise, actionable intelligence that enterprises and governments need to navigate Central Asian complexity.',
      },
      call: {
        title: 'Join Us in Shaping the Future',
        description: 'This is a rare opportunity to invest in a high-growth intelligence platform addressing a massive underserved market. With proven technology, elite partnerships, and strong founding team, Numen Intelligence is positioned to dominate Central Asian strategic intelligence.',
        contact: 'Contact Us',
        contactDescription: 'For investment inquiries and partnership opportunities',
      },
    },
    article: {
      backButton: 'Back to Intelligence Hub',
      author: 'Author',
      readTime: 'read',
      share: 'Share',
      tags: 'Tags',
      readMoreArticles: 'Read More Articles',
      moreTitle: 'More from Numen Intelligence',
      moreDescription: 'Explore our comprehensive analysis and daily digests covering Central Asia\'s economic trends, geopolitical developments, and strategic insights.',
      viewAll: 'View All Articles',
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      mission: 'Миссия',
      valueChain: 'Цепочка ценности',
      advantage: 'Преимущества',
      team: 'Команда',
      analysis: 'Аналитика',
      investment: 'Инвестиции',
      vision: 'Видение',
    },
    hero: {
      badge: 'АНАЛИТИКА НОВОГО ПОКОЛЕНИЯ',
      title: 'Numen Intelligence',
      subtitle: 'Передовой ИИ-анализ геополитических рисков для Центральной Азии',
      description: 'Используя передовой искусственный интеллект и глубокую региональную экспертизу для предоставления беспрецедентной стратегической аналитики инвесторам, политикам и предприятиям, работающим на рынках Центральной Азии.',
      cta: 'Изучить платформу',
      scroll: 'Прокрутите вниз',
    },
    mission: {
      badge: 'НАША МИССИЯ',
      title: 'Превращаем неопределённость в стратегическое преимущество',
      vision: {
        title: 'Видение',
        content: 'Стать ведущей платформой аналитики для Центральной Азии, которой доверяют мировые лидеры при принятии критически важных решений в одном из самых динамичных развивающихся регионов мира.',
      },
      mission: {
        title: 'Миссия',
        content: 'Мы предоставляем клиентам аналитику на основе ИИ, которая превосходит традиционный анализ. Синтезируя огромные потоки данных — от экономических показателей и политических событий до настроений в социальных сетях и спутниковых снимков — мы предоставляем практические выводы, которые обеспечивают стратегический успех на рынках Центральной Азии.',
      },
      values: {
        title: 'Основные ценности',
        items: [
          'Точность: Непревзойденная точность в каждом анализе',
          'Инновации: Передовые методы ИИ для геополитической аналитики',
          'Честность: Объективные, беспристрастные выводы без политического влияния',
          'Экспертиза: Глубокие региональные знания в сочетании с технологическим совершенством',
        ],
      },
    },
    valueChain: {
      badge: 'ЦЕПОЧКА ЦЕННОСТИ',
      title: 'Трехкомпонентная архитектура аналитики',
      description: 'Наша комплексная экосистема аналитики преобразует необработанные данные в стратегическое преимущество через три взаимосвязанные фазы.',
      collection: {
        title: 'Сбор данных',
        subtitle: 'Многоисточниковая агрегация данных',
        items: [
          'Разведка из открытых источников (OSINT) из более чем 10 000 региональных источников',
          'Собственные экономические базы данных, отслеживающие 120+ показателей',
          'Мониторинг новостей в реальном времени на 8 языках',
          'Анализ настроений в социальных сетях на основных платформах',
          'Спутниковые снимки и геопространственная аналитика',
          'Консультации с экспертной сетью региональных специалистов',
        ],
      },
      processing: {
        title: 'Движок обработки на ИИ',
        subtitle: 'Машинное обучение и обработка естественного языка',
        items: [
          'Продвинутая обработка естественного языка для многоязычного анализа документов',
          'Модели машинного обучения, обученные на 15-летних региональных данных',
          'Алгоритмы прогнозирования для оценки рисков',
          'Автоматическое распознавание паттернов в разрозненных источниках данных',
          'Обнаружение аномалий в реальном времени и системы оповещения',
          'Непрерывная доработка моделей через контролируемое обучение',
        ],
      },
      delivery: {
        title: 'Стратегическая доставка',
        subtitle: 'Практические аналитические продукты',
        items: [
          'Ежедневные аналитические брифинги и критические оповещения',
          'Углубленные аналитические отчеты о ключевых событиях',
          'Индивидуальные оценки рисков для конкретных инвестиций',
          'Интерактивные дашборды с визуализацией данных в реальном времени',
          'Инструменты планирования сценариев и прогнозирования',
          'Прямые консультации с аналитиками для премиум-клиентов',
        ],
      },
    },
    advantage: {
      badge: 'КОНКУРЕНТНЫЕ ПРЕИМУЩЕСТВА',
      title: 'Почему Numen Intelligence лидирует на рынке',
      description: 'Наша уникальная комбинация передовых технологий, региональной экспертизы и проверенного послужного списка выделяет нас на рынке аналитики Центральной Азии.',
      aiModule: {
        title: 'Собственный модуль оценки рисков на ИИ',
        accuracy: '89% точность прогнозов',
        accuracyDesc: 'Проверено на 3+ годах региональных событий',
        parameters: '120+ параметров риска',
        parametersDesc: 'Комплексный многомерный анализ',
        features: [
          'Показатели политической стабильности и оценка режимных рисков',
          'Прогнозирование экономической волатильности и модели валютных рисков',
          'Предсказание социальных волнений через анализ настроений',
          'Анализ трансграничных торговых потоков и оповещения о сбоях',
          'Мониторинг энергетической безопасности и оценка рисков трубопроводов',
          'Моделирование конфликтов водных ресурсов и экологических рисков',
        ],
      },
      partnerships: {
        title: 'Элитные академические и профессиональные партнерства',
        description: 'Сотрудничество с ведущими мировыми институтами обеспечивает передовую методологию и авторитет.',
        institutions: [
          {
            name: 'Гарвардский университет',
            role: 'Экономическое моделирование и методология исследований',
          },
          {
            name: 'MIT',
            role: 'Разработка ИИ и архитектура машинного обучения',
          },
          {
            name: 'Нобелевские лауреаты',
            role: 'Экономический консультативный совет (2 нобелевских лауреата)',
          },
          {
            name: 'Региональные университеты',
            role: 'Местная экспертиза и сети разведки на местах',
          },
        ],
      },
      track: {
        title: 'Проверенный послужной список',
        stats: [
          {
            value: '250+',
            label: 'Ежедневных аналитических дайджестов опубликовано',
          },
          {
            value: '89%',
            label: 'Точность прогнозов',
          },
          {
            value: '50+',
            label: 'Корпоративных клиентов обслужено',
          },
          {
            value: '24/7',
            label: 'Мониторинг в реальном времени',
          },
        ],
      },
    },
    team: {
      badge: 'НАША КОМАНДА',
      title: 'Экспертное руководство и консультативный совет',
      description: 'Наша команда объединяет десятилетия опыта в геополитическом анализе, региональной экспертизе и передовых технологиях для предоставления непревзойденной аналитики по Центральной Азии.',
      advisoryTitle: 'Консультативный совет',
      advisoryDescription: 'При поддержке выдающихся советников из Гарварда, MIT и нобелевских лауреатов по экономике',
      institutions: ['Гарвардский университет', 'MIT', 'Нобелевские лауреаты', 'Бывшие политики'],
      expertise: 'Экспертиза',
      education: 'Образование',
      members: [
        {
          name: 'Талгат Кабдыгали',
          role: 'Генеральный директор, Сооснователь',
          expertise: 'Политический анализ, Инвестиции в инфраструктуру',
          education: 'Гарвардский колледж',
        },
        {
          name: 'Айдынбек Мусса',
          role: 'Технический директор, Сооснователь',
          expertise: 'Приложения ИИ, Наука о данных, Машинное обучение',
          education: 'Колумбийский университет',
        },
        {
          name: 'Сагит Бакиров',
          role: 'Сооснователь',
          expertise: 'Геополитические риски, Энергетическая безопасность, Государственная политика',
          education: 'Гарвардская школа Кеннеди',
        },
      ],
    },
    analysis: {
      badge: 'ЦЕНТР АНАЛИТИКИ',
      title: 'Анализ Центральной Азии и ежедневные дайджесты',
      description: 'Аналитика в реальном времени, ежедневные дайджесты и углубленный анализ экономических трендов, геополитических событий, торговых потоков и стратегических инсайтов по региону Центральной Азии.',
      filter: 'Фильтр по категории:',
      categories: {
        all: 'Все',
        economics: 'Экономика',
        trade: 'Торговля',
        energy: 'Энергетика',
        geopolitics: 'Геополитика',
        environment: 'Экология',
        technology: 'Технологии',
      },
      readMore: 'Читать далее',
      stats: {
        digests: 'Ежедневных дайджестов опубликовано',
        accuracy: 'Точность прогнозов',
        monitoring: 'Мониторинг в реальном времени',
      },
      subscribe: {
        title: 'Подписаться на ежедневные аналитические брифинги',
        description: 'Получайте кураторский анализ и важные события прямо на вашу почту каждое утро',
        button: 'Подписаться',
      },
    },
    investment: {
      badge: 'ИНВЕСТИЦИОННАЯ ВОЗМОЖНОСТЬ',
      title: 'Предложение посевного раунда инвестиций',
      description: 'Присоединяйтесь к нам в революционизации аналитики Центральной Азии. Стратегическое посевное финансирование ускорит разработку платформы, расширит наши возможности ИИ и установит доминирование на рынке.',
      allocation: {
        title: 'Распределение капитала ($2М посевной раунд)',
        items: [
          {
            percentage: '40%',
            title: 'Разработка ИИ-платформы',
            description: 'Улучшение моделей машинного обучения, расширение возможностей NLP, масштабирование инфраструктуры',
          },
          {
            percentage: '30%',
            title: 'Расширение команды',
            description: 'Наём региональных аналитиков, специалистов по данным и старших инженеров',
          },
          {
            percentage: '20%',
            title: 'Развитие рынка',
            description: 'Привлечение клиентов, стратегические партнерства, позиционирование бренда',
          },
          {
            percentage: '10%',
            title: 'Операции и юридические вопросы',
            description: 'Создание офиса, правовая база, инфраструктура соответствия',
          },
        ],
      },
      revenue: {
        title: 'Модель доходов и прогнозы роста',
        streams: [
          {
            title: 'Уровни подписки',
            items: [
              'Базовый: $2,000/месяц - Ежедневные брифинги и отчеты',
              'Профессиональный: $7,500/месяц - Полный доступ к платформе + поддержка аналитика',
              'Корпоративный: $25,000/месяц - Индивидуальная аналитика + выделенная команда',
            ],
          },
          {
            title: 'Индивидуальный консалтинг',
            items: [
              'Комплексная проверка для сделок M&A',
              'Страновые оценки рисков',
              'Аналитика антикризисного реагирования',
            ],
          },
          {
            title: 'Лицензирование данных',
            items: [
              'API-доступ к собственным наборам данных',
              'White-label аналитические продукты',
            ],
          },
        ],
        projections: {
          title: 'Финансовые прогнозы',
          year1: { revenue: '$500 тыс.', clients: '25' },
          year2: { revenue: '$2.5 млн', clients: '100' },
          year3: { revenue: '$8 млн', clients: '250' },
        },
      },
      investor: {
        title: 'Преимущества для инвесторов',
        items: [
          'Ранний доступ к быстрорастущему сектору аналитики развивающихся рынков',
          'Собственная технология ИИ с защищаемым конкурентным преимуществом',
          'Установленные отношения с элитными академическими институтами',
          'Преимущество первопроходца на недостаточно обслуживаемом рынке Центральной Азии',
          'Четкий путь к прибыльности с моделью регулярных доходов',
          'Потенциальные цели для стратегического приобретения (крупные аналитические фирмы, консалтинг)',
        ],
      },
    },
    vision: {
      badge: 'ВИДЕНИЕ 2028',
      title: 'Строим будущее геополитической аналитики',
      description: 'Наша дорожная карта превращает Numen Intelligence в незаменимую платформу для стратегического принятия решений в Центральной Азии.',
      milestones: [
        {
          year: '2025-2026',
          title: 'Совершенство платформы',
          items: [
            'Запуск полнофункциональных веб- и мобильных платформ',
            'Достижение 100 корпоративных клиентов в финансах, энергетике и государственном секторе',
            'Расширение охвата на все пять стран Центральной Азии',
            'Установление партнерств с крупными финансовыми институтами',
          ],
        },
        {
          year: '2026-2027',
          title: 'Региональное доминирование',
          items: [
            'Стать признанным лидером в аналитике Центральной Азии',
            '250+ клиентов, включая компании Fortune 500',
            'Открытие офисов в Алматы, Ташкенте и Астане',
            'Запуск специализированных отраслевых направлений (энергетика, горнодобыча, инфраструктура)',
          ],
        },
        {
          year: '2027-2028',
          title: 'Глобальная экспансия',
          items: [
            'Расширение охвата на Кавказский регион и Монголию',
            'Стратегические партнерства с международными аналитическими фирмами',
            'Раунд финансирования серии B ($15-20 млн) для географической экспансии',
            'Позиционирование для стратегического приобретения или IPO',
          ],
        },
      ],
      longTerm: {
        title: 'Долгосрочные стратегические цели',
        items: [
          'Установить Numen как глобальный стандарт аналитики развивающихся рынков',
          'Разработать прогностические возможности для глобальных товарных рынков',
          'Создать самую полную базу данных по политической экономике Центральной Азии',
          'Построить технологическую платформу, лицензируемую другим региональным поставщикам аналитики',
        ],
      },
    },
    conclusion: {
      badge: 'ВОЗМОЖНОСТЬ',
      title: 'Центральная Азия на историческом переломе',
      description: 'Сочетание инициативы "Пояс и путь" Китая, эволюционирующего влияния России, огромных энергетических ресурсов и растущего геополитического значения делает Центральную Азию одним из самых критически важных, но наименее понятных регионов мира.',
      why: {
        title: 'Почему Центральная Азия важна сейчас',
        items: [
          'Стратегический коридор между Европой и Азией с инвестициями в инфраструктуру более $1 трлн',
          'Огромные неиспользованные энергетические ресурсы (нефть, газ, уран, редкоземельные минералы)',
          'Население 75 миллионов с быстрорастущими потребительскими рынками',
          'Усиливающаяся геополитическая конкуренция между Китаем, Россией, США и ЕС',
          'Критическая роль в глобальных цепочках поставок и энергетической безопасности',
        ],
      },
      gap: {
        title: 'Аналитический разрыв',
        description: 'Несмотря на свою важность, Центральная Азия остается крайне недостаточно обслуживаемой существующими аналитическими провайдерами. Традиционным фирмам не хватает региональной экспертизы и технологической утонченности. Местным аналитикам не хватает глобальных стандартов и возможностей ИИ.',
      },
      solution: {
        title: 'Numen Intelligence: Решение',
        description: 'Мы преодолеваем этот разрыв уникальной комбинацией передового ИИ, глубокой региональной экспертизы и партнерств мирового класса с академическими институтами. Наша платформа предоставляет точную, практическую аналитику, которая нужна предприятиям и правительствам для навигации в сложности Центральной Азии.',
      },
      call: {
        title: 'Присоединяйтесь к нам в формировании будущего',
        description: 'Это редкая возможность инвестировать в быстрорастущую аналитическую платформу, обращающуюся к массивному недостаточно обслуживаемому рынку. С проверенной технологией, элитными партнерствами и сильной командой основателей, Numen Intelligence позиционирован для доминирования в стратегической аналитике Центральной Азии.',
        contact: 'Свяжитесь с нами',
        contactDescription: 'По вопросам инвестиций и партнерских возможностей',
      },
    },
    article: {
      backButton: 'Вернуться в центр аналитики',
      author: 'Автор',
      readTime: 'чтение',
      share: 'Поделиться',
      tags: 'Теги',
      readMoreArticles: 'Читать больше статей',
      moreTitle: 'Больше от Numen Intelligence',
      moreDescription: 'Исследуйте наш комплексный анализ и ежедневные дайджесты, охватывающие экономические тренды, геополитические события и стратегические инсайты Центральной Азии.',
      viewAll: 'Посмотреть все статьи',
    },
  },
};
