import Staff from "../models/staff.js";

/* ================= GET STAFF PROFILE ================= */
export const getStaffProfile = async (req, res) => {
  try {
    const { name } = req.params;

    const staff = await Staff.findOne({ name });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ================= CREATE STAFF ================= */
export const createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json(staff);
  } catch (error) {
    res.status(400).json({ message: "Failed to create staff", error });
  }
};
