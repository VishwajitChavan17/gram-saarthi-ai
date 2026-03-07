import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StorageService from '../utils/StorageService';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [appliedSchemes, setAppliedSchemes] = useState([]);
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [eligibilityData, setEligibilityData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const storedProfile = StorageService.getUserProfile();
    const storedAppliedSchemes = StorageService.getAppliedSchemes();
    const storedSavedSchemes = StorageService.getSavedSchemes();
    const storedEligibility = StorageService.getEligibilityData();

    setProfile(storedProfile || {});
    setAppliedSchemes(storedAppliedSchemes);
    setSavedSchemes(storedSavedSchemes);
    setEligibilityData(storedEligibility);
    setFormData(storedProfile || {});
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    StorageService.setUserProfile(formData);
    setProfile(formData);
    setEditMode(false);
  };

  const getApplicationStats = () => {
    const pending = appliedSchemes.filter(app => app.status === 'pending' || !app.status).length;
    const approved = appliedSchemes.filter(app => app.status === 'approved').length;
    const rejected = appliedSchemes.filter(app => app.status === 'rejected').length;

    return { pending, approved, rejected };
  };

  const stats = getApplicationStats();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.pageTitle}>BENEFICIARY DASHBOARD</h2>
        <p style={styles.pageSubtitle}>OFFICIAL PORTAL FOR SCHEME MANAGEMENT AND TRACKING</p>
      </header>

      {/* Profile Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>USER PROFILE</h3>
          {!editMode && (
            <button onClick={() => setEditMode(true)} style={styles.editButton}>EDIT RECORD</button>
          )}
        </div>
        
        <div style={styles.profileBox}>
          <div style={styles.avatar}>{user?.name.charAt(0).toUpperCase()}</div>
          <div style={styles.profileDetails}>
            <div style={styles.profileRow}>
              <span style={styles.detailLabel}>APPLICANT NAME:</span>
              <span style={styles.detailValue}>{user?.name}</span>
            </div>
            <div style={styles.profileRow}>
              <span style={styles.detailLabel}>REGISTERED EMAIL:</span>
              <span style={styles.detailValue}>{user?.email}</span>
            </div>
            {profile && Object.entries(profile).map(([key, value]) => (
              value && key !== 'name' && (
                <div key={key} style={styles.profileRow}>
                  <span style={styles.detailLabel}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                  <span style={styles.detailValue}>{value}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {editMode && (
          <form style={styles.form}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>FULL NAME</label>
                <input type="text" name="fullName" value={formData.fullName || ''} onChange={handleInputChange} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>AGE</label>
                <input type="number" name="age" value={formData.age || ''} onChange={handleInputChange} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>OCCUPATION</label>
                <select name="occupation" value={formData.occupation || ''} onChange={handleInputChange} style={styles.input}>
                  <option value="">SELECT OCCUPATION</option>
                  <option value="farmer">FARMER</option>
                  <option value="laborer">LABORER</option>
                  <option value="self-employed">SELF-EMPLOYED</option>
                  <option value="employee">EMPLOYEE</option>
                  <option value="student">STUDENT</option>
                  <option value="other">OTHER</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>ANNUAL INCOME</label>
                <input type="number" name="income" value={formData.income || ''} onChange={handleInputChange} style={styles.input} />
              </div>
            </div>
            <div style={styles.formActions}>
              <button type="button" onClick={handleSaveProfile} style={styles.saveButton}>SAVE CHANGES</button>
              <button type="button" onClick={() => setEditMode(false)} style={styles.cancelButton}>CANCEL</button>
            </div>
          </form>
        )}
      </section>

      {/* Statistics Section */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>APPLICATION STATUS SUMMARY</h3>
        <div style={styles.statsGrid}>
          <div style={{...styles.statCard, borderTopColor: '#11486B'}}>
            <div style={styles.statNumber}>{appliedSchemes.length}</div>
            <div style={styles.statLabel}>TOTAL SUBMITTED</div>
          </div>
          <div style={{...styles.statCard, borderTopColor: '#FF9933'}}>
            <div style={styles.statNumber}>{stats.pending}</div>
            <div style={styles.statLabel}>UNDER REVIEW</div>
          </div>
          <div style={{...styles.statCard, borderTopColor: '#10B981'}}>
            <div style={styles.statNumber}>{stats.approved}</div>
            <div style={styles.statLabel}>APPROVED</div>
          </div>
          <div style={{...styles.statCard, borderTopColor: '#EF4444'}}>
            <div style={styles.statNumber}>{stats.rejected}</div>
            <div style={styles.statLabel}>REJECTED</div>
          </div>
        </div>
      </section>

      {/* Recent Applications Section */}
      {appliedSchemes.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>APPLICATION TRACKING</h3>
          <div style={styles.list}>
            {appliedSchemes.slice(-5).reverse().map((app) => (
              <div key={app.schemeId} style={styles.listItem}>
                <div style={styles.listItemMain}>
                  <h4 style={styles.schemeName}>GOVERNMENT BENEFIT APPLICATION</h4>
                  <span style={styles.appDate}>SUBMITTED: {new Date(app.appliedAt).toLocaleDateString()}</span>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  ...(app.status === 'approved' ? styles.statusApproved : 
                     app.status === 'rejected' ? styles.statusRejected : 
                     styles.statusPending)
                }}>
                  {app.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  header: {
    borderBottom: '4px solid #11486B',
    paddingBottom: '20px'
  },
  pageTitle: {
    fontSize: '28px',
    color: '#11486B',
    fontWeight: '900',
    margin: 0,
    letterSpacing: '2px'
  },
  pageSubtitle: {
    fontSize: '11px',
    color: '#64748B',
    fontWeight: '700',
    margin: '8px 0 0 0',
    letterSpacing: '1px'
  },
  section: {
    backgroundColor: '#ffffff',
    border: '1px solid #CBD5E1',
    borderRadius: '2px',
    padding: '32px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: '16px'
  },
  sectionTitle: {
    fontSize: '16px',
    color: '#11486B',
    fontWeight: '800',
    margin: 0,
    letterSpacing: '1px'
  },
  editButton: {
    padding: '8px 16px',
    borderRadius: '2px',
    border: '1px solid #11486B',
    backgroundColor: 'transparent',
    color: '#11486B',
    fontWeight: '800',
    fontSize: '11px',
    cursor: 'pointer'
  },
  profileBox: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center'
  },
  avatar: {
    width: '80px',
    height: '80px',
    backgroundColor: '#11486B',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: '900',
    borderRadius: '2px'
  },
  profileDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  profileRow: {
    display: 'flex',
    borderBottom: '1px solid #F1F5F9',
    paddingBottom: '8px'
  },
  detailLabel: {
    width: '180px',
    fontSize: '11px',
    fontWeight: '800',
    color: '#64748B'
  },
  detailValue: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#1E293B'
  },
  form: {
    marginTop: '32px',
    paddingTop: '32px',
    borderTop: '1px solid #E2E8F0'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#334155'
  },
  input: {
    padding: '10px 14px',
    borderRadius: '2px',
    border: '1px solid #CBD5E1',
    fontSize: '14px'
  },
  formActions: {
    display: 'flex',
    gap: '16px'
  },
  saveButton: {
    padding: '12px 24px',
    backgroundColor: '#11486B',
    color: '#ffffff',
    border: 'none',
    fontWeight: '800',
    fontSize: '13px',
    cursor: 'pointer'
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#64748B',
    border: '1px solid #CBD5E1',
    fontWeight: '800',
    fontSize: '13px',
    cursor: 'pointer'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px'
  },
  statCard: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #CBD5E1',
    borderTopWidth: '6px',
    padding: '24px',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#11486B',
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: '1px'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  listItem: {
    padding: '20px',
    border: '1px solid #E2E8F0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  schemeName: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#11486B',
    margin: '0 0 4px 0'
  },
  appDate: {
    fontSize: '11px',
    color: '#94A3B8',
    fontWeight: '600'
  },
  statusBadge: {
    padding: '6px 16px',
    fontSize: '10px',
    fontWeight: '900',
    borderRadius: '2px',
    letterSpacing: '1px'
  },
  statusPending: {
    backgroundColor: '#FF9933',
    color: '#ffffff'
  },
  statusApproved: {
    backgroundColor: '#10B981',
    color: '#ffffff'
  },
  statusRejected: {
    backgroundColor: '#EF4444',
    color: '#ffffff'
  }
};

export default Dashboard;
