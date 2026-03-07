import SchemeCard from "../components/SchemeCard";
import { mockSchemes } from "../data/mockData";

function Results({ onBack }) {
  return (
    <div style={styles.resultsPage}>
      {/* Informational Banner */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <h2 style={styles.bannerTitle}>ELIGIBILITY CONFIRMED</h2>
          <p style={styles.bannerText}>MATCHING RECORDS FOUND IN NATIONAL SCHEME DATABASE</p>
        </div>
      </div>

      {/* Results Container */}
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.heading}>RECOMMENDED SCHEMES</h2>
          <p style={styles.subtext}>
            BASED ON YOUR PROFILE, THE FOLLOWING SCHEMES ARE AVAILABLE FOR IMMEDIATE APPLICATION
          </p>
        </div>

        <div style={styles.schemesGrid}>
          {mockSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>

        <div style={styles.actionButtons}>
          <button style={styles.backButton} onClick={onBack}>
            ← NEW SEARCH
          </button>
          <button style={styles.applyButton}>
            OFFICIAL DOCUMENTATION
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  resultsPage: {
    width: "100%",
    paddingBottom: "80px"
  },
  banner: {
    backgroundColor: "#11486B",
    padding: "40px 24px",
    textAlign: "center",
    borderBottom: "6px solid #FF9933"
  },
  bannerContent: {
    maxWidth: "800px",
    margin: "0 auto"
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: "32px",
    fontWeight: "900",
    marginBottom: "8px",
    letterSpacing: "4px",
    margin: 0
  },
  bannerText: {
    color: "#CBD5E1",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "2px",
    margin: 0
  },
  container: {
    maxWidth: "1000px",
    margin: "40px auto 0",
    padding: "0 24px"
  },
  header: {
    marginBottom: "32px",
    borderBottom: "2px solid #E2E8F0",
    paddingBottom: "24px"
  },
  heading: {
    fontSize: "24px",
    marginBottom: "8px",
    color: "#11486B",
    fontWeight: "900",
    letterSpacing: "1px"
  },
  subtext: {
    color: "#64748B",
    margin: 0,
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px"
  },
  schemesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginBottom: "40px"
  },
  actionButtons: {
    display: "flex",
    gap: "24px",
    marginTop: "40px",
    paddingTop: "40px",
    borderTop: "1px solid #CBD5E1"
  },
  backButton: {
    flex: 1,
    padding: "16px",
    border: "2px solid #11486B",
    borderRadius: "2px",
    backgroundColor: "transparent",
    color: "#11486B",
    cursor: "pointer",
    fontWeight: "800",
    fontSize: "13px",
    letterSpacing: "1px"
  },
  applyButton: {
    flex: 1,
    padding: "16px",
    border: "none",
    borderRadius: "2px",
    backgroundColor: "#FF9933",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "800",
    fontSize: "13px",
    letterSpacing: "1px"
  }
};

export default Results;
