// src/pages/Reports.jsx
import React from "react";

const Reports = () => (
  <div className="siq-page">
    <div className="siq-page-header">
      <h1>Brand reports</h1>
    </div>

    <div className="siq-page-body">
      <div className="siq-report-cards">
        {["Total visits", "Avg. visit duration", "Total page views", "Avg. pages per visit", "Avg. time on a page"].map(
          (title) => (
            <div className="siq-report-card" key={title}>
              <div className="siq-report-title">{title}</div>
              <div className="siq-report-value">0</div>
              <div className="siq-report-sub">0% from same time yesterday</div>
            </div>
          )
        )}
      </div>

      <div className="siq-card siq-report-body">
        <div className="siq-empty-state">
          <div className="siq-empty-illustration" />
          <h2>No data</h2>
          <p>Website visits will be shown here once you start receiving traffic.</p>
        </div>
      </div>
    </div>
  </div>
);

export default Reports;
