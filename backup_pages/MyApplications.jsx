import React, { useState, useEffect } from 'react';
import StorageService from '../utils/StorageService';
import { getSchemeById } from '../data/mockData';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const appliedSchemes = StorageService.getAppliedSchemes();
    setApplications(appliedSchemes);
  }, []);

  const getSchemeDetails = (schemeId) => {
    return getSchemeById(schemeId);
  };

  const handleRemoveApplication = (schemeId) => {
    StorageService.removeAppliedScheme(schemeId);
    setApplications(applications.filter(app => app.schemeId !== schemeId));
  };

  const handleUpdateStatus = (schemeId, newStatus) => {
    const updatedApplications = applications.map(app => 
      app.schemeId === schemeId ? { ...app, status: newStatus } : app
    );
    
    updatedApplications.forEach(app => {
      StorageService.addAppliedScheme(app.schemeId, { status: app.status });
    });
    
    setApplications(updatedApplications);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Applications</h1>
        <p style={styles.subtitle}>
          Track and manage your scheme applications
        </p>
      </div>

      {applications.length > 0 ? (
        <div style={styles.applicationsList}>
          {applications.map(application => {
            const scheme = getSchemeDetails(application.schemeId);
            if (!scheme) return null;

            return (
              <div key={application.schemeId} style={styles.applicationCard}>
                <div style={styles.cardContent}>
                  <div style={styles.schemeInfo}>
                    <h3 style={styles.schemeName}>{scheme.name}</h3>
                    <p style={styles.schemeCategory}>{scheme.category}</p>
                  </div>

                  <div style={styles.applicationDetails}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Application Date:</span>
                      <span style={styles.detailValue}>
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Status:</span>
                      <span style={{
                        ...styles.detailValue,
                        ...styles.statusBadge,
                        ...(application.status === 'approved' ? styles.statusApproved :
                            application.status === 'rejected' ? styles.statusRejected :
                            styles.statusPending)
                      }}>
                        {application.status || 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={styles.actions}>
                  <select
                    value={application.status || 'pending'}
                    onChange={(e) => handleUpdateStatus(application.schemeId, e.target.value)}
                    style={styles.statusSelect}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => handleRemoveApplication(application.schemeId)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No applications yet</p>
          <p style={styles.emptySubtext}>
            Start exploring schemes and apply to find government benefits you qualify for
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 24px'
  },
  header: {
    marginBottom: '40px'
  },
  title: {
    fontSize: '36px',
    color: '#1e3a8a',
    fontWeight: 'bold',
    margin: '0 0 12px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0
  },
  applicationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  applicationCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '2px solid #10b981',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  cardContent: {
    flex: 1,
    minWidth: '250px'
  },
  schemeInfo: {
    marginBottom: '16px'
  },
  schemeName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1e3a8a',
    margin: '0 0 4px 0'
  },
  schemeCategory: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
    fontWeight: '500'
  },
  applicationDetails: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: '16px 32px'
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  detailLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  detailValue: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1e3a8a'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block'
  },
  statusPending: {
    backgroundColor: '#fef3c7',
    color: '#92400e'
  },
  statusApproved: {
    backgroundColor: '#d1fae5',
    color: '#065f46'
  },
  statusRejected: {
    backgroundColor: '#fee2e2',
    color: '#991b1b'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  statusSelect: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '2px solid #e5e7eb',
    backgroundColor: '#ffffff',
    color: '#374151',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  removeButton: {
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
  },
  emptyState: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '60px 24px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
  },
  emptyText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e3a8a',
    margin: '0 0 8px 0'
  },
  emptySubtext: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  }
};

export default MyApplications;
