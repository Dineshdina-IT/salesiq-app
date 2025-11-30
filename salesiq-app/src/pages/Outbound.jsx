// src/pages/Outbound.jsx
import React from "react";

const Outbound = () => (
  <div className="siq-page">
    <div className="siq-page-header">
      <h1>Messages</h1>
    </div>

    <div className="siq-page-body">
      <div className="siq-tabs-left">
        <button className="siq-tab siq-tab-active">Messages</button>
        <button className="siq-tab">Broadcast</button>
      </div>

      <div className="siq-empty-state">
        <div className="siq-empty-illustration" />
        <h2>No messages sent yet</h2>
        <p>
          Proactively reach out to customers with personalized messages that
          drive action. Your sent chats will appear here.
        </p>
      </div>
    </div>
  </div>
);

export default Outbound;
