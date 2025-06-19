// src/components/PaymentSuccess.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function PaymentSuccess() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className='payment-result-container'>
            <div className='result-card success'>
                <div className='icon'>✓</div>
                <h2>{t("paymentSuccessful")}</h2>
                <p>{t("subscriptionActivated")}</p>
                <button onClick={() => navigate("/profile")}>{t("goToProfile")}</button>
            </div>
        </div>
    );
}

export default PaymentSuccess;
