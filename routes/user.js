const express = require("express");
const router = express.Router();

const { getStaffUsers } = require("../controllers/user");

router.get("/staff", getStaffUsers);

module.exports = router;  // ✅ VERY IMPORTANT