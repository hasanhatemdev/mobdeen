import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { LogIn, User, Menu, X } from "lucide-react";

function WebsiteHeader() {
    const { t, language, toggleLanguage } = useLanguage();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("access_token");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleAuthAction = () => {
        if (isAuthenticated) {
            navigate("/subscriptions");
        } else {
            navigate("/login");
        }
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest(".header-container")) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isMobileMenuOpen]);

    // Close mobile menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMobileMenuOpen]);

    return (
        <header className='website-header'>
            <div className='header-container'>
                <Link to='/' className='logo' onClick={() => setIsMobileMenuOpen(false)}>
                    <img src='/images/logo.png' alt='Mobdeen Logo' />
                </Link>

                <button className='mobile-menu-toggle' onClick={toggleMobileMenu} aria-label='Toggle mobile menu'>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
                    <Link to='/' className='nav-link' onClick={() => setIsMobileMenuOpen(false)}>
                        {language === "en" ? "Home" : "الرئيسية"}
                    </Link>
                    <Link to='/privacy-policy' className='nav-link' onClick={() => setIsMobileMenuOpen(false)}>
                        {t("privacyPolicy")}
                    </Link>
                    <Link to='/terms-conditions' className='nav-link' onClick={() => setIsMobileMenuOpen(false)}>
                        {language === "en" ? "Terms" : "شروط الخدمة"}
                    </Link>
                    <button onClick={handleAuthAction} className='nav-link login-link'>
                        {isAuthenticated ? <User size={18} /> : <LogIn size={18} />}
                        {isAuthenticated ? t("profile") : t("login")}
                    </button>
                    <button className='language-switcher' onClick={toggleLanguage} aria-label='Switch language'>
                        <span className='lang-flag'>{language === "en" ? "🇬🇧" : "🇦🇪"}</span>
                        <span className='lang-text'>{language === "en" ? "EN" : "AR"}</span>
                    </button>
                </nav>

                {/* Mobile menu overlay */}
                {isMobileMenuOpen && <div className='mobile-menu-overlay' onClick={() => setIsMobileMenuOpen(false)} />}
            </div>
        </header>
    );
}

export default WebsiteHeader;
