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
import TermsConditions from "./components/TermsConditions";

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

    // Public Route Component - redirects to profile if already logged in
    const PublicRoute = ({ children }) => {
        const token = localStorage.getItem("access_token");
        return token ? <Navigate to='/profile' /> : children;
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
                        <Route
                            path='/terms-conditions'
                            element={
                                <PublicLayout>
                                    <TermsConditions />
                                </PublicLayout>
                            }
                        />

                        {/* App Routes - Public (redirect if authenticated) */}
                        <Route
                            path='/login'
                            element={
                                <PublicRoute>
                                    <AppLayout>
                                        <Login />
                                    </AppLayout>
                                </PublicRoute>
                            }
                        />
                        <Route
                            path='/forgot-password'
                            element={
                                <PublicRoute>
                                    <AppLayout>
                                        <ForgotPassword />
                                    </AppLayout>
                                </PublicRoute>
                            }
                        />
                        <Route
                            path='/verify-otp'
                            element={
                                <PublicRoute>
                                    <AppLayout>
                                        <VerifyOTP />
                                    </AppLayout>
                                </PublicRoute>
                            }
                        />
                        <Route
                            path='/reset-password'
                            element={
                                <PublicRoute>
                                    <AppLayout>
                                        <ResetPassword />
                                    </AppLayout>
                                </PublicRoute>
                            }
                        />

                        {/* Protected Routes */}
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

                        {/* Payment Routes - These can be accessed by anyone */}
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

                        {/* Default redirect */}
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </div>
            </Router>
        </LanguageProvider>
    );
}

export default App;
