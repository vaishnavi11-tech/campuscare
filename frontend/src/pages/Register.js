import React, { useState } from "react";
import API from "../services/api"; // ✅ changed
import { useNavigate } from "react-router-dom";

const categories = ["Hostel", "Mess", "Academics", "Other"];

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    category: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(form);

      await API.post("/api/users/register", form); // ✅ changed

      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
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
    select: {
      width: "100%",
      boxSizing: "border-box",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #9B0F06",
      background: "#fff3e0",
      color: "#333",
      outline: "none",
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleRegister} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              style={styles.input}
            />
            <label style={styles.label}>Name</label>
          </div>

          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              style={styles.input}
            />
            <label style={styles.label}>Email</label>
          </div>

          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              onChange={handleChange}
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

          <div style={styles.inputGroup}>
            <select
              name="role"
              onChange={handleChange}
              style={styles.select}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          {/* ✅ Category only for staff */}
          {form.role === "staff" && (
            <div style={styles.inputGroup}>
              <select
                name="category"
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={styles.link} onClick={() => navigate("/login")}>
          Already have an account? Login →
        </p>
      </div>
    </div>
  );
};

export default Register;