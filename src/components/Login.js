// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";

function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await authService.login(credentials);

            // Store tokens and user data
            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("refresh_token", response.refresh_token);
            localStorage.setItem("user_id", response.id);
            localStorage.setItem("user_role", response.role);

            // Redirect to subscriptions page
            navigate("/subscriptions");
        } catch (err) {
            setError(err.response?.data?.message || "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <div className='login-logo'>
                    <img src='/images/logo.png' />
                </div>
                {error && <div className='error-message'>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>البريد الإلكتروني</label>
                        <div className='input-with-icon'>
                            <img src='/images/icons/email.svg' />
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                placeholder='أدخل بريدك الإلكتروني'
                                dir='ltr'
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>كلمة المرور</label>
                        <div className='input-with-icon'>
                            <img src='/images/icons/lock.svg' />
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                placeholder='أدخل كلمة المرور'
                                dir='ltr'
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: "20px", textAlign: "center" }}>
                        <p onClick={() => navigate("/forgot-password")} className='forgot-password-link'>
                            نسيت كلمة المرور؟
                        </p>
                    </div>

                    <button type='submit' disabled={loading}>
                        {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
