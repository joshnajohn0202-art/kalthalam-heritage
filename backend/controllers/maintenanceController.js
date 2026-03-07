const Maintenance = require("../models/Maintenance");

// GET all maintenance requests
exports.getAllMaintenance = async (req, res) => {
  try {
    const data = await Maintenance.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new maintenance request
exports.createMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.create(req.body);
    res.status(201).json(maintenance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH update status
exports.updateMaintenanceStatus = async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Maintenance not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE maintenance
exports.deleteMaintenance = async (req, res) => {
  try {
    const deleted = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Maintenance not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
