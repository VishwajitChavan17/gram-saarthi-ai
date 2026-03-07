import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import InputForm from '../components/InputForm';

const Home = ({ onCheckEligibility }) => {
  const { user } = useAuth();
  const [start, setStart] = useState(false);

  if (start && user) {
    return <InputForm onSubmit={onCheckEligibility} />;
  }

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>GOVERNMENT OF INDIA</h1>
          <h2 style={styles.heroSubtitle}>GRAMSAARTHI PORTAL</h2>
          <div style={styles.divider}></div>
          <p style={styles.heroText}>
            CENTRALIZED REPOSITORY FOR RURAL DEVELOPMENT SCHEMES AND DIRECT BENEFIT TRANSFERS.
            EMPOWERING EVERY CITIZEN WITH TRANSPARENT ACCESS TO PUBLIC WELFARE.
          </p>
          {user && (
            <button style={styles.heroButton} onClick={() => setStart(true)}>
              START ELIGIBILITY CHECK
            </button>
          )}
        </div>
      </section>

      {/* Main Action Area */}
      <div style={styles.mainContainer}>
        {!user && (
          <div style={styles.unauthenticatedSection}>
            <div style={styles.noticeBox}>
              <h3 style={styles.noticeTitle}>NOTICE TO CITIZENS</h3>
              <p style={styles.noticeText}>
                TO ACCESS THE ELIGIBILITY ENGINE AND APPLY FOR NATIONAL SCHEMES, 
                PLEASE SECURELY LOGIN TO YOUR ACCOUNT OR CREATE A NEW REGISTRATION.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Features/Guidelines Grid */}
      <section style={styles.infoSection}>
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <h4 style={styles.cardTitle}>SECURE ACCESS</h4>
            <p style={styles.cardText}>ALL DATA IS ENCRYPTED AND STORED IN COMPLIANCE WITH NATIONAL DATA PRIVACY STANDARDS.</p>
          </div>
          <div style={styles.infoCard}>
            <h4 style={styles.cardTitle}>DIRECT BENEFITS</h4>
            <p style={styles.cardText}>DBT ENABLED SCHEMES ENSURE ASSISTANCE REACHES YOUR REGISTERED BANK ACCOUNT DIRECTLY.</p>
          </div>
          <div style={styles.infoCard}>
            <h4 style={styles.cardTitle}>MULTILINGUAL</h4>
            <p style={styles.cardText}>ACCESS PORTAL IN YOUR PREFERRED REGIONAL LANGUAGE FOR BETTER CLARITY.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    width: '100%',
    backgroundColor: '#F3F4F6'
  },
  hero: {
    backgroundColor: '#11486B',
    padding: '80px 24px',
    textAlign: 'center',
    borderBottom: '8px solid #FF9933'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    fontWeight: '800',
    letterSpacing: '4px',
    margin: '0 0 12px 0'
  },
  heroSubtitle: {
    color: '#ffffff',
    fontSize: '48px',
    fontWeight: '900',
    letterSpacing: '6px',
    margin: '0 0 24px 0'
  },
  divider: {
    width: '80px',
    height: '4px',
    backgroundColor: '#FF9933',
    margin: '0 auto 24px auto'
  },
  heroText: {
    color: '#CBD5E1',
    fontSize: '13px',
    fontWeight: '700',
    lineHeight: '1.8',
    letterSpacing: '1px',
    margin: '0 0 32px 0',
    textTransform: 'uppercase'
  },
  heroButton: {
    padding: '16px 32px',
    backgroundColor: '#FF9933',
    color: '#ffffff',
    border: 'none',
    borderRadius: '2px',
    fontWeight: '900',
    fontSize: '14px',
    letterSpacing: '1px',
    cursor: 'pointer',
    boxShadow: '0 4px 0 #CC7A29'
  },
  mainContainer: {
    maxWidth: '1200px',
    margin: '-40px auto 0',
    padding: '0 24px',
    position: 'relative',
    zIndex: 10
  },
  unauthenticatedSection: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 0'
  },
  noticeBox: {
    backgroundColor: '#ffffff',
    border: '1px solid #CBD5E1',
    borderTop: '8px solid #11486B',
    padding: '40px',
    maxWidth: '600px',
    textAlign: 'center',
    borderRadius: '2px'
  },
  noticeTitle: {
    color: '#11486B',
    fontSize: '20px',
    fontWeight: '900',
    marginBottom: '16px',
    letterSpacing: '1px'
  },
  noticeText: {
    color: '#334155',
    fontSize: '13px',
    fontWeight: '700',
    lineHeight: '1.6',
    margin: 0
  },
  infoSection: {
    padding: '80px 24px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px'
  },
  infoCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #E2E8F0',
    borderLeft: '4px solid #11486B',
    padding: '24px',
    borderRadius: '2px'
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '900',
    color: '#11486B',
    marginBottom: '12px',
    letterSpacing: '1px'
  },
  cardText: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#64748B',
    lineHeight: '1.6',
    margin: 0
  }
};

export default Home;
