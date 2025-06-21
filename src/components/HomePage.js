import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function HomePage() {
    const { t, language } = useLanguage();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const features = [
        {
            icon: "🎯",
            titleKey: "feature1Title",
            descKey: "feature1Desc",
            color: "#F49064",
        },
        {
            icon: "🤖",
            titleKey: "feature2Title",
            descKey: "feature2Desc",
            color: "#5CC19F",
        },
        {
            icon: "👨‍👩‍👧‍👦",
            titleKey: "feature3Title",
            descKey: "feature3Desc",
            color: "#F7BB4D",
        },
        {
            icon: "📊",
            titleKey: "feature4Title",
            descKey: "feature4Desc",
            color: "#E26562",
        },
        {
            icon: "🎁",
            titleKey: "feature5Title",
            descKey: "feature5Desc",
            color: "#946897",
        },
        {
            icon: "👁️",
            titleKey: "feature6Title",
            descKey: "feature6Desc",
            color: "#F49064",
        },
    ];

    const testimonials = [
        {
            nameKey: "testimonial1Name",
            roleKey: "testimonial1Role",
            textKey: "testimonial1Text",
            rating: 5,
        },
        {
            nameKey: "testimonial2Name",
            roleKey: "testimonial2Role",
            textKey: "testimonial2Text",
            rating: 5,
        },
        {
            nameKey: "testimonial3Name",
            roleKey: "testimonial3Role",
            textKey: "testimonial3Text",
            rating: 5,
        },
    ];

    const stats = [
        { value: "10K+", labelKey: "statsFamilies" },
        { value: "50K+", labelKey: "statsTasks" },
        { value: "4.8", labelKey: "statsRating" },
        { value: "95%", labelKey: "statsSatisfaction" },
    ];

    return (
        <div className='home-page'>
            {/* Hero Section */}
            <section className='hero-section'>
                <div className='hero-background'>
                    <div className='hero-shapes'>
                        <div className='shape shape-1'></div>
                        <div className='shape shape-2'></div>
                        <div className='shape shape-3'></div>
                    </div>
                </div>

                <div className='container'>
                    <div className='hero-content'>
                        <div className='hero-text'>
                            <h1 className='hero-title'>
                                {t("heroTitle")}
                                <span className='highlight'> {t("heroTitleHighlight")}</span>
                            </h1>
                            <p className='hero-subtitle'>{t("heroSubtitle")}</p>

                            <div className='hero-cta'>
                                <button className='download-btn primary'>
                                    <span className='btn-icon'>📱</span>
                                    {t("downloadApp")}
                                </button>
                                <button className='watch-demo-btn'>
                                    <span className='btn-icon'>▶️</span>
                                    {t("watchDemo")}
                                </button>
                            </div>

                            <div className='app-badges'>
                                <img src='/images/app-store-badge.png' alt='App Store' />
                                <img src='/images/google-play-badge.png' alt='Google Play' />
                            </div>
                        </div>

                        <div className='hero-image'>
                            <div className='phone-mockup'>
                                <img src='/images/app-mockup.png' alt='Mobdeen App' />
                                <div className='floating-card card-1'>
                                    <span>✅</span>
                                    <p>{t("floatingCard1")}</p>
                                </div>
                                <div className='floating-card card-2'>
                                    <span>🏆</span>
                                    <p>{t("floatingCard2")}</p>
                                </div>
                                <div className='floating-card card-3'>
                                    <span>📈</span>
                                    <p>{t("floatingCard3")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Uses Section */}
            <section className='who-uses-section'>
                <div className='container'>
                    <h2 className='section-title'>{t("whoUsesTitle")}</h2>
                    <div className='users-grid'>
                        <div className='user-card'>
                            <span className='user-icon'>👨‍👩‍👧‍👦</span>
                            <h3>{t("user1Title")}</h3>
                            <p>{t("user1Desc")}</p>
                        </div>
                        <div className='user-card'>
                            <span className='user-icon'>👩‍🏫</span>
                            <h3>{t("user2Title")}</h3>
                            <p>{t("user2Desc")}</p>
                        </div>
                        <div className='user-card'>
                            <span className='user-icon'>🏫</span>
                            <h3>{t("user3Title")}</h3>
                            <p>{t("user3Desc")}</p>
                        </div>
                        <div className='user-card'>
                            <span className='user-icon'>🎓</span>
                            <h3>{t("user4Title")}</h3>
                            <p>{t("user4Desc")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='features-section'>
                <div className='container'>
                    <div className='section-header'>
                        <h2 className='section-title'>{t("featuresTitle")}</h2>
                        <p className='section-subtitle'>{t("featuresSubtitle")}</p>
                    </div>

                    <div className='features-grid'>
                        {features.map((feature, index) => (
                            <div key={index} className='feature-card' style={{ "--accent-color": feature.color }}>
                                <div className='feature-icon'>{feature.icon}</div>
                                <h3>{t(feature.titleKey)}</h3>
                                <p>{t(feature.descKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className='how-it-works-section'>
                <div className='container'>
                    <h2 className='section-title'>{t("howItWorksTitle")}</h2>
                    <div className='steps-container'>
                        <div className='step'>
                            <div className='step-number'>1</div>
                            <h3>{t("step1Title")}</h3>
                            <p>{t("step1Desc")}</p>
                        </div>
                        <div className='step-connector'></div>
                        <div className='step'>
                            <div className='step-number'>2</div>
                            <h3>{t("step2Title")}</h3>
                            <p>{t("step2Desc")}</p>
                        </div>
                        <div className='step-connector'></div>
                        <div className='step'>
                            <div className='step-number'>3</div>
                            <h3>{t("step3Title")}</h3>
                            <p>{t("step3Desc")}</p>
                        </div>
                        <div className='step-connector'></div>
                        <div className='step'>
                            <div className='step-number'>4</div>
                            <h3>{t("step4Title")}</h3>
                            <p>{t("step4Desc")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className='stats-section'>
                <div className='container'>
                    <div className='stats-grid'>
                        {stats.map((stat, index) => (
                            <div key={index} className='stat-card'>
                                <h3 className='stat-value'>{stat.value}</h3>
                                <p className='stat-label'>{t(stat.labelKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='testimonials-section'>
                <div className='container'>
                    <h2 className='section-title'>{t("testimonialsTitle")}</h2>
                    <div className='testimonials-grid'>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className='testimonial-card'>
                                <div className='stars'>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i}>⭐</span>
                                    ))}
                                </div>
                                <p className='testimonial-text'>"{t(testimonial.textKey)}"</p>
                                <div className='testimonial-author'>
                                    <h4>{t(testimonial.nameKey)}</h4>
                                    <p>{t(testimonial.roleKey)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Impact Section */}
            <section className='social-impact-section'>
                <div className='container'>
                    <div className='impact-content'>
                        <div className='impact-text'>
                            <h2>{t("socialImpactTitle")}</h2>
                            <p>{t("socialImpactDesc")}</p>
                            <div className='impact-stats'>
                                <div className='impact-stat'>
                                    <h3>500+</h3>
                                    <p>{t("childrenSupported")}</p>
                                </div>
                                <div className='impact-stat'>
                                    <h3>20%</h3>
                                    <p>{t("profitsShared")}</p>
                                </div>
                            </div>
                        </div>
                        <div className='impact-image'>
                            <div className='impact-visual'>
                                <span className='impact-icon'>❤️</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='cta-section'>
                <div className='container'>
                    <div className='cta-content'>
                        <h2>{t("ctaTitle")}</h2>
                        <p>{t("ctaSubtitle")}</p>
                        <div className='cta-buttons'>
                            <button className='download-btn primary large'>
                                <span className='btn-icon'>🚀</span>
                                {t("startFreeTrial")}
                            </button>
                        </div>
                        <p className='cta-note'>{t("ctaNote")}</p>
                    </div>
                </div>
            </section>

            {/* Social Links */}
            <section className='social-links-section'>
                <div className='container'>
                    <h3>{t("followUs")}</h3>
                    <div className='social-links'>
                        <a href='#' className='social-link instagram'>
                            <span>📷</span> Instagram
                        </a>
                        <a href='#' className='social-link tiktok'>
                            <span>🎵</span> TikTok
                        </a>
                        <a href='#' className='social-link youtube'>
                            <span>📺</span> YouTube
                        </a>
                        <a href='#' className='social-link whatsapp'>
                            <span>💬</span> WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
