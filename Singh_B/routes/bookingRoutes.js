import express from "express";
import {
  createCabBooking,
  createSelfDriveBooking,
  getCarTypes,
  getCarModels,
  getAllCabBookings,
  getAllSelfDriveBookings,
  deleteCabBooking,
  deleteSelfDriveBooking,
} from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes for fetching car types and models for the frontend dropdowns
router.get("/cars/types", getCarTypes);
router.get("/cars/models", getCarModels);

// Routes for creating new bookings
router.post("/cab", createCabBooking);
router.post("/self-drive", createSelfDriveBooking);

// Admin routes for viewing and deleting bookings
router.get("/cab/all", protect, admin, getAllCabBookings);
router.delete("/cab/:id", protect, admin, deleteCabBooking);
router.get("/self-drive/all", protect, admin, getAllSelfDriveBookings);
router.delete("/self-drive/:id", protect, admin, deleteSelfDriveBooking);

export default router;
