// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SalesIQLayout from "./layout/SalesIQLayout.jsx";

// Auth Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Main Pages
import Onboarding from "./pages/Onboarding.jsx";
import MyChats from "./pages/MyChats.jsx";
import Visitors from "./pages/Visitors.jsx";
import AllChats from "./pages/AllChats.jsx";
import Outbound from "./pages/Outbound.jsx";
import Calls from "./pages/Calls.jsx";
import Feedback from "./pages/Feedback.jsx";
import Reports from "./pages/Reports.jsx";
import CannedReplies from "./pages/CannedReplies.jsx";
import BrandsInstallation from "./pages/BrandsInstallation.jsx";
import Upgrade from "./pages/Upgrade.jsx";

// Settings
import Settings from "./pages/Settings.jsx";
import SettingDetail from "./pages/SettingDetail.jsx";
import Zobot from "./pages/Zobot.jsx";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <SalesIQLayout />
          </ProtectedRoute>
        }
      >
        {/* Default redirect */}
        <Route index element={<Navigate to="/onboard" replace />} />

        {/* Main Navigation Routes */}
        <Route path="onboard" element={<Onboarding />} />
        <Route path="mychats" element={<MyChats />} />
        <Route path="visitors" element={<Visitors />} />
        <Route path="allchats" element={<AllChats />} />
        <Route path="outbound" element={<Outbound />} />
        <Route path="calls" element={<Calls />} />
        <Route path="feedback" element={<Feedback />} />

        {/* More pages */}
        <Route path="reports" element={<Reports />} />
        <Route path="canned-replies" element={<CannedReplies />} />
        <Route path="brands-installation" element={<BrandsInstallation />} />
        <Route path="upgrade" element={<Upgrade />} />

        {/* -------------------------------------- */}
        {/*             SETTINGS ROUTES            */}
        {/* -------------------------------------- */}

        {/* Settings Main Page */}
        <Route path="settings" element={<Settings />} />

        {/* Zobot Route */}
        <Route path="settings/zobot" element={<Zobot />} />

        {/* All sub-settings → dynamic */}
        <Route path="settings/:page" element={<SettingDetail />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/onboard" replace />} />
      </Route>

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
