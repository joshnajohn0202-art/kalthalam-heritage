const Feedback = require("../models/Feedback");

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!message) return res.status(400).json({ message: "message is required" });

    const feedback = await Feedback.create({
      name: name || "",
      email: email || "",
      message,
      status: "Pending",
      reply: "",
    });
    res.json({ message: "Feedback added", feedback });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resolveFeedback = async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Feedback not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.replyFeedback = async (req, res) => {
  try {
    const { reply } = req.body;
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { reply: reply || "" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Feedback not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Feedback not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
