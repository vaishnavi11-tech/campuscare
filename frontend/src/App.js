import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Landing Page */}
        <Route path="/" element={<Welcome />} />

        {/* ✅ Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Dashboards */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;