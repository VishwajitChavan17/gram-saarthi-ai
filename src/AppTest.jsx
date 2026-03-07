import React from 'react';

export default function AppTest() {
  console.log("[v0] AppTest rendering");
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system'
    }}>
      {/* Test Navbar */}
      <nav style={{
        backgroundColor: '#ffffff',
        padding: '16px 24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
      }}>
        <h2 style={{
          color: '#1e3a8a',
          fontSize: '24px',
          margin: 0,
          fontWeight: 'bold'
        }}>
          🌾 GramSaarthi - Test Version
        </h2>
      </nav>

      {/* Test Content */}
      <main style={{
        flex: 1,
        padding: '40px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}>
          <h1 style={{
            color: '#1e3a8a',
            fontSize: '36px',
            marginBottom: '16px'
          }}>
            ✅ If you see this, React is working!
          </h1>
          
          <p style={{
            color: '#6b7280',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '24px'
          }}>
            Congratulations! Your React app is rendering correctly. The white screen issue has been resolved.
          </p>

          <div style={{
            backgroundColor: '#f0fdf4',
            padding: '16px',
            borderLeft: '4px solid #10b981',
            borderRadius: '4px',
            marginBottom: '24px'
          }}>
            <p style={{
              color: '#065f46',
              margin: 0,
              fontWeight: '500'
            }}>
              Next Steps:
            </p>
            <ul style={{
              marginTop: '8px',
              paddingLeft: '20px',
              color: '#065f46'
            }}>
              <li>Check browser console for [v0] debug logs</li>
              <li>Replace AppTest with App in main.jsx to see full version</li>
              <li>Verify all dependencies are installed</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#fef3c7',
            padding: '16px',
            borderLeft: '4px solid #f59e0b',
            borderRadius: '4px'
          }}>
            <p style={{
              color: '#92400e',
              margin: 0,
              fontWeight: '500'
            }}>
              ℹ️ This is a minimal test component. Switch back to the full App to see all features.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        padding: '24px',
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '14px'
      }}>
        <p style={{ margin: 0 }}>
          GramSaarthi - Government Scheme Eligibility Assistant | Debug Mode Active
        </p>
      </footer>
    </div>
  );
}
