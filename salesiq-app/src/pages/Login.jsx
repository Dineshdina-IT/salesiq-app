import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL; 
  // Example: https://your-backend.onrender.com

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/onboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">

        {/* Left Section */}
        <div className="login-left">
          <div className="login-brand">
            <div className="brand-logo">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="8" fill="#1F4788" />
                <path d="M24 12L32 18V36H16V18L24 12Z" fill="white" />
                <circle cx="24" cy="28" r="3" fill="#1F4788" />
              </svg>
            </div>
            <h1>SalesIQ</h1>
            <p>Replica</p>
          </div>

          <div className="login-benefits">
            <h2>Welcome Back!</h2>
            <p>Connect with your customers in real-time</p>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">💬</div>
                <div className="benefit-text">
                  <h3>Live Chat</h3>
                  <p>Engage visitors instantly</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">👥</div>
                <div className="benefit-text">
                  <h3>Visitor Tracking</h3>
                  <p>Monitor visitor behavior</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">📊</div>
                <div className="benefit-text">
                  <h3>Analytics</h3>
                  <p>Get actionable insights</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">🔔</div>
                <div className="benefit-text">
                  <h3>Notifications</h3>
                  <p>Never miss a conversation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="login-right">
          <div className="login-form-container">
            <h2>Sign In</h2>
            <p className="login-subtitle">Enter your credentials to access your account</p>

            {error && (
              <div className="error-alert">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                  <span className="input-icon">✉️</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" disabled={loading} />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="login-divider">
              <span>or</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-button google" disabled={loading}>
                <span>🔵</span> Google
              </button>
              <button type="button" className="social-button microsoft" disabled={loading}>
                <span>🟦</span> Microsoft
              </button>
            </div>

            <div className="login-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="signup-link">
                  Create one
                </Link>
              </p>
            </div>
          </div>

          <div className="login-footer-text">
            <p>© 2024 SalesIQ Replica. All rights reserved.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
