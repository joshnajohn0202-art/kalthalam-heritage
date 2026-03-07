const mongoose = require("mongoose");

const dutySchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", default: null },
  staff: { type: String, required: true },
  role: { type: String, required: true },
  shift: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Duty", dutySchema);
