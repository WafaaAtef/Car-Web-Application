const express = require("express");
const router = express.Router();
const Car = require("../../models/Cars");
const { auth, isAdmin } = require('../../middleWares/authMiddleware');
const { upload } = require('../../middleWares/uploadMidd');

router.get("/", async (req, res) => {
  try {
    const { search, sortBy, request } = req.query;
    let query = {};
    if (search) {
      query.$or = [
        { brand: new RegExp(search, "i") },
        { model: new RegExp(search, "i") }
      ];
    }
    let sort = {};
    if (sortBy) sort[sortBy] = request === "desc" ? -1 : 1;

    const cars = await Car.find(query).sort(sort);
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, isAdmin, upload.array('images', 5), async (req, res) => {
  try {
    const imagesPaths = req.files?.map(f => `/uploads/${f.filename}`) || [];
    if (!req.body.brand || !req.body.model || !req.body.year || !req.body.price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const car = new Car({
      ...req.body,
      images: imagesPaths,
    });

    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, isAdmin, upload.array('images', 5), async (req, res) => {
  try {
    const existing = await Car.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Car not found" });
    if (!req.body.brand || !req.body.model || !req.body.year || !req.body.price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newImages = req.files?.map(f => `/uploads/${f.filename}`) || [];

    const updatedImages = newImages.length > 0
      ? [...existing.images, ...newImages]
      : existing.images;

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: updatedImages },
      { new: true }
    );

    res.json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;