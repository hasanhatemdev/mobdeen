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
    const [language, setLanguage] = useState("en");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "ar" : "en"));
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            <div dir={language === "ar" ? "rtl" : "ltr"}>{children}</div>
        </LanguageContext.Provider>
    );
};

// Translations
const translations = {
    en: {
        // Header
        privacyPolicy: "Privacy Policy",
        login: "Login",

        // Home Page
        homeTitle: "Mobdeen",
        homeDescription:
            'Mobdeen is an entertainment app designed for families, offering an interactive experience where parents can assign fun tasks, track progress, and reward their children with virtual "cookies." By turning daily routines into engaging challenges, Mobdeen strengthens family bonds while making learning and responsibility enjoyable for kids.',
        downloadApp: "Download the App",

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
        footerRights: "© 2025 Mobdeen. All rights reserved.",
        footerDescription: "Smart family management app for better parenting",
    },
    ar: {
        // Header
        privacyPolicy: "سياسة الخصوصية",
        login: "تسجيل الدخول",

        // Home Page
        homeTitle: "مُبدين",
        homeDescription:
            'مُبدين هو تطبيق ترفيهي مصمم للعائلات، يوفر تجربة تفاعلية حيث يمكن للوالدين تعيين مهام ممتعة، وتتبع التقدم، ومكافأة أطفالهم بـ "الكوكيز" الافتراضية. من خلال تحويل الروتين اليومي إلى تحديات جذابة، يقوي مُبدين الروابط الأسرية بينما يجعل التعلم والمسؤولية ممتعة للأطفال.',
        downloadApp: "حمل التطبيق",

        // Privacy Policy
        privacyPolicyTitle: 'سياسة الخصوصية لتطبيق "مُبدين"',
        lastUpdated: "آخر تحديث: 09-05-2025",
        privacyIntro:
            "مرحبًا بكم في مُبدين – تطبيق إدارة العائلة الذكي الذي يساعد الوالدين على تعيين المهام وتتبع التقدم ومكافأة أطفالهم. نحن نأخذ خصوصيتك وخصوصية عائلتك على محمل الجد ونلتزم بحماية بياناتك بشفافية وعناية.",

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
        footerRights: "© 2025 مُبدين. جميع الحقوق محفوظة.",
        footerDescription: "تطبيق إدارة العائلة الذكي لتربية أفضل",
    },
};
