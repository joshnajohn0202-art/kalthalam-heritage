const express = require("express");
const router = express.Router();
const { getRooms, addRoom } = require("../controllers/roomController");

router.get("/", getRooms);
router.post("/", addRoom);

module.exports = router;
