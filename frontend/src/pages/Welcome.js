import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>CampusCare</h2>
      </nav>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heading}>
          Smart Campus Issue Management System
        </h1>
        <p style={styles.subText}>
          Report issues, track progress, and improve your campus experience.
        </p>

        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>

      {/* Features */}
      <div style={styles.features}>
        <div style={styles.card}>
          <h3>📌 Easy Reporting</h3>
          <p>Submit issues quickly with category & priority.</p>
        </div>

        <div style={styles.card}>
          <h3>📊 Track Status</h3>
          <p>Real-time updates on your complaints.</p>
        </div>

        <div style={styles.card}>
          <h3>⚡ Fast Resolution</h3>
          <p>Efficient handling by admin panel.</p>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 CampusCare | Built for Students</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "#9B0F06", // 🔴 main background
    minHeight: "100vh",
    color: "#EED9B9", // 🟤 text
  },

  navbar: {
    padding: "15px 40px",
    backgroundColor: "#5E0006", // ❤️ dark red
  },

  logo: {
    margin: 0,
    fontSize: "24px",
    color: "#EED9B9",
    letterSpacing: "1px",
  },

  hero: {
    textAlign: "center",
    marginTop: "120px",
  },

  heading: {
    fontSize: "42px",
    marginBottom: "20px",
    color: "#EED9B9",
  },

  subText: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#ffd6c9",
  },

  primaryBtn: {
    padding: "14px 30px",
    borderRadius: "8px",
    border: "none",
    background: "#D53E0F", // 🟠 button
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },

  features: {
    display: "flex",
    justifyContent: "center",
    marginTop: "80px",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    backgroundColor: "#EED9B9", // 🟤 card
    padding: "20px",
    borderRadius: "12px",
    width: "250px",
    textAlign: "center",
    color: "#5E0006",
    border: "2px solid #5E0006",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },

  footer: {
    textAlign: "center",
    marginTop: "60px",
    padding: "20px",
    backgroundColor: "#5E0006",
    color: "#EED9B9",
  },
};

export default Welcome;