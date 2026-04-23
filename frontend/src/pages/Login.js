import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/api/users/login", {
        email,
        password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user.role;

      if (role === "student") navigate("/student");
      else if (role === "admin") navigate("/admin");
      else if (role === "staff") navigate("/staff");

    } catch (error) {
      console.error(error);
      alert("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <label style={styles.label}>Email</label>
          </div>

          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <label style={styles.label}>Password</label>

            <span
              style={styles.toggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.link} onClick={() => navigate("/register")}>
          Don't have an account? Register →
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#9B0F06",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#EED9B9",
    padding: "35px",
    borderRadius: "14px",
    width: "320px",
    maxWidth: "90%",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
    border: "3px solid #5E0006",
  },
  title: {
    marginBottom: "20px",
    color: "#5E0006",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    position: "relative",
    marginBottom: "18px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 70px 12px 12px",
    borderRadius: "8px",
    border: "1px solid #9B0F06",
    background: "#fff3e0",
    color: "#333",
    outline: "none",
  },
  label: {
    position: "absolute",
    top: "-10px",
    left: "10px",
    fontSize: "12px",
    color: "#D53E0F",
    background: "#EED9B9",
    padding: "0 5px",
  },
  toggle: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "12px",
    color: "#D53E0F",
    fontWeight: "bold",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#D53E0F",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "5px",
  },
  link: {
    marginTop: "15px",
    color: "#5E0006",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Login;