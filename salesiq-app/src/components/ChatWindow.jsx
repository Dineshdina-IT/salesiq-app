// src/components/ChatWindow.jsx
import React, { useState, useRef, useEffect } from 'react';

const ChatWindow = ({ chat, onClose, onSendMessage, onStatusChange }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(chat.id, message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!chat) return null;

  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div className="chat-header-info">
          <div className="visitor-avatar">
            {chat.visitor.name.charAt(0).toUpperCase()}
          </div>
          <div className="chat-header-details">
            <h3>{chat.visitor.name}</h3>
            <div className="visitor-meta">
              📍 {chat.visitor.location} • 🌐 {chat.visitor.browser}
            </div>
          </div>
        </div>
        
        <div className="chat-header-actions">
          <select 
            value={chat.status} 
            onChange={(e) => onStatusChange(chat.id, e.target.value)}
            className="status-select"
          >
            <option value="active">Active</option>
            <option value="missed">Missed</option>
            <option value="closed">Closed</option>
          </select>
          
          <button className="action-btn" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {chat.messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <div className="message-content">
              {msg.content}
            </div>
            <div className="message-time">
              {formatTime(msg.timestamp)}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="input-toolbar">
          <button className="toolbar-btn" title="Add emoji">😊</button>
          <button className="toolbar-btn" title="Attach file">📎</button>
          <button className="toolbar-btn" title="Add canned reply">📝</button>
        </div>
        
        <div className="input-wrapper">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="chat-input"
            rows={1}
          />
          <button 
            className="send-btn"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
