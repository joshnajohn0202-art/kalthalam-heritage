const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

// ✅ CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

// ✅ GET ALL BOOKINGS
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
