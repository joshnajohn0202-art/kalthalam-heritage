const express = require("express");
const router = express.Router();
const {
  getFeedback,
  addFeedback,
  resolveFeedback,
  replyFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

router.get("/", getFeedback);
router.post("/", addFeedback);
router.put("/:id/resolve", resolveFeedback);
router.put("/:id/reply", replyFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;
