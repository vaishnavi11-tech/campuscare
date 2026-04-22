import React, { useEffect, useState } from "react";
import API from "../services/api"; // ✅ changed
import Navbar from "../components/Navbar";
import "../App.css";

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/issues", { // ✅ changed
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIssues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/users/staff", { // ✅ changed
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStaffList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssues();
    fetchStaff();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put( // ✅ changed
        `/api/issues/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchIssues();
    } catch (err) {
      console.error(err);
    }
  };

  const assignIssue = async (issueId, staffId) => {
    if (!staffId) return;

    try {
      const token = localStorage.getItem("token");

      await API.put( // ✅ changed
        `/api/issues/${issueId}/assign`,
        { staffId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchIssues();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Admin Dashboard</h1>

        {issues.length === 0 ? (
          <p>No issues found</p>
        ) : (
          issues.map((issue) => (
            <div className="card" key={issue._id}>
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>

              <p><strong>Status:</strong> {issue.status}</p>
              <p><strong>Priority:</strong> {issue.priority}</p>
              <p><strong>Category:</strong> {issue.category}</p>

              <select onChange={(e) => assignIssue(issue._id, e.target.value)}>
                <option>Select Staff</option>

                {staffList.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.name} ({staff.category})
                  </option>
                ))}
              </select>

              <br /><br />

              <button onClick={() => updateStatus(issue._id, "In Progress")}>
                In Progress
              </button>

              <button onClick={() => updateStatus(issue._id, "Resolved")}>
                Resolve
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminDashboard;