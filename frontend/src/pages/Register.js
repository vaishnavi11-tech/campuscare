import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const categories = ["Hostel", "Mess", "Academics", "Other"];

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    category: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/api/users/register", form);

      alert("Registration successful");

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* ✅ Clickable Logo */}
        <h1
          style={styles.logo}
          onClick={() => navigate("/")}
        >
          CampusCare
        </h1>

        <h3 style={styles.title}>Create Account</h3>

        <form
          onSubmit={handleRegister}
          style={styles.form}
        >

          {/* ✅ Name */}
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>
              Name
            </label>
          </div>

          {/* ✅ Email */}
          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>
              Email
            </label>
          </div>

          {/* ✅ Password */}
          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>
              Password
            </label>

            <span
              style={styles.toggle}
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* ✅ Role */}
          <div style={styles.inputGroup}>
            <select
              name="role"
              onChange={handleChange}
              style={styles.select}
            >
              <option value="student">
                Student
              </option>

              <option value="admin">
                Admin
              </option>

              <option value="staff">
                Staff
              </option>
            </select>
          </div>

          {/* ✅ Category Only For Staff */}
          {form.role === "staff" && (
            <div style={styles.inputGroup}>
              <select
                name="category"
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ✅ Button */}
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>

        {/* ✅ Redirect */}
        <p
          style={styles.link}
          onClick={() => navigate("/login")}
        >
          Already have an account? Login →
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
    background: "#6D1B1B",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    background: "#F4EFE6",
    padding: "38px",
    borderRadius: "16px",
    width: "340px",
    maxWidth: "90%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    textAlign: "center",
    border: "2px solid #3E2723",
  },

  logo: {
    color: "#6D1B1B",
    cursor: "pointer",
    marginBottom: "5px",
    fontSize: "32px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  title: {
    marginBottom: "25px",
    color: "#3E2723",
    fontWeight: "500",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  inputGroup: {
    position: "relative",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 70px 14px 14px",
    borderRadius: "10px",
    border: "1px solid #C8B6A6",
    background: "#FAF7F2",
    color: "#2B2B2B",
    outline: "none",
    fontSize: "14px",
  },

  select: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #C8B6A6",
    background: "#FAF7F2",
    color: "#2B2B2B",
    outline: "none",
    fontSize: "14px",
  },

  label: {
    position: "absolute",
    top: "-10px",
    left: "10px",
    fontSize: "12px",
    color: "#A63D40",
    background: "#F4EFE6",
    padding: "0 6px",
    fontWeight: "bold",
  },

  toggle: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "12px",
    color: "#A63D40",
    fontWeight: "bold",
  },

  button: {
    padding: "13px",
    borderRadius: "10px",
    border: "none",
    background: "#A63D40",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "8px",
    fontSize: "15px",
  },

  link: {
    marginTop: "18px",
    color: "#6D1B1B",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
};

export default Register;