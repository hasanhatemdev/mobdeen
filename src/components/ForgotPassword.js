import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            await authService.forgotPassword(email);
            setSuccess(true);
            // Store email in sessionStorage for OTP verification
            sessionStorage.setItem("reset_email", email);

            // Redirect to OTP verification after 2 seconds
            setTimeout(() => {
                navigate("/verify-otp");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || t("failedToSend"));
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

                <h2>{t("passwordRecovery")}</h2>

                {error && <div className='error-message'>{error}</div>}
                {success && <div className='success-message'>{t("verificationCodeSent")}</div>}

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>{t("email")}</label>
                        <div className='input-with-icon'>
                            <img src='/images/icons/email.svg' alt='Email' />
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder={t("enterEmail")}
                                dir='ltr'
                            />
                        </div>
                    </div>

                    <button type='submit' disabled={loading}>
                        {loading ? t("sending") : t("sendVerificationCode")}
                    </button>
                </form>

                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#7B6300",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                    >
                        {t("backToLogin")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
