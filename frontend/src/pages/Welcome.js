import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      {/* ✅ Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>CampusCare</h2>

        <div style={styles.navButtons}>
          <button
            style={styles.navBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            style={styles.registerBtn}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heading}>
          Smart Campus Issue
          <br />
          Management System
        </h1>

        <p style={styles.subText}>
          Report campus issues, track complaint
          progress, and streamline resolution
          workflows for students, staff, and
          administrators.
        </p>

        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>

      {/* ✅ Features */}
      <div style={styles.features}>

        <div style={styles.card}>
          <h3>Issue Reporting</h3>

          <p>
            Submit and manage campus issues with
            categories and priorities.
          </p>
        </div>

        <div style={styles.card}>
          <h3>Status Tracking</h3>

          <p>
            Monitor complaint progress with real-time
            workflow updates.
          </p>
        </div>

        <div style={styles.card}>
          <h3>Smart Assignment</h3>

          <p>
            Category-based staff assignment for
            efficient issue handling.
          </p>
        </div>

      </div>

      {/* ✅ Footer */}
      <footer style={styles.footer}>
        © 2026 CampusCare • MERN Stack Project
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "#6D1B1B",
    minHeight: "100vh",
    color: "#F4EFE6",
  },

  /* ✅ Navbar */
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 45px",
    backgroundColor: "#3E2723",
  },

  logo: {
    margin: 0,
    fontSize: "28px",
    color: "#F4EFE6",
    letterSpacing: "1px",
    fontWeight: "bold",
  },

  navButtons: {
    display: "flex",
    gap: "12px",
  },

  navBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "1px solid #F4EFE6",
    background: "transparent",
    color: "#F4EFE6",
    cursor: "pointer",
    fontWeight: "bold",
  },

  registerBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#A63D40",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  /* ✅ Hero */
  hero: {
    textAlign: "center",
    marginTop: "110px",
    padding: "0 20px",
  },

  heading: {
    fontSize: "52px",
    marginBottom: "25px",
    lineHeight: "1.2",
    color: "#F4EFE6",
  },

  subText: {
    fontSize: "18px",
    marginBottom: "35px",
    color: "#E8DCCF",
    maxWidth: "700px",
    marginInline: "auto",
    lineHeight: "1.7",
  },

  primaryBtn: {
    padding: "15px 34px",
    borderRadius: "10px",
    border: "none",
    background: "#A63D40",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
  },

  /* ✅ Features */
  features: {
    display: "flex",
    justifyContent: "center",
    marginTop: "90px",
    gap: "24px",
    flexWrap: "wrap",
    paddingBottom: "70px",
  },

  card: {
    backgroundColor: "#F4EFE6",
    padding: "28px",
    borderRadius: "16px",
    width: "260px",
    textAlign: "center",
    color: "#3E2723",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },

  /* ✅ Footer */
  footer: {
    textAlign: "center",
    padding: "22px",
    backgroundColor: "#3E2723",
    color: "#E8DCCF",
    fontSize: "14px",
  },
};

export default Welcome;