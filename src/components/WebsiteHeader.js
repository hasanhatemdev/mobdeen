import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { LogIn, User } from "lucide-react";

function WebsiteHeader() {
    const { t, language, toggleLanguage } = useLanguage();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("access_token");

    const handleAuthAction = () => {
        if (isAuthenticated) {
            navigate("/subscriptions");
        } else {
            navigate("/login");
        }
    };

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
                    <button onClick={handleAuthAction} className='nav-link login-link'>
                        {isAuthenticated ? <User size={18} /> : <LogIn size={18} />}
                        {isAuthenticated ? t("profile") : t("login")}
                    </button>
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
