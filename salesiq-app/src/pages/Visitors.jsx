// src/pages/Visitors.jsx
import React, { useState } from "react";
import VisitorItem from "../components/VisitorItem.jsx";

const Visitors = () => {
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [visitors, setVisitors] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      status: 'online',
      location: 'San Francisco, CA',
      browser: 'Chrome 91',
      os: 'Windows 10',
      duration: 1800, // 30 minutes
      pagesVisited: 5,
      timeOnSite: 1800,
      currentPath: '/products'
    },
    {
      id: 2,
      name: 'Bob Smith',
      status: 'idle',
      location: 'New York, NY',
      browser: 'Safari 14',
      os: 'macOS Big Sur',
      duration: 3600, // 1 hour
      pagesVisited: 12,
      timeOnSite: 3600,
      currentPath: '/pricing'
    },
    {
      id: 3,
      name: 'Carol White',
      status: 'offline',
      location: 'London, UK',
      browser: 'Firefox 89',
      os: 'Ubuntu 20.04',
      duration: 900, // 15 minutes
      pagesVisited: 3,
      timeOnSite: 900,
      currentPath: '/about'
    }
  ]);

  const handleVisitorSelect = (visitor) => {
    setSelectedVisitor(visitor);
  };

  const handleVisitorAction = (visitorId, action) => {
    switch(action) {
      case 'chat':
        console.log(`Starting chat with visitor ${visitorId}`);
        // In real app, this would open a chat window
        break;
      case 'track':
        console.log(`Tracking visitor ${visitorId}`);
        // In real app, this would enable tracking
        break;
      case 'block':
        setVisitors(prevVisitors => 
          prevVisitors.filter(v => v.id !== visitorId)
        );
        break;
    }
  };

  const onlineVisitors = visitors.filter(v => v.status !== 'offline');
  const allVisitors = visitors;

  return (
    <div className="siq-page">
      <div className="siq-page-header">
        <h1>All visitors</h1>
        <div className="page-actions">
          <button className="action-btn">🔄 Refresh</button>
          <button className="action-btn">📊 Analytics</button>
          <button className="action-btn">🔍 Filters</button>
        </div>
      </div>

      <div className="siq-page-body siq-page-split">
        <div className="siq-card siq-list-pane">
          <div className="siq-list-header">
            <div className="list-header-content">
              <span>All visitors ({allVisitors.length})</span>
              <div className="status-filters">
                <button className="filter-btn active">
                  🟢 Online ({onlineVisitors.length})
                </button>
                <button className="filter-btn">
                  All ({allVisitors.length})
                </button>
              </div>
            </div>
          </div>
          
          <div className="visitors-list">
            {allVisitors.length > 0 ? (
              allVisitors.map(visitor => (
                <VisitorItem
                  key={visitor.id}
                  visitor={visitor}
                  onSelect={handleVisitorSelect}
                  onAction={handleVisitorAction}
                />
              ))
            ) : (
              <div className="siq-list-empty">No visitors found</div>
            )}
          </div>
        </div>

        <div className="siq-card siq-detail-pane">
          {selectedVisitor ? (
            <div className="visitor-details">
              <div className="visitor-detail-header">
                <div className="visitor-avatar large">
                  {selectedVisitor.name.charAt(0).toUpperCase()}
                </div>
                <div className="visitor-detail-info">
                  <h3>{selectedVisitor.name}</h3>
                  <div className="status-badge" data-status={selectedVisitor.status}>
                    {selectedVisitor.status}
                  </div>
                </div>
                <button 
                  className="close-detail-btn"
                  onClick={() => setSelectedVisitor(null)}
                >
                  ✕
                </button>
              </div>

              <div className="visitor-detail-sections">
                <div className="detail-section">
                  <h4>Location & Device</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Location:</span>
                      <span className="value">📍 {selectedVisitor.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Browser:</span>
                      <span className="value">🌐 {selectedVisitor.browser}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">OS:</span>
                      <span className="value">💻 {selectedVisitor.os}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Activity</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Time on site:</span>
                      <span className="value">⏱️ {Math.floor(selectedVisitor.timeOnSite / 60)}m</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Pages visited:</span>
                      <span className="value">📄 {selectedVisitor.pagesVisited}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Current page:</span>
                      <span className="value">🔗 {selectedVisitor.currentPath}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Actions</h4>
                  <div className="action-buttons">
                    <button className="primary-action-btn">
                      💬 Start Chat
                    </button>
                    <button className="secondary-action-btn">
                      📍 View Journey
                    </button>
                    <button className="secondary-action-btn">
                      🚫 Block Visitor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="siq-empty-state">
              <div className="siq-empty-illustration" />
              <h2>Select a visitor</h2>
              <p>
                Click on a visitor from the list to view detailed information and actions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visitors;
