const express = require("express");
const router = express.Router();
const Feedback = require("../../models/Feedback");

router.post("/", async (req, res) => {
  try {
    const { carId, name, rating, comment } = req.body;
    const newFeedback = new Feedback({
      car: carId,
      name,
      rating,
      comment
    });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:carId", async (req, res) => {
  try {
    const reviews = await Feedback.find({ car: req.params.carId }).sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;