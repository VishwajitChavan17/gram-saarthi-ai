import { useState, Suspense } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import UpcomingSchemes from "./pages/UpcomingSchemes";
import OngoingSchemes from "./pages/OngoingSchemes";
import MyApplications from "./pages/MyApplications";
import Navbar from "./components/Navbar";
import StorageService from "./utils/StorageService";

function AppContent() {
  const auth = useAuth();
  const user = auth?.user || null;
  const authLoading = auth?.loading || false;
  
  const [currentPage, setCurrentPage] = useState("home");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState(null);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setShowResults(false);
  };

  const handleFormSubmit = (data) => {
    StorageService.setEligibilityData(data);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const handleViewScheme = (schemeId) => {
    setSelectedSchemeId(schemeId);
  };

  const handleBack = () => {
    setShowResults(false);
    setSelectedSchemeId(null);
  };

  const renderContent = () => {
    // If not authenticated, show home page
    if (!user) {
      if (loading) {
        return (
          <div style={styles.loading}>
            <div style={styles.loadingSpinner}></div>
            <h2 style={styles.loadingText}>Analyzing your eligibility...</h2>
            <p style={{color: "#6b7280", marginTop: "12px"}}>
              Finding the perfect government schemes for you
            </p>
          </div>
        );
      } else if (showResults) {
        return <Results onBack={handleBack} />;
      } else {
        return <Home onSubmit={handleFormSubmit} />;
      }
    }

    // If authenticated, show navigation-based pages
    if (currentPage === "home") {
      if (loading) {
        return (
          <div style={styles.loading}>
            <div style={styles.loadingSpinner}></div>
            <h2 style={styles.loadingText}>Analyzing your eligibility...</h2>
            <p style={{color: "#6b7280", marginTop: "12px"}}>
              Finding the perfect government schemes for you
            </p>
          </div>
        );
      } else if (showResults) {
        return <Results onBack={handleBack} />;
      } else {
        return <Home onSubmit={handleFormSubmit} />;
      }
    } else if (currentPage === "dashboard") {
      return <Dashboard />;
    } else if (currentPage === "upcoming-schemes") {
      return <UpcomingSchemes onViewScheme={handleViewScheme} />;
    } else if (currentPage === "ongoing-schemes") {
      return <OngoingSchemes onViewScheme={handleViewScheme} />;
    } else if (currentPage === "my-applications") {
      return <MyApplications />;
    }

    return <Home onSubmit={handleFormSubmit} />;
  };

  if (authLoading) {
    return (
      <div style={styles.app}>
        <div style={styles.loading}>
          <div style={styles.loadingSpinner}></div>
          <h2 style={styles.loadingText}>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          html, body {
            margin: 0;
            padding: 0;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            nav {
              padding: 12px 16px !important;
            }
          }

          @media (max-width: 480px) {
            h1 {
              font-size: 28px !important;
            }
            h2 {
              font-size: 24px !important;
            }
            h3 {
              font-size: 18px !important;
            }
          }
        `}
      </style>
      <Navbar onNavigate={handleNavigation} currentPage={currentPage} />
      {renderContent()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif"
  },
  loading: {
    textAlign: "center",
    paddingTop: "120px",
    paddingBottom: "120px",
    color: "#1e3a8a"
  },
  loadingSpinner: {
    display: "inline-block",
    width: "40px",
    height: "40px",
    border: "4px solid #f3f4f6",
    borderTopColor: "#10b981",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px"
  },
  loadingText: {
    fontSize: "18px",
    fontWeight: "500"
  }
};

export default App;
