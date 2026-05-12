import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [staffList, setStaffList] = useState([]);

  // ✅ Statistics
  const totalIssues = issues.length;

  const pendingIssues = issues.filter(
    (issue) => issue.status === "Pending"
  ).length;

  const resolvedIssues = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  const assignedIssues = issues.filter(
    (issue) => issue.status === "Assigned"
  ).length;

  // ✅ Fetch Issues
  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/issues", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIssues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch Staff
  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/users/staff", {
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

  // ✅ Assign Issue
  const assignIssue = async (issueId, staffId) => {
    if (!staffId) return;

    try {
      const token = localStorage.getItem("token");

      await API.put(
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

        {/* ✅ Statistics Cards */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >
          <div className="card">
            <h3>Total Issues</h3>
            <p>{totalIssues}</p>
          </div>

          <div className="card">
            <h3>Pending</h3>
            <p>{pendingIssues}</p>
          </div>

          <div className="card">
            <h3>Resolved</h3>
            <p>{resolvedIssues}</p>
          </div>

          <div className="card">
            <h3>Assigned</h3>
            <p>{assignedIssues}</p>
          </div>
        </div>

        {/* ✅ Issue List */}
        {issues.length === 0 ? (
          <div className="card">
            <h3>No Issues Found</h3>
            <p>All reported issues will appear here.</p>
          </div>
        ) : (
          issues.map((issue) => (
            <div className="card" key={issue._id}>
              <h3>{issue.title}</h3>

              <p>{issue.description}</p>

              {/* ✅ Status */}
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      issue.status === "Resolved"
                        ? "green"
                        : issue.status === "Pending"
                        ? "orange"
                        : "#007bff",
                    fontWeight: "bold",
                  }}
                >
                  {issue.status}
                </span>
              </p>

              {/* ✅ Priority */}
              <p>
                <strong>Priority:</strong>{" "}
                <span
                  style={{
                    color:
                      issue.priority === "High"
                        ? "red"
                        : issue.priority === "Medium"
                        ? "orange"
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  {issue.priority}
                </span>
              </p>

              {/* ✅ Category */}
              <p>
                <strong>Category:</strong> {issue.category}
              </p>

              {/* ✅ Created Date */}
              <p>
                <strong>Created:</strong>{" "}
                {new Date(issue.createdAt).toLocaleDateString()}
              </p>

              {/* ✅ Staff Assignment */}
              <select
                onChange={(e) =>
                  assignIssue(issue._id, e.target.value)
                }
              >
                <option value="">Select Staff</option>

                {staffList
                  .filter(
                    (staff) =>
                      staff.category === issue.category
                  )
                  .map((staff) => (
                    <option
                      key={staff._id}
                      value={staff._id}
                    >
                      {staff.name} ({staff.category})
                    </option>
                  ))}
              </select>

              {/* ✅ Assigned Staff */}
              <p style={{ marginTop: "10px" }}>
                <strong>Assigned To:</strong>{" "}
                {issue.assignedTo
                  ? issue.assignedTo.name
                  : "Not Assigned"}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminDashboard;