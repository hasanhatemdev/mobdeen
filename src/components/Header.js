import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Header = ({ currentPage, setCurrentPage }) => {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <header className='header'>
            <div className='header-container'>
                <a
                    href='#'
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage("home");
                    }}
                    className='logo'
                >
                    <img src='/images/logo.png' alt='Mobdeen Logo' />
                </a>

                <nav className='nav-links'>
                    <a
                        href='#'
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage("privacy");
                        }}
                        className='nav-link'
                    >
                        {t("privacyPolicy")}
                    </a>
                    <a href='/login' className='nav-link login-link'>
                        {t("login")}
                    </a>
                    <button className='language-switcher' onClick={toggleLanguage}>
                        {language === "en" ? "🇦🇪 AR" : "🇬🇧 EN"}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
