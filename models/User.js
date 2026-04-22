const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "admin", "staff"],
    default: "student"
  },

  // ✅ ADDED
  category: {
  type: String,
  enum: ["Hostel", "Mess", "Academics", "Other"],
  default: null
},

  createdAt: {
    type: Date,
    default: Date.now
  }
});

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

module.exports = mongoose.model("User", userSchema); 