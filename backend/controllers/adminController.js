const Booking = require("../models/booking");
const User = require("../models/user");
const Staff = require("../models/staff");
const Cottage = require("../models/cottage");
const Feedback = require("../models/Feedback");
const StaffComplaint = require("../models/staffComplaint");

/* =========================
   DASHBOARD STATS
========================= */
exports.getDashboardStats = async (req, res) => {
  try {
    // BASIC COUNTS (do not change)
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalStaff = await Staff.countDocuments();
    const totalCottages = await Cottage.countDocuments();

    // BOOKING STATUS COUNTS
    const completedBookings = await Booking.countDocuments({
      status: { $in: ["Completed", "Approved"] },
    });
    const cancelledBookings = await Booking.countDocuments({
      status: { $in: ["Cancelled", "Rejected"] },
    });
    const pendingBookings = await Booking.countDocuments({
      status: { $in: ["Pending", "Assigned", "In Progress"] },
    });

    // TODAY BOOKINGS
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayBookings = await Booking.countDocuments({
      createdAt: { $gte: todayStart },
    });

    // STAFF STATUS
    const activeWorkers = await Staff.countDocuments({ status: "Approved", isActive: { $ne: false } });
    const inactiveWorkers = await Staff.countDocuments({
      $or: [{ status: "Rejected" }, { isActive: false }],
    });
    const pendingApprovals = await Staff.countDocuments({ status: "Pending" });

    // TODAY REVENUE (Completed only)
    const revenueAgg = await Booking.aggregate([
      {
        $match: {
          status: { $in: ["Completed", "Approved"] },
          createdAt: { $gte: todayStart },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $ifNull: ["$totalPrice", 0] } },
        },
      },
    ]);

    const todayRevenue = revenueAgg.length ? revenueAgg[0].total : 0;

    // COMPLAINTS (safe)
    const userComplaintsTotal = await Feedback.countDocuments();
    const userComplaintsResolved = await Feedback.countDocuments({ status: "Resolved" });
    const staffComplaintsTotal = await StaffComplaint.countDocuments();
    const staffComplaintsResolved = await StaffComplaint.countDocuments({ status: "Resolved" });

    const totalComplaints = userComplaintsTotal + staffComplaintsTotal;
    const resolvedComplaints = userComplaintsResolved + staffComplaintsResolved;

    res.json({
      totalBookings,
      totalUsers,
      totalStaff,
      totalCottages,

      completedBookings,
      cancelledBookings,
      pendingBookings,
      todayBookings,

      activeWorkers,
      inactiveWorkers,
      pendingApprovals,

      todayRevenue,
      totalComplaints,
      resolvedComplaints,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};

/* =========================
   BOOKINGS
========================= */
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("staff", "name email role")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      status: req.body.status || "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Booking created",
      booking,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("staff", "name email role");

    if (!updated) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, booking: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================
   STAFF
========================= */
exports.addStaff = async (req, res) => {
  try {
    const staff = await Staff.create({
      ...req.body,
      isActive: true,
    });

    res.json({
      success: true,
      message: "Staff added",
      staff,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   REPORTS (PLACEHOLDER)
========================= */
exports.getReports = async (req, res) => {
  try {
    res.json({
      bookings: [],
      payments: [],
      staff: [],
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};
