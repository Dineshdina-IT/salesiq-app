// src/pages/Calls.jsx
import React from "react";

const Calls = () => (
  <div className="siq-page">
    <div className="siq-page-header">
      <h1>Call queue</h1>
    </div>

    <div className="siq-page-body siq-page-split">
      <div className="siq-card siq-list-pane">
        <div className="siq-list-header">Call queue ▾</div>
        <div className="siq-list-empty">No calls yet</div>
      </div>

      <div className="siq-card siq-empty-pane">
        <div className="siq-empty-state">
          <div className="siq-empty-illustration" />
          <h2>No calls yet</h2>
          <p>
            All the calls that are in queue to be picked up will be listed here.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Calls;
