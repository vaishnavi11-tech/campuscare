const userRoutes = require("./routes/user");
console.log("APP FILE LOADED");
require("dotenv").config();
const issueRoutes = require("./routes/issueRoutes");



const express = require("express");
const roleCheck = require("./middleware/role");
const auth = require("./middleware/auth");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const connectDB = require("./config/db");
const User = require("./models/User");
const Issue = require("./models/Issue");

const app = express();


// connect DB
connectDB();


/* ================= FINAL CORS FIX ================= */

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// ✅ force allow everything (fix preflight)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

/* ================================================= */

app.use(express.json());
console.log("TEST ROUTE ADDED");
app.get("/api/test", auth, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user
  });
});
/* ---------- TEST ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("API WORKING");
});

/* =======================================================
   USER ROUTES
======================================================= */

// REGISTER
app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student"
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN
app.post("/api/users/login", async (req, res) => {
  console.log("LOGIN SECRET:", process.env.JWT_SECRET);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
        process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
       user: {
    id: user._id,
    email: user.email,
    role: user.role   // ✅ MUST BE HERE
  }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* =======================================================
   ISSUE ROUTES
======================================================= */

// CREATE ISSUE

  app.post("/api/issues", auth, roleCheck("student"), async (req, res) => {
  try {
const { title, description, category, priority } = req.body;
    const issue = new Issue({
      title,
      description,
      category,
      priority,
      createdBy: req.user.id,
      history: [
        {
          action: "Issue Created",
          performedBy: req.user.id
        }
      ]
    });

    const savedIssue = await issue.save();

    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET ALL ISSUES
app.get("/api/issues", auth, async (req, res) => {
  try {
    const { status, priority, category } = req.query;

    let filter = {};

    // ✅ ROLE BASED FILTER
    if (req.user.role === "student") {
      filter.createdBy = req.user.id;
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const issues = await Issue.find(filter)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET SINGLE ISSUE
app.get("/api/issues/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .populate("comments.user", "name");

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ASSIGN ISSUE

  app.put("/api/issues/:id/assign", auth, roleCheck("admin"), async (req, res) => {
  try {
    const { staffId, adminId } = req.body;

    const issue = await Issue.findById(req.params.id);

    issue.assignedTo = staffId;
    issue.status = "Assigned";

    issue.history.push({
      action: "Assigned to Staff",
      
      performedBy: req.user.id
    });

    await issue.save();

    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE STATUS

  app.put("/api/issues/:id/status", auth, roleCheck("staff"), async (req, res) => {
  try {
    const { status, userId } = req.body;

    const issue = await Issue.findById(req.params.id);

    issue.status = status;

    issue.history.push({
      action: `Status changed to ${status}`,
      performedBy: userId
    });

    await issue.save();

    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD COMMENT
app.post("/api/issues/:id/comment", async (req, res) => {
  try {
    const { text, userId } = req.body;

    const issue = await Issue.findById(req.params.id);

    issue.comments.push({
      text,
      user: userId
    });

    issue.history.push({
      action: "Comment added",
      performedBy: userId
    });

    await issue.save();

    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE ISSUE
app.delete("/api/issues/:id", async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.use("/api/issues", issueRoutes);
app.use("/api/users", userRoutes);

/* ---------- SERVER ---------- */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});