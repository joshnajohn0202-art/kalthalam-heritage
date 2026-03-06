const Room = require("../models/Room");

exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

exports.addRoom = async (req, res) => {
  const room = await Room.create(req.body);
  res.json({ message: "Room added", room });
};
