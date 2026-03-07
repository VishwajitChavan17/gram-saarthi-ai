import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (mode === 'login') {
      try {
        login(email, password);
        onClose();
      } catch (err) {
        setError('Login failed. Please try again.');
      }
    } else {
      if (!name) {
        setError('Please fill in all required fields');
        return;
      }
      try {
        signup(email, password, name);
        onClose();
      } catch (err) {
        setError('Signup failed. Please try again.');
      }
    }

    setEmail('');
    setPassword('');
    setName('');
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose}></div>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>×</button>
        
        <h2 style={styles.title}>
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {mode === 'signup' && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={styles.input}
              />
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.submitButton}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.toggleText}>
            {mode === 'login' 
              ? "Don't have an account? " 
              : 'Already have an account? '}
            <button
              type="button"
              onClick={toggleMode}
              style={styles.toggleButton}
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '450px',
    width: '90%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    zIndex: 1000
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '28px',
    cursor: 'pointer',
    color: '#6b7280'
  },
  title: {
    fontSize: '28px',
    color: '#1e3a8a',
    marginBottom: '24px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  error: {
    padding: '12px 16px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderRadius: '8px',
    fontSize: '14px'
  },
  submitButton: {
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#10b981',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    marginTop: '12px',
    transition: 'all 0.3s ease'
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center'
  },
  toggleText: {
    color: '#6b7280',
    fontSize: '14px',
    margin: 0
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#1e3a8a',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline'
  }
};

export default AuthModal;
