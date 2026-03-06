const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, role } = req.body;

  const user = await User.findOne({ email, role });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  res.json({
    token: "demo-token",
    role: user.role,
  });
};
