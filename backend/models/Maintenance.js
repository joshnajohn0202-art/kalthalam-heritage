const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    room: { type: String, required: true },
    issue: { type: String, required: true },
    workerType: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Assigned", "In Progress", "Completed"], // ✅ Added "Assigned"
      default: "Pending",
    },
    staff: { type: String }, // optional, for your table
    role: { type: String },  // optional
    shift: { type: String }  // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
