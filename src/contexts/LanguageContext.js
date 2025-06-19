// src/contexts/LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Get saved language from localStorage or default to English
        return localStorage.getItem("language") || "en";
    });

    useEffect(() => {
        // Save language preference
        localStorage.setItem("language", language);

        // Update document direction and language
        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

        // Update body class for styling
        document.body.className = language === "ar" ? "arabic" : "english";
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "ar" : "en"));
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Translation object
export const translations = {
    en: {
        // Login page
        login: "Login",
        email: "Email",
        password: "Password",
        enterEmail: "Enter your email",
        enterPassword: "Enter your password",
        forgotPassword: "Forgot Password?",
        loggingIn: "Logging in...",
        loginFailed: "Login failed. Please try again.",

        // Forgot Password
        passwordRecovery: "Password Recovery",
        sendVerificationCode: "Send Verification Code",
        sending: "Sending...",
        verificationCodeSent: "Verification code sent to your email",
        failedToSend: "Failed to send verification code. Please try again.",
        backToLogin: "Back to Login",

        // Verify OTP
        enterVerificationCode: "Enter Verification Code",
        verificationCodeSentTo: "Verification code sent to",
        verificationCode: "Verification Code",
        enterCode: "Enter verification code",
        verify: "Verify Code",
        verifying: "Verifying...",
        invalidCode: "Invalid verification code. Please try again.",
        resendCode: "Resend Code",

        // Reset Password
        resetPassword: "Reset Password",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        enterNewPassword: "Enter new password",
        reenterPassword: "Re-enter password",
        updating: "Updating...",
        updatePassword: "Update Password",
        passwordsDoNotMatch: "Passwords do not match",
        passwordTooShort: "Password must be at least 6 characters",
        passwordResetFailed: "Failed to reset password. Please try again.",
        passwordChangedSuccessfully: "Password changed successfully!",

        // Subscriptions
        manageSubscriptions: "Manage Subscriptions",
        profile: "Profile",
        logout: "Logout",
        loadingSubscriptions: "Loading subscription data...",
        noActiveSubscription: "You have no active subscription",
        viewSubscriptionPlan: "View Subscription Plan",
        currentPlan: "Current Plan",
        upgradePlan: "Upgrade Plan",
        availableSubscriptionPlans: "Available Subscription Plan",

        // Subscription details
        trialPeriod: "Trial Period",
        paid: "Paid",
        expiryDate: "Expiry Date",
        daysRemaining: "days remaining in trial period",
        notSpecified: "Not specified",
        activeFeatures: "Active Features",
        upgrade: "Upgrade",
        cancelSubscription: "Cancel Subscription",
        areYouSureCancel: "Are you sure you want to cancel your subscription?",
        subscriptionCancelledSuccessfully: "Subscription cancelled successfully",
        failedToCancel: "Failed to cancel subscription",

        // Features
        attachments: "Attachments",
        proofs: "Proofs",
        daily_recap: "Daily Recap",
        lock_chores: "Lock Chores",
        late_penalty: "Late Penalty",
        chat_upload_media: "Upload Media in Chat",
        weekly_values: "Weekly Values",
        ai_chat: "AI Chat",

        // Plan details
        features: "Features",
        yourCurrentPlan: "Your Current Plan",
        new: "New",
        discount: "discount",
        month: "month",
        year: "year",
        week: "week",
        day: "day",
        youHaveThisSubscription: "You have this subscription",
        processing: "Processing...",
        subscribeNow: "Subscribe Now",
        upgradeNow: "Upgrade Now",
        youHaveActiveSubscription: "You have an active subscription",
        noSubscriptionAvailable: "No subscription plan available",
        failedToLoadSubscriptionData: "Failed to load subscription data",
        failedToCreateSubscription: "Failed to create subscription. Please try again.",

        // Profile
        userId: "User ID",
        role: "Role",
        viewSubscriptions: "View Subscriptions",

        // Roles
        adult: "Parent",
        child: "Child",
        admin: "Admin",

        // Payment
        paymentSuccessful: "Payment Successful!",
        paymentFailed: "Payment Failed",
        subscriptionActivated: "Your subscription has been activated successfully.",
        paymentNotProcessed: "We couldn't process your payment. Please try again.",
        tryAgain: "Try Again",
        goToProfile: "Go to Profile",
        redirecting: "Redirecting...",

        // Loading
        loading: "Loading...",
    },
    ar: {
        // Login page
        login: "تسجيل الدخول",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        enterEmail: "أدخل بريدك الإلكتروني",
        enterPassword: "أدخل كلمة المرور",
        forgotPassword: "نسيت كلمة المرور؟",
        loggingIn: "جاري تسجيل الدخول...",
        loginFailed: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",

        // Forgot Password
        passwordRecovery: "استعادة كلمة المرور",
        sendVerificationCode: "إرسال رمز التحقق",
        sending: "جاري الإرسال...",
        verificationCodeSent: "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
        failedToSend: "فشل في إرسال رمز التحقق. يرجى المحاولة مرة أخرى.",
        backToLogin: "العودة إلى تسجيل الدخول",

        // Verify OTP
        enterVerificationCode: "إدخال رمز التحقق",
        verificationCodeSentTo: "تم إرسال رمز التحقق إلى",
        verificationCode: "رمز التحقق",
        enterCode: "أدخل رمز التحقق",
        verify: "تحقق من الرمز",
        verifying: "جاري التحقق...",
        invalidCode: "رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.",
        resendCode: "إعادة إرسال الرمز",

        // Reset Password
        resetPassword: "إعادة تعيين كلمة المرور",
        newPassword: "كلمة المرور الجديدة",
        confirmPassword: "تأكيد كلمة المرور",
        enterNewPassword: "أدخل كلمة المرور الجديدة",
        reenterPassword: "أعد إدخال كلمة المرور",
        updating: "جاري التحديث...",
        updatePassword: "تحديث كلمة المرور",
        passwordsDoNotMatch: "كلمات المرور غير متطابقة",
        passwordTooShort: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
        passwordResetFailed: "فشل في إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.",
        passwordChangedSuccessfully: "تم تغيير كلمة المرور بنجاح!",

        // Subscriptions
        manageSubscriptions: "إدارة الاشتراكات",
        profile: "الملف الشخصي",
        logout: "تسجيل الخروج",
        loadingSubscriptions: "جاري تحميل بيانات الاشتراك...",
        noActiveSubscription: "لا يوجد لديك اشتراك نشط حالياً",
        viewSubscriptionPlan: "عرض خطة الاشتراك",
        currentPlan: "الباقة الحالية",
        upgradePlan: "ترقية الباقة",
        availableSubscriptionPlans: "خطة الاشتراك المتاحة",

        // Subscription details
        trialPeriod: "الفترة التجريبية",
        paid: "مدفوع",
        expiryDate: "تاريخ الانتهاء",
        daysRemaining: "يوم من الفترة التجريبية",
        notSpecified: "غير محدد",
        activeFeatures: "المميزات النشطة",
        upgrade: "ترقية الباقة",
        cancelSubscription: "إلغاء الاشتراك",
        areYouSureCancel: "هل أنت متأكد من أنك تريد إلغاء اشتراكك؟",
        subscriptionCancelledSuccessfully: "تم إلغاء الاشتراك بنجاح",
        failedToCancel: "فشل في إلغاء الاشتراك",

        // Features
        attachments: "المرفقات",
        proofs: "الإثباتات",
        daily_recap: "الملخص اليومي",
        lock_chores: "قفل المهام",
        late_penalty: "غرامة التأخير",
        chat_upload_media: "رفع الوسائط في المحادثة",
        weekly_values: "القيم الأسبوعية",
        ai_chat: "محادثة الذكاء الاصطناعي",

        // Plan details
        features: "المميزات",
        yourCurrentPlan: "خطتك الحالية",
        new: "جديد",
        discount: "خصم",
        month: "شهر",
        year: "سنة",
        week: "أسبوع",
        day: "يوم",
        youHaveThisSubscription: "لديك هذا الاشتراك",
        processing: "جاري المعالجة...",
        subscribeNow: "اشترك الآن",
        upgradeNow: "ترقية الآن",
        youHaveActiveSubscription: "لديك اشتراك نشط",
        noSubscriptionAvailable: "لا توجد خطة اشتراك متاحة حالياً",
        failedToLoadSubscriptionData: "فشل في تحميل بيانات الاشتراك",
        failedToCreateSubscription: "فشل في إنشاء الاشتراك. يرجى المحاولة مرة أخرى.",

        // Profile
        userId: "معرف المستخدم",
        role: "الدور",
        viewSubscriptions: "عرض الاشتراكات",

        // Roles
        adult: "أب",
        child: "طفل",
        admin: "مسؤول",

        // Payment
        paymentSuccessful: "تمت عملية الدفع بنجاح!",
        paymentFailed: "فشلت عملية الدفع",
        subscriptionActivated: "تم تفعيل اشتراكك بنجاح.",
        paymentNotProcessed: "لم نتمكن من معالجة عملية الدفع. يرجى المحاولة مرة أخرى.",
        tryAgain: "المحاولة مرة أخرى",
        goToProfile: "الذهاب إلى الملف الشخصي",
        redirecting: "جاري التوجيه...",

        // Loading
        loading: "جاري التحميل...",
    },
};
