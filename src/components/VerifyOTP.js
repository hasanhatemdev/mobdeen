// src/components/VerifyOTP.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";

function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const email = sessionStorage.getItem("reset_email");

    useEffect(() => {
        // If no email in sessionStorage, redirect to forgot password
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await authService.verifyOTP(email, otp);

            // Store reset token in sessionStorage
            sessionStorage.setItem("reset_token", response.reset_token);

            // Navigate to reset password page
            navigate("/reset-password");
        } catch (err) {
            setError(err.response?.data?.message || "رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <div className='login-logo'>
                    <img src='/images/logo.png' alt='Logo' />
                </div>

                <h2>إدخال رمز التحقق</h2>
                <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
                    تم إرسال رمز التحقق إلى {email}
                </p>

                {error && <div className='error-message'>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='otp'>رمز التحقق</label>
                        <div className='input-with-icon'>
                            <img src='/images/icons/lock.svg' alt='Lock' />
                            <input
                                type='text'
                                id='otp'
                                name='otp'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                placeholder='أدخل رمز التحقق'
                                dir='ltr'
                                maxLength='6'
                                pattern='[0-9]{6}'
                                style={{ textAlign: "center", letterSpacing: "5px" }}
                            />
                        </div>
                    </div>

                    <button type='submit' disabled={loading}>
                        {loading ? "جاري التحقق..." : "تحقق من الرمز"}
                    </button>
                </form>

                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <button
                        onClick={() => navigate("/forgot-password")}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#0066cc",
                            cursor: "pointer",
                            fontSize: "14px",
                            textDecoration: "underline",
                        }}
                    >
                        إعادة إرسال الرمز
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VerifyOTP;
