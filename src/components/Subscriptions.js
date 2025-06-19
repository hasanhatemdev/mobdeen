// src/components/Subscriptions.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { subscriptionService } from "../services/api";

function Subscriptions() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState(false);
    const [error, setError] = useState("");
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPlans();
        fetchCurrentSubscription();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await subscriptionService.getPlans();
            setPlans(response.plans.data);
        } catch (err) {
            setError("فشل في تحميل خطط الاشتراك");
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentSubscription = async () => {
        try {
            const response = await subscriptionService.getCurrentSubscription();
            setCurrentSubscription(response);
        } catch (err) {
            // User might not have a subscription
            console.log("No current subscription");
        }
    };

    const handleSelectPlan = async (plan) => {
        setSubscribing(true);
        setError("");

        try {
            // First, create the subscription
            const subscriptionResponse = await subscriptionService.subscribe(plan.id);

            console.log("Subscription created:", subscriptionResponse);

            // Store selected plan and subscription info
            localStorage.setItem("selected_plan", JSON.stringify(plan));
            localStorage.setItem("subscription_id", subscriptionResponse.subscription_id);
            localStorage.setItem("checkout_status", subscriptionResponse.status);

            // Debug: Check if we have checkout URL
            console.log("Checkout URL:", subscriptionResponse.checkout_url);

            // Redirect to Stripe checkout
            if (subscriptionResponse.checkout_url) {
                // Add a small delay to ensure state is saved
                setTimeout(() => {
                    console.log("Redirecting to:", subscriptionResponse.checkout_url);
                    window.location.href = subscriptionResponse.checkout_url;
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

    if (loading) return <div className='loading'>جاري تحميل الخطط...</div>;
    return (
        <div className='subscriptions-container'>
            <div className='header'>
                <h2>اختر خطة الاشتراك الخاصة بك</h2>
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

            {currentSubscription && (
                <div className='current-subscription'>
                    <h3>الاشتراك الحالي</h3>
                    <p>لديك اشتراك نشط</p>
                    <button onClick={handleCancelSubscription} className='cancel-btn'>
                        إلغاء الاشتراك
                    </button>
                </div>
            )}

            <div className='plans-grid'>
                {plans.map((plan) => (
                    <div key={plan.id} className='plan-card'>
                        <h3>{plan.name}</h3>
                        <p className='description'>{plan.description}</p>

                        <div className='price-section'>
                            {plan.discount_percent > 0 ? (
                                <>
                                    <span className='original-price'>${plan.price}</span>
                                    <span className='discounted-price'>${plan.discounted_price || plan.price}</span>
                                    <span className='discount-badge'>خصم {plan.discount_percent}%</span>
                                </>
                            ) : (
                                <span className='price'>${plan.price}</span>
                            )}
                            <span className='billing-cycle'>/{getBillingInterval(plan.billing_interval)}</span>
                        </div>

                        <div className='features'>
                            <h4>المميزات:</h4>
                            <ul>
                                {plan.features.map((feature, index) => (
                                    <li key={index}>
                                        <img src='/images/icons/check.svg' />
                                        {translateFeature(feature)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            className='select-plan-btn'
                            onClick={() => handleSelectPlan(plan)}
                            disabled={subscribing}
                        >
                            {subscribing ? "جاري المعالجة..." : "اشترك الآن"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Subscriptions;
