import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate(); // ✅ important

  const handleLogout = () => {
    localStorage.clear(); // remove token + user
    navigate("/login");   // ✅ proper redirect
  };

  return (
    <div className="navbar">
      <span>Campus Issue System</span>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;