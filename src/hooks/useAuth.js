import { useEffect, useRef } from "react";
import { authService } from "../services/api";

// Function to decode JWT and get expiration time
const getTokenExpiration = (token) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );

        const payload = JSON.parse(jsonPayload);
        return payload.exp * 1000; // Convert to milliseconds
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export const useAuth = () => {
    const refreshTimeoutRef = useRef(null);

    const scheduleTokenRefresh = () => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) return;

        const expirationTime = getTokenExpiration(accessToken);
        if (!expirationTime) return;

        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        // Refresh token 1 minute before it expires
        const refreshTime = timeUntilExpiration - 60000;

        if (refreshTime > 0) {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }

            refreshTimeoutRef.current = setTimeout(async () => {
                try {
                    const response = await authService.refreshToken();
                    localStorage.setItem("access_token", response.access_token);
                    localStorage.setItem("refresh_token", response.refresh_token);

                    // Schedule next refresh
                    scheduleTokenRefresh();
                } catch (error) {
                    console.error("Failed to refresh token:", error);
                    // If refresh fails, the interceptor will handle it
                }
            }, refreshTime);
        }
    };

    useEffect(() => {
        // Schedule initial token refresh
        scheduleTokenRefresh();

        // Check token and schedule refresh on window focus
        const handleFocus = () => {
            scheduleTokenRefresh();
        };

        window.addEventListener("focus", handleFocus);

        return () => {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    return { scheduleTokenRefresh };
};
