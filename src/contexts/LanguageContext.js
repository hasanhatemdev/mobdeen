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
    // Initialize language from localStorage or default to 'en'
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("language") || "en";
    });

    useEffect(() => {
        // Save language preference to localStorage
        localStorage.setItem("language", language);

        // Update document direction and font
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = language;

        // Update body class for CSS styling
        document.body.className = language === "ar" ? "arabic" : "english";
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "ar" : "en"));
    };

    const t = (key) => {
        return translations[language][key] || translations["en"][key] || key;
    };

    return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>;
};

// Complete translations
const translations = {
    en: {
        // Header & Navigation
        home: "Home",
        features: "Features",
        howItWorks: "How It Works",
        privacyPolicy: "Privacy Policy",
        login: "Login",
        dashboard: "Dashboard",

        // Hero Section
        heroTitle: "Smart Parenting",
        heroTitleHighlight: "United with Creativity",
        heroSubtitle:
            "An intelligent parenting app that helps you improve your child's behavior and skills through personalized tasks, points, rewards, and weekly progress reports.",
        downloadApp: "Download App",
        watchDemo: "Watch Demo",
        floatingCard1: "Task Completed!",
        floatingCard2: "10 Points Earned",
        floatingCard3: "Weekly Progress",

        // Who Uses Section
        whoUsesTitle: "Who Uses Mobdeen?",
        user1Title: "Families & Parents",
        user1Desc: "Create stronger bonds through fun challenges and shared achievements",
        user2Title: "Teachers & Educators",
        user2Desc: "Track student progress and assign educational tasks effectively",
        user3Title: "Schools & Centers",
        user3Desc: "Manage multiple classrooms and monitor overall performance",
        user4Title: "Educational Institutions",
        user4Desc: "Implement structured behavioral improvement programs",

        // Features Section
        featuresTitle: "Key Features",
        featuresSubtitle: "Everything you need to nurture your child's growth and development",
        feature1Title: "Weekly Skill-Building Tasks",
        feature1Desc:
            "Every week focuses on a new value like cooperation, honesty, or respect with personalized insights",
        feature2Title: "AI-Powered Recommendations",
        feature2Desc: "Smart task suggestions based on your child's behavior patterns and progress",
        feature3Title: "Multiple Caregivers",
        feature3Desc: "Parents, teachers, and caregivers can all collaborate to support the same child",
        feature4Title: "Progress Reports",
        feature4Desc: "Weekly summaries with trends and improvement suggestions shared with the family",
        feature5Title: "Reward System",
        feature5Desc: "Children earn virtual cookies for completing tasks, motivating continuous improvement",
        feature6Title: "Visual Learning",
        feature6Desc: "Tasks presented visually to help nonverbal or language-delayed children understand easily",
        trialDescription:
            "You have access to all premium features during your trial period. Upgrade anytime to continue enjoying these features after your trial ends.",
        selectPlan: "Select Plan",

        // How It Works Section
        howItWorksTitle: "How It Works",
        step1Title: "Download & Setup",
        step1Desc: "Download the app and add your children or students",
        step2Title: "Choose Skills",
        step2Desc: "Select the values and skills you want to focus on",
        step3Title: "Track Progress",
        step3Desc: "Monitor daily achievements and behavioral improvements",
        step4Title: "Celebrate Success",
        step4Desc: "Reward accomplishments and share progress with family",

        // Stats Section
        statsFamilies: "Happy Families",
        statsTasks: "Tasks Completed",
        statsRating: "App Store Rating",
        statsSatisfaction: "Parent Satisfaction",

        // Testimonials Section
        testimonialsTitle: "What Parents Say",
        testimonial1Name: "Sarah Ahmed",
        testimonial1Role: "Mother of Two",
        testimonial1Text:
            "Mobdeen transformed our daily routines into fun challenges. My kids are more responsible and we bond better as a family!",
        testimonial2Name: "Mohammed Ali",
        testimonial2Role: "Father & Teacher",
        testimonial2Text:
            "As both a parent and educator, I love how Mobdeen bridges home and school. The progress tracking is invaluable.",
        testimonial3Name: "Fatima Hassan",
        testimonial3Role: "Special Needs Parent",
        testimonial3Text:
            "The visual task system works perfectly for my nonverbal child. Finally, an app that truly understands our needs!",

        // Social Impact Section
        socialImpactTitle: "Support Your Family — and Help Another",
        socialImpactDesc:
            "Part of our profits goes toward funding education for children from low-income families. Every conscious parent helps build a better future.",
        childrenSupported: "Children Supported",
        profitsShared: "Profits Shared",

        // CTA Section
        ctaTitle: "Ready to Transform Your Parenting Journey?",
        ctaSubtitle: "Join thousands of families creating better futures through smart parenting",
        startFreeTrial: "Start Free Trial",
        ctaNote: "No credit card required • 14-day free trial",

        // Social Links
        followUs: "Connect With Us",

        // Footer
        footerTagline: "Empowering families to raise creative, responsible children through smart technology",
        footerProduct: "Product",
        footerCompany: "Company",
        footerSupport: "Support",
        footerConnect: "Connect",
        pricing: "Pricing",
        download: "Download",
        aboutUs: "About Us",
        termsOfService: "Terms of Service",
        contact: "Contact",
        helpCenter: "Help Center",
        faq: "FAQ",
        emailSupport: "Email Support",
        phoneSupport: "Call Us",
        footerRights: "© 2025 Mobdeen. All rights reserved.",

        // Login
        enterEmail: "Enter your email",
        enterPassword: "Enter your password",
        forgotPassword: "Forgot Password?",
        loggingIn: "Logging in...",
        email: "Email",
        password: "Password",
        loginFailed: "Login failed. Please check your credentials.",

        // Privacy Policy
        privacyPolicyTitle: "Privacy Policy – Mobdeen App",
        lastUpdated: "Last updated: June 2025",
        privacyIntro:
            'At "Mobdeen" app, we respect your privacy and are committed to protecting your data. This document explains how we collect, use, store, and protect user information.',

        section1Title: "1. Data We Collect",
        section1Content1: "Currently, we collect:",
        section1List1: "• Name",
        section1List2: "• Email",
        section1Content2: "We do not collect or request any sensitive or private information about children directly.",
        section1Content3:
            "Users (mentors) may enter additional data within the app such as children's ages or daily tasks, and this data:",
        section1SubList1: "• Is stored only in the database to enable app functionality",
        section1SubList2: "• Cannot be accessed by app management, any employees, or supervisors",
        section1SubList3: "• Is not used for any marketing or external analytical purposes",

        section2Title: "2. Use of Data",
        section2Content: "We use data for the following purposes:",
        section2List1: "• Account creation and login",
        section2List2: "• Customizing the user experience within the app",
        section2List3: "• Sending alert notifications (if enabled)",
        section2List4: "• Providing technical support when needed",

        section3Title: "3. Data Protection",
        section3Content1: "We follow best practices to secure your data, including:",
        section3List1: "• Encryption during storage and transmission",
        section3List2: "• Not storing passwords as plain text",
        section3List3: "• Completely restricting access to sensitive data",
        section3Important:
            'We confirm that activity data, tasks, children\'s ages, or any information entered within the app cannot be accessed or viewed by any employee, supervisor, or even the founder of the "Mobdeen" app itself.',
        section3Content2:
            "This data is stored exclusively in the database for display within the user's account only, and is not used outside this framework under any circumstances.",

        section4Title: "4. Limitation of Liability",
        section4List1: "• The user is solely responsible for the accuracy and validity of the data they enter",
        section4List2:
            "• Entering sensitive information (such as addresses, personal photos of children, or identification numbers) within activities is prohibited unless educationally necessary and under user supervision",
        section4List3:
            "• The app is used only as an educational assistant and is not considered an official psychological or behavioral assessment tool",

        section5Title: "5. Children's Use",
        section5List1:
            '• The "Mobdeen" app is not directed for direct use by children, and requires that each account be supervised by a responsible adult (mentor)',
        section5List2: "• Creating accounts by children without direct supervision is not allowed",
        section5List3:
            "• If we discover direct use by a child without supervision, we have the right to immediately cancel the account without notice",

        section6Title: "6. Third-Party Services",
        section6Content1: "We may use trusted external services for some current or future features such as:",
        section6List1: "• Firebase Cloud Messaging (for sending notifications)",
        section6List2: "• Stripe (for completing payment transactions)",
        section6List3: "• Google Analytics (for aggregate usage analysis – without personal data)",
        section6List4: "• OpenAI or AI services (for data analysis or responses within the app)",
        section6Content2:
            "All processing through these services is done under strict controls, and no personal content is shared with these parties except indirectly for the purpose of performing required functions only.",
        section6Content3:
            "These parties are bound by their own privacy policies, and the user implicitly agrees to the use of these services when using the app.",

        section7Title: "7. Aggregate (Non-Personal) Data",
        section7Content1:
            "We reserve the right to analyze abstract data not linked to user identity (such as number of completed tasks or most used activity types) for purposes of:",
        section7List1: "• Improving the app experience",
        section7List2: "• Developing future educational AI features",
        section7Content2: "This data is not used to identify any specific user.",

        section8Title: "8. User Rights",
        section8List1: "• Users have the right to modify their data or delete their account entirely at any time",
        section8List2:
            "• They can request a copy of their recorded data or permanently delete it by contacting the support team",

        section9Title: "9. Policy Modifications",
        section9Content:
            "We reserve the right to modify this policy at any time, and users will be notified of any material changes via email or within the app.",

        section10Title: "10. Contact Us",
        section10Content: "For any inquiries regarding the privacy policy, please contact us via:",
        contactEmail: "📧 Email: info@mobdeen.com",
        contactWhatsApp: "💬 WhatsApp Support:",
        contactThankYou: 'Thank you for choosing "Mobdeen". We believe that privacy begins with trust.',

        // Footer
        footerDescription: "Smart family management app for better parenting",

        // Subscriptions
        manageSubscriptions: "Manage Subscriptions",
        loadingSubscriptions: "Loading subscriptions...",
        profile: "Profile",
        logout: "Logout",
        noActiveSubscription: "No active subscription",
        viewSubscriptionPlan: "View Subscription Plans",
        currentPlan: "Current Plan",
        upgradePlan: "Upgrade Plan",
        availableSubscriptionPlans: "Available Subscription Plans",
        noSubscriptionAvailable: "No subscription plans available",
        yourCurrentPlan: "Your Current Plan",
        upgradeNow: "Upgrade Now",
        subscribeNow: "Subscribe Now",
        processing: "Processing...",
        failedToLoadSubscriptionData: "Failed to load subscription data",
        failedToCreateSubscription: "Failed to create subscription",
        failedToCancel: "Failed to cancel subscription",
        areYouSureCancel: "Are you sure you want to cancel your subscription?",
        cancelWarning: "You will lose access to all premium features immediately.",
        keepSubscription: "Keep Subscription",
        confirmCancel: "Yes, Cancel",
        cancelling: "Cancelling...",
        cancelSubscriptionTitle: "Cancel Subscription?",
        subscriptionCancelledSuccessfully: "Subscription cancelled successfully",
        trialPeriod: "Trial Period",
        paid: "Paid",
        expiryDate: "Expiry Date",
        daysRemaining: "days remaining",
        days: "days",
        notSpecified: "Not specified",
        activeFeatures: "Active Features",
        upgrade: "Upgrade",
        cancelSubscription: "Cancel Subscription",
        features: "Features",
        discount: "Discount",
        new: "NEW",
        month: "month",
        year: "year",

        // Features translations
        attachments: "Attachments",
        proofs: "Proofs",
        daily_recap: "Daily Recap",
        lock_chores: "Lock Chores",
        late_penalty: "Late Penalty",
        chat_upload_media: "Chat Upload Media",
        weekly_values: "Weekly Values",
        ai_chat: "AI Chat",
        dailyRecap: "Daily Recap",
        lockChores: "Lock Chores",
        latePenalty: "Late Penalty",
        chatUploadMedia: "Chat Upload Media",
        weeklyValues: "Weekly Values",
        aiChat: "AI Chat",

        // Additional translations
        premiumPlan: "Premium Plan",
        remaining: "Remaining",
        upgradeFromTrial: "Upgrade from Trial",
        passwordRecovery: "Password Recovery",
        verificationCodeSent: "Verification code sent to your email",
        sending: "Sending...",
        sendVerificationCode: "Send Verification Code",
        backToLogin: "Back to Login",
        enterVerificationCode: "Enter Verification Code",
        verificationCodeSentTo: "We've sent a verification code to",
        verificationCode: "Verification Code",
        enterCode: "Enter code",
        verifying: "Verifying...",
        verify: "Verify",
        resendCode: "Resend Code",
        resetPassword: "Reset Password",
        passwordChangedSuccessfully: "Password changed successfully!",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        enterNewPassword: "Enter new password",
        reenterPassword: "Re-enter password",
        updating: "Updating...",
        updatePassword: "Update Password",
        passwordsDoNotMatch: "Passwords do not match",
        passwordTooShort: "Password must be at least 6 characters",
        passwordResetFailed: "Failed to reset password",
        invalidCode: "Invalid verification code",
        failedToSend: "Failed to send verification code",
        redirecting: "Redirecting...",
        paymentSuccessful: "Payment Successful",
        subscriptionActivated: "Your subscription has been activated successfully!",
        goToProfile: "Go to Profile",
        paymentFailed: "Payment Failed",
        paymentNotProcessed: "Your payment could not be processed. Please try again.",
        tryAgain: "Try Again",
        viewSubscriptions: "View Subscriptions",
        userId: "User ID",
        role: "Role",

        // User roles
        parent: "Parent",
        child: "Child",
        admin: "Admin",

        // Terms and Conditions
        termsAndConditionsTitle: "Terms and Conditions",
        termsIntro: 'Welcome to the "Mobdeen" app. By using the app, you agree to the following terms:',

        section1Title: "1. Definitions",
        definitionApp:
            '– App: "Mobdeen", a smart educational system for managing tasks and evaluating and developing children or students.',
        definitionGuide: "– Guide: Any educational supervisor such as a parent, teacher, supervisor, or coach.",
        definitionCreator: "– Creator: The child or student being followed within the app.",
        definitionCookies: "– Cookies: Virtual currency within the app used as rewards for achievement.",

        section2Title: "2. Scope of Use",
        scopeOfUse1:
            "– The app is aimed at individuals and educational institutions, and can be used in homes, schools, centers, or any educational environment.",
        scopeOfUse2: "– The supervising user must be actually responsible for the target group (children or students).",
        scopeOfUse3: "– It is prohibited to use the app for any non-educational purpose or contrary to public morals.",

        section3Title: "3. Data and Privacy",
        dataPrivacy1: "– We are committed to protecting the privacy of user data.",
        dataPrivacy2: "– Data is not sold or shared with any third party except with user consent or by legal order.",
        dataPrivacy3: "– Data may be used to improve the service and provide personalized content.",

        section4Title: "4. Subscription Features",
        freePlanTitle: "🆓 Free Plan (30 days):",
        freePlanContent: "– All users can try the app with all its features for 30 days for free.",
        paidPlanTitle: "💳 Paid Plan:",
        paidPlanIntro:
            "– After the free month ends, the annual subscription plan is automatically activated with fees: 365 AED per year (1 AED per day).",
        paidPlanFeatures: "– Paid features include:",
        feature1: "Daily progress summary",
        feature2: "Automatic task locking",
        feature3: "Automatic application of educational penalties",
        feature4: "Sending weekly educational values",
        feature5: "Activating in-app chat",
        feature6: "Uploading photos, audio, video within tasks",
        feature7: "Attaching files and documents",
        feature8: "Detailed behavioral reports and indicators",
        feature9: "Direct technical support via WhatsApp",

        section5Title: "5. Payment and Cancellation",
        paymentCancellation1: "– Payment is made once per year of subscription.",
        paymentCancellation2:
            "– The subscription value is not refunded after activation except in case of a technical error proven by technical support.",
        paymentCancellation3:
            "– Subscription can be cancelled at any time, with continued access until the end of the paid period.",

        section6Title: "6. Intellectual Property",
        intellectualProperty1: '– All intellectual rights are reserved for the "Mobdeen" app.',
        intellectualProperty2:
            "– It is prohibited to copy or reuse the content, interface, programming, or cookies system without official permission.",

        section7Title: "7. Disclaimer",
        disclaimer1:
            "– The app provides supportive educational tools, and is not a substitute for direct human supervision.",
        disclaimer2: "– The app bears no educational or legal responsibility resulting from misuse by users.",

        section8Title: "8. Modifications",
        modifications:
            "– We reserve the right to modify the terms, prices, or features at any time with notification to users within the app.",

        section9Title: "9. Technical Support and Contact",
        supportEmail: "– 📧 Email: info@mobdeen.com",
        supportWhatsapp: "– 💬 WhatsApp Support: https://wa.me/971528978888",

        // Terms and Conditions
        termsTitle: "Terms and Conditions",
        termsIntro: 'Welcome to "Mobdeen" app. By using the app, you agree to the following terms:',

        terms1Title: "1. Definitions",
        terms1App:
            '• App: "Mobdeen", an intelligent educational system for task management and evaluation and development of children or students.',
        terms1Mentor: "• Mentor: Any educational supervisor such as a parent, teacher, supervisor, or coach.",
        terms1Creator: "• Creator: The child or student being monitored within the app.",
        terms1Cookies: "• Cookies: Virtual currency within the app used as rewards for achievements.",

        terms2Title: "2. Scope of Use",
        terms2Content1:
            "• The app is intended for individuals and educational institutions, and can be used in homes, schools, centers, or any educational environment.",
        terms2Content2:
            "• The supervising user must be actually responsible for the target group (children or students).",
        terms2Content3: "• Using the app for any non-educational purpose or contrary to public morals is prohibited.",

        terms3Title: "3. Data and Privacy",
        terms3Content1: "• We are committed to protecting users' data privacy.",
        terms3Content2: "• Data is not sold or shared with any third party except with user consent or legal order.",
        terms3Content3: "• Data may be used to improve the service and provide personalized content.",

        terms4Title: "4. Subscription Features",
        terms4FreeTitle: "Free Plan (30 days):",
        terms4FreeContent: "• All users can try the app with all its features for 30 days free.",
        terms4PaidTitle: "Paid Plan:",
        terms4PaidContent1:
            "• After the free month ends, the annual subscription plan is automatically activated with fees:",
        terms4PaidContent2: "  365 AED per year (1 AED per day).",
        terms4Feature1: "• Daily progress summary",
        terms4Feature2: "• Automatic task locking",
        terms4Feature3: "• Automatic educational penalties application",
        terms4Feature4: "• Weekly educational values sending",
        terms4Feature5: "• In-app chat activation",
        terms4Feature6: "• Upload photos, audio, video within tasks",
        terms4Feature7: "• Attach files and documents",
        terms4Feature8: "• Detailed behavioral reports and indicators",
        terms4Feature9: "• Direct technical support via WhatsApp",

        terms5Title: "5. Payment and Cancellation",
        terms5Content1: "• Payment is made once for each subscription year.",
        terms5Content2:
            "• The subscription value is not refunded after activation except in case of a technical error proven by technical support.",
        terms5Content3:
            "• Subscription can be cancelled at any time, with access continuing until the end of the paid period.",

        terms6Title: "6. Intellectual Property",
        terms6Content1: '• All intellectual property rights are reserved for "Mobdeen" app.',
        terms6Content2:
            "• Copying or reusing content, interface, programming, or cookies system without official permission is prohibited.",

        terms7Title: "7. Disclaimer",
        terms7Content1:
            "• The app provides supportive educational tools and is not a substitute for direct human supervision.",
        terms7Content2: "• The app bears no educational or legal responsibility resulting from misuse by users.",

        terms8Title: "8. Modifications",
        terms8Content:
            "• We reserve the right to modify terms, prices, or features at any time with notification to users within the app.",

        terms9Title: "9. Technical Support and Contact",
        termsContactEmail: "📧 Email: info@mobdeen.com",
        termsContactWhatsApp: "💬 WhatsApp Support:",
    },
    ar: {
        // Header & Navigation
        home: "الرئيسية",
        features: "المميزات",
        howItWorks: "كيف يعمل",
        privacyPolicy: "سياسة الخصوصية",
        login: "تسجيل الدخول",
        dashboard: "لوحة التحكم",

        // Hero Section
        heroTitle: "تربية ذكية",
        heroTitleHighlight: "متحدة بالإبداع",
        heroSubtitle:
            "تطبيق تربوي ذكي يساعدك على تحسين سلوك ومهارات طفلك من خلال المهام المخصصة والنقاط والمكافآت وتقارير التقدم الأسبوعية.",
        downloadApp: "حمل التطبيق",
        watchDemo: "شاهد العرض",
        floatingCard1: "تمت المهمة!",
        floatingCard2: "10 نقاط مكتسبة",
        floatingCard3: "التقدم الأسبوعي",

        // Who Uses Section
        whoUsesTitle: "من يستخدم مبدعين؟",
        user1Title: "العائلات والآباء",
        user1Desc: "بناء روابط أقوى من خلال التحديات الممتعة والإنجازات المشتركة",
        user2Title: "المعلمون والمربون",
        user2Desc: "تتبع تقدم الطلاب وتعيين المهام التعليمية بفعالية",
        user3Title: "المدارس والمراكز",
        user3Desc: "إدارة فصول متعددة ومراقبة الأداء العام",
        user4Title: "المؤسسات التعليمية",
        user4Desc: "تطبيق برامج منظمة لتحسين السلوك",

        // Features Section
        featuresTitle: "المميزات الرئيسية",
        featuresSubtitle: "كل ما تحتاجه لرعاية نمو وتطور طفلك",
        feature1Title: "مهام بناء المهارات الأسبوعية",
        feature1Desc: "كل أسبوع يركز على قيمة جديدة مثل التعاون أو الصدق أو الاحترام مع رؤى مخصصة",
        feature2Title: "توصيات مدعومة بالذكاء الاصطناعي",
        feature2Desc: "اقتراحات مهام ذكية بناءً على أنماط سلوك طفلك وتقدمه",
        feature3Title: "مقدمو رعاية متعددون",
        feature3Desc: "يمكن للوالدين والمعلمين ومقدمي الرعاية التعاون لدعم نفس الطفل",
        feature4Title: "تقارير التقدم",
        feature4Desc: "ملخصات أسبوعية مع الاتجاهات واقتراحات التحسين المشتركة مع العائلة",
        feature5Title: "نظام المكافآت",
        feature5Desc: "يكسب الأطفال كوكيز افتراضية لإكمال المهام، مما يحفز التحسين المستمر",
        feature6Title: "التعلم البصري",
        feature6Desc: "تُعرض المهام بصريًا لمساعدة الأطفال غير اللفظيين أو المتأخرين لغويًا على الفهم بسهولة",

        // How It Works Section
        howItWorksTitle: "كيف يعمل",
        step1Title: "التحميل والإعداد",
        step1Desc: "حمل التطبيق وأضف أطفالك أو طلابك",
        step2Title: "اختر المهارات",
        step2Desc: "حدد القيم والمهارات التي تريد التركيز عليها",
        step3Title: "تتبع التقدم",
        step3Desc: "راقب الإنجازات اليومية والتحسينات السلوكية",
        step4Title: "احتفل بالنجاح",
        step4Desc: "كافئ الإنجازات وشارك التقدم مع العائلة",

        // Stats Section
        statsFamilies: "عائلة سعيدة",
        statsTasks: "مهمة مكتملة",
        statsRating: "تقييم المتجر",
        statsSatisfaction: "رضا الوالدين",

        // Testimonials Section
        testimonialsTitle: "ماذا يقول الآباء",
        testimonial1Name: "سارة أحمد",
        testimonial1Role: "أم لطفلين",
        testimonial1Text:
            "حوّل مبدعين روتيننا اليومي إلى تحديات ممتعة. أطفالي أصبحوا أكثر مسؤولية ونترابط بشكل أفضل كعائلة!",
        testimonial2Name: "محمد علي",
        testimonial2Role: "أب ومعلم",
        testimonial2Text: "كوني أب ومعلم، أحب كيف يربط مبدعين بين المنزل والمدرسة. تتبع التقدم لا يقدر بثمن.",
        testimonial3Name: "فاطمة حسن",
        testimonial3Role: "أم لطفل من ذوي الاحتياجات الخاصة",
        testimonial3Text: "نظام المهام البصرية يعمل بشكل مثالي مع طفلي غير اللفظي. أخيرًا، تطبيق يفهم احتياجاتنا حقًا!",

        // Social Impact Section
        socialImpactTitle: "ادعم عائلتك — وساعد عائلة أخرى",
        socialImpactDesc:
            "جزء من أرباحنا يذهب لتمويل تعليم الأطفال من الأسر ذات الدخل المحدود. كل والد واعٍ يساعد في بناء مستقبل أفضل.",
        childrenSupported: "طفل مدعوم",
        profitsShared: "من الأرباح المشتركة",

        // CTA Section
        ctaTitle: "مستعد لتحويل رحلتك التربوية؟",
        ctaSubtitle: "انضم لآلاف العائلات التي تصنع مستقبلاً أفضل من خلال التربية الذكية",
        startFreeTrial: "ابدأ التجربة المجانية",
        ctaNote: "لا حاجة لبطاقة ائتمان • تجربة مجانية لمدة 14 يومًا",

        // Social Links
        followUs: "تواصل معنا",

        // Footer
        footerTagline: "نمكّن العائلات من تربية أطفال مبدعين ومسؤولين من خلال التقنية الذكية",
        footerProduct: "المنتج",
        footerCompany: "الشركة",
        footerSupport: "الدعم",
        footerConnect: "تواصل",
        pricing: "الأسعار",
        download: "تحميل",
        aboutUs: "عن الشركة",
        termsOfService: "شروط الخدمة",
        contact: "اتصل بنا",
        helpCenter: "مركز المساعدة",
        faq: "الأسئلة الشائعة",
        emailSupport: "الدعم عبر البريد",
        phoneSupport: "اتصل بنا",
        footerRights: "© 2025 مبدعين. جميع الحقوق محفوظة.",

        trialDescription:
            "لديك وصول إلى جميع الميزات المميزة خلال فترة التجربة. قم بالترقية في أي وقت للاستمرار في الاستمتاع بهذه الميزات بعد انتهاء الفترة التجريبية.",
        selectPlan: "اختر الخطة",

        // Login
        enterEmail: "أدخل بريدك الإلكتروني",
        enterPassword: "أدخل كلمة المرور",
        forgotPassword: "نسيت كلمة المرور؟",
        loggingIn: "جاري تسجيل الدخول...",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        loginFailed: "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.",

        // Privacy Policy
        privacyPolicyTitle: "سياسة الخصوصية – تطبيق مبدعين (Mobdeen)",
        lastUpdated: "آخر تحديث: يونيو 2025",
        privacyIntro:
            'نحن في تطبيق "مبدعين – Mobdeen" نحترم خصوصيتك وملتزمون بحماية بياناتك. توضح هذه الوثيقة كيف نقوم بجمع واستخدام وتخزين وحماية معلومات المستخدمين.',

        section1Title: "1. البيانات التي نجمعها",
        section1Content1: "في الوقت الحالي، نقوم بجمع:",
        section1List1: "• الاسم",
        section1List2: "• البريد الإلكتروني",
        section1Content2: "ولا نقوم بجمع أو طلب أي معلومات حساسة أو خاصة عن الأطفال بشكل مباشر.",
        section1Content3:
            "قد يُدخل المستخدم (المرشد) داخل التطبيق بيانات إضافية مثل أعمار الأطفال أو المهام اليومية، وهذه البيانات:",
        section1SubList1: "• تُخزن فقط في قاعدة البيانات لتفعيل وظائف التطبيق",
        section1SubList2: "• لا يمكن لإدارة التطبيق أو أي من موظفيه أو المشرفين الاطلاع عليها",
        section1SubList3: "• لا تُستخدم لأي غرض تسويقي أو تحليلي خارجي",

        section2Title: "2. استخدام البيانات",
        section2Content: "نستخدم البيانات للأغراض التالية:",
        section2List1: "• إنشاء الحساب وتسجيل الدخول",
        section2List2: "• تخصيص تجربة المستخدم داخل التطبيق",
        section2List3: "• إرسال إشعارات تنبيهية (إن تم تفعيلها)",
        section2List4: "• تقديم الدعم الفني في حال الحاجة",

        section3Title: "3. حماية البيانات",
        section3Content1: "نتبع أفضل الممارسات لتأمين بياناتك، بما في ذلك:",
        section3List1: "• التشفير عند التخزين والنقل",
        section3List2: "• عدم تخزين كلمات المرور كنص واضح",
        section3List3: "• تقييد الوصول إلى البيانات الحساسة بالكامل",
        section3Important:
            'نؤكد أن بيانات الأنشطة، المهام، أعمار الأطفال، أو أي معلومات يتم إدخالها داخل التطبيق لا يمكن لأي موظف، أو مشرف، أو حتى مؤسس تطبيق "مبدعين" نفسه الاطلاع عليها أو الوصول إليها.',
        section3Content2:
            "يتم تخزين هذه البيانات حصريًا في قاعدة البيانات لعرضها داخل حساب المستخدم فقط، ولا تُستخدم خارج هذا الإطار تحت أي ظرف.",

        section4Title: "4. حدود المسؤولية",
        section4List1: "• يتحمل المستخدم وحده المسؤولية عن دقة وصحة البيانات التي يدخلها",
        section4List2:
            "• يُمنع إدخال معلومات حساسة (مثل العناوين، الصور الشخصية للأطفال، أو الأرقام التعريفية) داخل الأنشطة ما لم تكن ضرورية تربويًا وتحت إشراف المستخدم",
        section4List3: "• التطبيق يُستخدم فقط كمساعد تربوي، ولا يُعتبر أداة تقييم نفسي أو سلوكي رسمية",

        section5Title: "5. استخدام الأطفال",
        section5List1:
            '• تطبيق "مبدعين" لا يُوجّه للاستخدام المباشر من الأطفال، ويُشترط أن يكون كل حساب بإشراف بالغ راشد (المرشد)',
        section5List2: "• لا يُسمح بإنشاء حسابات من قبل أطفال دون إشراف مباشر",
        section5List3: "• في حال اكتشفنا استخدامًا مباشرًا من قبل طفل دون إشراف، يحق لنا إلغاء الحساب فورًا دون إشعار",

        section6Title: "6. خدمات الطرف الثالث",
        section6Content1: "قد نستعين في بعض الميزات الحالية أو المستقبلية بخدمات خارجية موثوقة مثل:",
        section6List1: "• Firebase Cloud Messaging (لإرسال الإشعارات)",
        section6List2: "• Stripe (لإتمام عمليات الدفع)",
        section6List3: "• Google Analytics (لتحليل الاستخدام المجمع – بدون بيانات شخصية)",
        section6List4: "• OpenAI أو خدمات الذكاء الاصطناعي (لتحليل البيانات أو الردود داخل التطبيق)",
        section6Content2:
            "تتم جميع عمليات المعالجة عبر هذه الخدمات ضمن ضوابط مشددة، ولا يُشارك أي محتوى شخصي مع هذه الجهات إلا بشكل غير مباشر لغرض تنفيذ الوظائف المطلوبة فقط.",
        section6Content3:
            "تلتزم هذه الجهات بسياساتها الخاصة للخصوصية، والمستخدم يوافق ضمنيًا على استخدام هذه الخدمات عند استخدام التطبيق.",

        section7Title: "7. البيانات المجمعة (غير الشخصية)",
        section7Content1:
            "نحتفظ بحق تحليل البيانات المجردة غير المرتبطة بهوية المستخدم (مثل عدد المهام المنفذة أو نوع الأنشطة الأكثر استخدامًا) لأغراض:",
        section7List1: "• تحسين تجربة التطبيق",
        section7List2: "• تطوير ميزات ذكاء اصطناعي تربوي مستقبلية",
        section7Content2: "ولا تُستخدم هذه البيانات لتحديد أي مستخدم بعينه.",

        section8Title: "8. حقوق المستخدم",
        section8List1: "• يحق للمستخدم تعديل بياناته أو حذف حسابه بالكامل في أي وقت",
        section8List2: "• يمكنه طلب نسخة من بياناته المسجلة أو حذفها نهائيًا عبر التواصل مع فريق الدعم",

        section9Title: "9. التعديلات على السياسة",
        section9Content:
            "نحتفظ بالحق في تعديل هذه السياسة في أي وقت، ويتم إشعار المستخدمين بأي تغيير جوهري عبر البريد أو داخل التطبيق.",

        section10Title: "10. التواصل معنا",
        section10Content: "لأي استفسار بخصوص سياسة الخصوصية، يرجى التواصل معنا عبر:",
        contactEmail: "📧 البريد الإلكتروني: info@mobdeen.com",
        contactWhatsApp: "💬 واتساب الدعم:",
        contactThankYou: 'شكراً لاختيارك "مبدعين". نحن نؤمن أن الخصوصية تبدأ من الثقة.',

        // Footer
        footerDescription: "تطبيق إدارة العائلة الذكي لتربية أفضل",

        // Subscriptions
        manageSubscriptions: "إدارة الاشتراكات",
        loadingSubscriptions: "جاري تحميل الاشتراكات...",
        profile: "الملف الشخصي",
        logout: "تسجيل الخروج",
        noActiveSubscription: "لا يوجد اشتراك نشط",
        viewSubscriptionPlan: "عرض خطط الاشتراك",
        currentPlan: "الخطة الحالية",
        upgradePlan: "ترقية الخطة",
        availableSubscriptionPlans: "خطط الاشتراك المتاحة",
        noSubscriptionAvailable: "لا توجد خطط اشتراك متاحة",
        yourCurrentPlan: "خطتك الحالية",
        upgradeNow: "قم بالترقية الآن",
        subscribeNow: "اشترك الآن",
        processing: "جاري المعالجة...",
        failedToLoadSubscriptionData: "فشل تحميل بيانات الاشتراك",
        failedToCreateSubscription: "فشل إنشاء الاشتراك",
        failedToCancel: "فشل إلغاء الاشتراك",
        areYouSureCancel: "هل أنت متأكد من أنك تريد إلغاء اشتراكك؟",
        cancelWarning: "ستفقد الوصول إلى جميع الميزات المميزة على الفور.",
        keepSubscription: "الاحتفاظ بالاشتراك",
        confirmCancel: "نعم، إلغاء",
        cancelling: "جاري الإلغاء...",
        cancelSubscriptionTitle: "إلغاء الاشتراك؟",
        subscriptionCancelledSuccessfully: "تم إلغاء الاشتراك بنجاح",
        trialPeriod: "الفترة التجريبية",
        paid: "مدفوع",
        expiryDate: "تاريخ الانتهاء",
        daysRemaining: "يوم متبقي",
        days: "يوم",
        notSpecified: "غير محدد",
        activeFeatures: "الميزات النشطة",
        upgrade: "ترقية",
        cancelSubscription: "إلغاء الاشتراك",
        features: "الميزات",
        discount: "خصم",
        new: "جديد",
        month: "شهر",
        year: "سنة",

        // Features translations
        attachments: "المرفقات",
        proofs: "الإثباتات",
        daily_recap: "الملخص اليومي",
        lock_chores: "قفل المهام",
        late_penalty: "غرامة التأخير",
        chat_upload_media: "رفع الوسائط في المحادثة",
        weekly_values: "القيم الأسبوعية",
        ai_chat: "محادثة الذكاء الاصطناعي",
        dailyRecap: "الملخص اليومي",
        lockChores: "قفل المهام",
        latePenalty: "غرامة التأخير",
        chatUploadMedia: "رفع الوسائط في المحادثة",
        weeklyValues: "القيم الأسبوعية",
        aiChat: "محادثة الذكاء الاصطناعي",

        // Additional translations
        premiumPlan: "الخطة المميزة",
        remaining: "المتبقي",
        upgradeFromTrial: "الترقية من الفترة التجريبية",
        passwordRecovery: "استعادة كلمة المرور",
        verificationCodeSent: "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
        sending: "جاري الإرسال...",
        sendVerificationCode: "إرسال رمز التحقق",
        backToLogin: "العودة لتسجيل الدخول",
        enterVerificationCode: "أدخل رمز التحقق",
        verificationCodeSentTo: "لقد أرسلنا رمز التحقق إلى",
        verificationCode: "رمز التحقق",
        enterCode: "أدخل الرمز",
        verifying: "جاري التحقق...",
        verify: "تحقق",
        resendCode: "إعادة إرسال الرمز",
        resetPassword: "إعادة تعيين كلمة المرور",
        passwordChangedSuccessfully: "تم تغيير كلمة المرور بنجاح!",
        newPassword: "كلمة المرور الجديدة",
        confirmPassword: "تأكيد كلمة المرور",
        enterNewPassword: "أدخل كلمة المرور الجديدة",
        reenterPassword: "أعد إدخال كلمة المرور",
        updating: "جاري التحديث...",
        updatePassword: "تحديث كلمة المرور",
        passwordsDoNotMatch: "كلمات المرور غير متطابقة",
        passwordTooShort: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
        passwordResetFailed: "فشل إعادة تعيين كلمة المرور",
        invalidCode: "رمز التحقق غير صحيح",
        failedToSend: "فشل إرسال رمز التحقق",
        redirecting: "جاري إعادة التوجيه...",
        paymentSuccessful: "تمت عملية الدفع بنجاح",
        subscriptionActivated: "تم تفعيل اشتراكك بنجاح!",
        goToProfile: "الذهاب إلى الملف الشخصي",
        paymentFailed: "فشلت عملية الدفع",
        paymentNotProcessed: "لم نتمكن من معالجة دفعتك. يرجى المحاولة مرة أخرى.",
        tryAgain: "حاول مرة أخرى",
        viewSubscriptions: "عرض الاشتراكات",
        userId: "معرف المستخدم",
        role: "الدور",

        // User roles
        parent: "والد",
        child: "طفل",
        admin: "مدير",

        // Terms and Conditions
        termsTitle: "الشروط والأحكام",
        termsIntro: 'مرحبًا بك في تطبيق "مبدعين – Mobdeen". باستخدامك للتطبيق، فإنك توافق على الشروط التالية:',

        terms1Title: "1. التعريفات",
        terms1App: '• التطبيق: "مبدعين – Mobdeen"، نظام تربوي ذكي لإدارة المهام وتقييم وتطوير الأطفال أو الطلاب.',
        terms1Mentor: "• المرشد: أي شخص مشرف تربوي مثل ولي أمر، معلم، مشرفة، أو مدرب.",
        terms1Creator: "• المبدع: الطفل أو الطالب الذي تتم متابعته داخل التطبيق.",
        terms1Cookies: "• الكوكيز: عملة افتراضية داخل التطبيق تُستخدم كمكافآت للإنجاز.",

        terms2Title: "2. نطاق الاستخدام",
        terms2Content1:
            "• التطبيق موجه للأفراد والمؤسسات التربوية، ويمكن استخدامه في المنازل، المدارس، المراكز، أو أي بيئة تعليمية.",
        terms2Content2: "• يجب أن يكون المستخدم المشرف مسؤولًا فعليًا عن المجموعة المستهدفة (أطفال أو طلاب).",
        terms2Content3: "• يُحظر استخدام التطبيق لأي غرض غير تربوي أو مخالف للأخلاق العامة.",

        terms3Title: "3. البيانات والخصوصية",
        terms3Content1: "• نلتزم بحماية خصوصية بيانات المستخدمين.",
        terms3Content2: "• لا يتم بيع أو مشاركة البيانات مع أي طرف خارجي إلا بموافقة المستخدم أو بأمر قانوني.",
        terms3Content3: "• قد تُستخدم البيانات لتحسين الخدمة وتقديم محتوى مخصص.",

        terms4Title: "4. ميزات الاشتراك",
        terms4FreeTitle: "الخطة المجانية (30 يومًا):",
        terms4FreeContent: "• يمكن لجميع المستخدمين تجربة التطبيق بكامل ميزاته لمدة 30 يومًا مجانًا.",
        terms4PaidTitle: "الخطة المدفوعة:",
        terms4PaidContent1: "• بعد نهاية الشهر المجاني، يتم تفعيل خطة الاشتراك السنوي تلقائيًا برسوم:",
        terms4PaidContent2: "  365 درهم إماراتي للسنة (1 درهم في اليوم).",
        terms4Feature1: "• ملخص يومي للتقدم",
        terms4Feature2: "• قفل تلقائي للمهام",
        terms4Feature3: "• تطبيق العقوبات التربوية تلقائيًا",
        terms4Feature4: "• إرسال القيم التربوية الأسبوعية",
        terms4Feature5: "• تفعيل الدردشة داخل التطبيق",
        terms4Feature6: "• رفع الصور، الصوت، الفيديو داخل المهام",
        terms4Feature7: "• إرفاق ملفات ومستندات",
        terms4Feature8: "• تقارير ومؤشرات سلوكية تفصيلية",
        terms4Feature9: "• دعم فني مباشر عبر واتساب",

        terms5Title: "5. الدفع والإلغاء",
        terms5Content1: "• يتم الدفع لمرة واحدة عن كل سنة اشتراك.",
        terms5Content2: "• لا تُسترد قيمة الاشتراك بعد التفعيل إلا في حال وجود خطأ تقني يثبت من قبل الدعم الفني.",
        terms5Content3: "• يمكن إلغاء الاشتراك في أي وقت، مع استمرار الوصول حتى نهاية الفترة المدفوعة.",

        terms6Title: "6. الملكية الفكرية",
        terms6Content1: '• جميع الحقوق الفكرية محفوظة لتطبيق "مبدعين".',
        terms6Content2: "• يُمنع نسخ أو إعادة استخدام المحتوى أو الواجهة أو البرمجة أو نظام الكوكيز بدون تصريح رسمي.",

        terms7Title: "7. إخلاء المسؤولية",
        terms7Content1: "• التطبيق يقدم أدوات تربوية داعمة، وليس بديلاً عن الإشراف البشري المباشر.",
        terms7Content2: "• لا يتحمل التطبيق أي مسؤولية تربوية أو قانونية ناتجة عن سوء الاستخدام من قِبل المستخدمين.",

        terms8Title: "8. التعديلات",
        terms8Content: "• نحتفظ بحق تعديل الشروط أو الأسعار أو الميزات في أي وقت مع إخطار المستخدمين داخل التطبيق.",

        terms9Title: "9. الدعم الفني والتواصل",
        termsContactEmail: "📧 البريد الإلكتروني: info@mobdeen.com",
        termsContactWhatsApp: "💬 واتساب الدعم:",
    },
};
