import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function PaymentFailed() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className='payment-result-container'>
            <div className='result-card failed'>
                <div className='icon'>✕</div>
                <h2>{t("paymentFailed")}</h2>
                <p>{t("paymentNotProcessed")}</p>
                <div className='result-actions'>
                    <button onClick={() => navigate("/subscriptions")}>{t("tryAgain")}</button>
                    <button onClick={() => navigate("/profile")} className='secondary-btn'>
                        {t("goToProfile")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentFailed;
