const express = require("express");
const router = express.Router();
const Request = require("../../models/Request");
const { auth } = require('../../middleWares/authMiddleware');

router.post("/", auth, async (req, res) => {
  try {
    const { carId, price } = req.body;
    const request = new Request({
      car: carId,
      buyer: req.user.id,
      price,
    });
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;