const express = require("express");
const router = express.Router();
const Maintenance = require("../models/Maintenance");

// GET all maintenance records
router.get("/", async (req, res) => {
  try {
    const records = await Maintenance.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST single maintenance record
router.post("/", async (req, res) => {
  try {
    const maintenance = new Maintenance(req.body);
    const saved = await maintenance.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST multiple records (bulk insert)
router.post("/bulk", async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "Request body must be an array" });
    }
    const records = await Maintenance.insertMany(req.body);
    res.status(201).json(records);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH maintenance status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT full update
router.put("/:id", async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE maintenance record
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
