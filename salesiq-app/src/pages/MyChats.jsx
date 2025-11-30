// src/pages/MyChats.jsx
import React, { useState } from "react";
import ChatItem from "../components/ChatItem.jsx";
import ChatWindow from "../components/ChatWindow.jsx";

const MyChats = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([
    {
      id: 1,
      status: 'active',
      visitor: {
        name: 'John Doe',
        location: 'New York, USA',
        browser: 'Chrome'
      },
      lastMessage: 'Hi, I need help with my order',
      timestamp: Date.now() - 300000,
      unreadCount: 2,
      messages: [
        { type: 'visitor', content: 'Hi, I need help with my order', timestamp: Date.now() - 300000 },
        { type: 'agent', content: 'Hello! I\'d be happy to help you with your order. Can you please provide your order number?', timestamp: Date.now() - 240000 },
        { type: 'visitor', content: 'It\'s #12345', timestamp: Date.now() - 180000 }
      ]
    },
    {
      id: 2,
      status: 'missed',
      visitor: {
        name: 'Jane Smith',
        location: 'London, UK',
        browser: 'Safari'
      },
      lastMessage: 'Hello? Is anyone there?',
      timestamp: Date.now() - 600000,
      unreadCount: 1,
      messages: [
        { type: 'visitor', content: 'Hello? Is anyone there?', timestamp: Date.now() - 600000 }
      ]
    },
    {
      id: 3,
      status: 'closed',
      visitor: {
        name: 'Bob Wilson',
        location: 'Toronto, Canada',
        browser: 'Firefox'
      },
      lastMessage: 'Thanks for the help!',
      timestamp: Date.now() - 3600000,
      unreadCount: 0,
      messages: [
        { type: 'visitor', content: 'I have a question about pricing', timestamp: Date.now() - 4000000 },
        { type: 'agent', content: 'I can help with that! What would you like to know?', timestamp: Date.now() - 3900000 },
        { type: 'visitor', content: 'Thanks for the help!', timestamp: Date.now() - 3600000 }
      ]
    }
  ]);

  const filteredChats = chats.filter(chat => chat.status === activeTab);

  const handleStatusChange = (chatId, currentStatus) => {
    const statusCycle = {
      'active': 'missed',
      'missed': 'closed',
      'closed': 'active'
    };
    
    const newStatus = statusCycle[currentStatus];
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId ? { ...chat, status: newStatus } : chat
      )
    );
  };

  const handleSendMessage = (chatId, message) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? {
              ...chat,
              messages: [...chat.messages, {
                type: 'agent',
                content: message,
                timestamp: Date.now()
              }],
              lastMessage: message,
              timestamp: Date.now()
            }
          : chat
      )
    );
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
  };

  return (
    <div className="siq-page">
      <div className="siq-page-header">
        <h1>My chats</h1>
        <div className="page-actions">
          <button className="action-btn">🔄 Refresh</button>
          <button className="action-btn">📊 Export</button>
        </div>
      </div>

      <div className="siq-page-body">
        <div className="siq-tabs">
          {['active', 'missed', 'closed'].map(tab => (
            <button 
              key={tab}
              className={`siq-tab ${activeTab === tab ? 'siq-tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} 
              {tab === 'active' && ` (${chats.filter(c => c.status === 'active').length})`}
            </button>
          ))}
        </div>

        <div className="chats-container">
          <div className="chats-list">
            {filteredChats.length > 0 ? (
              filteredChats.map(chat => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  onStatusChange={handleStatusChange}
                  onSelect={handleChatSelect}
                />
              ))
            ) : (
              <div className="siq-empty-state">
                <div className="siq-empty-illustration" />
                <h2>No {activeTab} chats</h2>
                <p>
                  {activeTab === 'active' && 'View and manage your ongoing chats here.'}
                  {activeTab === 'missed' && 'Chats that were missed will appear here.'}
                  {activeTab === 'closed' && 'Previously closed conversations are listed here.'}
                </p>
              </div>
            )}
          </div>

          {selectedChat && (
            <ChatWindow
              chat={selectedChat}
              onClose={handleCloseChat}
              onSendMessage={handleSendMessage}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyChats;
