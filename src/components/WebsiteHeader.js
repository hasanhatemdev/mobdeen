import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function WebsiteHeader() {
    const { t, language, toggleLanguage } = useLanguage();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("access_token");
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleAuthAction = () => {
        if (isAuthenticated) {
            navigate("/subscriptions");
        } else {
            navigate("/login");
        }
    };

    return (
        <header className={`website-header ${scrolled ? "scrolled" : ""}`}>
            <div className='header-container'>
                <Link to='/' className='logo'>
                    <img src='/images/logo.png' alt='Mobdeen Logo' />
                    <span className='logo-text'>Mobdeen</span>
                </Link>

                <nav className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
                    <Link to='/' className='nav-link' onClick={() => setMobileMenuOpen(false)}>
                        {t("home")}
                    </Link>
                    <a href='#features' className='nav-link' onClick={() => setMobileMenuOpen(false)}>
                        {t("features")}
                    </a>
                    <a href='#how-it-works' className='nav-link' onClick={() => setMobileMenuOpen(false)}>
                        {t("howItWorks")}
                    </a>
                    <Link to='/privacy-policy' className='nav-link' onClick={() => setMobileMenuOpen(false)}>
                        {t("privacyPolicy")}
                    </Link>
                    <div className='nav-actions'>
                        <button onClick={handleAuthAction} className='auth-btn'>
                            {isAuthenticated ? t("dashboard") : t("login")}
                        </button>
                        <button
                            className='language-switcher modern'
                            onClick={toggleLanguage}
                            aria-label='Switch language'
                        >
                            <span className='lang-icon'>{language === "en" ? "🌐" : "🌍"}</span>
                            <span className='lang-text'>{language === "en" ? "EN" : "عربي"}</span>
                        </button>
                    </div>
                </nav>

                <button
                    className='mobile-menu-toggle'
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label='Toggle menu'
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}

export default WebsiteHeader;
