// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Subscriptions from "./components/Subscriptions";
import Profile from "./components/Profile";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOTP from "./components/VerifyOTP";
import ResetPassword from "./components/ResetPassword";
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

    if (loading) {
        return <div className='loading'>جاري التحميل...</div>;
    }

    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/verify-otp' element={<VerifyOTP />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route
                        path='/subscriptions'
                        element={
                            <ProtectedRoute>
                                <Subscriptions />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/profile'
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path='/payment-success' element={<PaymentSuccess />} />
                    <Route path='/payment-failed' element={<PaymentFailed />} />
                    <Route path='/' element={<Navigate to='/login' />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
