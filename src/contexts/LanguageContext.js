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
        privacyPolicyTitle: 'Privacy Policy for "Mobdeen" App',
        lastUpdated: "Last updated: 09-05-2025",
        privacyIntro:
            "Welcome to Mobdeen – a smart family management app that helps parents assign tasks, track progress, and reward their children. We take your privacy and your family's privacy seriously and are committed to protecting your data with transparency and care.",

        section1Title: "1. Information We Collect:",
        accountInfo: "– Account Information: Name, email, date of birth, relationship, and profile photo.",
        childInfo: "– Child Information (Creators): Name, gender, age, photo, and assigned activities.",
        activityData:
            "– Activity Data: Tasks, rewards, evaluations, behavior records, achievements, savings/spending (cookies).",
        deviceData: "– Device Data: Device type, language, and operating system for support and security.",
        paymentData: "– Payment Data: Managed via third-party providers like Stripe – we do not store card details.",

        section2Title: "2. How We Use the Data:",
        useData1: "– Assign and customize tasks and rewards for children.",
        useData2: "– Monitor family progress and behavior patterns.",
        useData3: "– Provide smart recommendations using AI based on each child's profile.",
        useData4: "– Send reminders and motivational notifications.",
        useData5: "– Improve app performance through usage analytics.",

        section3Title: "3. AI-Based Educational Assistant:",
        section3Content:
            "We use AI technologies like ChatGPT to provide personalized parenting advice based on user behavior. This data is not shared externally.",

        section4Title: "4. Data Sharing:",
        section4Content: "We do not sell or commercially share your data. Limited sharing occurs only with:",
        section4Item1: "– Service providers (payment, hosting, analytics).",
        section4Item2: "– Government or legal entities upon official request.",

        section5Title: "5. Data Protection:",
        protection1: "– Encrypted data storage.",
        protection2: "– Secured servers (e.g., Digital Ocean).",
        protection3: "– Automated backups.",
        protection4: "– Role-based access control for sensitive data.",

        section6Title: "6. Your Rights:",
        rights1: "– Edit or delete your family and child profiles.",
        rights2: "– Export your data upon request.",
        rights3: "– Control notifications and privacy settings.",

        section7Title: "7. Cookies:",
        section7Content: "We use cookies for in-app performance improvement only – not for advertising or tracking.",

        section8Title: "8. Subscription Plans:",
        section8Content:
            "We offer free and premium plans. Premium features include smart reports and parenting consultations. All payments are processed securely.",

        section9Title: "9. Account Deletion:",
        section9Content: "You may delete your account via settings. All associated data will be erased within 30 days.",

        section10Title: "10. Contact Us:",
        contactEmail: "– Email: support@mobdeen.com",
        contactPhone: "– Phone: +971-528-978888",

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

        // Login
        enterEmail: "أدخل بريدك الإلكتروني",
        enterPassword: "أدخل كلمة المرور",
        forgotPassword: "نسيت كلمة المرور؟",
        loggingIn: "جاري تسجيل الدخول...",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        loginFailed: "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.",

        // Privacy Policy
        privacyPolicyTitle: 'سياسة الخصوصية لتطبيق "مبدعين"',
        lastUpdated: "آخر تحديث: 09-05-2025",
        privacyIntro:
            "مرحبًا بكم في مبدعين – تطبيق إدارة العائلة الذكي الذي يساعد الوالدين على تعيين المهام وتتبع التقدم ومكافأة أطفالهم. نحن نأخذ خصوصيتك وخصوصية عائلتك على محمل الجد ونلتزم بحماية بياناتك بشفافية وعناية.",

        section1Title: "1. المعلومات التي نجمعها:",
        accountInfo: "– معلومات الحساب: الاسم، البريد الإلكتروني، تاريخ الميلاد، العلاقة، وصورة الملف الشخصي.",
        childInfo: "– معلومات الطفل (المنشئون): الاسم، الجنس، العمر، الصورة، والأنشطة المخصصة.",
        activityData:
            "– بيانات النشاط: المهام، المكافآت، التقييمات، سجلات السلوك، الإنجازات، المدخرات/الإنفاق (الكوكيز).",
        deviceData: "– بيانات الجهاز: نوع الجهاز، اللغة، ونظام التشغيل للدعم والأمان.",
        paymentData: "– بيانات الدفع: تُدار عبر مقدمي خدمات خارجيين مثل Stripe – لا نخزن تفاصيل البطاقة.",

        section2Title: "2. كيف نستخدم البيانات:",
        useData1: "– تعيين وتخصيص المهام والمكافآت للأطفال.",
        useData2: "– مراقبة تقدم العائلة وأنماط السلوك.",
        useData3: "– تقديم توصيات ذكية باستخدام الذكاء الاصطناعي بناءً على ملف كل طفل.",
        useData4: "– إرسال التذكيرات والإشعارات التحفيزية.",
        useData5: "– تحسين أداء التطبيق من خلال تحليلات الاستخدام.",

        section3Title: "3. المساعد التعليمي القائم على الذكاء الاصطناعي:",
        section3Content:
            "نستخدم تقنيات الذكاء الاصطناعي مثل ChatGPT لتقديم نصائح تربوية مخصصة بناءً على سلوك المستخدم. لا تتم مشاركة هذه البيانات خارجيًا.",

        section4Title: "4. مشاركة البيانات:",
        section4Content: "نحن لا نبيع أو نشارك بياناتك تجاريًا. تحدث المشاركة المحدودة فقط مع:",
        section4Item1: "– مقدمي الخدمات (الدفع، الاستضافة، التحليلات).",
        section4Item2: "– الجهات الحكومية أو القانونية بناءً على طلب رسمي.",

        section5Title: "5. حماية البيانات:",
        protection1: "– تخزين البيانات المشفرة.",
        protection2: "– خوادم مؤمنة (مثل Digital Ocean).",
        protection3: "– نسخ احتياطية تلقائية.",
        protection4: "– التحكم في الوصول القائم على الأدوار للبيانات الحساسة.",

        section6Title: "6. حقوقك:",
        rights1: "– تعديل أو حذف ملفات تعريف العائلة والطفل.",
        rights2: "– تصدير بياناتك عند الطلب.",
        rights3: "– التحكم في الإشعارات وإعدادات الخصوصية.",

        section7Title: "7. ملفات تعريف الارتباط:",
        section7Content: "نستخدم ملفات تعريف الارتباط لتحسين الأداء داخل التطبيق فقط – وليس للإعلان أو التتبع.",

        section8Title: "8. خطط الاشتراك:",
        section8Content:
            "نقدم خططًا مجانية ومميزة. تتضمن الميزات المميزة تقارير ذكية واستشارات تربوية. تتم معالجة جميع المدفوعات بشكل آمن.",

        section9Title: "9. حذف الحساب:",
        section9Content: "يمكنك حذف حسابك عبر الإعدادات. سيتم محو جميع البيانات المرتبطة خلال 30 يومًا.",

        section10Title: "10. اتصل بنا:",
        contactEmail: "– البريد الإلكتروني: support@mobdeen.com",
        contactPhone: "– الهاتف: +971-528-978888",

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
    },
};
