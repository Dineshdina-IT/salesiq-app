// src/pages/CannedReplies.jsx
import React from "react";

const sampleReplies = [
  {
    title:
      "Thank you for sharing your valuable feedback. We hope you continue to choose us...",
    tag: "Feedback",
  },
  {
    title:
      "Thank you for reporting the issue. We have forwarded it to the concerned team...",
    tag: "issue reported",
  },
];

const CannedReplies = () => (
  <div className="siq-page">
    <div className="siq-page-header">
      <h1>Canned replies</h1>
      <button className="siq-primary-button">Add</button>
    </div>

    <div className="siq-page-body">
      <div className="siq-card">
        <div className="siq-table-header">
          <span>Title</span>
          <span>Type</span>
          <span>Used</span>
          <span>Last Updated</span>
        </div>

        {sampleReplies.map((r, i) => (
          <div className="siq-table-row" key={i}>
            <div>
              <div className="siq-reply-title">{r.title}</div>
              <span className="siq-tag">{r.tag}</span>
            </div>
            <div>Public</div>
            <div>-</div>
            <div>Dinesh C</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CannedReplies;
