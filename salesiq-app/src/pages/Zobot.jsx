// src/pages/Zobot.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Zobot = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [botData, setBotData] = useState({
    name: '',
    description: '',
    type: 'codeless', // 'codeless' or 'script'
    welcomeMessage: '',
    errorMessage: '',
    avatar: '',
    color: '#0051d3',
    language: 'en',
    timezone: 'UTC',
    workingHours: {
      enabled: false,
      startTime: '09:00',
      endTime: '18:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    departments: [],
    handoffToOperator: true,
    collectFeedback: true
  });

  const steps = [
    { title: 'Bot Builder', subtitle: 'Choose your bot type' },
    { title: 'Bot Profile', subtitle: 'Configure bot details' },
    { title: 'Configuration', subtitle: 'Set up bot behavior' },
    { title: 'Bot Builder', subtitle: 'Create your bot flows' }
  ];

  const handleCreateBot = () => {
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Save bot data and show results
    console.log('Bot created:', botData);
    setCurrentStep('results');
  };

  const renderNoBotState = () => (
    <div className="zobot-no-bot">
      <div className="no-bot-illustration">
        <div className="robot-icon">🤖</div>
        <h2>No bots found</h2>
        <p>Create your first AI-powered chatbot to automate customer conversations</p>
      </div>
      
      <div className="bot-features">
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h4>24/7 Support</h4>
          <p>Handle customer queries round the clock</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h4>Instant Responses</h4>
          <p>Provide immediate answers to common questions</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h4>Lead Generation</h4>
          <p>Capture and qualify leads automatically</p>
        </div>
      </div>

      <button className="create-bot-btn" onClick={handleCreateBot}>
        <span className="btn-icon">➕</span>
        Create Your First Bot
      </button>
    </div>
  );

  const renderStep1 = () => (
    <div className="bot-builder-step">
      <div className="step-header">
        <h3>Choose Bot Type</h3>
        <p>Select how you want to build your bot</p>
      </div>

      <div className="bot-type-options">
        <div 
          className={`bot-type-card ${botData.type === 'codeless' ? 'selected' : ''}`}
          onClick={() => setBotData({...botData, type: 'codeless'})}
        >
          <div className="bot-type-icon">🎨</div>
          <h4>Codeless Bot Builder</h4>
          <p>Build your bot using our intuitive drag-and-drop interface. No coding required.</p>
          <div className="bot-type-features">
            <span>✓ Visual Flow Builder</span>
            <span>✓ Pre-built Templates</span>
            <span>✓ Easy to Use</span>
          </div>
        </div>

        <div 
          className={`bot-type-card ${botData.type === 'script' ? 'selected' : ''}`}
          onClick={() => setBotData({...botData, type: 'script'})}
        >
          <div className="bot-type-icon">💻</div>
          <h4>Script Builder</h4>
          <p>Create advanced bots using custom scripts and APIs for maximum flexibility.</p>
          <div className="bot-type-features">
            <span>✓ Custom Logic</span>
            <span>✓ API Integration</span>
            <span>✓ Advanced Control</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bot-builder-step">
      <div className="step-header">
        <h3>Bot Profile</h3>
        <p>Configure your bot's basic information</p>
      </div>

      <div className="bot-profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Bot Name *</label>
            <input
              type="text"
              value={botData.name}
              onChange={(e) => setBotData({...botData, name: e.target.value})}
              placeholder="Enter bot name"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Bot Color</label>
            <div className="color-picker">
              <input
                type="color"
                value={botData.color}
                onChange={(e) => setBotData({...botData, color: e.target.value})}
                className="color-input"
              />
              <span className="color-value">{botData.color}</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Bot Description</label>
          <textarea
            value={botData.description}
            onChange={(e) => setBotData({...botData, description: e.target.value})}
            placeholder="Describe what your bot does"
            className="form-textarea"
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Welcome Message</label>
            <input
              type="text"
              value={botData.welcomeMessage}
              onChange={(e) => setBotData({...botData, welcomeMessage: e.target.value})}
              placeholder="Hello! How can I help you today?"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Error Message</label>
            <input
              type="text"
              value={botData.errorMessage}
              onChange={(e) => setBotData({...botData, errorMessage: e.target.value})}
              placeholder="Sorry, I didn't understand that."
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Language</label>
            <select
              value={botData.language}
              onChange={(e) => setBotData({...botData, language: e.target.value})}
              className="form-select"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
          <div className="form-group">
            <label>Timezone</label>
            <select
              value={botData.timezone}
              onChange={(e) => setBotData({...botData, timezone: e.target.value})}
              className="form-select"
            >
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
              <option value="GMT">GMT</option>
              <option value="IST">IST</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="bot-builder-step">
      <div className="step-header">
        <h3>Configuration</h3>
        <p>Set up your bot's behavior and preferences</p>
      </div>

      <div className="bot-config-form">
        <div className="config-section">
          <h4>Working Hours</h4>
          <div className="config-option">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={botData.workingHours.enabled}
                onChange={(e) => setBotData({
                  ...botData,
                  workingHours: {...botData.workingHours, enabled: e.target.checked}
                })}
              />
              <span className="toggle-slider"></span>
              <span>Enable working hours</span>
            </label>
          </div>
          
          {botData.workingHours.enabled && (
            <div className="working-hours-config">
              <div className="time-range">
                <input
                  type="time"
                  value={botData.workingHours.startTime}
                  onChange={(e) => setBotData({
                    ...botData,
                    workingHours: {...botData.workingHours, startTime: e.target.value}
                  })}
                  className="time-input"
                />
                <span>to</span>
                <input
                  type="time"
                  value={botData.workingHours.endTime}
                  onChange={(e) => setBotData({
                    ...botData,
                    workingHours: {...botData.workingHours, endTime: e.target.value}
                  })}
                  className="time-input"
                />
              </div>
            </div>
          )}
        </div>

        <div className="config-section">
          <h4>Handoff Settings</h4>
          <div className="config-option">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={botData.handoffToOperator}
                onChange={(e) => setBotData({...botData, handoffToOperator: e.target.checked})}
              />
              <span className="toggle-slider"></span>
              <span>Handoff to operator when needed</span>
            </label>
          </div>
        </div>

        <div className="config-section">
          <h4>Feedback Collection</h4>
          <div className="config-option">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={botData.collectFeedback}
                onChange={(e) => setBotData({...botData, collectFeedback: e.target.checked})}
              />
              <span className="toggle-slider"></span>
              <span>Collect feedback after conversations</span>
            </label>
          </div>
        </div>

        <div className="config-section">
          <h4>Departments</h4>
          <div className="departments-list">
            <div className="department-item">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Sales</span>
              </label>
            </div>
            <div className="department-item">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Support</span>
              </label>
            </div>
            <div className="department-item">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Technical</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="bot-builder-step">
      <div className="step-header">
        <h3>{botData.type === 'codeless' ? 'Codeless Bot Builder' : 'Script Builder'}</h3>
        <p>{botData.type === 'codeless' ? 'Create your bot flows visually' : 'Write your bot scripts'}</p>
      </div>

      {botData.type === 'codeless' ? (
        <div className="codeless-builder">
          <div className="flow-builder">
            <div className="flow-toolbar">
              <button className="flow-btn">📝 Message</button>
              <button className="flow-btn">❓ Question</button>
              <button className="flow-btn">🔀 Condition</button>
              <button className="flow-btn">🔄 Loop</button>
              <button className="flow-btn">👤 Handoff</button>
            </div>
            
            <div className="flow-canvas">
              <div className="flow-node start">
                <div className="node-content">
                  <span className="node-title">Start</span>
                  <span className="node-desc">Welcome: {botData.welcomeMessage || 'Hello!'}</span>
                </div>
              </div>
              
              <div className="flow-connector"></div>
              
              <div className="flow-node">
                <div className="node-content">
                  <span className="node-title">Message</span>
                  <span className="node-desc">How can I help you today?</span>
                </div>
              </div>
              
              <div className="flow-connector"></div>
              
              <div className="flow-node">
                <div className="node-content">
                  <span className="node-title">Question</span>
                  <span className="node-desc">What type of assistance do you need?</span>
                </div>
              </div>
              
              <div className="add-node-btn">+ Add Step</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="script-builder">
          <div className="script-editor">
            <div className="editor-toolbar">
              <button className="editor-btn">Save</button>
              <button className="editor-btn">Test</button>
              <button className="editor-btn">Deploy</button>
            </div>
            
            <div className="code-editor">
              <pre><code>{`// Bot Script Example
function onMessageReceived(message) {
  // Handle incoming message
  if (message.toLowerCase().includes('hello')) {
    return "Hello! How can I assist you today?";
  }
  
  if (message.toLowerCase().includes('help')) {
    return "I can help you with:\n1. Product information\n2. Support\n3. Sales";
  }
  
  return "I'm not sure how to respond to that. Let me connect you with an agent.";
}`}</code></pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderResults = () => (
    <div className="bot-results">
      <div className="results-header">
        <div className="success-icon">🎉</div>
        <h2>Bot Created Successfully!</h2>
        <p>Your chatbot "{botData.name}" is now ready to assist your customers</p>
      </div>

      <div className="bot-preview">
        <div className="preview-header">
          <div className="bot-avatar" style={{backgroundColor: botData.color}}>
            {botData.name.charAt(0).toUpperCase()}
          </div>
          <div className="bot-info">
            <h3>{botData.name}</h3>
            <span className="bot-status">🟢 Active</span>
          </div>
        </div>
        
        <div className="preview-content">
          <div className="bot-stats">
            <div className="stat-item">
              <span className="stat-value">0</span>
              <span className="stat-label">Conversations</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">0%</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">0s</span>
              <span className="stat-label">Avg Response Time</span>
            </div>
          </div>
          
          <div className="bot-actions">
            <button className="action-btn primary">🚀 Test Bot</button>
            <button className="action-btn secondary">📊 View Analytics</button>
            <button className="action-btn secondary">⚙️ Edit Bot</button>
          </div>
        </div>
      </div>

      <div className="next-steps">
        <h4>Next Steps</h4>
        <div className="steps-list">
          <div className="step-item">
            <span className="step-number">1</span>
            <div className="step-content">
              <h5>Test Your Bot</h5>
              <p>Try out your bot to ensure it responds correctly</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-number">2</span>
            <div className="step-content">
              <h5>Deploy to Website</h5>
              <p>Add the bot to your website using the embed code</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-number">3</span>
            <div className="step-content">
              <h5>Monitor Performance</h5>
              <p>Track bot performance and make improvements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="siq-page">
      <div className="siq-page-header">
        <h1>Zobot</h1>
        {currentStep > 0 && currentStep !== 'results' && (
          <div className="step-indicator">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
          </div>
        )}
      </div>

      <div className="siq-page-body">
        {currentStep === 0 && renderNoBotState()}
        
        {currentStep > 0 && currentStep !== 'results' && (
          <>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{width: `${(currentStep / steps.length) * 100}%`}}
              ></div>
            </div>
            
            <div className="step-navigation">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`step-item ${index + 1 === currentStep ? 'active' : index + 1 < currentStep ? 'completed' : ''}`}
                >
                  <div className="step-number">{index + 1}</div>
                  <div className="step-info">
                    <div className="step-title">{step.title}</div>
                    <div className="step-subtitle">{step.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="step-content">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </div>

            <div className="step-actions">
              {currentStep > 1 && (
                <button className="step-btn secondary" onClick={handlePrevious}>
                  Previous
                </button>
              )}
              
              {currentStep < steps.length ? (
                <button 
                  className="step-btn primary" 
                  onClick={handleNext}
                  disabled={currentStep === 2 && !botData.name}
                >
                  Next
                </button>
              ) : (
                <button className="step-btn primary" onClick={handleFinish}>
                  Finish & Create Bot
                </button>
              )}
            </div>
          </>
        )}
        
        {currentStep === 'results' && renderResults()}
      </div>
    </div>
  );
};

export default Zobot;
