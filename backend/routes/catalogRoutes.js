const express = require("express");
const router = express.Router();

const TravelPackage = require("../models/TravelPackage");
const Addon = require("../models/Addon");
const TouristSpot = require("../models/TouristSpot");
const Cottage = require("../models/cottage");

const asyncHandler = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    res.status(400).json({ message: err.message || "Request failed" });
  }
};

const list = (Model, sort = { id: 1 }) =>
  asyncHandler(async (_req, res) => {
    const data = await Model.find().sort(sort);
    res.json(data);
  });

const create = (Model) =>
  asyncHandler(async (req, res) => {
    const created = await Model.create(req.body);
    res.status(201).json(created);
  });

const update = (Model) =>
  asyncHandler(async (req, res) => {
    const updated = await Model.findByIdAndUpdate(req.params.docId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(updated);
  });

const remove = (Model) =>
  asyncHandler(async (req, res) => {
    const deleted = await Model.findByIdAndDelete(req.params.docId);
    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ success: true });
  });

router.get("/packages", list(TravelPackage));
router.post("/packages", create(TravelPackage));
router.put("/packages/:docId", update(TravelPackage));
router.delete("/packages/:docId", remove(TravelPackage));

router.get("/addons", list(Addon));
router.post("/addons", create(Addon));
router.put("/addons/:docId", update(Addon));
router.delete("/addons/:docId", remove(Addon));

router.get("/spots", list(TouristSpot));
router.post("/spots", create(TouristSpot));
router.put("/spots/:docId", update(TouristSpot));
router.delete("/spots/:docId", remove(TouristSpot));

router.get("/cottages", list(Cottage));
router.post("/cottages", create(Cottage));
router.put("/cottages/:docId", update(Cottage));
router.delete("/cottages/:docId", remove(Cottage));

module.exports = router;

