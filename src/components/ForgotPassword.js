// src/components/ForgotPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

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
            setError(err.response?.data?.message || "فشل في إرسال رمز التحقق. يرجى المحاولة مرة أخرى.");
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

                <h2>استعادة كلمة المرور</h2>

                {error && <div className='error-message'>{error}</div>}
                {success && (
                    <div
                        className='success-message'
                        style={{
                            backgroundColor: "#d4edda",
                            color: "#155724",
                            padding: "12px",
                            borderRadius: "4px",
                            marginBottom: "20px",
                            textAlign: "center",
                        }}
                    >
                        تم إرسال رمز التحقق إلى بريدك الإلكتروني
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>البريد الإلكتروني</label>
                        <div className='input-with-icon'>
                            <img src='/images/icons/email.svg' alt='Email' />
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='أدخل بريدك الإلكتروني'
                                dir='ltr'
                            />
                        </div>
                    </div>

                    <button type='submit' disabled={loading}>
                        {loading ? "جاري الإرسال..." : "إرسال رمز التحقق"}
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
                        العودة إلى تسجيل الدخول
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
