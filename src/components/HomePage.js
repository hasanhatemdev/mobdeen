import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

function HomePage() {
    const { t } = useLanguage();

    return (
        <div className='home-page'>
            <div className='hero-section'>
                <h1>{t("homeTitle")}</h1>
                <p className='hero-description'>{t("homeDescription")}</p>
                <button className='download-btn'>{t("downloadApp")}</button>
            </div>
        </div>
    );
}

export default HomePage;
