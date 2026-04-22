import React, { useEffect, useState } from "react";
import API from "../services/api"; // ✅ changed
import Navbar from "../components/Navbar";
import "../App.css";

const StaffDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/issues", { // ✅ changed
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = JSON.parse(localStorage.getItem("user"));

      const assignedIssues = res.data.filter(
        (issue) => issue.assignedTo?._id === user.id
      );

      setIssues(assignedIssues);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      await API.put( // ✅ changed
        `/api/issues/${id}/status`,
        {
          status,
          userId: user.id,
        },
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

  const filteredIssues =
    filter === "All"
      ? issues
      : issues.filter((issue) => issue.status === filter);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>🛠️ Staff Dashboard</h1>

        <div style={{ marginBottom: "15px" }}>
          <p>Total: {issues.length}</p>
          <p>Pending: {issues.filter(i => i.status === "Pending").length}</p>
          <p>In Progress: {issues.filter(i => i.status === "In Progress").length}</p>
          <p>Resolved: {issues.filter(i => i.status === "Resolved").length}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("Pending")} style={{ marginLeft: "5px" }}>
            Pending
          </button>
          <button onClick={() => setFilter("In Progress")} style={{ marginLeft: "5px" }}>
            In Progress
          </button>
          <button onClick={() => setFilter("Resolved")} style={{ marginLeft: "5px" }}>
            Resolved
          </button>
        </div>

        {filteredIssues.length === 0 ? (
          <p style={{ color: "gray" }}>No assigned issues 🚀</p>
        ) : (
          filteredIssues.map((issue) => (
            <div className="card" key={issue._id}>
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>

              <p>
                Status:{" "}
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "13px",
                    backgroundColor:
                      issue.status === "Pending"
                        ? "#f39c12"
                        : issue.status === "In Progress"
                        ? "#3498db"
                        : "#2ecc71",
                  }}
                >
                  {issue.status}
                </span>
              </p>

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
                  }}
                >
                  {issue.priority}
                </span>
              </p>

              <p><strong>Category:</strong> {issue.category}</p>

              <br />

              <button
                className="btn btn-yellow"
                onClick={() => updateStatus(issue._id, "In Progress")}
              >
                Start Work
              </button>

              <button
                className="btn btn-green"
                style={{ marginLeft: "10px" }}
                onClick={() => updateStatus(issue._id, "Resolved")}
              >
                Mark Resolved
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default StaffDashboard;