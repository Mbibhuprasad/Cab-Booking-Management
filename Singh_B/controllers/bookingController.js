import CabBooking from "../Models/CabBooking.js";
import SelfDriveBooking from "../Models/SelfDriveBooking.js";
import Car from "../Models/Car.js";

// Utility function to fetch car types from the database
export const getCarTypes = async (req, res) => {
  try {
    const types = await Car.distinct("type");
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Utility function to fetch car models from the database based on type
export const getCarModels = async (req, res) => {
  const { type } = req.query;
  try {
    const models = await Car.distinct("model", { type });
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new Cab Booking
export const createCabBooking = async (req, res) => {
  try {
    const booking = new CabBooking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json({
      message: "Cab booking created successfully!",
      booking: savedBooking,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating cab booking", error: error.message });
  }
};

// Create a new Self-Driving Booking
export const createSelfDriveBooking = async (req, res) => {
  try {
    const booking = new SelfDriveBooking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json({
      message: "Self-drive booking created successfully!",
      booking: savedBooking,
    });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error creating self-drive booking",
        error: error.message,
      });
  }
};

// Admin functions to get and delete bookings
export const getAllCabBookings = async (req, res) => {
  try {
    const bookings = await CabBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllSelfDriveBookings = async (req, res) => {
  try {
    const bookings = await SelfDriveBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteCabBooking = async (req, res) => {
  try {
    const booking = await CabBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Cab booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteSelfDriveBooking = async (req, res) => {
  try {
    const booking = await SelfDriveBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Self-drive booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
