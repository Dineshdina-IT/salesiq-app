// src/pages/AllChats.jsx
import React from "react";

const AllChats = () => (
  <div className="siq-page">
    <div className="siq-page-header">
      <h1>Active chats</h1>
    </div>
    <div className="siq-page-body siq-page-split">
      <div className="siq-card siq-list-pane">
        <div className="siq-list-header">Active chats ▾</div>
        <div className="siq-list-empty">No chats yet</div>
      </div>

      <div className="siq-card siq-empty-pane">
        <div className="siq-empty-state">
          <div className="siq-empty-illustration" />
          <h2>No chats yet</h2>
          <p>All the chats that are active will be listed here.</p>
        </div>
      </div>
    </div>
  </div>
);

export default AllChats;
