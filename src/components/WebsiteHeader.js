import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function WebsiteHeader() {
    const { t, language, toggleLanguage } = useLanguage();

    return (
        <header className='website-header'>
            <div className='header-container'>
                <Link to='/' className='logo'>
                    <img src='/images/logo.png' alt='Mobdeen Logo' />
                </Link>

                <nav className='nav-links'>
                    <Link to='/privacy-policy' className='nav-link'>
                        {t("privacyPolicy")}
                    </Link>
                    <Link to='/login' className='nav-link login-link'>
                        {t("login")}
                    </Link>
                    <button className='language-switcher' onClick={toggleLanguage} aria-label='Switch language'>
                        <span className='lang-flag'>{language === "en" ? "🇬🇧" : "🇦🇪"}</span>
                        <span className='lang-text'>{language === "en" ? "EN" : "AR"}</span>
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default WebsiteHeader;
