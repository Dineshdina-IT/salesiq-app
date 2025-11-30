// src/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/onboard", label: "Live view", icon: "👁" },
  { to: "/mychats", label: "My chats", icon: "💬" },
  { to: "/visitors", label: "Visitors", icon: "🧑" },
  { to: "/allchats", label: "Chats", icon: "💻" },
  { to: "/outbound", label: "Outbound", icon: "📤" },
  { to: "/calls", label: "Calls", icon: "📞" },
  { to: "/feedback", label: "Feedback", icon: "⭐" },
];

const moreItems = [
  { to: "/reports", label: "Reports" },
  { to: "/canned-replies", label: "Canned replies" },
  { to: "/brands-installation", label: "Brands" },
];

const Sidebar = () => {
  return (
    <aside className="siq-sidebar">
      <div className="siq-sidebar-logo">SalesIQ</div>

      <nav className="siq-sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              "siq-nav-item" + (isActive ? " siq-nav-item-active" : "")
            }
          >
            <span className="siq-nav-icon">{item.icon}</span>
            <span className="siq-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="siq-sidebar-bottom">
        <div className="siq-sidebar-more">
          <span className="siq-nav-icon">⋯</span>
          <span className="siq-nav-label">More</span>
        </div>

        <div className="siq-sidebar-more-panel">
          {moreItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                "siq-more-item" + (isActive ? " siq-more-item-active" : "")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/brands-installation"
          className={({ isActive }) =>
            "siq-nav-item siq-nav-item-brands" +
            (isActive ? " siq-nav-item-active" : "")
          }
        >
          <span className="siq-nav-icon">🧱</span>
          <span className="siq-nav-label">Brands</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
