const express = require("express");
const router = express.Router();
const Cottage = require("../models/cottage");

// ✅ CREATE ROOM / COTTAGE
router.post("/", async (req, res) => {
  try {
    const room = await Cottage.create(req.body);
    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// ✅ GET ALL ROOMS
router.get("/", async (req, res) => {
  try {
    const rooms = await Cottage.find();
    res.json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
