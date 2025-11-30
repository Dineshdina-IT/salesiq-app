// src/pages/Upgrade.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Upgrade = () => {
  const navigate = useNavigate();

  const handleUpgrade = (plan) => {
    // In a real app, this would handle payment processing
    console.log(`Upgrading to ${plan} plan`);
    // For now, just go back to dashboard
    navigate('/onboard');
  };

  return (
    <div className="upgrade-container">
      <div className="upgrade-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>Upgrade Your Plan</h1>
        <p>Get more features and unlock the full potential of SalesIQ</p>
      </div>

      <div className="upgrade-plans">
        {/* Free Plan */}
        <div className="plan-card free">
          <div className="plan-header">
            <h3>Free</h3>
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">0</span>
              <span className="period">/month</span>
            </div>
            <p className="description">Perfect for getting started</p>
          </div>
          
          <div className="plan-features">
            <div className="feature">
              <span className="check">✓</span>
              <span>Up to 3 agents</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Basic chat features</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>100 visitors/month</span>
            </div>
            <div className="feature disabled">
              <span className="cross">✗</span>
              <span>Advanced analytics</span>
            </div>
            <div className="feature disabled">
              <span className="cross">✗</span>
              <span>Custom branding</span>
            </div>
            <div className="feature disabled">
              <span className="cross">✗</span>
              <span>Priority support</span>
            </div>
          </div>
          
          <button className="plan-btn current" disabled>
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="plan-card pro recommended">
          <div className="plan-badge">RECOMMENDED</div>
          <div className="plan-header">
            <h3>Professional</h3>
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">29</span>
              <span className="period">/month</span>
            </div>
            <p className="description">For growing teams</p>
          </div>
          
          <div className="plan-features">
            <div className="feature">
              <span className="check">✓</span>
              <span>Up to 10 agents</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Advanced chat features</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>1,000 visitors/month</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Advanced analytics</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Custom branding</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Email support</span>
            </div>
          </div>
          
          <button className="plan-btn primary" onClick={() => handleUpgrade('professional')}>
            Upgrade Now
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="plan-card enterprise">
          <div className="plan-header">
            <h3>Enterprise</h3>
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">99</span>
              <span className="period">/month</span>
            </div>
            <p className="description">For large organizations</p>
          </div>
          
          <div className="plan-features">
            <div className="feature">
              <span className="check">✓</span>
              <span>Unlimited agents</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>All features included</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Unlimited visitors</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Advanced analytics</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>White-label option</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Priority support 24/7</span>
            </div>
          </div>
          
          <button className="plan-btn" onClick={() => handleUpgrade('enterprise')}>
            Contact Sales
          </button>
        </div>
      </div>

      <div className="upgrade-footer">
        <div className="guarantee">
          <span className="icon">🛡️</span>
          <div>
            <h4>30-Day Money Back Guarantee</h4>
            <p>Try SalesIQ risk-free. If you're not satisfied, get a full refund.</p>
          </div>
        </div>
        
        <div className="support">
          <span className="icon">💬</span>
          <div>
            <h4>Need Help Choosing?</h4>
            <p>Our sales team is here to help you find the perfect plan.</p>
            <button className="support-btn">Chat with Sales</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
