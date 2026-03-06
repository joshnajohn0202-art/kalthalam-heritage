const mongoose = require("mongoose");

const resortSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }
});

module.exports = mongoose.model("Resort", resortSchema);