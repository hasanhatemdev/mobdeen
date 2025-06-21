import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer className='footer'>
            <div className='footer-container'>
                <div className='footer-main'>
                    <div className='footer-brand'>
                        <div className='footer-logo'>
                            <img src='/images/logo.png' alt='Mobdeen' />
                            <span>Mobdeen</span>
                        </div>
                        <p className='footer-tagline'>{t("footerTagline")}</p>
                        <div className='app-download-links'>
                            <a href='#' className='app-badge'>
                                <img src='/images/app-store-badge.png' alt='App Store' />
                            </a>
                            <a href='#' className='app-badge'>
                                <img src='/images/google-play-badge.png' alt='Google Play' />
                            </a>
                        </div>
                    </div>

                    <div className='footer-links-section'>
                        <div className='footer-column'>
                            <h4>{t("footerProduct")}</h4>
                            <ul>
                                <li>
                                    <a href='#features'>{t("features")}</a>
                                </li>
                                <li>
                                    <a href='#how-it-works'>{t("howItWorks")}</a>
                                </li>
                                <li>
                                    <Link to='/subscriptions'>{t("pricing")}</Link>
                                </li>
                                <li>
                                    <a href='#'>{t("download")}</a>
                                </li>
                            </ul>
                        </div>

                        <div className='footer-column'>
                            <h4>{t("footerCompany")}</h4>
                            <ul>
                                <li>
                                    <a href='#'>{t("aboutUs")}</a>
                                </li>
                                <li>
                                    <Link to='/privacy-policy'>{t("privacyPolicy")}</Link>
                                </li>
                                <li>
                                    <a href='#'>{t("termsOfService")}</a>
                                </li>
                                <li>
                                    <a href='#'>{t("contact")}</a>
                                </li>
                            </ul>
                        </div>

                        <div className='footer-column'>
                            <h4>{t("footerSupport")}</h4>
                            <ul>
                                <li>
                                    <a href='#'>{t("helpCenter")}</a>
                                </li>
                                <li>
                                    <a href='#'>{t("faq")}</a>
                                </li>
                                <li>
                                    <a href='mailto:support@mobdeen.com'>{t("emailSupport")}</a>
                                </li>
                                <li>
                                    <a href='tel:+971528978888'>{t("phoneSupport")}</a>
                                </li>
                            </ul>
                        </div>

                        <div className='footer-column'>
                            <h4>{t("footerConnect")}</h4>
                            <div className='social-links-footer'>
                                <a href='#' className='social-icon' aria-label='Instagram'>
                                    <svg viewBox='0 0 24 24' fill='currentColor'>
                                        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z' />
                                    </svg>
                                </a>
                                <a href='#' className='social-icon' aria-label='TikTok'>
                                    <svg viewBox='0 0 24 24' fill='currentColor'>
                                        <path d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.34 6.34 0 00-1-.05A6.33 6.33 0 005 20.1a6.33 6.33 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z' />
                                    </svg>
                                </a>
                                <a href='#' className='social-icon' aria-label='YouTube'>
                                    <svg viewBox='0 0 24 24' fill='currentColor'>
                                        <path d='M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                                    </svg>
                                </a>
                                <a href='#' className='social-icon' aria-label='WhatsApp'>
                                    <svg viewBox='0 0 24 24' fill='currentColor'>
                                        <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='footer-bottom'>
                    <div className='footer-bottom-content'>
                        <p>{t("footerRights")}</p>
                        <div className='footer-bottom-links'>
                            <a href='#'>{t("termsOfService")}</a>
                            <span className='separator'>•</span>
                            <Link to='/privacy-policy'>{t("privacyPolicy")}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
