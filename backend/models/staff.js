const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  temporaryAddress: { type: String, default: "" }, // optional
  joinDate: { type: String, required: true }, // YYYY-MM-DD
   // 🔽 NEW FIELDS
  gender: {
    type: String,
    default: "N/A"
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  age: {
    type: Number,
    default: null
  },
  bloodGroup: {
    type: String,
    default: "N/A"
  },
  education: {
    qualification: { type: String, default: "" },
    specialization: { type: String, default: "" },
    institution: { type: String, default: "" },
    year: { type: String, default: "" },
    gpa: { type: String, default: "" },
  },
  experience: {
    totalYears: { type: String, default: "" },
    previousCompany: { type: String, default: "" },
    lastDesignation: { type: String, default: "" },
    keySkills: { type: String, default: "" },
  },
  family: {
    fatherName: { type: String, default: "" },
    motherName: { type: String, default: "" },
    maritalStatus: { type: String, default: "" },
    spouseName: { type: String, default: "" },
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Approved",
  },
  isActive: {
    type: Boolean,
    default: true,
  }

}, { timestamps: true });

module.exports = mongoose.model("Staff", staffSchema);
