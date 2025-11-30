// src/components/ChatItem.jsx
import React from 'react';

const ChatItem = ({ chat, onStatusChange, onSelect }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#16a34a';
      case 'missed': return '#dc3545';
      case 'closed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chat-item" onClick={() => onSelect(chat)}>
      <div className="chat-item-avatar">
        <div className="visitor-avatar">
          {chat.visitor.name.charAt(0).toUpperCase()}
        </div>
        {chat.status === 'active' && (
          <div className="status-indicator active"></div>
        )}
      </div>
      
      <div className="chat-item-content">
        <div className="chat-item-header">
          <span className="visitor-name">{chat.visitor.name}</span>
          <span className="chat-time">{formatTime(chat.timestamp)}</span>
        </div>
        
        <div className="chat-item-message">
          <span className="last-message">{chat.lastMessage}</span>
          {chat.unreadCount > 0 && (
            <span className="unread-badge">{chat.unreadCount}</span>
          )}
        </div>
        
        <div className="chat-item-meta">
          <span className="visitor-info">
            📍 {chat.visitor.location} • 🌐 {chat.visitor.browser}
          </span>
          <div className="chat-actions">
            <button 
              className={`status-btn ${chat.status}`}
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(chat.id, chat.status);
              }}
            >
              {chat.status}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
