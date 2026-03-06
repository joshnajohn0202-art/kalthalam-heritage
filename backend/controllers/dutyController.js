const Duty = require("../models/Duty");

// GET all duties
exports.getDuties = async (req, res) => {
  try {
    const duties = await Duty.find();
    res.json(duties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST duty
exports.addDuty = async (req, res) => {
  try {
    const duty = await Duty.create(req.body);
    res.json(duty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH duty status
exports.updateDutyStatus = async (req, res) => {
  try {
    const duty = await Duty.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!duty) return res.status(404).json({ message: "Duty not found" });

    res.json(duty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE duty
exports.deleteDuty = async (req, res) => {
  try {
    const duty = await Duty.findByIdAndDelete(req.params.id);
    if (!duty) return res.status(404).json({ message: "Duty not found" });

    res.json({ message: "Duty deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
