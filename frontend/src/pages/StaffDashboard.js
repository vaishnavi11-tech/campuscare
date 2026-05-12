import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

const StaffDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("All");

  // ✅ Fetch Assigned Issues
  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/issues", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const assignedIssues = res.data.filter(
        (issue) =>
          issue.assignedTo?._id === user.id
      );

      setIssues(assignedIssues);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // ✅ Update Status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await API.put(
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

  // ✅ Filters
  const filteredIssues =
    filter === "All"
      ? issues
      : issues.filter(
          (issue) =>
            issue.status === filter
        );

  return (
    <>
      <Navbar />

      <div className="container">

        {/* ✅ Heading */}
        <h1
          style={{
            color: "#F4EFE6",
            marginBottom: "5px",
          }}
        >
          Staff Dashboard
        </h1>

        <p
          style={{
            color: "#E8DCCF",
            marginBottom: "25px",
          }}
        >
          Manage assigned campus issues
        </p>

        {/* ✅ Statistics */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >

          <div className="card">
            <h3>Total</h3>
            <p>{issues.length}</p>
          </div>

          <div className="card">
            <h3>Pending</h3>

            <p>
              {
                issues.filter(
                  (i) =>
                    i.status === "Pending"
                ).length
              }
            </p>
          </div>

          <div className="card">
            <h3>In Progress</h3>

            <p>
              {
                issues.filter(
                  (i) =>
                    i.status ===
                    "In Progress"
                ).length
              }
            </p>
          </div>

          <div className="card">
            <h3>Resolved</h3>

            <p>
              {
                issues.filter(
                  (i) =>
                    i.status ===
                    "Resolved"
                ).length
              }
            </p>
          </div>
        </div>

        {/* ✅ Filters */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            onClick={() =>
              setFilter("Pending")
            }
          >
            Pending
          </button>

          <button
            onClick={() =>
              setFilter("In Progress")
            }
          >
            In Progress
          </button>

          <button
            onClick={() =>
              setFilter("Resolved")
            }
          >
            Resolved
          </button>
        </div>

        {/* ✅ Issue Cards */}
        {filteredIssues.length === 0 ? (
          <div className="card">
            <h3>No Assigned Issues</h3>

            <p>
              Assigned issues will appear
              here.
            </p>
          </div>
        ) : (
          filteredIssues.map((issue) => (
            <div
              className="card"
              key={issue._id}
            >
              <h3>{issue.title}</h3>

              <p>{issue.description}</p>

              {/* ✅ Status */}
              <p>
                <strong>Status:</strong>{" "}

                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "13px",
                    backgroundColor:
                      issue.status ===
                      "Pending"
                        ? "#f39c12"
                        : issue.status ===
                          "In Progress"
                        ? "#3498db"
                        : "#2ecc71",
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
                      issue.priority ===
                      "High"
                        ? "red"
                        : issue.priority ===
                          "Medium"
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
                <strong>Category:</strong>{" "}
                {issue.category}
              </p>

              {/* ✅ Created Date */}
              <p>
                <strong>Created:</strong>{" "}
                {new Date(
                  issue.createdAt
                ).toLocaleDateString()}
              </p>

              <br />

              {/* ✅ Actions */}
              <button
                className="btn-yellow"
                onClick={() =>
                  updateStatus(
                    issue._id,
                    "In Progress"
                  )
                }
              >
                Start Work
              </button>

              <button
                className="btn-green"
                style={{
                  marginLeft: "10px",
                }}
                onClick={() =>
                  updateStatus(
                    issue._id,
                    "Resolved"
                  )
                }
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