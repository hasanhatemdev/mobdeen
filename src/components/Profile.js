import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";

function Profile() {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const userId = localStorage.getItem("user_id");
    const userRole = localStorage.getItem("user_role");

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.clear();
            navigate("/login");
        }
    };

    const getRoleInLanguage = (role) => {
        return t(role) || role;
    };

    return (
        <div className='profile-container'>
            <div className='profile-card'>
                <h2>{t("profile")}</h2>

                <div className='profile-info'>
                    <div className='info-item'>
                        <strong>{t("userId")}:</strong>
                        <span dir='ltr'>{userId}</span>
                    </div>

                    <div className='info-item'>
                        <strong>{t("role")}:</strong>
                        <span>{getRoleInLanguage(userRole)}</span>
                    </div>
                </div>

                <div className='profile-actions'>
                    <button onClick={() => navigate("/subscriptions")} className='nav-btn'>
                        {t("viewSubscriptions")}
                    </button>
                    <button onClick={handleLogout} className='logout-btn'>
                        {t("logout")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
