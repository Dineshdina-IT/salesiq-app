// src/pages/Onboarding.jsx
import React, { useState } from "react";

const Onboarding = () => {
  const [selectedColor, setSelectedColor] = useState('blue');
  const [greetingMessage, setGreetingMessage] = useState('Hey there!');
  const [chatMessage, setChatMessage] = useState('How can we help you?');
  const [previewUrl, setPreviewUrl] = useState('');
  const [activeTab, setActiveTab] = useState('widget');
  const [showPreview, setShowPreview] = useState(false);

  const colors = [
    { name: 'blue', class: 'siq-color-dot-active' },
    { name: 'green', class: 'siq-color-dot-green' },
    { name: 'orange', class: 'siq-color-dot-orange' },
    { name: 'red', class: 'siq-color-dot-red' },
    { name: 'grey', class: 'siq-color-dot-grey' }
  ];

  const handleTryNow = () => {
    if (previewUrl) {
      setShowPreview(true);
      // In real app, this would open the preview
      console.log('Previewing on:', previewUrl);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="siq-page">
      <div className="siq-page-header">
        <h1>Customize chat widget</h1>
        <div className="page-actions">
          <button className="action-btn"> Save</button>
          <button className="action-btn"> Preview</button>
        </div>
      </div>

      <div className="siq-page-body siq-page-split">
        <div className="siq-card siq-onboard-left">
          <h3 className="siq-section-title">Pick a color</h3>
          <div className="siq-color-row">
            {colors.map(color => (
              <button
                key={color.name}
                className={`siq-color-dot ${color.class} ${selectedColor === color.name ? 'selected' : ''}`}
                onClick={() => handleColorSelect(color.name)}
                title={color.name}
              />
            ))}
            <button className="siq-color-dot siq-color-picker" title="Custom color">
              🎨
            </button>
          </div>

          <div className="siq-field-group">
            <label>Greeting message</label>
            <input 
              value={greetingMessage}
              onChange={(e) => setGreetingMessage(e.target.value)}
              placeholder="Enter greeting message"
            />
          </div>

          <div className="siq-field-group">
            <label>Message</label>
            <input 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Enter chat message"
            />
          </div>

          <div className="siq-field-group">
            <label>Preview your chat experience!</label>
            <input
              value={previewUrl}
              onChange={(e) => setPreviewUrl(e.target.value)}
              placeholder="Ex: https://www.zyler.com/"
            />
          </div>

          <div className="button-group">
            <button 
              className="siq-primary-button"
              onClick={handleTryNow}
              disabled={!previewUrl}
            >
              Try Now
            </button>
            <button className="siq-secondary-button">
              Get Code
            </button>
          </div>

          <div className="advanced-settings">
            <h4>Advanced Settings</h4>
            <div className="setting-item">
              <label>
                <input type="checkbox" defaultChecked />
                <span>Show on mobile devices</span>
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" defaultChecked />
                <span>Sound notifications</span>
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input type="checkbox" />
                <span>Auto-start chat</span>
              </label>
            </div>
          </div>
        </div>

        <div className="siq-card siq-onboard-right">
          <div className="siq-tabs">
            <button 
              className={`siq-tab ${activeTab === 'widget' ? 'siq-tab-active' : ''}`}
              onClick={() => setActiveTab('widget')}
            >
              Chat widget
            </button>
            <button 
              className={`siq-tab ${activeTab === 'window' ? 'siq-tab-active' : ''}`}
              onClick={() => setActiveTab('window')}
            >
              Chat window
            </button>
          </div>

          <div className="siq-chat-preview">
            {activeTab === 'widget' ? (
              <>
                <div className={`siq-chat-bubble ${selectedColor}`}>
                  <div className="siq-chat-bubble-header">{greetingMessage}</div>
                  <div className="siq-chat-bubble-body">
                    {chatMessage}
                  </div>
                </div>

                <button className={`siq-floating-chat-btn ${selectedColor}`}>
                  💬
                </button>
              </>
            ) : (
              <div className={`siq-chat-window-preview ${selectedColor}`}>
                <div className="chat-window-header">
                  <div className="chat-info">
                    <span className="chat-title">Support Chat</span>
                    <span className="chat-status"> Online</span>
                  </div>
                  <button className="minimize-btn">─</button>
                </div>
                <div className="chat-messages-preview">
                  <div className="message bot">
                    <span className="message-content">{greetingMessage}</span>
                  </div>
                  <div className="message bot">
                    <span className="message-content">{chatMessage}</span>
                  </div>
                </div>
                <div className="chat-input-preview">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    disabled
                  />
                  <button className="send-btn">➤</button>
                </div>
              </div>
            )}

            {showPreview && (
              <div className="preview-overlay">
                <div className="preview-modal">
                  <h3> Preview Ready!</h3>
                  <p>Your chat widget is ready to preview on:</p>
                  <div className="preview-url">{previewUrl}</div>
                  <div className="preview-actions">
                    <button className="preview-btn primary">
                      Open Preview
                    </button>
                    <button 
                      className="preview-btn secondary"
                      onClick={() => setShowPreview(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
