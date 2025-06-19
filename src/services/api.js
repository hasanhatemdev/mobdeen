// src/services/api.js
import axios from "axios";

const API_BASE_URL = "https://mobdeen.com:8000";

// Create axios instance with base configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

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
};

export const subscriptionService = {
    getPlans: async () => {
        const response = await api.get("/api/v1/subscription-plans");
        return response.data;
    },

    subscribe: async (subscriptionPlanId) => {
        const response = await api.post("/api/v1/family-subscriptions", {
            subscription_plan_id: subscriptionPlanId,
        });
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
};

export default api;
