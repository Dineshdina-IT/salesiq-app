// src/components/VisitorItem.jsx
import React from 'react';

const VisitorItem = ({ visitor, onSelect, onAction }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return '#16a34a';
      case 'idle': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="visitor-item" onClick={() => onSelect(visitor)}>
      <div className="visitor-item-avatar">
        <div className="visitor-avatar">
          {visitor.name.charAt(0).toUpperCase()}
        </div>
        <div 
          className="status-indicator" 
          style={{ backgroundColor: getStatusColor(visitor.status) }}
        ></div>
      </div>
      
      <div className="visitor-item-content">
        <div className="visitor-item-header">
          <span className="visitor-name">{visitor.name}</span>
          <span className="visitor-duration">{formatDuration(visitor.duration)}</span>
        </div>
        
        <div className="visitor-item-details">
          <div className="visitor-info">
            <span className="info-item">📍 {visitor.location}</span>
            <span className="info-item">🌐 {visitor.browser}</span>
            <span className="info-item">💻 {visitor.os}</span>
          </div>
          
          <div className="visitor-stats">
            <span className="stat-item">📄 {visitor.pagesVisited} pages</span>
            <span className="stat-item">⏱️ {formatDuration(visitor.timeOnSite)}</span>
          </div>
        </div>
        
        <div className="visitor-item-actions">
          <button 
            className="action-btn chat-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAction(visitor.id, 'chat');
            }}
          >
            💬 Start Chat
          </button>
          <button 
            className="action-btn track-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAction(visitor.id, 'track');
            }}
          >
            📍 Track
          </button>
          <button 
            className="action-btn block-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAction(visitor.id, 'block');
            }}
          >
            🚫 Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitorItem;
