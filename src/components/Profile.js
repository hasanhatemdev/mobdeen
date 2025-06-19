// src/components/Profile.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";

function Profile() {
    const navigate = useNavigate();
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

    const getRoleInArabic = (role) => {
        const roles = {
            adult: "أب",
            child: "طفل",
            admin: "مسؤول",
        };
        return roles[role] || role;
    };

    return (
        <div className='profile-container'>
            <div className='profile-card'>
                <h2>الملف الشخصي</h2>

                <div className='profile-info'>
                    <div className='info-item'>
                        <strong>معرف المستخدم:</strong>
                        <span dir='ltr'>{userId}</span>
                    </div>

                    <div className='info-item'>
                        <strong>الدور:</strong>
                        <span>{getRoleInArabic(userRole)}</span>
                    </div>
                </div>

                <div className='profile-actions'>
                    <button onClick={() => navigate("/subscriptions")} className='nav-btn'>
                        عرض الاشتراكات
                    </button>
                    <button onClick={handleLogout} className='logout-btn'>
                        تسجيل الخروج
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
