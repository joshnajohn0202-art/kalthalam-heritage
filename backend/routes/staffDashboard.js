const express = require("express");
const router = express.Router();
const StaffDashboard = require("../models/StaffDashboard");

/* =========================
   POST : SAVE DASHBOARD
========================= */
router.post("/dashboard", async (req, res) => {
  try {
    const dashboard = await StaffDashboard.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.status(201).json({
      message: "Dashboard saved successfully",
      dashboard,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   GET : FETCH DASHBOARD
========================= */
router.get("/dashboard", async (req, res) => {
  try {
    const dashboard = await StaffDashboard.findOne();
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
