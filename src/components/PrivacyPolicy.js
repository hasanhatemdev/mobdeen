import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

function PrivacyPolicy() {
    const { t } = useLanguage();

    return (
        <div className='privacy-policy'>
            <div className='policy-container'>
                <h1>{t("privacyPolicyTitle")}</h1>
                <p className='last-updated'>{t("lastUpdated")}</p>
                <p className='intro'>{t("privacyIntro")}</p>

                <section>
                    <h2>{t("section1Title")}</h2>
                    <p>{t("accountInfo")}</p>
                    <p>{t("childInfo")}</p>
                    <p>{t("activityData")}</p>
                    <p>{t("deviceData")}</p>
                    <p>{t("paymentData")}</p>
                </section>

                <section>
                    <h2>{t("section2Title")}</h2>
                    <p>{t("useData1")}</p>
                    <p>{t("useData2")}</p>
                    <p>{t("useData3")}</p>
                    <p>{t("useData4")}</p>
                    <p>{t("useData5")}</p>
                </section>

                <section>
                    <h2>{t("section3Title")}</h2>
                    <p>{t("section3Content")}</p>
                </section>

                <section>
                    <h2>{t("section4Title")}</h2>
                    <p>{t("section4Content")}</p>
                    <p>{t("section4Item1")}</p>
                    <p>{t("section4Item2")}</p>
                </section>

                <section>
                    <h2>{t("section5Title")}</h2>
                    <p>{t("protection1")}</p>
                    <p>{t("protection2")}</p>
                    <p>{t("protection3")}</p>
                    <p>{t("protection4")}</p>
                </section>

                <section>
                    <h2>{t("section6Title")}</h2>
                    <p>{t("rights1")}</p>
                    <p>{t("rights2")}</p>
                    <p>{t("rights3")}</p>
                </section>

                <section>
                    <h2>{t("section7Title")}</h2>
                    <p>{t("section7Content")}</p>
                </section>

                <section>
                    <h2>{t("section8Title")}</h2>
                    <p>{t("section8Content")}</p>
                </section>

                <section>
                    <h2>{t("section9Title")}</h2>
                    <p>{t("section9Content")}</p>
                </section>

                <section>
                    <h2>{t("section10Title")}</h2>
                    <p>{t("contactEmail")}</p>
                    <p>{t("contactPhone")}</p>
                </section>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
