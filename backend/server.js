const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const staffRoutes = require("./routes/staffRoutes");
const dutyRoutes = require("./routes/dutyRoutes");
const complaintRoutes = require("./routes/staffComplaints");
const feedbackRoutes = require("./routes/feedbackRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { seedCatalogData } = require("./seed/catalogSeed");

const app = express();

// Backward-compat model for legacy refs like commenterModel: "Admin"
if (!mongoose.models.Admin) {
  mongoose.model(
    "Admin",
    new mongoose.Schema({}, { strict: false, collection: "users" })
  );
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/duties", dutyRoutes);
app.use("/api/staff-complaints", complaintRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/catalog", catalogRoutes);

app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/admin", adminUserRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected Successfully ✅");

    await seedCatalogData();

    // ----- Create default staff profile/login -----
    const Staff = require("./models/staff");
    const User = require("./models/User");
    const bcrypt = require("bcryptjs");

    try {
      const existingStaff = await Staff.findOne({ email: "staff@example.com" });
      if (!existingStaff) {
        const newStaff = new Staff({
          name: "Alice",
          email: "staff@example.com",
          role: "Manager",
          phone: "0000000000",
          permanentAddress: "N/A",
          temporaryAddress: "N/A",
          joinDate: "2024-01-01",
          gender: "N/A",
          dateOfBirth: null,
          age: null,
          bloodGroup: "N/A"
        });

        await newStaff.save();
        console.log("Default staff profile created 👤");
      }

      const existingStaffUser = await User.findOne({ email: "staff@example.com" });
      if (!existingStaffUser) {
        const hashedPassword = await bcrypt.hash("staff123", 10);
        await User.create({
          name: "Alice",
          email: "staff@example.com",
          password: hashedPassword,
          role: "staff",
        });
        console.log("Default staff login user created");
      }
      const existingAdminUser = await User.findOne({ email: "admin@kalthalam.com" });
      if (!existingAdminUser) {
        const hashedAdminPassword = await bcrypt.hash("Admin@2026", 10);
        await User.create({
          name: "Admin",
          email: "admin@kalthalam.com",
          password: hashedAdminPassword,
          role: "admin",
        });
        console.log("Default admin login user created");
      }
    } catch (err) {
      console.log("Staff creation check skipped:", err.message);
    }
  })
  .catch(err => console.error("MongoDB Connection Error ❌:", err));

// Global Error Handler (optional but good)
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Server error occurred: " + err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});


