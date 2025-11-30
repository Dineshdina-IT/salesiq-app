// src/components/ProfileSidebar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSidebar = ({ isOpen, onClose, user }) => {
  const navigate = useNavigate();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/settings');
    onClose();
  };

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="profile-sidebar-overlay" onClick={onClose}></div>
      <div className={`profile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="profile-sidebar-header">
          <button className="close-btn" onClick={onClose}>×</button>
          <h3>Profile</h3>
        </div>
        
        <div className="profile-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="profile-info">
              <h4>{user?.name || 'User'}</h4>
              <p>{user?.email || 'user@example.com'}</p>
              <span className="role-badge">{user?.role || 'Agent'}</span>
            </div>
          </div>
          
          <div className="profile-menu">
            <div className="menu-item" onClick={handleSettings}>
              <span className="menu-icon">⚙️</span>
              <span>Settings</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">👤</span>
              <span>My Account</span>
            </div>
            <div className="menu-item theme-toggle-item">
              <span className="menu-icon">{isDarkTheme ? '🌙' : '☀️'}</span>
              <span>Dark Theme</span>
              <label className="theme-toggle-switch">
                <input 
                  type="checkbox" 
                  checked={isDarkTheme}
                  onChange={toggleTheme}
                />
                <span className="theme-toggle-slider"></span>
              </label>
            </div>
            <div className="menu-item">
              <span className="menu-icon">🔔</span>
              <span>Notifications</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">📊</span>
              <span>Activity</span>
            </div>
            <div className="menu-divider"></div>
            <div className="menu-item logout" onClick={handleLogout}>
              <span className="menu-icon">🚪</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
