// src/layout/SalesIQLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

const SalesIQLayout = () => {
  return (
    <div className="siq-root">
      <Sidebar />
      <div className="siq-main">
        <Topbar />
        <div className="siq-page-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SalesIQLayout;
