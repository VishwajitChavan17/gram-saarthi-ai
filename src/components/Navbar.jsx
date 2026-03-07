import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onNavigate, currentPage }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    onNavigate('home');
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignupClick = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLogoClick = () => {
    onNavigate('home');
  };

  const NavLink = ({ label, page, onClick }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setShowUserMenu(false);
      }}
      style={{
        ...styles.navLink,
        ...(currentPage === page ? styles.navLinkActive : {})
      }}
    >
      {label}
    </button>
  );

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.container}>
          {/* Logo */}
          <button style={styles.logo} onClick={handleLogoClick}>
            GramSaarthi
          </button>

          {/* Navigation Links */}
          <div style={styles.navLinks}>
            {user && (
              <>
                <NavLink label="Home" page="home" />
                <NavLink label="Dashboard" page="dashboard" />
                <NavLink label="Upcoming Schemes" page="upcoming-schemes" />
                <NavLink label="Ongoing Schemes" page="ongoing-schemes" />
              </>
            )}
          </div>

          {/* User Section */}
          <div style={styles.userSection}>
            {user ? (
              <div style={styles.userMenu}>
                <button
                  style={styles.userButton}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <span style={styles.userAvatar}>{user.name.charAt(0).toUpperCase()}</span>
                  {user.name}
                </button>

                {showUserMenu && (
                  <div style={styles.dropdown}>
                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setShowUserMenu(false);
                      }}
                      style={styles.dropdownItem}
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('my-applications');
                        setShowUserMenu(false);
                      }}
                      style={styles.dropdownItem}
                    >
                      My Applications
                    </button>
                    <div style={styles.dropdownDivider}></div>
                    <button
                      onClick={handleLogout}
                      style={styles.dropdownItemDanger}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.authButtons}>
                <button
                  onClick={handleLoginClick}
                  style={styles.loginButton}
                >
                  Login
                </button>
                <button
                  onClick={handleSignupClick}
                  style={styles.signupButton}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModalComponent
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

const AuthModalComponent = ({ isOpen, onClose, initialMode }) => {
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
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  return (
    <>
      <div style={authStyles.overlay} onClick={onClose}></div>
      <div style={authStyles.modal}>
        <button style={authStyles.closeButton} onClick={onClose}>×</button>
        <h2 style={authStyles.title}>{mode === 'login' ? 'LOGIN' : 'SIGN UP'}</h2>
        <form onSubmit={handleSubmit} style={authStyles.form}>
          {mode === 'signup' && (
            <div style={authStyles.formGroup}>
              <label style={authStyles.label}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={authStyles.input}
              />
            </div>
          )}
          <div style={authStyles.formGroup}>
            <label style={authStyles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={authStyles.input}
            />
          </div>
          <div style={authStyles.formGroup}>
            <label style={authStyles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={authStyles.input}
            />
          </div>
          {error && <div style={authStyles.error}>{error}</div>}
          <button type="submit" style={authStyles.submitButton}>
            {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>
        <div style={authStyles.footer}>
          <p style={authStyles.toggleText}>
            {mode === 'login' ? "New user? " : 'Already registered? '}
            <button type="button" onClick={toggleMode} style={authStyles.toggleButton}>
              {mode === 'login' ? 'Register Now' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#11486B',
    borderBottom: '4px solid #FF9933',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '32px',
    flexWrap: 'wrap'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#ffffff',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    letterSpacing: '2px',
    textTransform: 'uppercase'
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
    flex: 1,
    justifyContent: 'center'
  },
  navLink: {
    border: 'none',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    padding: '8px 4px',
    borderBottom: '3px solid transparent'
  },
  navLinkActive: {
    color: '#ffffff',
    borderBottom: '3px solid #ffffff'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  userMenu: {
    position: 'relative'
  },
  userButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '2px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backgroundColor: 'transparent',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  userAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '2px',
    backgroundColor: '#ffffff',
    color: '#11486B',
    fontWeight: '800'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '8px',
    backgroundColor: '#ffffff',
    borderRadius: '2px',
    border: '1px solid #CBD5E1',
    minWidth: '180px',
    zIndex: 1000,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  dropdownItem: {
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#334155',
    fontSize: '12px',
    fontWeight: '700',
    textAlign: 'left',
    cursor: 'pointer',
    textTransform: 'uppercase'
  },
  dropdownItemDanger: {
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#991B1B',
    fontSize: '12px',
    fontWeight: '700',
    textAlign: 'left',
    cursor: 'pointer',
    textTransform: 'uppercase'
  },
  dropdownDivider: {
    height: '1px',
    backgroundColor: '#E2E8F0'
  },
  authButtons: {
    display: 'flex',
    gap: '12px'
  },
  loginButton: {
    padding: '10px 20px',
    borderRadius: '2px',
    border: '1px solid #ffffff',
    backgroundColor: 'transparent',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '12px',
    textTransform: 'uppercase'
  },
  signupButton: {
    padding: '10px 20px',
    borderRadius: '2px',
    border: 'none',
    backgroundColor: '#FF9933',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '12px',
    textTransform: 'uppercase'
  }
};

const authStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    zIndex: 1001
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    borderRadius: '2px',
    border: '1px solid #CBD5E1',
    borderTop: '6px solid #11486B',
    padding: '32px',
    maxWidth: '400px',
    width: '90%',
    zIndex: 1002
  },
  closeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#64748B'
  },
  title: {
    fontSize: '20px',
    color: '#11486B',
    marginBottom: '24px',
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: '1px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#334155',
    textTransform: 'uppercase'
  },
  input: {
    padding: '10px 14px',
    borderRadius: '2px',
    border: '1px solid #CBD5E1',
    fontSize: '14px'
  },
  error: {
    padding: '10px',
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
    fontSize: '12px',
    fontWeight: '600'
  },
  submitButton: {
    padding: '12px',
    borderRadius: '2px',
    border: 'none',
    backgroundColor: '#11486B',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '14px',
    marginTop: '8px'
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center'
  },
  toggleText: {
    color: '#64748B',
    fontSize: '12px',
    margin: 0
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#11486B',
    cursor: 'pointer',
    fontWeight: '700',
    textDecoration: 'underline',
    textTransform: 'uppercase'
  }
};

export default Navbar;
