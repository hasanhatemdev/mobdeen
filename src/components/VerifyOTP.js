import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";

function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { t } = useLanguage();

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
            setError(err.response?.data?.message || t("invalidCode"));
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

                <h2>{t("enterVerificationCode")}</h2>
                <p className='center-text' style={{ color: "#666", marginBottom: "20px" }}>
                    {t("verificationCodeSentTo")} {email}
                </p>

                {error && <div className='error-message'>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='otp'>{t("verificationCode")}</label>
                        <div className='input-with-icon'>
                            <img src='/images/icons/lock.svg' alt='Lock' />
                            <input
                                type='text'
                                id='otp'
                                name='otp'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                placeholder={t("enterCode")}
                                dir='ltr'
                                maxLength='6'
                                pattern='[0-9]{6}'
                                style={{ textAlign: "center", letterSpacing: "5px" }}
                            />
                        </div>
                    </div>

                    <button type='submit' disabled={loading}>
                        {loading ? t("verifying") : t("verify")}
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
                        {t("resendCode")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VerifyOTP;
