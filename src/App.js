import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Subscriptions from "./components/Subscriptions";
import Profile from "./components/Profile";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import PaymentRedirect from "./components/PaymentRedirect";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOTP from "./components/VerifyOTP";
import ResetPassword from "./components/ResetPassword";
import HomePage from "./components/HomePage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import WebsiteHeader from "./components/WebsiteHeader";
import Footer from "./components/Footer";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Use the auth hook to handle token refresh
    useAuth();

    useEffect(() => {
        // Check if user is authenticated on component mount
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    // Protected Route Component
    const ProtectedRoute = ({ children }) => {
        const token = localStorage.getItem("access_token");
        return token ? children : <Navigate to='/login' />;
    };

    // Layout for public pages (with header and footer)
    const PublicLayout = ({ children }) => (
        <>
            <WebsiteHeader />
            <main className='main-content'>{children}</main>
            <Footer />
        </>
    );

    // Layout for app pages (with language switcher only)
    const AppLayout = ({ children }) => (
        <>
            <LanguageSwitcher />
            {children}
        </>
    );

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <LanguageProvider>
            <Router>
                <div className='App'>
                    <Routes>
                        {/* Public Website Routes */}
                        <Route
                            path='/'
                            element={
                                <PublicLayout>
                                    <HomePage />
                                </PublicLayout>
                            }
                        />
                        <Route
                            path='/privacy-policy'
                            element={
                                <PublicLayout>
                                    <PrivacyPolicy />
                                </PublicLayout>
                            }
                        />

                        {/* App Routes */}
                        <Route
                            path='/login'
                            element={
                                <AppLayout>
                                    <Login />
                                </AppLayout>
                            }
                        />
                        <Route
                            path='/forgot-password'
                            element={
                                <AppLayout>
                                    <ForgotPassword />
                                </AppLayout>
                            }
                        />
                        <Route
                            path='/verify-otp'
                            element={
                                <AppLayout>
                                    <VerifyOTP />
                                </AppLayout>
                            }
                        />
                        <Route
                            path='/reset-password'
                            element={
                                <AppLayout>
                                    <ResetPassword />
                                </AppLayout>
                            }
                        />
                        <Route
                            path='/subscriptions'
                            element={
                                <ProtectedRoute>
                                    <AppLayout>
                                        <Subscriptions />
                                    </AppLayout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path='/profile'
                            element={
                                <ProtectedRoute>
                                    <AppLayout>
                                        <Profile />
                                    </AppLayout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path='/payment-success'
                            element={
                                <AppLayout>
                                    <PaymentSuccess />
                                </AppLayout>
                            }
                        />
                        <Route
                            path='/payment-failed'
                            element={
                                <AppLayout>
                                    <PaymentFailed />
                                </AppLayout>
                            }
                        />
                        <Route
                            path='/payment-redirect/:status'
                            element={
                                <AppLayout>
                                    <PaymentRedirect />
                                </AppLayout>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </LanguageProvider>
    );
}

export default App;
