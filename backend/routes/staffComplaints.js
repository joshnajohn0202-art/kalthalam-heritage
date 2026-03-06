const express = require("express");
const router = express.Router();
const StaffComplaint = require("../models/staffComplaint");
const Staff = require("../models/staff");
const mongoose = require("mongoose");

async function fetchComplaintsSafe(filter = {}) {
  try {
    // Use lean() to avoid document hydration issues from legacy refPath data.
    const complaints = await StaffComplaint.find(filter).lean().sort({ createdAt: -1 });

    const staffIds = Array.from(
      new Set(
        complaints
          .map((c) => c.staff)
          .filter((id) => mongoose.Types.ObjectId.isValid(String(id)))
          .map((id) => String(id))
      )
    );

    let staffMap = new Map();
    if (staffIds.length > 0) {
      const staffRows = await Staff.find({ _id: { $in: staffIds } })
        .select("name email")
        .lean();
      staffMap = new Map(staffRows.map((s) => [String(s._id), s]));
    }

    return complaints.map((c) => ({
      ...c,
      staff: staffMap.get(String(c.staff)) || c.staff,
    }));
  } catch (queryError) {
    // Last-resort fallback: return basic collection data without schema parsing.
    const raw = await mongoose.connection.collection("staffcomplaints").find(filter).sort({ createdAt: -1 }).toArray();
    return raw;
  }
}

/**
 * GET all staff complaints
 */
router.get("/", async (req, res) => {
  try {
    const complaints = await fetchComplaintsSafe();
    res.json({ success: true, complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * GET complaints for a specific staff id
 */
router.get("/staff/:staffId", async (req, res) => {
  try {
    const { staffId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(staffId)) {
      return res.json({ success: true, complaints: [] });
    }

    const complaints = await fetchComplaintsSafe({ staff: staffId });
    res.json({ success: true, complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * POST create staff complaint
 */
router.post("/", async (req, res) => {
  try {
    const { staff, title, description, priority, assignedTo } = req.body;

    const complaint = new StaffComplaint({
      staff,
      title,
      description,
      priority: priority || "Medium",
      assignedTo: assignedTo || null,
    });

    await complaint.save();

    res.json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * PATCH update complaint (status, assign, add comment)
 */
router.patch("/:id", async (req, res) => {
  try {
    const { status, assignedTo, comment, commenter, commenterModel, adminReply } = req.body;

    const complaint = await StaffComplaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    // Update status
    if (status) complaint.status = status;

    // Update assignedTo
    if (assignedTo) complaint.assignedTo = assignedTo;

    // Add comment
    if (comment && commenter && commenterModel) {
      complaint.comments.push({ message: comment, commenter, commenterModel });
    }
    if (typeof adminReply === "string") {
      complaint.adminReply = adminReply.trim();
    }

    await complaint.save();

    const updated = await StaffComplaint.findById(req.params.id);

    res.json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * DELETE complaint
 */
router.delete("/:id", async (req, res) => {
  try {
    await StaffComplaint.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
