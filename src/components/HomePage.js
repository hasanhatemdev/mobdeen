import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
    Sparkles,
    CheckCircle2,
    Users,
    Trophy,
    Star,
    Heart,
    Smartphone,
    Apple,
    Play,
    ArrowRight,
    Gift,
    Target,
    Zap,
    Shield,
    Award,
    MessageCircle,
    Calendar,
    ListChecks,
    Navigation,
    CalendarDays,
    Eye,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

function HomePage() {
    const { t, language } = useLanguage();
    const [activeFeature, setActiveFeature] = useState(0);
    const [currentScreenshot, setCurrentScreenshot] = useState(0);
    const [activeCategory, setActiveCategory] = useState(0);

    // Hero screenshots rotation (showing core features)
    const heroScreenshots = [
        { id: 1, path: "/images/screenshots/screen1.jpeg", title: "Pending Activities" },
        { id: 3, path: "/images/screenshots/screen3.jpeg", title: "Rewards System" },
        { id: 8, path: "/images/screenshots/screen8.jpeg", title: "Kids Overview" },
    ];

    // Feature categories with screenshots
    const featureCategories = [
        {
            id: 0,
            icon: <ListChecks className='w-6 h-6' />,
            title: language === "en" ? "Task Management" : "إدارة المهام",
            description:
                language === "en"
                    ? "Track and manage daily activities with ease"
                    : "تتبع وإدارة الأنشطة اليومية بسهولة",
            screenshots: [
                {
                    id: 1,
                    path: "/images/screenshots/screen1.jpeg",
                    title: language === "en" ? "Pending Activities" : "الأنشطة المعلقة",
                    desc: language === "en" ? "View all pending tasks at a glance" : "عرض جميع المهام المعلقة في لمحة",
                },
                {
                    id: 8,
                    path: "/images/screenshots/screen8.jpeg",
                    title: language === "en" ? "Kids Activities Overview" : "نظرة عامة على أنشطة الأطفال",
                    desc: language === "en" ? "Monitor all children's progress" : "مراقبة تقدم جميع الأطفال",
                },
            ],
        },
        {
            id: 1,
            icon: <Gift className='w-6 h-6' />,
            title: language === "en" ? "Rewards & Motivation" : "المكافآت والتحفيز",
            description:
                language === "en" ? "Motivate with rewards and easy navigation" : "حفز بالمكافآت والتنقل السهل",
            screenshots: [
                {
                    id: 3,
                    path: "/images/screenshots/screen3.jpeg",
                    title: language === "en" ? "Available Rewards" : "المكافآت المتاحة",
                    desc: language === "en" ? "Exciting rewards to earn" : "مكافآت مثيرة للحصول عليها",
                },
                {
                    id: 2,
                    path: "/images/screenshots/screen2.jpeg",
                    title: language === "en" ? "Quick Navigation" : "التنقل السريع",
                    desc: language === "en" ? "Access features instantly" : "الوصول إلى الميزات على الفور",
                },
            ],
        },
        {
            id: 2,
            icon: <Calendar className='w-6 h-6' />,
            title: language === "en" ? "Planning & Organization" : "التخطيط والتنظيم",
            description:
                language === "en" ? "Stay organized with calendars and schedules" : "ابق منظمًا مع التقويمات والجداول",
            screenshots: [
                {
                    id: 4,
                    path: "/images/screenshots/screen4.jpeg",
                    title: language === "en" ? "Events Calendar" : "تقويم الأحداث",
                    desc: language === "en" ? "Never miss important events" : "لا تفوت الأحداث المهمة أبدًا",
                },
                {
                    id: 7,
                    path: "/images/screenshots/screen7.jpeg",
                    title: language === "en" ? "Weekly Calendar" : "التقويم الأسبوعي",
                    desc: language === "en" ? "Plan your week effectively" : "خطط لأسبوعك بفعالية",
                },
            ],
        },
        {
            id: 3,
            icon: <Users className='w-6 h-6' />,
            title: language === "en" ? "Family Connection" : "التواصل العائلي",
            description:
                language === "en" ? "Stay connected with family conversations" : "ابق على تواصل مع محادثات العائلة",
            screenshots: [
                {
                    id: 6,
                    path: "/images/screenshots/screen6.jpeg",
                    title: language === "en" ? "Family Page" : "صفحة العائلة",
                    desc: language === "en" ? "Your family hub" : "مركز عائلتك",
                },
                {
                    id: 5,
                    path: "/images/screenshots/screen5.jpeg",
                    title: language === "en" ? "Conversations" : "المحادثات",
                    desc: language === "en" ? "Chat and share updates" : "تحدث وشارك التحديثات",
                },
            ],
        },
    ];

    const features = [
        {
            icon: <Target className='w-6 h-6' />,
            title: language === "en" ? "Smart Task Management" : "إدارة المهام الذكية",
            description:
                language === "en"
                    ? "Assign fun, age-appropriate tasks that turn daily routines into exciting challenges"
                    : "قم بتعيين مهام ممتعة ومناسبة للعمر تحول الروتين اليومي إلى تحديات مثيرة",
        },
        {
            icon: <Gift className='w-6 h-6' />,
            title: language === "en" ? "Reward System" : "نظام المكافآت",
            description:
                language === "en"
                    ? "Motivate your children with virtual cookies and unlock real-world rewards"
                    : "حفز أطفالك بالكوكيز الافتراضية وافتح مكافآت حقيقية",
        },
        {
            icon: <Trophy className='w-6 h-6' />,
            title: language === "en" ? "Track Progress" : "تتبع التقدم",
            description:
                language === "en"
                    ? "Monitor achievements, behavior patterns, and celebrate milestones together"
                    : "راقب الإنجازات وأنماط السلوك واحتفل بالإنجازات معًا",
        },
        {
            icon: <Zap className='w-6 h-6' />,
            title: language === "en" ? "AI-Powered Insights" : "رؤى مدعومة بالذكاء الاصطناعي",
            description:
                language === "en"
                    ? "Get personalized parenting advice and smart recommendations for each child"
                    : "احصل على نصائح تربوية مخصصة وتوصيات ذكية لكل طفل",
        },
    ];

    const stats = [
        {
            number: "5.5K+",
            label: language === "en" ? "Happy Families" : "عائلة سعيدة",
        },
        {
            number: "9.9M+",
            label: language === "en" ? "Tasks Completed" : "مهمة مكتملة",
        },
        {
            number: "4.8",
            label: language === "en" ? "App Rating" : "تقييم التطبيق",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [features.length]);

    // Auto-rotate hero screenshots
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentScreenshot((prev) => (prev + 1) % heroScreenshots.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const nextCategory = () => {
        setActiveCategory((prev) => (prev + 1) % featureCategories.length);
    };

    const prevCategory = () => {
        setActiveCategory((prev) => (prev - 1 + featureCategories.length) % featureCategories.length);
    };

    return (
        <div className='home-page'>
            {/* Hero Section */}
            <section className='hero-section'>
                <div className='hero-container'>
                    <div className='hero-content'>
                        <div className='hero-badge'>
                            <Sparkles className='w-4 h-4' />
                            <span>{language === "en" ? "Smart Family Management" : "إدارة العائلة الذكية"}</span>
                        </div>

                        <h1 className='hero-title'>
                            {language === "en" ? (
                                <>
                                    Transform Your Family's
                                    <span className='gradient-text'> Daily Routine</span> Into An
                                    <span className='gradient-text'> Adventure</span>
                                </>
                            ) : (
                                <>
                                    حوّل روتين عائلتك
                                    <span className='gradient-text'> اليومي</span> إلى
                                    <span className='gradient-text'> مغامرة</span>
                                </>
                            )}
                        </h1>

                        <p className='hero-description'>{t("heroSubtitle")}</p>

                        <div className='app-badges'>
                            <a href='https://apps.apple.com/ae/app/mobdeen/id6744346013' className='app-badge'>
                                <Apple className='w-6 h-6' />
                                <div>
                                    <span className='small-text'>
                                        {language === "en" ? "Download on the" : "حمل من"}
                                    </span>
                                    <span className='store-name'>App Store</span>
                                </div>
                            </a>
                            <a
                                href='https://play.google.com/store/apps/details?id=com.aroom.aielty'
                                className='app-badge'
                            >
                                <Play className='w-6 h-6' />
                                <div>
                                    <span className='small-text'>
                                        {language === "en" ? "Get it on" : "احصل عليه من"}
                                    </span>
                                    <span className='store-name'>Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className='hero-visual'>
                        <div className='phone-mockup enhanced'>
                            <div className='phone-screen'>
                                <div className='screenshot-carousel'>
                                    {heroScreenshots.map((screenshot, index) => (
                                        <img
                                            key={screenshot.id}
                                            src={screenshot.path}
                                            alt={screenshot.title}
                                            className={`hero-screenshot ${index === currentScreenshot ? "active" : ""}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='screenshot-dots'>
                                {heroScreenshots.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`dot ${index === currentScreenshot ? "active" : ""}`}
                                        onClick={() => setCurrentScreenshot(index)}
                                        aria-label={`Screenshot ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='floating-icons'>
                            <div className='float-icon icon-1'>
                                <Trophy className='w-8 h-8' />
                            </div>
                            <div className='float-icon icon-2'>
                                <Star className='w-6 h-6' />
                            </div>
                            <div className='float-icon icon-3'>
                                <Heart className='w-7 h-7' />
                            </div>
                            <div className='float-icon icon-4'>
                                <Gift className='w-6 h-6' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className='stats-section'>
                <div className='stats-container'>
                    {stats.map((stat, index) => (
                        <div key={index} className='stat-card'>
                            <h3 className='stat-number'>{stat.number}</h3>
                            <p className='stat-label'>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features in Action - New Section */}
            <section className='features-in-action'>
                <div className='features-action-container'>
                    <div className='section-header'>
                        <h2 className='section-title'>
                            {language === "en" ? "See Mobdeen" : "شاهد مبدعين"}
                            <span className='gradient-text'>{language === "en" ? " in Action" : " في العمل"}</span>
                        </h2>
                        <p className='section-subtitle'>
                            {language === "en"
                                ? "Explore how families transform their daily routines with our powerful features"
                                : "اكتشف كيف تحول العائلات روتينها اليومي مع ميزاتنا القوية"}
                        </p>
                    </div>

                    <div className='feature-showcase'>
                        <div className='showcase-sidebar'>
                            {featureCategories.map((category, index) => (
                                <button
                                    key={category.id}
                                    className={`category-button ${activeCategory === index ? "active" : ""}`}
                                    onClick={() => setActiveCategory(index)}
                                >
                                    <div className='category-icon'>{category.icon}</div>
                                    <div className='category-content'>
                                        <h4>{category.title}</h4>
                                        <p>{category.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className='showcase-main'>
                            <div className='showcase-header'>
                                <button className='nav-arrow prev' onClick={prevCategory}>
                                    <ChevronLeft className='w-5 h-5' />
                                </button>
                                <h3>{featureCategories[activeCategory].title}</h3>
                                <button className='nav-arrow next' onClick={nextCategory}>
                                    <ChevronRight className='w-5 h-5' />
                                </button>
                            </div>

                            <div className='screenshots-display'>
                                {featureCategories[activeCategory].screenshots.map((screenshot, index) => (
                                    <div key={screenshot.id} className='screenshot-item'>
                                        <div className='device-frame'>
                                            <img
                                                src={screenshot.path}
                                                alt={screenshot.title}
                                                className='app-screenshot'
                                            />
                                        </div>
                                        <div className='screenshot-info'>
                                            <h4>{screenshot.title}</h4>
                                            <p>{screenshot.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className='feature-showcase-mobile'>
                        <div className='mobile-categories'>
                            {featureCategories.map((category, index) => (
                                <button
                                    key={category.id}
                                    className={`mobile-category-tab ${activeCategory === index ? "active" : ""}`}
                                    onClick={() => setActiveCategory(index)}
                                >
                                    {category.icon}
                                    <span>{category.title}</span>
                                </button>
                            ))}
                        </div>
                        <div className='mobile-screenshots'>
                            <div className='screenshots-row'>
                                {featureCategories[activeCategory].screenshots.map((screenshot) => (
                                    <div key={screenshot.id} className='mobile-screenshot'>
                                        <div className='device-frame-mobile'>
                                            <img src={screenshot.path} alt={screenshot.title} />
                                        </div>
                                        <h5>{screenshot.title}</h5>
                                        <p>{screenshot.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='features-section'>
                <div className='features-container'>
                    <div className='section-header'>
                        <h2 className='section-title'>
                            {language === "en" ? "Everything You Need to" : "كل ما تحتاجه"}
                            <span className='gradient-text'>
                                {language === "en" ? " Build Better Habits" : " لبناء عادات أفضل"}
                            </span>
                        </h2>
                        <p className='section-subtitle'>
                            {language === "en"
                                ? "Powerful features designed to make parenting easier and more rewarding"
                                : "ميزات قوية مصممة لجعل التربية أسهل وأكثر مكافأة"}
                        </p>
                    </div>

                    <div className='features-grid'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`feature-card ${activeFeature === index ? "active" : ""}`}
                                onMouseEnter={() => setActiveFeature(index)}
                            >
                                <div className='feature-icon'>{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className='benefits-section'>
                <div className='benefits-container'>
                    <div className='benefit-content'>
                        <div className='benefit-image'>
                            <div className='benefit-card card-1'>
                                <Award className='w-8 h-8' />
                                <span>{language === "en" ? "Achievement Unlocked!" : "تم فتح الإنجاز!"}</span>
                            </div>
                            <div className='benefit-card card-2'>
                                <MessageCircle className='w-6 h-6' />
                                <span>{language === "en" ? "Great job today!" : "عمل رائع اليوم!"}</span>
                            </div>
                            <div className='benefit-card card-3'>
                                <Users className='w-10 h-10' />
                            </div>
                        </div>
                        <div className='benefit-text'>
                            <h2>
                                {language === "en" ? "Why Families" : "لماذا تحب العائلات"}
                                <span className='gradient-text'> {language === "en" ? "Love Mobdeen" : "مبدعين"}</span>
                            </h2>
                            <div className='benefit-list'>
                                <div className='benefit-item'>
                                    <CheckCircle2 className='w-5 h-5' />
                                    <span>
                                        {language === "en"
                                            ? "Turn chores into fun challenges"
                                            : "حول الأعمال المنزلية إلى تحديات ممتعة"}
                                    </span>
                                </div>
                                <div className='benefit-item'>
                                    <CheckCircle2 className='w-5 h-5' />
                                    <span>
                                        {language === "en"
                                            ? "Build responsibility naturally"
                                            : "بناء المسؤولية بشكل طبيعي"}
                                    </span>
                                </div>
                                <div className='benefit-item'>
                                    <CheckCircle2 className='w-5 h-5' />
                                    <span>
                                        {language === "en"
                                            ? "Strengthen family bonds daily"
                                            : "تقوية الروابط الأسرية يوميًا"}
                                    </span>
                                </div>
                                <div className='benefit-item'>
                                    <CheckCircle2 className='w-5 h-5' />
                                    <span>
                                        {language === "en"
                                            ? "Track progress with smart insights"
                                            : "تتبع التقدم مع رؤى ذكية"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section className='security-section'>
                <div className='security-container'>
                    <Shield className='w-12 h-12' />
                    <h3>{language === "en" ? "Your Family's Privacy is Our Priority" : "خصوصية عائلتك أولويتنا"}</h3>
                    <p>
                        {language === "en"
                            ? "Bank-level encryption, GDPR compliant, and no data sharing with third parties"
                            : "تشفير على مستوى البنوك، متوافق مع GDPR، وعدم مشاركة البيانات مع أطراف ثالثة"}
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className='cta-section'>
                <div className='cta-container'>
                    <h2>
                        {language === "en" ? "Ready to Transform Your" : "مستعد لتحويل"}
                        <span className='gradient-text'>
                            {language === "en" ? " Family Experience?" : " تجربة عائلتك؟"}
                        </span>
                    </h2>
                    <p>
                        {language === "en"
                            ? "Join thousands of families building better habits together"
                            : "انضم إلى آلاف العائلات التي تبني عادات أفضل معًا"}
                    </p>
                    <button className='cta-button'>
                        <Sparkles className='w-5 h-5' />
                        {language === "en" ? "Start Free Trial" : "ابدأ التجربة المجانية"}
                    </button>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
