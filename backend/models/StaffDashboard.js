// models/StaffDashboard.js
const mongoose = require("mongoose");

const StaffDashboardSchema = new mongoose.Schema({
  stats: {
    dutiesToday: Number,
    pendingTasks: Number,
    completedTasks: Number,
  },
  attendance: String,
  recentDuties: [
    {
      task: String,
      status: String,
    },
  ],
});

module.exports = mongoose.model("StaffDashboard", StaffDashboardSchema);
