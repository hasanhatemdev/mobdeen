import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";

function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { t, language } = useLanguage();

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
            setError(err.response?.data?.message || t("loginFailed"));
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
                <h2>{t("login")}</h2>
                {error && <div className='error-message'>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>{t("email")}</label>
                        <div className='input-with-icon'>
                            <img src='/images/icons/email.svg' alt='Email' />
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                placeholder={t("enterEmail")}
                                dir='ltr'
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>{t("password")}</label>
                        <div className='input-with-icon'>
                            <img src='/images/icons/lock.svg' alt='Lock' />
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                placeholder={t("enterPassword")}
                                dir='ltr'
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: "20px", textAlign: "center" }}>
                        <p onClick={() => navigate("/forgot-password")} className='forgot-password-link'>
                            {t("forgotPassword")}
                        </p>
                    </div>

                    <button type='submit' disabled={loading}>
                        {loading ? t("loggingIn") : t("login")}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
