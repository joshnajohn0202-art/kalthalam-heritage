const mongoose = require("mongoose");

// Backward-compat: old complaint comments may store commenterModel as "Admin".
// Register a lightweight Admin model so legacy records never crash populate/reads.
if (!mongoose.models.Admin) {
  mongoose.model(
    "Admin",
    new mongoose.Schema({}, { strict: false, collection: "users" })
  );
}

const staffComplaintSchema = new mongoose.Schema(
  {
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    adminReply: {
      type: String,
      default: "",
      trim: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        commenter: {
          type: mongoose.Schema.Types.ObjectId,
          // Keep as plain ObjectId to avoid hard dependency on missing Admin model
          required: true,
        },
        commenterModel: {
          type: String,
          enum: ["Staff", "Admin", "User"],
          required: true,
        },
        message: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, collection: "staffcomplaints" }
);

module.exports = mongoose.model("StaffComplaint", staffComplaintSchema);
