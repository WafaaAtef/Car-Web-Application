const express = require("express");
const router = express.Router();
const Request = require("../../models/Request");
const Car = require("../../models/Cars");
const { auth, isAdmin } = require('../../middleWares/authMiddleware');


router.post("/", auth, async (req, res) => {
  try {
    const { carId, price } = req.body;

    if (!carId || !price) {
      return res.status(400).json({
        message: "carId and price are required"
      });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        message: "Car not found"
      });
    }

    const stock = typeof car.stock === 'number' ? car.stock : 1;
    if (car.status === 'sold' || stock <= 0) {
      return res.status(400).json({
        message: "Car is not available"
      });
    }

    const request = new Request({
      car: carId,
      buyer: req.user.id,
      price
    });

    await request.save();

    res.status(201).json({
      message: "Request created successfully",
      request
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const requests = await Request.find().populate('car').populate('buyer').sort({ createdAt: -1 });
    res.status(200).json({ requests });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get("/my", auth, async (req, res) => {
  try {
    const requests = await Request.find({ buyer: req.user.id }).populate('car').sort({ createdAt: -1 });
    res.status(200).json({ requests });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.patch("/:id", auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    const car = await Car.findById(request.car);
    if (!car) {
      return res.status(404).json({
        message: "Associated car not found"
      });
    }

    const currentStock = typeof car.stock === 'number' ? car.stock : 1;
    const oldStatus = request.status;

    if (oldStatus !== 'confirmed' && status === 'confirmed') {
      if (currentStock <= 0) {
        return res.status(400).json({
          message: "Car is sold out"
        });
      }
      car.stock = currentStock - 1;
      if (car.stock <= 0) {
        car.status = 'sold';
      }
      await car.save();
    }

    if (oldStatus === 'confirmed' && status !== 'confirmed') {
      car.stock = currentStock + 1;
      if (car.stock > 0 && car.status === 'sold') {
        car.status = 'available';
      }
      await car.save();
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      message: "Request updated successfully",
      request
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
