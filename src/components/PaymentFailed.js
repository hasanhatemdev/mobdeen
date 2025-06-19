// src/components/PaymentFailed.js
import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
    const navigate = useNavigate();

    return (
        <div className='payment-result-container'>
            <div className='result-card failed'>
                <div className='icon'>✕</div>
                <h2>فشلت عملية الدفع</h2>
                <p>لم نتمكن من معالجة عملية الدفع. يرجى المحاولة مرة أخرى.</p>
                <div className='result-actions'>
                    <button onClick={() => navigate("/subscriptions")}>المحاولة مرة أخرى</button>
                    <button onClick={() => navigate("/profile")} className='secondary-btn'>
                        الذهاب إلى الملف الشخصي
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentFailed;
