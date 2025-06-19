import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function Footer() {
    const { t } = useLanguage();

    return (
        <footer className='footer'>
            <div className='footer-container'>
                <div className='footer-content'>
                    <div className='footer-logo'>
                        <img src='/images/logo.png' alt='Mobdeen' />
                        <p>{t("footerDescription")}</p>
                    </div>
                    <div className='footer-links'>
                        <Link to='/privacy-policy'>{t("privacyPolicy")}</Link>
                        <Link to='/login'>{t("login")}</Link>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <p>{t("footerRights")}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
