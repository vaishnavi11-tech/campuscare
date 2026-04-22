const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum:  ["Hostel", "Mess", "Academics", "Other"],
      required: true
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    status: {
      type: String,
      enum: ["Pending", "Assigned", "In Progress", "Resolved", "Closed"],
      default: "Pending"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    comments: [
      {
        text: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    history: [
      {
        action: String,
        performedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);