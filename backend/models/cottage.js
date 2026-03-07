const mongoose = require("mongoose");

const cottageSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, sparse: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cottage", cottageSchema);
