const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const admin = require("../controllers/adminController");

// router.use(authMiddleware);

/* Dashboard */
router.get("/dashboard", admin.getDashboardStats);

/* Bookings */
router.get("/bookings", admin.getBookings);
router.post("/bookings", admin.createBooking);
router.patch("/bookings/:id/status", admin.updateBookingStatus);
router.delete("/bookings/:id", admin.deleteBooking);

/* Staff */
router.post("/staff", admin.addStaff);

/* Reports */
router.get("/reports", admin.getReports);

module.exports = router;
