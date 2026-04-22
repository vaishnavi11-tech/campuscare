import React, { useEffect, useState } from "react";
import API from "../services/api"; // ✅ changed
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
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const createIssue = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!title || !description) {
        alert("Please fill all fields");
        return;
      }

      await API.post( // ✅ changed
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
      console.error("Create error:", err.response?.data || err.message);
    }
  };

  const sortByPriority = () => {
    const order = { High: 1, Medium: 2, Low: 3 };

    const sorted = [...issues].sort(
      (a, b) => order[a.priority] - order[b.priority]
    );

    setIssues(sorted);
  };

  const filteredIssues =
    (filter === "All"
      ? issues
      : issues.filter((issue) => issue.status === filter)
    ).filter((issue) =>
      issue.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>🎓 Student Dashboard</h1>
        <p style={{ color: "gray" }}>
          Manage and track your issues efficiently
        </p>

        <div className="card">
          <h3>Create Issue</h3>

          <input
            className="input"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <select
              className="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <br />

          <button className="btn btn-blue" onClick={createIssue}>
            Create Issue
          </button>
        </div>

        <h2>Your Issues</h2>

        <input
          type="text"
          placeholder="🔍 Search issues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
          style={{ marginBottom: "10px" }}
        />

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

          <button
            onClick={sortByPriority}
            style={{ marginLeft: "10px" }}
          >
            Sort by Priority
          </button>
        </div>

        {filteredIssues.length === 0 ? (
          <p style={{ color: "gray" }}>No issues found 🚀</p>
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
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default StudentDashboard;