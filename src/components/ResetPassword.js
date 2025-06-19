// src/components/ResetPassword.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const resetToken = sessionStorage.getItem("reset_token");

    useEffect(() => {
        // If no reset token, redirect to forgot password
        if (!resetToken) {
            navigate("/forgot-password");
        }
    }, [resetToken, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validate passwords match
        if (password !== confirmPassword) {
            setError("كلمات المرور غير متطابقة");
            setLoading(false);
            return;
        }

        // Validate password strength
        if (password.length < 6) {
            setError("يجب أن تكون كلمة المرور 6 أحرف على الأقل");
            setLoading(false);
            return;
        }

        try {
            await authService.resetPassword(password, resetToken);
            setSuccess(true);

            // Clear session storage
            sessionStorage.removeItem("reset_email");
            sessionStorage.removeItem("reset_token");

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "فشل في إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.");
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

                <h2>إعادة تعيين كلمة المرور</h2>

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
                        تم تغيير كلمة المرور بنجاح!
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='password'>كلمة المرور الجديدة</label>
                        <div className='input-with-icon'>
                            <img src='/images/icons/lock.svg' alt='Lock' />
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='أدخل كلمة المرور الجديدة'
                                dir='ltr'
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='confirmPassword'>تأكيد كلمة المرور</label>
                        <div className='input-with-icon'>
                            <img src='/images/icons/lock.svg' alt='Lock' />
                            <input
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder='أعد إدخال كلمة المرور'
                                dir='ltr'
                            />
                        </div>
                    </div>

                    <button type='submit' disabled={loading || success}>
                        {loading ? "جاري التحديث..." : "تحديث كلمة المرور"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
