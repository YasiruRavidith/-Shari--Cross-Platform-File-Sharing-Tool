import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { Lock, LogIn, Loader2, Eye, EyeOff, Share2 } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/login`, { password });
      onLogin(res.data.token);
    } catch (err) {
      alert('Login failed! Please check your password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header-card mb-6">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
          <Share2 size={40} color="white" strokeWidth={2.5} />
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: '900', margin: 0 }}>
            Shari
          </h1>
        </div>
        <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', opacity: 0.9, margin: 0 }}>
          Cross-Platform File Sharing Tool
        </p>
      </div>

      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        <div className="card">
          <div className="text-center mb-6">
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Lock size={32} color="white" />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>
              Welcome Back
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Enter your password to continue
            </p>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="password" style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="input"
                  style={{ paddingRight: '48px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#374151'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Login
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
