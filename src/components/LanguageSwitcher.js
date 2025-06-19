// src/components/LanguageSwitcher.js
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button className='language-switcher' onClick={toggleLanguage} aria-label='Switch language'>
            <span className='lang-flag'>{language === "en" ? "🇬🇧" : "🇦🇪"}</span>
            <span className='lang-text'>{language === "en" ? "EN" : "AR"}</span>
        </button>
    );
}

export default LanguageSwitcher;
