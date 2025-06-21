import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { subscriptionService } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";

function Subscriptions() {
    const [availablePlans, setAvailablePlans] = useState([]);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [activeTab, setActiveTab] = useState("active");
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { t, language } = useLanguage();

    useEffect(() => {
        loadData();

        // Check for payment status in URL
        const searchParams = new URLSearchParams(location.search);
        const paymentStatus = searchParams.get("payment_status");

        if (paymentStatus === "success") {
            setSuccessMessage(t("paymentSuccessful"));
            // Clear the URL parameter
            window.history.replaceState({}, document.title, location.pathname);
        } else if (paymentStatus === "failed") {
            setError(t("paymentFailed"));
            // Clear the URL parameter
            window.history.replaceState({}, document.title, location.pathname);
        }
    }, [location, t]);

    const loadData = async () => {
        setLoading(true);
        setError("");

        try {
            // Load available plans
            const plansResponse = await subscriptionService.getPlans();
            console.log("Plans API Response:", plansResponse);

            if (plansResponse.plans && plansResponse.plans.data) {
                console.log("Setting available plans:", plansResponse.plans.data);
                setAvailablePlans(plansResponse.plans.data);
            }

            // Load current subscription status
            const featuresResponse = await subscriptionService.getCurrentSubscriptionFeatures();
            console.log("Features API Response:", featuresResponse);
            setCurrentSubscription(featuresResponse);

            // If user has a subscription, show active tab
            if (featuresResponse && (featuresResponse.is_paid_plan || featuresResponse.is_trial_period)) {
                setActiveTab("active");
            } else {
                setActiveTab("upgrade");
            }
        } catch (err) {
            console.error("Error loading data:", err);
            setError(t("failedToLoadSubscriptionData"));
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (planId) => {
        setSubscribing(true);
        setError("");

        try {
            const response = await subscriptionService.subscribe(planId);

            // Store subscription info
            localStorage.setItem("subscription_id", response.subscription_id);

            if (response.checkout_url) {
                // Redirect to Stripe checkout
                const checkoutUrl = new URL(response.checkout_url);
                const baseUrl = window.location.origin;
                checkoutUrl.searchParams.set("success_url", `${baseUrl}/payment-success`);
                checkoutUrl.searchParams.set("cancel_url", `${baseUrl}/subscriptions`);

                window.location.href = checkoutUrl.toString();
            }
        } catch (err) {
            console.error("Subscribe error:", err);
            setError(err.response?.data?.message || t("failedToCreateSubscription"));
            setSubscribing(false);
        }
    };

    const handleCancelSubscription = async () => {
        setCancelling(true);
        setError("");

        try {
            await subscriptionService.cancelSubscription();
            setShowCancelModal(false);
            setSuccessMessage(t("subscriptionCancelledSuccessfully"));
            // Reload all data
            await loadData();
        } catch (err) {
            setError(t("failedToCancel"));
        } finally {
            setCancelling(false);
        }
    };

    const translateFeature = (feature) => {
        // Convert snake_case to camelCase for translation key
        const key = feature.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        return t(feature) || t(key) || feature.replace(/_/g, " ");
    };

    const renderActiveSubscription = () => {
        if (!currentSubscription || (!currentSubscription.is_paid_plan && !currentSubscription.is_trial_period)) {
            return (
                <div className='no-subscription'>
                    <p>{t("noActiveSubscription")}</p>
                    <button onClick={() => setActiveTab("upgrade")} className='nav-btn'>
                        {t("viewSubscriptionPlan")}
                    </button>
                </div>
            );
        }

        const subscriptionType = currentSubscription.is_trial_period ? t("trialPeriod") : t("premiumPlan");
        const daysInfo = currentSubscription.trial_days_remaining
            ? language === "ar"
                ? `${currentSubscription.trial_days_remaining} ${t("days")}`
                : `${currentSubscription.trial_days_remaining} ${t("days")}`
            : "";

        return (
            <div className='active-subscription-card'>
                <div className='subscription-header'>
                    <h3>{subscriptionType}</h3>
                    {currentSubscription.is_paid_plan && !currentSubscription.is_trial_period && (
                        <span className='paid-badge'>{t("paid")}</span>
                    )}
                </div>

                <div className='subscription-details'>
                    {daysInfo && (
                        <p className='expiry-info'>
                            <strong>{t("remaining")}:</strong> {daysInfo}
                        </p>
                    )}
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
                    {currentSubscription.is_trial_period ? (
                        <button onClick={() => setActiveTab("upgrade")} className='upgrade-btn'>
                            {t("upgradeFromTrial")}
                        </button>
                    ) : (
                        <>
                            <button onClick={() => setActiveTab("upgrade")} className='upgrade-btn'>
                                {t("upgradePlan")}
                            </button>
                            <button onClick={() => setShowCancelModal(true)} className='cancel-btn'>
                                {t("cancelSubscription")}
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    };

    const renderUpgradePlans = () => {
        console.log("renderUpgradePlans - availablePlans:", availablePlans);
        console.log("availablePlans length:", availablePlans.length);

        if (!availablePlans || availablePlans.length === 0) {
            return (
                <div className='no-subscription'>
                    <p>{t("noSubscriptionAvailable")}</p>
                </div>
            );
        }

        // Check if user already has a paid premium subscription
        const hasPaidPremium =
            currentSubscription && currentSubscription.is_paid_plan && !currentSubscription.is_trial_period;

        return (
            <div className='plans-grid'>
                {availablePlans.map((plan) => (
                    <div key={plan.id} className='plan-card'>
                        <h3>{plan.name}</h3>
                        <p className='description'>{plan.description}</p>

                        <div className='price-section'>
                            {plan.discount_percent > 0 ? (
                                <>
                                    <span className='original-price'>${plan.price}</span>
                                    <span className='discounted-price'>${plan.discounted_price}</span>
                                    <span className='discount-badge'>
                                        {t("discount")} {plan.discount_percent}%
                                    </span>
                                </>
                            ) : (
                                <span className='price'>${plan.price}</span>
                            )}
                            <span className='billing-cycle'>/{t(plan.billing_interval)}</span>
                        </div>

                        <div className='features'>
                            <h4>{t("features")}:</h4>
                            <ul>
                                {plan.features.map((feature, index) => (
                                    <li key={index}>
                                        <img src='/images/icons/check.svg' alt='check' />
                                        {translateFeature(feature)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            className='select-plan-btn'
                            onClick={() => handleSubscribe(plan.id)}
                            disabled={subscribing || hasPaidPremium}
                        >
                            {hasPaidPremium
                                ? t("yourCurrentPlan")
                                : subscribing
                                ? t("processing")
                                : currentSubscription?.is_trial_period
                                ? t("upgradeFromTrial")
                                : t("subscribeNow")}
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return <div className='loading'>{t("loadingSubscriptions")}</div>;
    }

    const hasSubscription =
        currentSubscription && (currentSubscription.is_paid_plan || currentSubscription.is_trial_period);

    return (
        <div className='subscriptions-container'>
            <div className='header'>
                <h2>{t("manageSubscriptions")}</h2>
                <div className='nav-buttons'>
                    <button onClick={() => navigate("/profile")} className='nav-btn'>
                        {t("profile")}
                    </button>
                    <button onClick={() => navigate("/login")} className='logout-btn'>
                        {t("logout")}
                    </button>
                </div>
            </div>

            {error && <div className='error-message'>{error}</div>}
            {successMessage && <div className='success-message'>{successMessage}</div>}

            {hasSubscription ? (
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
                <>
                    <h3 className='center-text' style={{ marginBottom: "30px" }}>
                        {t("availableSubscriptionPlans")}
                    </h3>
                    {renderUpgradePlans()}
                </>
            )}

            {/* Cancellation Modal */}
            {showCancelModal && (
                <div className='modal-overlay' onClick={() => setShowCancelModal(false)}>
                    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                        <div className='modal-header'>
                            <h3>{t("cancelSubscriptionTitle")}</h3>
                            <button className='modal-close' onClick={() => setShowCancelModal(false)}>
                                ×
                            </button>
                        </div>
                        <div className='modal-body'>
                            <p>{t("areYouSureCancel")}</p>
                            <p className='modal-warning'>{t("cancelWarning")}</p>
                        </div>
                        <div className='modal-footer'>
                            <button
                                className='modal-btn modal-btn-secondary'
                                onClick={() => setShowCancelModal(false)}
                                disabled={cancelling}
                            >
                                {t("keepSubscription")}
                            </button>
                            <button
                                className='modal-btn modal-btn-danger'
                                onClick={handleCancelSubscription}
                                disabled={cancelling}
                            >
                                {cancelling ? t("cancelling") : t("confirmCancel")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Subscriptions;
