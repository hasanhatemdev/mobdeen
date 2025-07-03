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
                    <p>{t("section1Content1")}</p>
                    <p>{t("section1List1")}</p>
                    <p>{t("section1List2")}</p>
                    <p>{t("section1Content2")}</p>
                    <p>{t("section1Content3")}</p>
                    <p>{t("section1SubList1")}</p>
                    <p>{t("section1SubList2")}</p>
                    <p>{t("section1SubList3")}</p>
                </section>

                <section>
                    <h2>{t("section2Title")}</h2>
                    <p>{t("section2Content")}</p>
                    <p>{t("section2List1")}</p>
                    <p>{t("section2List2")}</p>
                    <p>{t("section2List3")}</p>
                    <p>{t("section2List4")}</p>
                </section>

                <section>
                    <h2>{t("section3Title")}</h2>
                    <p>{t("section3Content1")}</p>
                    <p>{t("section3List1")}</p>
                    <p>{t("section3List2")}</p>
                    <p>{t("section3List3")}</p>
                    <p>
                        <strong>{t("section3Important")}</strong>
                    </p>
                    <p>{t("section3Content2")}</p>
                </section>

                <section>
                    <h2>{t("section4Title")}</h2>
                    <p>{t("section4List1")}</p>
                    <p>{t("section4List2")}</p>
                    <p>{t("section4List3")}</p>
                </section>

                <section>
                    <h2>{t("section5Title")}</h2>
                    <p>{t("section5List1")}</p>
                    <p>{t("section5List2")}</p>
                    <p>{t("section5List3")}</p>
                </section>

                <section>
                    <h2>{t("section6Title")}</h2>
                    <p>{t("section6Content1")}</p>
                    <p>{t("section6List1")}</p>
                    <p>{t("section6List2")}</p>
                    <p>{t("section6List3")}</p>
                    <p>{t("section6List4")}</p>
                    <p
                        style={{
                            fontStyle: "italic",
                            backgroundColor: "#f0f0f0",
                            padding: "10px",
                            borderRadius: "5px",
                            margin: "10px 0",
                        }}
                    >
                        {t("section6Content2")}
                    </p>
                    <p>{t("section6Content3")}</p>
                </section>

                <section>
                    <h2>{t("section7Title")}</h2>
                    <p>{t("section7Content1")}</p>
                    <p>{t("section7List1")}</p>
                    <p>{t("section7List2")}</p>
                    <p>{t("section7Content2")}</p>
                </section>

                <section>
                    <h2>{t("section8Title")}</h2>
                    <p>{t("section8List1")}</p>
                    <p>{t("section8List2")}</p>
                </section>

                <section>
                    <h2>{t("section9Title")}</h2>
                    <p>{t("section9Content")}</p>
                </section>

                <section>
                    <h2>{t("section10Title")}</h2>
                    <p>{t("section10Content")}</p>
                    <p>{t("contactEmail")}</p>
                    <p>
                        {t("contactWhatsApp")}{" "}
                        <a
                            href='https://wa.me/971528978888'
                            target='_blank'
                            rel='noopener noreferrer'
                            style={{ color: "#25D366" }}
                        >
                            https://wa.me/971528978888
                        </a>
                    </p>
                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "30px",
                            borderTop: "1px solid #ddd",
                            paddingTop: "20px",
                        }}
                    >
                        <p>
                            <strong>{t("contactThankYou")}</strong>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
