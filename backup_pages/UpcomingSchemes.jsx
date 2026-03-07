import React, { useState } from 'react';
import { getUpcomingSchemes } from '../data/mockData';
import StorageService from '../utils/StorageService';

const UpcomingSchemes = ({ onViewScheme }) => {
  const schemes = getUpcomingSchemes();
  const [savedSchemes, setSavedSchemes] = useState(StorageService.getSavedSchemes());
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...new Set(schemes.map(s => s.category))];
  
  const filteredSchemes = filterCategory === 'all' 
    ? schemes 
    : schemes.filter(s => s.category === filterCategory);

  const handleSaveScheme = (schemeId, e) => {
    e.stopPropagation();
    if (savedSchemes.includes(schemeId)) {
      StorageService.removeSavedScheme(schemeId);
      setSavedSchemes(savedSchemes.filter(id => id !== schemeId));
    } else {
      StorageService.addSavedScheme(schemeId);
      setSavedSchemes([...savedSchemes, schemeId]);
    }
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .upcoming-schemes-header {
              padding: 40px 20px !important;
            }
            .filter-buttons {
              flex-wrap: wrap !important;
            }
            .schemes-grid {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 480px) {
            .upcoming-schemes-header {
              padding: 24px 16px !important;
            }
            .upcoming-title {
              font-size: 24px !important;
            }
            .filter-buttons {
              gap: 8px !important;
            }
            .filter-button {
              padding: 8px 12px !important;
              font-size: 12px !important;
            }
          }
        `}
      </style>
      <div style={styles.container}>
      <div style={styles.header} className="upcoming-schemes-header">
        <h1 style={styles.title} className="upcoming-title">Upcoming Schemes</h1>
        <p style={styles.subtitle}>
          Discover new government schemes coming soon to help you
        </p>
      </div>

      {/* Filter Section */}
      <div style={styles.filterSection}>
        <label style={styles.filterLabel}>Filter by Category:</label>
        <div style={styles.filterButtons} className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              style={{
                ...styles.filterButton,
                ...(filterCategory === category ? styles.filterButtonActive : {})
              }}
              className="filter-button"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div style={styles.schemesGrid} className="schemes-grid">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map(scheme => (
            <div key={scheme.id} style={styles.schemeCard}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.schemeName}>{scheme.name}</h3>
                  <span style={styles.categoryBadge}>{scheme.category}</span>
                </div>
                <button
                  onClick={(e) => handleSaveScheme(scheme.id, e)}
                  style={{
                    ...styles.saveButton,
                    ...(savedSchemes.includes(scheme.id) ? styles.saveButtonActive : {})
                  }}
                >
                  {savedSchemes.includes(scheme.id) ? '♥' : '♡'}
                </button>
              </div>

              <p style={styles.description}>{scheme.description}</p>

              <div style={styles.benefitsBox}>
                <span style={styles.benefitsLabel}>Benefits:</span>
                <p style={styles.benefits}>{scheme.benefits}</p>
              </div>

              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Coming:</span>
                  <span style={styles.infoValue}>
                    {new Date(scheme.applicationDeadline).toLocaleDateString()}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Eligibility:</span>
                  <span style={styles.infoValue}>
                    {scheme.eligibility.slice(0, 1).join(', ')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onViewScheme(scheme.id)}
                style={styles.viewButton}
              >
                Learn More →
              </button>
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
            <p>No upcoming schemes found in this category.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
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
  filterSection: {
    marginBottom: '40px',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    display: 'block',
    marginBottom: '12px'
  },
  filterButtons: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  filterButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    backgroundColor: '#ffffff',
    color: '#6b7280',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  },
  filterButtonActive: {
    borderColor: '#10b981',
    backgroundColor: '#10b981',
    color: '#ffffff'
  },
  schemesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px'
  },
  schemeCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  schemeName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1e3a8a',
    margin: '0 0 8px 0'
  },
  categoryBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  saveButton: {
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#d1d5db'
  },
  saveButtonActive: {
    color: '#ef4444'
  },
  description: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
    margin: '0 0 16px 0'
  },
  benefitsBox: {
    backgroundColor: '#f0fdf4',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px'
  },
  benefitsLabel: {
    fontWeight: '600',
    color: '#1e3a8a',
    display: 'block',
    marginBottom: '6px',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  benefits: {
    fontWeight: 'bold',
    color: '#065f46',
    margin: 0,
    fontSize: '15px'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  infoLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  infoValue: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1e3a8a'
  },
  viewButton: {
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#10b981',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    marginTop: 'auto'
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px 20px',
    color: '#6b7280'
  }
};

export default UpcomingSchemes;
