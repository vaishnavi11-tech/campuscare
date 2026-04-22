import React, { useState } from "react";
import API from "../services/api"; // ✅ changed
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

      const res = await API.post( // ✅ changed
        "/api/users/login",
        { email, password }
      );

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

const styles = { /* unchanged */ };

export default Login;