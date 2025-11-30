// src/layout/Topbar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar.jsx";

const Topbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Go to Settings Page
  const openSettings = () => {
    navigate("/settings");
  };

  // Go to Upgrade Page
  const openUpgrade = () => {
    navigate("/upgrade");
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      <header className="siq-topbar">
      {/* Search Box */}
      <div className="siq-search-wrapper">
        <input
          className="siq-search-input"
          placeholder="Search for chats, visitors, and more"
        />
      </div>

      {/* Right Side */}
      <div className="siq-topbar-right">
        {/* Onboarding Pill */}
        <button className="siq-pill-badge">Onboarding</button>

        {/* Available Toggle */}
        <div className="siq-availability">
          <span>Available</span>
          <label className="siq-toggle">
            <input type="checkbox" defaultChecked />
            <span className="siq-toggle-slider" />
          </label>
        </div>

        {/* Sound Icon */}
        <button className="siq-icon-button" title="Sound">
          🔊
        </button>

        {/* Notification Icon */}
        <button className="siq-icon-button" title="Notifications">
          🔔
        </button>

        {/* Upgrade Icon */}
        <button 
          className="siq-icon-button siq-upgrade-btn" 
          title="Upgrade Plan"
          onClick={openUpgrade}
        >
          ⚡
        </button>

        {/* Settings Icon (Clickable → open Settings Page) */}
        <button
          className="siq-icon-button"
          title="Settings"
          onClick={openSettings}
        >
          ⚙
        </button>

        {/* User Profile Chip - Clickable */}
        <div className="siq-user-chip clickable" onClick={handleProfileClick}>
          <span className="siq-user-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </span>
          <span className="siq-user-name">
            {user?.name || 'User'}
          </span>
        </div>
      </div>
    </header>
    
    {/* Profile Sidebar */}
    <ProfileSidebar 
      isOpen={showProfile} 
      onClose={() => setShowProfile(false)}
      user={user}
    />
    </>
  );
};

export default Topbar;
