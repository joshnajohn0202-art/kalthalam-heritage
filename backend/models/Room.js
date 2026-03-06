const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    status: { type: String, default: "Available" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
