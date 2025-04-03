import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Profile/Profile';

const Login = lazy(() => import('./Login/Login'));
const Signup = lazy(() => import('./Signup/Signup'));
const Forget = lazy(() => import('./Forget/Forget'));
const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
const ResetPassword = lazy(() => import('./ResetPassword/Reset_Password'));
const LoginSessions = lazy(() => import('./Login/LoginSessions'));



// PrivateRoute as a proper component
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Login />;
};

const AuthApp = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Navigate to="login" />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forget" element={<Forget />} />
                <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="reset-password/:token" element={<ResetPassword />} />
                <Route path="login-session" element={<LoginSessions />} />
                <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
        </Suspense>
    );
};

export default AuthApp;
