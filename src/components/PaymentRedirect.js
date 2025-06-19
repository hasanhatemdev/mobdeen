// src/components/PaymentRedirect.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function PaymentRedirect() {
    const { status } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    useEffect(() => {
        // This component handles the redirect from the app links back to the subscription page
        if (status === "success") {
            navigate("/subscriptions?payment_status=success");
        } else if (status === "failed") {
            navigate("/subscriptions?payment_status=failed");
        } else {
            navigate("/subscriptions");
        }
    }, [status, navigate]);

    return <div className='loading'>{t("redirecting")}</div>;
}

export default PaymentRedirect;
