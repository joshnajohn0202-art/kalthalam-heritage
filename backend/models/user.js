const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
    isBlocked: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ["admin", "staff", "visitor"],
      default: "visitor"
    },
    phone: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
    state: {
      type: String,
      default: ""
    },
    zipCode: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: "India"
    },
    gender: {
      type: String,
      default: ""
    },
    dateOfBirth: {
      type: String,
      default: ""
    },
    fatherName: {
      type: String,
      default: ""
    },
    motherName: {
      type: String,
      default: ""
    },
    bio: {
      type: String,
      default: ""
    },
    profileImage: {
      type: String,
      default: ""
    },
    emergencyContact: {
      type: String,
      default: ""
    },
    emergencyContactName: {
      type: String,
      default: ""
    },
    totalBookings: {
      type: Number,
      default: 0
    },
    loyaltyPoints: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    resetToken: String,
    resetTokenExpiry: Date
  },
  { timestamps: true }
);

// 🔥 OverwriteModelError FIX
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
