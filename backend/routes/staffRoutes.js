const express = require("express");
const router = express.Router();
const Staff = require("../models/staff");

// GET all staff (EXCLUDING visitors)
router.get("/", async (req, res) => {
  try {
    // Role 'visitor' ALLATHA ellawareyum mathram find cheyyunnu
    const staff = await Staff.find({ role: { $ne: "visitor" } }); 
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET staff by name
router.get("/profile/:name", async (req, res) => {
  try {
    const staff = await Staff.findOne({ name: req.params.name });
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET staff by email
router.get("/by-email/:email", async (req, res) => {
  try {
    const staff = await Staff.findOne({ email: req.params.email });
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE new staff
router.post("/", async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE staff profile by name
router.put("/profile/:name", async (req, res) => {
  try {
    const updates = req.body;
    const updatedStaff = await Staff.findOneAndUpdate(
      { name: req.params.name },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json(updatedStaff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE staff approval status by id
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const isActive = status !== "Rejected";

    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      { $set: { status, isActive } },
      { new: true, runValidators: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json(updatedStaff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE staff by name
router.delete("/profile/:name", async (req, res) => {
  try {
    const deletedStaff = await Staff.findOneAndDelete({ name: req.params.name });
    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
