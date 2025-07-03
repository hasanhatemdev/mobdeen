import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

function TermsConditions() {
    const { t } = useLanguage();

    return (
        <div className='privacy-policy'>
            <div className='policy-container'>
                <h1>{t("termsTitle")}</h1>
                <p className='intro'>{t("termsIntro")}</p>

                <section>
                    <h2>{t("terms1Title")}</h2>
                    <p>{t("terms1App")}</p>
                    <p>{t("terms1Mentor")}</p>
                    <p>{t("terms1Creator")}</p>
                    <p>{t("terms1Cookies")}</p>
                </section>

                <section>
                    <h2>{t("terms2Title")}</h2>
                    <p>{t("terms2Content1")}</p>
                    <p>{t("terms2Content2")}</p>
                    <p>{t("terms2Content3")}</p>
                </section>

                <section>
                    <h2>{t("terms3Title")}</h2>
                    <p>{t("terms3Content1")}</p>
                    <p>{t("terms3Content2")}</p>
                    <p>{t("terms3Content3")}</p>
                </section>

                <section>
                    <h2>{t("terms4Title")}</h2>
                    <h4>🆓 {t("terms4FreeTitle")}</h4>
                    <p>{t("terms4FreeContent")}</p>
                    <h4>💳 {t("terms4PaidTitle")}</h4>
                    <p>{t("terms4PaidContent1")}</p>
                    <p>{t("terms4PaidContent2")}</p>
                    <p>{t("terms4Feature1")}</p>
                    <p>{t("terms4Feature2")}</p>
                    <p>{t("terms4Feature3")}</p>
                    <p>{t("terms4Feature4")}</p>
                    <p>{t("terms4Feature5")}</p>
                    <p>{t("terms4Feature6")}</p>
                    <p>{t("terms4Feature7")}</p>
                    <p>{t("terms4Feature8")}</p>
                    <p>{t("terms4Feature9")}</p>
                </section>

                <section>
                    <h2>{t("terms5Title")}</h2>
                    <p>{t("terms5Content1")}</p>
                    <p>{t("terms5Content2")}</p>
                    <p>{t("terms5Content3")}</p>
                </section>

                <section>
                    <h2>{t("terms6Title")}</h2>
                    <p>{t("terms6Content1")}</p>
                    <p>{t("terms6Content2")}</p>
                </section>

                <section>
                    <h2>{t("terms7Title")}</h2>
                    <p>{t("terms7Content1")}</p>
                    <p>{t("terms7Content2")}</p>
                </section>

                <section>
                    <h2>{t("terms8Title")}</h2>
                    <p>{t("terms8Content")}</p>
                </section>

                <section>
                    <h2>{t("terms9Title")}</h2>
                    <p>{t("termsContactEmail")}</p>
                    <p>
                        {t("termsContactWhatsApp")}{" "}
                        <a
                            href='https://wa.me/971528978888'
                            target='_blank'
                            rel='noopener noreferrer'
                            style={{ color: "#25D366" }}
                        >
                            https://wa.me/971528978888
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}

export default TermsConditions;
