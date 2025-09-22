import express from "express";
import User from "../Models/User.js";
import { protect, admin } from "../middleware/authMiddleware.js";

import {
  getCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
  deleteCarImage,
} from "../controllers/adminController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Get all users
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete user
router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/").get(getCars).post(protect, admin, upload, addCar);

router
  .route("/:id")
  .get(getCarById)
  .put(protect, admin, upload, updateCar)
  .delete(protect, admin, deleteCar);

router
  .route("/:carId/images/:imageName")
  .delete(protect, admin, deleteCarImage);

export default router;
