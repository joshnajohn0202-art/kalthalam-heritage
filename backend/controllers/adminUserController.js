const User = require("../models/user");
const bcrypt = require("bcryptjs");

/* ================= GET ALL VISITOR USERS ================= */
exports.getUsers = async (req, res) => {
  try {
    const users = await User
      .find({ role: "visitor" })
      .select("-password"); // 🔐 hide password

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= ADD USER ================= */
exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "visitor"
    });

    await user.save();

    // ✅ send clean response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= BLOCK / UNBLOCK USER ================= */
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE USER ================= */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
