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
} from "lucide-react";

function HomePage() {
    const { t, language } = useLanguage();
    const [activeFeature, setActiveFeature] = useState(0);

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

                        {/* <div className='hero-cta'>
                            <button className='primary-cta'>
                                <Smartphone className='w-5 h-5' />
                                {t("downloadApp")}
                                <ArrowRight className='w-5 h-5' />
                            </button>
                            <button className='secondary-cta'>
                                <Play className='w-5 h-5' />
                                {language === "en" ? "Watch Demo" : "شاهد العرض"}
                            </button>
                        </div> */}

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
                        <div className='phone-mockup'>
                            <div className='phone-screen'>
                                <img src='/images/app.jpeg' alt='Mobdeen App' />
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
