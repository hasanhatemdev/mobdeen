// src/components/PaymentRedirect.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PaymentRedirect() {
    const { status } = useParams();
    const navigate = useNavigate();

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

    return <div className='loading'>جاري التوجيه...</div>;
}

export default PaymentRedirect;
