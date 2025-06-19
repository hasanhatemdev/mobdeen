// src/components/PaymentSuccess.js
import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className='payment-result-container'>
            <div className='result-card success'>
                <div className='icon'>✓</div>
                <h2>تمت عملية الدفع بنجاح!</h2>
                <p>تم تفعيل اشتراكك بنجاح.</p>
                <button onClick={() => navigate("/profile")}>الذهاب إلى الملف الشخصي</button>
            </div>
        </div>
    );
}

export default PaymentSuccess;
