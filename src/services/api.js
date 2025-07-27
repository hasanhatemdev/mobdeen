import axios from "axios";

const API_BASE_URL = "https://mobdeen.com:8000";

// Create axios instance with base configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Variable to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Add token to requests if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we have a refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem("refresh_token");

            if (!refreshToken) {
                // No refresh token, redirect to login
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/api/v1/users/refresh`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const { access_token, refresh_token } = response.data;

                // Update stored tokens
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("refresh_token", refresh_token);

                // Update the authorization header for the failed request
                originalRequest.headers.Authorization = `Bearer ${access_token}`;

                processQueue(null, access_token);

                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);

                // Refresh failed, redirect to login
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// API methods
export const authService = {
    login: async (credentials) => {
        const response = await api.post("/api/v1/users/login", credentials);
        return response.data;
    },

    logout: async () => {
        const response = await api.post("/api/v1/users/logout");
        return response.data;
    },

    forgotPassword: async (email) => {
        const response = await api.post("/api/v1/users/forgot-password", { email });
        return response.data;
    },

    verifyOTP: async (email, otp) => {
        const response = await api.post("/api/v1/users/verify-otp", { email, otp });
        return response.data;
    },

    resetPassword: async (newPassword, resetToken) => {
        // Use axios directly to bypass the interceptor
        const response = await axios.post(
            `${API_BASE_URL}/api/v1/users/reset-password`,
            { new_password: newPassword },
            {
                headers: {
                    Authorization: `Bearer ${resetToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    },

    refreshToken: async () => {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }

        const response = await axios.post(
            `${API_BASE_URL}/api/v1/users/refresh`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    },
};

export const subscriptionService = {
    getPlans: async () => {
        const response = await api.get("/api/v1/subscription-plans");
        return response.data;
    },

    subscribe: async (subscriptionPlanId, promoCode = null) => {
        const payload = {
            subscription_plan_id: subscriptionPlanId,
        };

        if (promoCode) {
            payload.promo_code = promoCode;
        }

        const response = await api.post("/api/v1/family-subscriptions", payload);
        return response.data;
    },

    checkPromoCode: async (promoCode, subscriptionPlanId, userEmail = null) => {
        const payload = {
            promo_code: promoCode,
            subscription_plan_id: subscriptionPlanId,
        };

        // Include email if provided
        if (userEmail) {
            payload.user_email = userEmail;
        }

        const response = await api.post("/api/v1/promo-codes/check", payload);
        return response.data;
    },

    cancelSubscription: async () => {
        const response = await api.post("/api/v1/family-subscriptions/cancel");
        return response.data;
    },

    getCurrentSubscription: async () => {
        const response = await api.get("/api/v1/family-subscriptions");
        return response.data;
    },

    getCurrentSubscriptionFeatures: async () => {
        const response = await api.get("/api/v1/family-subscription/features");
        return response.data;
    },
};

export default api;
