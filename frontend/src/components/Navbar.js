import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>

      {/* ✅ Logo */}
      <h2
        style={styles.logo}
        onClick={() => navigate("/")}
      >
        CampusCare
      </h2>

      {/* ✅ Right Section */}
      <div style={styles.rightSection}>

        <button
          style={styles.homeBtn}
          onClick={() => navigate("/")}
        >
          Home
        </button>

        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 35px",
    backgroundColor: "#3E2723",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },

  logo: {
    margin: 0,
    color: "#F4EFE6",
    fontSize: "26px",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "1px",
  },

  rightSection: {
    display: "flex",
    gap: "12px",
  },

  homeBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "1px solid #F4EFE6",
    background: "transparent",
    color: "#F4EFE6",
    cursor: "pointer",
    fontWeight: "bold",
  },

  logoutBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#A63D40",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navbar;