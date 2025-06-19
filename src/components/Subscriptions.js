// src/components/Subscriptions.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { subscriptionService } from "../services/api";

function Subscriptions() {
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState(false);
    const [error, setError] = useState("");
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [activeTab, setActiveTab] = useState("active");
    const navigate = useNavigate();

    useEffect(() => {
        fetchSubscriptionData();
        fetchCurrentSubscription();
    }, []);

    const fetchSubscriptionData = async () => {
        try {
            const response = await subscriptionService.getPlans();
            // Only use the subscription data
            if (response.subscription) {
                setSubscriptionData(response.subscription);
            }
        } catch (err) {
            setError("فشل في تحميل بيانات الاشتراك");
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentSubscription = async () => {
        try {
            const response = await subscriptionService.getCurrentSubscriptionFeatures();
            setCurrentSubscription(response);
            // If user has active subscription, default to active tab
            if (response && (response.is_paid_plan || response.is_trial_period)) {
                setActiveTab("active");
            }
        } catch (err) {
            // User might not have a subscription
            console.log("No current subscription");
        }
    };

    const handleSelectPlan = async (planId) => {
        setSubscribing(true);
        setError("");

        try {
            // Create the subscription with the plan ID
            const subscriptionResponse = await subscriptionService.subscribe(planId);

            console.log("Subscription created:", subscriptionResponse);

            // Store subscription info
            localStorage.setItem("subscription_id", subscriptionResponse.subscription_id);
            localStorage.setItem("checkout_status", subscriptionResponse.status);

            // Debug: Check if we have checkout URL
            console.log("Checkout URL:", subscriptionResponse.checkout_url);

            // Redirect to Stripe checkout with custom success/cancel URLs
            if (subscriptionResponse.checkout_url) {
                // Parse the URL and add our custom return URLs
                const checkoutUrl = new URL(subscriptionResponse.checkout_url);

                // Set success URL to redirect to app link first
                checkoutUrl.searchParams.set("success_url", "https://mobdeen.app.link/successful-payment");

                // Set cancel URL to redirect to app link first
                checkoutUrl.searchParams.set("cancel_url", "https://mobdeen.app.link/failed-payment");

                // Add a small delay to ensure state is saved
                setTimeout(() => {
                    console.log("Redirecting to:", checkoutUrl.toString());
                    window.location.href = checkoutUrl.toString();
                }, 100);

                // Prevent any further code execution
                return;
            } else {
                throw new Error("لم يتم الحصول على رابط الدفع");
            }
        } catch (err) {
            console.error("Subscription error:", err);
            setError(err.response?.data?.message || err.message || "فشل في إنشاء الاشتراك. يرجى المحاولة مرة أخرى.");
            setSubscribing(false);
        }
    };

    const handleCancelSubscription = async () => {
        if (!window.confirm("هل أنت متأكد من أنك تريد إلغاء اشتراكك؟")) {
            return;
        }

        try {
            await subscriptionService.cancelSubscription();
            setCurrentSubscription(null);
            alert("تم إلغاء الاشتراك بنجاح");
            fetchCurrentSubscription();
        } catch (err) {
            setError("فشل في إلغاء الاشتراك");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // Arabic translations for features
    const featureTranslations = {
        attachments: "المرفقات",
        proofs: "الإثباتات",
        daily_recap: "الملخص اليومي",
        lock_chores: "قفل المهام",
        late_penalty: "غرامة التأخير",
        chat_upload_media: "رفع الوسائط في المحادثة",
        weekly_values: "القيم الأسبوعية",
        ai_chat: "محادثة الذكاء الاصطناعي",
    };

    const translateFeature = (feature) => {
        return featureTranslations[feature] || feature.replace(/_/g, " ");
    };

    const getBillingInterval = (interval) => {
        const intervals = {
            month: "شهر",
            year: "سنة",
            week: "أسبوع",
            day: "يوم",
        };
        return intervals[interval] || interval;
    };

    const renderActiveSubscription = () => {
        if (!currentSubscription) {
            return (
                <div className='no-subscription'>
                    <p>لا يوجد لديك اشتراك نشط حالياً</p>
                    <button onClick={() => setActiveTab("upgrade")} className='nav-btn'>
                        عرض خطة الاشتراك
                    </button>
                </div>
            );
        }

        const expiryDate = currentSubscription.trial_days_remaining
            ? `متبقي ${currentSubscription.trial_days_remaining} يوم من الفترة التجريبية`
            : currentSubscription.expires_at
            ? new Date(currentSubscription.expires_at).toLocaleDateString("ar-SA")
            : "غير محدد";

        return (
            <div className='active-subscription-card'>
                <div className='subscription-header'>
                    <h3>{currentSubscription.is_trial_period ? "الفترة التجريبية" : "الباقة الحالية"}</h3>
                    {currentSubscription.is_paid_plan && <span className='paid-badge'>مدفوع</span>}
                </div>

                <div className='subscription-details'>
                    <p className='expiry-info'>
                        <strong>تاريخ الانتهاء:</strong> {expiryDate}
                    </p>
                </div>

                <div className='features'>
                    <h4>المميزات النشطة:</h4>
                    <ul>
                        {currentSubscription.features.map((feature, index) => (
                            <li key={index}>
                                <img src='/images/icons/check.svg' alt='check' />
                                {translateFeature(feature)}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='subscription-actions'>
                    <button onClick={() => setActiveTab("upgrade")} className='upgrade-btn'>
                        ترقية الباقة
                    </button>
                    {currentSubscription.is_paid_plan && (
                        <button onClick={handleCancelSubscription} className='cancel-btn'>
                            إلغاء الاشتراك
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const renderUpgradePlans = () => {
        if (!subscriptionData) {
            return (
                <div className='no-subscription'>
                    <p>لا توجد خطة اشتراك متاحة حالياً</p>
                </div>
            );
        }

        const currentPlanFeatures = currentSubscription?.features || [];

        // Check if the subscription data offers more features than current
        const isUpgrade =
            subscriptionData.features.length > currentPlanFeatures.length ||
            subscriptionData.features.some((f) => !currentPlanFeatures.includes(f));

        return (
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <div className={`plan-card ${!isUpgrade ? "current-plan" : ""}`}>
                    {!isUpgrade && <div className='current-plan-badge'>خطتك الحالية</div>}
                    <h3>{subscriptionData.name}</h3>
                    <p className='description'>{subscriptionData.description}</p>

                    <div className='price-section'>
                        {subscriptionData.discount_percent > 0 ? (
                            <>
                                <span className='original-price'>${subscriptionData.price}</span>
                                <span className='discounted-price'>
                                    ${subscriptionData.discounted_price || subscriptionData.price}
                                </span>
                                <span className='discount-badge'>خصم {subscriptionData.discount_percent}%</span>
                            </>
                        ) : (
                            <span className='price'>${subscriptionData.price}</span>
                        )}
                        <span className='billing-cycle'>/{getBillingInterval(subscriptionData.billing_interval)}</span>
                    </div>

                    <div className='features'>
                        <h4>المميزات:</h4>
                        <ul>
                            {subscriptionData.features.map((feature, index) => {
                                const isNewFeature = !currentPlanFeatures.includes(feature);
                                return (
                                    <li key={index} className={isNewFeature ? "new-feature" : ""}>
                                        <img src='/images/icons/check.svg' alt='check' />
                                        {translateFeature(feature)}
                                        {isNewFeature && <span className='new-badge'>جديد</span>}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <button
                        className='select-plan-btn'
                        onClick={() => handleSelectPlan(subscriptionData.plan_id)}
                        disabled={subscribing || !isUpgrade || subscriptionData.has_subscription}
                    >
                        {!isUpgrade
                            ? "خطتك الحالية"
                            : subscriptionData.has_subscription
                            ? "لديك هذا الاشتراك"
                            : subscribing
                            ? "جاري المعالجة..."
                            : "ترقية الآن"}
                    </button>
                </div>
            </div>
        );
    };

    if (loading) return <div className='loading'>جاري تحميل بيانات الاشتراك...</div>;

    return (
        <div className='subscriptions-container'>
            <div className='header'>
                <h2>إدارة الاشتراكات</h2>
                <div className='nav-buttons'>
                    <button onClick={() => navigate("/profile")} className='nav-btn'>
                        الملف الشخصي
                    </button>
                    <button onClick={handleLogout} className='logout-btn'>
                        تسجيل الخروج
                    </button>
                </div>
            </div>

            {error && <div className='error-message'>{error}</div>}

            {/* Show tabs only if user has a subscription from features endpoint */}
            {currentSubscription && (currentSubscription.is_paid_plan || currentSubscription.is_trial_period) ? (
                <>
                    <div className='subscription-tabs'>
                        <button
                            className={`tab-button ${activeTab === "active" ? "active" : ""}`}
                            onClick={() => setActiveTab("active")}
                        >
                            الباقة الحالية
                        </button>
                        <button
                            className={`tab-button ${activeTab === "upgrade" ? "active" : ""}`}
                            onClick={() => setActiveTab("upgrade")}
                        >
                            ترقية الباقة
                        </button>
                    </div>

                    <div className='tab-content'>
                        {activeTab === "active" ? renderActiveSubscription() : renderUpgradePlans()}
                    </div>
                </>
            ) : (
                // Show subscription card if no active subscription
                <>
                    <h3 style={{ textAlign: "center", marginBottom: "30px" }}>خطة الاشتراك المتاحة</h3>
                    {subscriptionData ? (
                        <div className='plan-card' style={{ maxWidth: "500px", margin: "0 auto" }}>
                            <h3>{subscriptionData.name}</h3>
                            <p className='description'>{subscriptionData.description}</p>

                            <div className='price-section'>
                                {subscriptionData.discount_percent > 0 ? (
                                    <>
                                        <span className='original-price'>${subscriptionData.price}</span>
                                        <span className='discounted-price'>
                                            ${subscriptionData.discounted_price || subscriptionData.price}
                                        </span>
                                        <span className='discount-badge'>خصم {subscriptionData.discount_percent}%</span>
                                    </>
                                ) : (
                                    <span className='price'>${subscriptionData.price}</span>
                                )}
                                <span className='billing-cycle'>
                                    /{getBillingInterval(subscriptionData.billing_interval)}
                                </span>
                            </div>

                            <div className='features'>
                                <h4>المميزات:</h4>
                                <ul>
                                    {subscriptionData.features.map((feature, index) => (
                                        <li key={index}>
                                            <img src='/images/icons/check.svg' alt='check' />
                                            {translateFeature(feature)}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                className='select-plan-btn'
                                onClick={() => handleSelectPlan(subscriptionData.plan_id)}
                                disabled={subscribing || subscriptionData.has_subscription}
                            >
                                {subscriptionData.has_subscription
                                    ? "لديك اشتراك نشط"
                                    : subscribing
                                    ? "جاري المعالجة..."
                                    : "اشترك الآن"}
                            </button>
                        </div>
                    ) : (
                        <div className='no-subscription'>
                            <p>لا توجد خطة اشتراك متاحة حالياً</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Subscriptions;
