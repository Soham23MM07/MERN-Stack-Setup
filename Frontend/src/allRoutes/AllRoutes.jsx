import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { Dashboard } from "../pages/Dashboard";
import { useAuth } from "../context/authContext";
import ForgotPassword from "../pages/ForgotPassword";

export const AllRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
        }
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />
        }
      />
      <Route
        path="/forgotpass"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <ForgotPassword />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
