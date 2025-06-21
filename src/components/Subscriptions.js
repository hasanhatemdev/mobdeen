import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { subscriptionService } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";

function Subscriptions() {
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState(false);
    const [error, setError] = useState("");
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [activeTab, setActiveTab] = useState("active");
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    useEffect(() => {
        fetchSubscriptionData();
        fetchCurrentSubscription();
    }, []);

    const fetchSubscriptionData = async () => {
        try {
            const response = await subscriptionService.getPlans();
            // Use the plans data array instead of subscription
            if (response.plans && response.plans.data && response.plans.data.length > 0) {
                // For now, we'll use the first plan (Premium plan)
                setSubscriptionData(response.plans.data[0]);
            }
        } catch (err) {
            setError(t("failedToLoadSubscriptionData"));
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
            setError(err.response?.data?.message || err.message || t("failedToCreateSubscription"));
            setSubscribing(false);
        }
    };

    const handleCancelSubscription = async () => {
        if (!window.confirm(t("areYouSureCancel"))) {
            return;
        }

        try {
            await subscriptionService.cancelSubscription();
            setCurrentSubscription(null);
            alert(t("subscriptionCancelledSuccessfully"));
            fetchCurrentSubscription();
        } catch (err) {
            setError(t("failedToCancel"));
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const translateFeature = (feature) => {
        return t(feature) || feature.replace(/_/g, " ");
    };

    const getBillingInterval = (interval) => {
        return t(interval) || interval;
    };

    const renderActiveSubscription = () => {
        if (!currentSubscription) {
            return (
                <div className='no-subscription'>
                    <p>{t("noActiveSubscription")}</p>
                    <button onClick={() => setActiveTab("upgrade")} className='nav-btn'>
                        {t("viewSubscriptionPlan")}
                    </button>
                </div>
            );
        }

        const expiryDate = currentSubscription.trial_days_remaining
            ? `${language === "ar" ? "متبقي" : ""} ${currentSubscription.trial_days_remaining} ${t("daysRemaining")} ${
                  language === "en" ? "" : ""
              }`
            : currentSubscription.expires_at
            ? new Date(currentSubscription.expires_at).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US")
            : t("notSpecified");

        return (
            <div className='active-subscription-card'>
                <div className='subscription-header'>
                    <h3>{currentSubscription.is_trial_period ? t("trialPeriod") : t("currentPlan")}</h3>
                    {currentSubscription.is_paid_plan && <span className='paid-badge'>{t("paid")}</span>}
                </div>

                <div className='subscription-details'>
                    <p className='expiry-info'>
                        <strong>{t("expiryDate")}:</strong> {expiryDate}
                    </p>
                </div>

                <div className='features'>
                    <h4>{t("activeFeatures")}:</h4>
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
                        {t("upgrade")}
                    </button>
                    {currentSubscription.is_paid_plan && (
                        <button onClick={handleCancelSubscription} className='cancel-btn'>
                            {t("cancelSubscription")}
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
                    <p>{t("noSubscriptionAvailable")}</p>
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
                    {!isUpgrade && <div className='current-plan-badge'>{t("yourCurrentPlan")}</div>}
                    <h3>{subscriptionData.name}</h3>
                    <p className='description'>{subscriptionData.description}</p>

                    <div className='price-section'>
                        {subscriptionData.discount_percent > 0 ? (
                            <>
                                <span className='original-price'>${subscriptionData.price}</span>
                                <span className='discounted-price'>
                                    ${subscriptionData.discounted_price || subscriptionData.price}
                                </span>
                                <span className='discount-badge'>
                                    {t("discount")} {subscriptionData.discount_percent}%
                                </span>
                            </>
                        ) : (
                            <span className='price'>${subscriptionData.price}</span>
                        )}
                        <span className='billing-cycle'>/{getBillingInterval(subscriptionData.billing_interval)}</span>
                    </div>

                    <div className='features'>
                        <h4>{t("features")}:</h4>
                        <ul>
                            {subscriptionData.features.map((feature, index) => {
                                const isNewFeature = !currentPlanFeatures.includes(feature);
                                return (
                                    <li key={index} className={isNewFeature ? "new-feature" : ""}>
                                        <img src='/images/icons/check.svg' alt='check' />
                                        {translateFeature(feature)}
                                        {isNewFeature && <span className='new-badge'>{t("new")}</span>}
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
                            ? t("yourCurrentPlan")
                            : subscriptionData.has_subscription
                            ? t("youHaveThisSubscription")
                            : subscribing
                            ? t("processing")
                            : t("upgradeNow")}
                    </button>
                </div>
            </div>
        );
    };

    if (loading) return <div className='loading'>{t("loadingSubscriptions")}</div>;

    return (
        <div className='subscriptions-container'>
            <div className='header'>
                <h2>{t("manageSubscriptions")}</h2>
                <div className='nav-buttons'>
                    <button onClick={() => navigate("/profile")} className='nav-btn'>
                        {t("profile")}
                    </button>
                    <button onClick={handleLogout} className='logout-btn'>
                        {t("logout")}
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
                            {t("currentPlan")}
                        </button>
                        <button
                            className={`tab-button ${activeTab === "upgrade" ? "active" : ""}`}
                            onClick={() => setActiveTab("upgrade")}
                        >
                            {t("upgradePlan")}
                        </button>
                    </div>

                    <div className='tab-content'>
                        {activeTab === "active" ? renderActiveSubscription() : renderUpgradePlans()}
                    </div>
                </>
            ) : (
                // Show subscription card if no active subscription
                <>
                    <h3 className='center-text' style={{ marginBottom: "30px" }}>
                        {t("availableSubscriptionPlans")}
                    </h3>
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
                                        <span className='discount-badge'>
                                            {t("discount")} {subscriptionData.discount_percent}%
                                        </span>
                                    </>
                                ) : (
                                    <span className='price'>${subscriptionData.price}</span>
                                )}
                                <span className='billing-cycle'>
                                    /{getBillingInterval(subscriptionData.billing_interval)}
                                </span>
                            </div>

                            <div className='features'>
                                <h4>{t("features")}:</h4>
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
                                    ? t("youHaveActiveSubscription")
                                    : subscribing
                                    ? t("processing")
                                    : t("subscribeNow")}
                            </button>
                        </div>
                    ) : (
                        <div className='no-subscription'>
                            <p>{t("noSubscriptionAvailable")}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Subscriptions;
