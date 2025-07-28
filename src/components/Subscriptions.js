import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { subscriptionService } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";

function Subscriptions() {
    const [availablePlans, setAvailablePlans] = useState([]);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [userSubscribedPlan, setUserSubscribedPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [activeTab, setActiveTab] = useState("active");
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const [showSubscribeModal, setShowSubscribeModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [promoCode, setPromoCode] = useState("");
    const [promoValidation, setPromoValidation] = useState(null);
    const [checkingPromo, setCheckingPromo] = useState(false);
    const [promoError, setPromoError] = useState("");
    const [userEmail, setUserEmail] = useState("");
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

    useEffect(() => {
        // Get user email from localStorage
        const email = localStorage.getItem("user_email");
        if (email) {
            setUserEmail(email);
        }
    }, []);

    // Update the loadData function to NOT match plans during trial:
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

            // If user has a paid plan with plan_id, find the matching plan
            if (
                featuresResponse &&
                featuresResponse.is_paid_plan &&
                !featuresResponse.is_trial_period &&
                featuresResponse.plan_id &&
                plansResponse.plans &&
                plansResponse.plans.data
            ) {
                // Find the plan by ID instead of matching features
                const subscribedPlan = plansResponse.plans.data.find((plan) => plan.id === featuresResponse.plan_id);

                if (subscribedPlan) {
                    setUserSubscribedPlan(subscribedPlan);
                }
            }

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
            const response = await subscriptionService.subscribe(
                planId || selectedPlan.id,
                promoValidation?.valid ? promoCode : null
            );

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

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
        setShowSubscribeModal(true);
        setPromoCode("");
        setPromoValidation(null);
        setPromoError("");
    };

    const handleCheckPromoCode = async () => {
        if (!promoCode.trim()) {
            setPromoError(t("enterPromoCode") || "Please enter a promo code");
            return;
        }

        // Special validation for ADNOC coupon
        if (promoCode.toUpperCase() === "ADNOC-LS") {
            // Check if it's the ADNOC plan
            if (selectedPlan.id !== "36cc4840-dc6e-4db9-86e4-c3d568e03d4f") {
                setPromoError(t("promoNotValidForPlan") || "This promo code is not valid for this plan");
                return;
            }

            // Check if user has @adnoc.ae email
            if (!userEmail || !userEmail.toLowerCase().endsWith("@adnoc.ae")) {
                setPromoError(t("promoRequiresADNOCEmail") || "This promo code requires an ADNOC email address");
                return;
            }
        }

        setCheckingPromo(true);
        setPromoError("");
        setPromoValidation(null);

        try {
            // Pass email along with the promo code check
            const response = await subscriptionService.checkPromoCode(
                promoCode,
                selectedPlan.id,
                userEmail // Add email parameter
            );

            if (response.valid) {
                setPromoValidation(response);
                setPromoError("");
            } else {
                setPromoError(t("invalidPromoCode") || "Invalid promo code");
                setPromoValidation(null);
            }
        } catch (err) {
            setPromoError(t("promoCheckFailed") || "Failed to check promo code");
            setPromoValidation(null);
        } finally {
            setCheckingPromo(false);
        }
    };

    const handleRemovePromo = () => {
        setPromoCode("");
        setPromoValidation(null);
        setPromoError("");
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

        const isTrialPeriod = currentSubscription.is_trial_period;
        const daysInfo = currentSubscription.trial_days_remaining
            ? `${currentSubscription.trial_days_remaining} ${t("days")}`
            : "";

        return (
            <div className='active-subscription-card'>
                <div className='subscription-header'>
                    <h3>
                        {isTrialPeriod
                            ? t("trialPeriod")
                            : currentSubscription.plan_name || userSubscribedPlan?.name || t("premiumPlan")}
                    </h3>
                    {currentSubscription.is_paid_plan && !isTrialPeriod && (
                        <span className='paid-badge'>{t("paid")}</span>
                    )}
                </div>

                <div className='subscription-details'>
                    {/* Show trial days or plan description */}
                    {isTrialPeriod ? (
                        <>
                            {daysInfo && (
                                <p className='expiry-info'>
                                    <strong>{t("remaining")}:</strong> {daysInfo}
                                </p>
                            )}
                            <p style={{ color: "#666", marginTop: "10px" }}>
                                {t("trialDescription") || "You have access to all features during your trial period"}
                            </p>
                        </>
                    ) : (
                        <>
                            <p style={{ color: "#666", marginBottom: "20px" }}>
                                {currentSubscription.plan_description || userSubscribedPlan?.description}
                            </p>
                            {userSubscribedPlan && (
                                <div
                                    style={{
                                        background: "#f8f9fa",
                                        borderRadius: "10px",
                                        padding: "15px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <strong>{t("price")}:</strong> ${userSubscribedPlan.price / 100}/
                                    {t(userSubscribedPlan.billing_interval)}
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className='features'>
                    <h4>{t("activeFeatures")}:</h4>
                    <ul>
                        {currentSubscription.features.map((feature, index) => (
                            <li key={index}>
                                <img src='/images/icons/check.svg' alt='✓' />
                                <span>{translateFeature(feature)}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='subscription-actions'>
                    {isTrialPeriod ? (
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
        if (!availablePlans || availablePlans.length === 0) {
            return (
                <div className='no-subscription'>
                    <p>{t("noSubscriptionAvailable")}</p>
                </div>
            );
        }

        return (
            <div className='plans-grid'>
                {availablePlans.map((plan) => {
                    // Move isCurrentPlan inside the map function
                    const isCurrentPlan = userSubscribedPlan && userSubscribedPlan.id === plan.id;

                    return (
                        <div key={plan.id} className='plan-card'>
                            <h3>{plan.name}</h3>
                            <p className='description'>{plan.description}</p>

                            <div className='price-section'>
                                {plan.discount_percent > 0 ? (
                                    <>
                                        <span className='original-price'>${plan.price / 100}</span>
                                        <span className='discounted-price'>${(plan.discounted_price || 0) / 100}</span>
                                        <span className='discount-badge'>
                                            {t("discount")} {plan.discount_percent}%
                                        </span>
                                    </>
                                ) : (
                                    <span className='price'>${plan.price / 100}</span>
                                )}
                                <span className='billing-cycle'>/{t(plan.billing_interval)}</span>
                            </div>

                            <div className='features'>
                                <h4>{t("features")}:</h4>
                                <ul>
                                    {plan.features.map((feature, index) => (
                                        <li key={index}>
                                            <img src='/images/icons/check.svg' alt='✓' />
                                            <span>{translateFeature(feature)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                className='select-plan-btn'
                                onClick={() => handleSelectPlan(plan)}
                                disabled={subscribing || isCurrentPlan}
                            >
                                {isCurrentPlan
                                    ? t("yourCurrentPlan")
                                    : subscribing
                                    ? t("processing")
                                    : t("selectPlan") || "Select Plan"}
                            </button>
                        </div>
                    );
                })}
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

            {/* Subscribe Modal */}
            {showSubscribeModal && selectedPlan && (
                <div className='modal-overlay' onClick={() => setShowSubscribeModal(false)}>
                    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                        <div className='modal-header'>
                            <h3>{t("subscribeToPlan") || "Subscribe to Plan"}</h3>
                            <button className='modal-close' onClick={() => setShowSubscribeModal(false)}>
                                ×
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div style={{ marginBottom: "25px" }}>
                                <h4 style={{ fontSize: "24px", color: "#1a1a1a", marginBottom: "10px" }}>
                                    {selectedPlan.name}
                                </h4>
                                <p style={{ color: "#666", marginBottom: "20px" }}>{selectedPlan.description}</p>

                                <div style={{ background: "#f8f9fa", borderRadius: "10px", padding: "20px" }}>
                                    {promoValidation?.valid ? (
                                        <>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                <span style={{ color: "#666" }}>
                                                    {t("originalPrice") || "Original Price"}:
                                                </span>
                                                <span style={{ textDecoration: "line-through", color: "#999" }}>
                                                    ${(promoValidation.original_price || selectedPlan.price) / 100}
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    marginBottom: "10px",
                                                    color: "#28a745",
                                                }}
                                            >
                                                <span>{t("discount") || "Discount"}:</span>
                                                <span style={{ fontWeight: "600" }}>
                                                    -{promoValidation.total_discount}%
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    fontSize: "20px",
                                                    fontWeight: "600",
                                                    paddingTop: "10px",
                                                    borderTop: "1px solid #e0e0e0",
                                                }}
                                            >
                                                <span>{t("youPay") || "You Pay"}:</span>
                                                <span style={{ color: "#ebbd00" }}>
                                                    ${(promoValidation.discounted_price || 0) / 100}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontSize: "20px",
                                                fontWeight: "600",
                                            }}
                                        >
                                            <span>{t("price") || "Price"}:</span>
                                            <span style={{ color: "#ebbd00" }}>
                                                $
                                                {selectedPlan.discount_percent > 0
                                                    ? (selectedPlan.discounted_price || 0) / 100
                                                    : selectedPlan.price / 100}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: "#333" }}
                                >
                                    {t("havePromoCode") || "Have a promo code?"}
                                </label>
                                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                    <input
                                        type='text'
                                        placeholder={t("enterPromoCode") || "Enter promo code"}
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        disabled={promoValidation?.valid || checkingPromo}
                                        onKeyPress={(e) => e.key === "Enter" && handleCheckPromoCode()}
                                        style={{
                                            flex: 1,
                                            padding: "12px 16px",
                                            border: "2px solid #e0e0e0",
                                            borderRadius: "8px",
                                            fontSize: "16px",
                                            backgroundColor: promoValidation?.valid ? "#f8f9fa" : "white",
                                        }}
                                    />
                                    {!promoValidation?.valid ? (
                                        <button
                                            onClick={handleCheckPromoCode}
                                            disabled={checkingPromo || !promoCode.trim()}
                                            style={{
                                                padding: "12px 24px",
                                                backgroundColor:
                                                    checkingPromo || !promoCode.trim() ? "#e0e0e0" : "#ebbd00",
                                                color: checkingPromo || !promoCode.trim() ? "#999" : "black",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                cursor: checkingPromo || !promoCode.trim() ? "not-allowed" : "pointer",
                                                minWidth: "100px",
                                            }}
                                        >
                                            {checkingPromo ? t("checking") || "Checking..." : t("apply") || "Apply"}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleRemovePromo}
                                            style={{
                                                padding: "12px 24px",
                                                backgroundColor: "#dc3545",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                                minWidth: "100px",
                                            }}
                                        >
                                            {t("remove") || "Remove"}
                                        </button>
                                    )}
                                </div>

                                {promoError && (
                                    <p style={{ color: "#dc3545", fontSize: "14px", marginTop: "8px" }}>{promoError}</p>
                                )}

                                {promoValidation?.valid && (
                                    <p
                                        style={{
                                            color: "#28a745",
                                            fontSize: "14px",
                                            marginTop: "8px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        ✅ {t("promoApplied") || "Promo code applied!"} {t("youSave") || "You save"}{" "}
                                        {promoValidation.total_discount}%
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button
                                className='modal-btn modal-btn-secondary'
                                onClick={() => setShowSubscribeModal(false)}
                                disabled={subscribing}
                            >
                                {t("cancel") || "Cancel"}
                            </button>
                            <button
                                className='modal-btn'
                                onClick={() => handleSubscribe()}
                                disabled={subscribing}
                                style={{
                                    backgroundColor: subscribing ? "#ccc" : "#ebbd00",
                                    color: "black",
                                    fontWeight: "600",
                                }}
                            >
                                {subscribing ? (
                                    t("processing") || "Processing..."
                                ) : (
                                    <>
                                        {t("subscribeNow") || "Subscribe Now"} - $
                                        {promoValidation?.valid
                                            ? (promoValidation.discounted_price || 0) / 100
                                            : selectedPlan.discount_percent > 0
                                            ? (selectedPlan.discounted_price || 0) / 100
                                            : selectedPlan.price / 100}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
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
