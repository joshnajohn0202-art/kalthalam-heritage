const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

router.get("/", async (req, res) => {
  try {
    const email = String(req.query.email || "").trim().toLowerCase();
    const query = email ? { email } : {};

    const bookings = await Booking.find(query)
      .populate("user", "name email")
      .populate("staff", "name email role")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = {
      ...req.body,
      email: String(req.body.email || "").trim().toLowerCase(),
      guestName: String(req.body.guestName || "").trim(),
      status: req.body.status || "Pending",
    };

    if (!payload.cottage || !payload.checkIn || !payload.checkOut || !payload.email) {
      return res.status(400).json({ message: "cottage, checkIn, checkOut and email are required" });
    }

    const booking = await Booking.create(payload);
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.email) payload.email = String(payload.email).trim().toLowerCase();

    const updated = await Booking.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: "Booking not found" });

    res.json({ success: true, booking: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });

    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
