import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

const categories = ["Hostel", "Mess", "Academics", "Other"];

const StudentDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hostel");
  const [priority, setPriority] = useState("Low");

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

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
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // ✅ Create Issue
  const createIssue = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!title || !description) {
        alert("Please fill all fields");
        return;
      }

      await API.post(
        "/api/issues",
        {
          title,
          description,
          category,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchIssues();

      setTitle("");
      setDescription("");
      setCategory("Hostel");
      setPriority("Low");

      alert("Issue created successfully ✅");
    } catch (err) {
      console.error(
        "Create error:",
        err.response?.data || err.message
      );
    }
  };

  // ✅ Filter + Search
  const filteredIssues =
    (filter === "All"
      ? issues
      : issues.filter(
          (issue) => issue.status === filter
        )
    ).filter((issue) =>
      issue.title
        .toLowerCase()
        .includes(search.toLowerCase())
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
          Student Dashboard
        </h1>

        <p
          style={{
            color: "#E8DCCF",
            marginBottom: "25px",
          }}
        >
          Manage and track your campus issues
        </p>

        {/* ✅ Create Issue */}
        <div className="card">
          <h3>Create Issue</h3>

          <input
            className="input"
            type="text"
            placeholder="Issue Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            className="input"
            type="text"
            placeholder="Issue Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <select
              className="select"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="select"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <br />

          <button
            className="btn btn-blue"
            onClick={createIssue}
            style={{
              background: "#A63D40",
              border: "none",
              color: "white",
              padding: "12px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Create Issue
          </button>
        </div>

        {/* ✅ Issue Section */}
        <h2
          style={{
            color: "#F4EFE6",
            marginTop: "35px",
          }}
        >
          Your Issues
        </h2>

        {/* ✅ Search */}
        <input
          type="text"
          placeholder="Search issues..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="input"
          style={{
            marginBottom: "15px",
          }}
        />

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
            style={{
              background:
                filter === "All"
                  ? "#7B1E1E"
                  : "#A63D40",
            }}
          >
            All
          </button>

          <button
            onClick={() =>
              setFilter("Pending")
            }
            style={{
              background:
                filter === "Pending"
                  ? "#7B1E1E"
                  : "#A63D40",
            }}
          >
            Pending
          </button>

          <button
            onClick={() =>
              setFilter("In Progress")
            }
            style={{
              background:
                filter === "In Progress"
                  ? "#7B1E1E"
                  : "#A63D40",
            }}
          >
            In Progress
          </button>

          <button
            onClick={() =>
              setFilter("Resolved")
            }
            style={{
              background:
                filter === "Resolved"
                  ? "#7B1E1E"
                  : "#A63D40",
            }}
          >
            Resolved
          </button>
        </div>

        {/* ✅ Issue Cards */}
        {filteredIssues.length === 0 ? (
          <div className="card">
            <h3>No Issues Found</h3>

            <p>
              Your reported issues will appear
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
                      issue.status === "Pending"
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
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default StudentDashboard;