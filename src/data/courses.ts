import { Table2, Globe, Send, Rocket, Target, BarChart3, DollarSign, TrendingUp, Zap, Users, Award, Clock, BookOpen, Layout, Code, Palette, Settings, Search, FileSpreadsheet, PieChart, Database, Filter } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CourseBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CourseAudience {
  emoji: string;
  title: string;
  description: string;
}

export interface CurriculumModule {
  title: string;
  topics: string[];
}

export interface CourseTestimonial {
  name: string;
  text: string;
  rating: number;
}

export interface CourseFAQ {
  q: string;
  a: string;
}

export interface CourseData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  link: string;
  benefits: CourseBenefit[];
  audience: CourseAudience[];
  requirements: string[];
  curriculum: CurriculumModule[];
  testimonials: CourseTestimonial[];
  faq: CourseFAQ[];
}

export const courses: CourseData[] = [
  {
    slug: "telegram-smm",
    title: "SMM в Telegram",
    tagline: "Рост канала, подписчики и монетизация",
    description:
      "Этот курс поможет вам создать и продвинуть Telegram-канал с нуля до стабильного роста аудитории и дохода. Вы получите пошаговую систему продвижения, основанную на актуальных методах SMM, и сможете применять её уже в процессе обучения.",
    icon: Send,
    link: "https://stepik.org/a/231903",
    benefits: [
      {
        icon: Rocket,
        title: "Обучение через практику",
        description: "Вы создадите и настроите собственный Telegram-канал во время прохождения курса.",
      },
      {
        icon: Target,
        title: "Работающие стратегии продвижения",
        description: "Освоите бесплатные методы роста, взаимный пиар, контент-воронки и платную рекламу.",
      },
      {
        icon: BarChart3,
        title: "Аналитика и оптимизация",
        description: "Научитесь анализировать аудиторию, отслеживать показатели и улучшать контент на основе данных.",
      },
      {
        icon: DollarSign,
        title: "Монетизация без теории «для галочки»",
        description: "Разберёте реальные модели заработка: реклама, партнёрские программы, собственные продукты и услуги.",
      },
      {
        icon: TrendingUp,
        title: "Масштабирование результатов",
        description: "Поймёте, как превратить канал из хобби в инструмент дохода.",
      },
    ],
    audience: [
      {
        emoji: "🔹",
        title: "Новичок в SMM",
        description: "Освоите Telegram-маркетинг с нуля: оформление канала, контент-стратегия, привлечение подписчиков.",
      },
      {
        emoji: "🔹",
        title: "Владелец бизнеса или маркетолог",
        description: "Научитесь продвигать продукт через Telegram и привлекать клиентов без крупных рекламных бюджетов.",
      },
      {
        emoji: "🔹",
        title: "Блогер",
        description: "Поймёте, как удерживать аудиторию и выстраивать стабильную монетизацию.",
      },
      {
        emoji: "🔹",
        title: "Фрилансер или специалист по рекламе",
        description: "Получите востребованный навык и сможете продвигать каналы клиентов за оплату.",
      },
      {
        emoji: "🔹",
        title: "Автор канала без роста",
        description: "Найдёте точки роста, исправите ошибки и выстроите систему продвижения.",
      },
    ],
    requirements: [
      "Компьютер или смартфон (желательно Telegram Desktop или Web).",
      "Специальных знаний не требуется — курс подходит даже для новичков.",
    ],
    curriculum: [
      {
        title: "Модуль 1: Основы Telegram-маркетинга",
        topics: ["Почему Telegram — лучшая площадка для продвижения", "Типы каналов и форматы контента", "Создание и оформление канала"],
      },
      {
        title: "Модуль 2: Контент-стратегия",
        topics: ["Как писать вовлекающие посты", "Контент-план и рубрикатор", "Визуальный стиль и оформление"],
      },
      {
        title: "Модуль 3: Продвижение канала",
        topics: ["Бесплатные методы привлечения подписчиков", "Взаимный пиар и коллаборации", "Платная реклама в Telegram"],
      },
      {
        title: "Модуль 4: Аналитика и оптимизация",
        topics: ["Ключевые метрики канала", "Инструменты аналитики", "A/B тестирование контента"],
      },
      {
        title: "Модуль 5: Монетизация",
        topics: ["Продажа рекламы в канале", "Партнёрские программы", "Собственные продукты и услуги", "Масштабирование дохода"],
      },
    ],
    testimonials: [
      {
        name: "Мария П.",
        text: "Мой канал вырос с 500 до 5000 подписчиков за два месяца. Стратегии работают!",
        rating: 5,
      },
      {
        name: "Алексей К.",
        text: "Наконец-то понял, как монетизировать канал. Уже окупил стоимость курса.",
        rating: 5,
      },
      {
        name: "Ирина С.",
        text: "Очень структурированный материал. Всё по делу, без воды.",
        rating: 5,
      },
    ],
    faq: [
      {
        q: "Нужен ли опыт в SMM?",
        a: "Нет, курс подходит для новичков. Мы начинаем с основ и постепенно переходим к продвинутым стратегиям.",
      },
      {
        q: "Сколько времени нужно на прохождение?",
        a: "Курс рассчитан на 4–6 недель при занятиях 3–4 часа в неделю. Доступ — бессрочный.",
      },
      {
        q: "Получу ли я сертификат?",
        a: "Да, после завершения курса на Stepik вы получите сертификат.",
      },
      {
        q: "Можно ли вернуть деньги?",
        a: "Stepik предоставляет возврат в течение 14 дней после покупки.",
      },
    ],
  },
  {
    slug: "excel",
    title: "Специалист по Microsoft Office: специалист по Excel",
    tagline: "From spreadsheets to professional data analysis",
    description:
      "Master Microsoft Excel from beginner to advanced level. Learn formulas, pivot tables, data visualization, and automation to boost your professional productivity.",
    icon: Table2,
    link: "https://stepik.org/a/244450",
    benefits: [
      {
        icon: FileSpreadsheet,
        title: "Hands-on Projects",
        description: "Build real dashboards, reports, and automated workflows you can use at work immediately.",
      },
      {
        icon: PieChart,
        title: "Data Visualization",
        description: "Create compelling charts and graphs that communicate insights clearly to stakeholders.",
      },
      {
        icon: Database,
        title: "Advanced Formulas",
        description: "Master VLOOKUP, INDEX-MATCH, array formulas, and other power-user techniques.",
      },
      {
        icon: Filter,
        title: "Pivot Tables & Analysis",
        description: "Transform raw data into actionable insights with pivot tables and data modeling.",
      },
    ],
    audience: [
      {
        emoji: "🔹",
        title: "Office professionals",
        description: "Streamline your daily workflows and impress your team with polished reports.",
      },
      {
        emoji: "🔹",
        title: "Students & job seekers",
        description: "Add a highly sought-after skill to your resume and stand out in interviews.",
      },
      {
        emoji: "🔹",
        title: "Small business owners",
        description: "Manage finances, inventory, and client data without expensive software.",
      },
      {
        emoji: "🔹",
        title: "Data enthusiasts",
        description: "Build a strong foundation before moving to advanced tools like Power BI or Python.",
      },
    ],
    requirements: [
      "A computer with Microsoft Excel installed (2016 or later recommended).",
      "No prior Excel experience needed — we start from the very basics.",
    ],
    curriculum: [
      {
        title: "Module 1: Excel Fundamentals",
        topics: ["Navigating the interface", "Data entry & formatting", "Basic formulas (SUM, AVERAGE, COUNT)"],
      },
      {
        title: "Module 2: Intermediate Formulas",
        topics: ["IF, SUMIF, COUNTIF", "VLOOKUP & HLOOKUP", "Text & date functions"],
      },
      {
        title: "Module 3: Data Visualization",
        topics: ["Chart types & best practices", "Conditional formatting", "Sparklines & data bars"],
      },
      {
        title: "Module 4: Pivot Tables",
        topics: ["Creating pivot tables", "Grouping & filtering", "Calculated fields"],
      },
      {
        title: "Module 5: Automation & Advanced",
        topics: ["Named ranges & data validation", "Introduction to macros", "Dashboard building project"],
      },
    ],
    testimonials: [
      {
        name: "Anna K.",
        text: "This course transformed how I work with data. I went from struggling with basic formulas to building complex dashboards.",
        rating: 5,
      },
      {
        name: "James T.",
        text: "The pivot table section alone was worth it. I now save hours every week on reports.",
        rating: 5,
      },
      {
        name: "Olga N.",
        text: "Clear, well-structured lessons. The hands-on projects made everything click.",
        rating: 5,
      },
    ],
    faq: [
      {
        q: "Which version of Excel do I need?",
        a: "Excel 2016 or later is recommended. Most features also work in Excel Online (free with a Microsoft account).",
      },
      {
        q: "Do I need prior experience?",
        a: "Not at all. The course starts from the very basics and builds up to advanced topics step by step.",
      },
      {
        q: "Will I get a certificate?",
        a: "Yes, upon completing the course on Stepik you'll receive a certificate you can share on LinkedIn.",
      },
      {
        q: "How long is the course?",
        a: "Approximately 5–7 weeks at 3–4 hours per week. You have lifetime access to learn at your own pace.",
      },
    ],
  },
  {
    slug: "web-dev",
    title: "Веб-разработка (Content Management System)",
    tagline: "Build modern websites without coding",
    description:
      "Learn to build professional websites using content management systems. No coding experience required — go from zero to a fully functional website.",
    icon: Globe,
    link: "https://stepik.org/139723",
    benefits: [
      {
        icon: Layout,
        title: "No-Code Approach",
        description: "Build stunning websites using visual editors and CMS tools — no programming required.",
      },
      {
        icon: Palette,
        title: "Professional Design",
        description: "Learn design principles and create sites that look like they were made by a professional.",
      },
      {
        icon: Settings,
        title: "Full Site Management",
        description: "Master hosting, domains, SSL, SEO, and performance — everything to run a real website.",
      },
      {
        icon: Search,
        title: "SEO & Marketing",
        description: "Optimize your site for search engines and learn to drive organic traffic.",
      },
    ],
    audience: [
      {
        emoji: "🔹",
        title: "Entrepreneurs & freelancers",
        description: "Launch your online presence quickly without hiring a developer.",
      },
      {
        emoji: "🔹",
        title: "Marketers",
        description: "Build landing pages and microsites for campaigns on your own.",
      },
      {
        emoji: "🔹",
        title: "Students",
        description: "Add web development skills to your portfolio and start freelancing.",
      },
      {
        emoji: "🔹",
        title: "Anyone with an idea",
        description: "Turn your project, blog, or portfolio idea into a live website.",
      },
    ],
    requirements: [
      "A computer with internet access.",
      "No coding or web development experience needed.",
    ],
    curriculum: [
      {
        title: "Module 1: How the Web Works",
        topics: ["Domains, hosting & DNS", "How browsers render pages", "Choosing the right CMS"],
      },
      {
        title: "Module 2: Building Your First Site",
        topics: ["Installing & configuring a CMS", "Themes & templates", "Pages, menus & navigation"],
      },
      {
        title: "Module 3: Design & Content",
        topics: ["Visual editors & page builders", "Working with images & media", "Typography & color theory basics"],
      },
      {
        title: "Module 4: Functionality & Plugins",
        topics: ["Essential plugins & extensions", "Contact forms & e-commerce", "Security & backups"],
      },
      {
        title: "Module 5: Launch & Growth",
        topics: ["SEO fundamentals", "Google Analytics setup", "Performance optimization", "Maintenance best practices"],
      },
    ],
    testimonials: [
      {
        name: "Dmitry S.",
        text: "I built my first website within two weeks. The step-by-step approach made it incredibly easy to follow along.",
        rating: 5,
      },
      {
        name: "Elena V.",
        text: "As a marketer, this gave me independence. I no longer wait for developers to make simple site changes.",
        rating: 5,
      },
      {
        name: "Pavel M.",
        text: "Great course for beginners. The SEO module alone helped me rank my small business site on Google.",
        rating: 5,
      },
    ],
    faq: [
      {
        q: "Do I need to know HTML or CSS?",
        a: "No. The course uses visual CMS tools. We briefly cover HTML basics for context, but it's not required.",
      },
      {
        q: "Which CMS will I learn?",
        a: "The course covers the most popular CMS platforms, with a focus on practical, transferable skills.",
      },
      {
        q: "Will I get a certificate?",
        a: "Yes, upon completing the course on Stepik you'll receive a certificate.",
      },
      {
        q: "Can I build an online store?",
        a: "Yes! Module 4 covers e-commerce plugins so you can set up a basic online store.",
      },
    ],
  },
];

export function getCourseBySlug(slug: string): CourseData | undefined {
  return courses.find((c) => c.slug === slug);
}
