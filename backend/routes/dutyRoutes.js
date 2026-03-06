const express = require("express");
const Duty = require("../models/Duty");
const Staff = require("../models/staff");

const router = express.Router();

// ==================== CRUD ROUTES ====================

// Create duty
router.post("/", async (req, res) => {
  try {
    const { staffId, staff, role, shift, date, status } = req.body;

    if ((!staff && !staffId) || !role || !shift) {
      return res.status(400).json({ message: "staff/staffId, role, and shift are required" });
    }
    let staffName = (staff || "").trim();
    let resolvedStaffId = staffId || null;

    if (resolvedStaffId && !staffName) {
      const staffDoc = await Staff.findById(resolvedStaffId).select("name");
      staffName = staffDoc?.name || "";
    }

    if (!resolvedStaffId && staffName) {
      const staffDoc = await Staff.findOne({ name: staffName }).select("_id");
      resolvedStaffId = staffDoc?._id || null;
    }

    if (!staffName) {
      return res.status(400).json({ message: "valid staff is required" });
    }

    const duty = await Duty.create({
      staffId: resolvedStaffId,
      staff: staffName,
      role,
      shift,
      date: date || new Date().toISOString().split("T")[0],
      status: status || "Pending"
    });

    res.status(201).json(duty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all duties
router.get("/", async (req, res) => {
  try {
    const duties = await Duty.find();
    res.json(duties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get duties for a specific staff
router.get("/staff/:staffName", async (req, res) => {
  try {
    const duties = await Duty.find({ staff: req.params.staffName });
    if (!duties.length) {
      return res.status(404).json({ message: "No duty assigned" });
    }
    res.json(duties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update duty
router.put("/:id", async (req, res) => {
  try {
    const duty = await Duty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!duty) return res.status(404).json({ message: "Duty not found" });
    res.json(duty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update duty status
router.patch("/:id/status", async (req, res) => {
  try {
    const duty = await Duty.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!duty) return res.status(404).json({ message: "Duty not found" });
    res.json(duty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete duty
router.delete("/:id", async (req, res) => {
  try {
    const duty = await Duty.findByIdAndDelete(req.params.id);
    if (!duty) return res.status(404).json({ message: "Duty not found" });
    res.json({ message: "Duty deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
