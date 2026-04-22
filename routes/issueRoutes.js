const express = require("express");
const router = express.Router();

const {
  createIssue,
  getIssues,
} = require("../controllers/issue");  // ✅ NEW NAMEcd
const authMiddleware = require("../middleware/auth");

// ✅ ROUTES
router.post("/", authMiddleware, createIssue);
router.get("/", authMiddleware, getIssues);

module.exports = router;