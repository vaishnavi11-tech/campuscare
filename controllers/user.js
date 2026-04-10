const User = require("../models/User");

// ✅ Get all staff users
const getStaffUsers = async (req, res) => {
  try {
    const staff = await User.find({ role: "staff" }).select("-password");
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getStaffUsers };