import { useState } from "react";
import StorageService from "../utils/StorageService";

function SchemeCard({ scheme }) {
  const [isApplied, setIsApplied] = useState(StorageService.isSchemeApplied(scheme.id));

  const handleApply = (e) => {
    e.preventDefault();
    StorageService.addAppliedScheme(scheme.id, { status: 'pending' });
    setIsApplied(true);
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.title}>{scheme.name}</h3>
        <div style={styles.badge}>ELIGIBLE</div>
      </div>
      <p style={styles.reason}>{scheme.reason}</p>
      <div style={styles.benefitsBox}>
        <span style={styles.benefitsLabel}>BENEFITS:</span>
        <p style={styles.benefits}>{scheme.benefits}</p>
      </div>
      <div style={styles.buttonGroup}>
        <button style={styles.learnMoreButton}>DETAILS</button>
        {!isApplied ? (
          <button onClick={handleApply} style={styles.applyButton}>
            APPLY NOW
          </button>
        ) : (
          <button style={styles.appliedButton} disabled>
            APPLIED
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "2px",
    border: "1px solid #CBD5E1",
    borderTop: "6px solid #11486B",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px"
  },
  title: {
    margin: 0,
    color: "#11486B",
    fontSize: "18px",
    fontWeight: "800",
    textTransform: "uppercase",
    lineHeight: "1.4",
    letterSpacing: "0.5px"
  },
  badge: {
    backgroundColor: "#11486B",
    color: "#ffffff",
    padding: "4px 10px",
    borderRadius: "2px",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
    flexShrink: 0
  },
  reason: {
    margin: 0,
    color: "#334155",
    fontSize: "14px",
    lineHeight: "1.6"
  },
  benefitsBox: {
    backgroundColor: "#F8FAFC",
    padding: "16px",
    borderRadius: "2px",
    borderLeft: "4px solid #FF9933"
  },
  benefitsLabel: {
    fontWeight: "800",
    color: "#11486B",
    display: "block",
    marginBottom: "8px",
    fontSize: "11px",
    letterSpacing: "1px"
  },
  benefits: {
    fontWeight: "700",
    color: "#0F172A",
    margin: 0,
    fontSize: "15px"
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "auto"
  },
  learnMoreButton: {
    flex: 1,
    backgroundColor: "transparent",
    border: "2px solid #11486B",
    borderRadius: "2px",
    padding: "12px",
    cursor: "pointer",
    color: "#11486B",
    fontWeight: "800",
    fontSize: "12px",
    letterSpacing: "1px"
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#FF9933",
    border: "none",
    borderRadius: "2px",
    padding: "12px",
    cursor: "pointer",
    color: "#ffffff",
    fontWeight: "800",
    fontSize: "12px",
    letterSpacing: "1px"
  },
  appliedButton: {
    flex: 1,
    backgroundColor: "#CBD5E1",
    border: "none",
    borderRadius: "2px",
    padding: "12px",
    cursor: "not-allowed",
    color: "#334155",
    fontWeight: "800",
    fontSize: "12px",
    letterSpacing: "1px"
  }
};

export default SchemeCard;
