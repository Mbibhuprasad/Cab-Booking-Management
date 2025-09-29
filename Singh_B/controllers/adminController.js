import Car from "../Models/Car.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all cars
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single car
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new car
export const addCar = async (req, res) => {
  try {
    const {
      type,
      model,
      name,
      bodyType,
      fuel,
      seats,
      transmission,
      engine,
      mileage,
      price,
      pricePerKm,
      pricePerHour,
      fullDetails,
    } = req.body; // Get uploaded images

    const images = req.files ? req.files.map((file) => file.filename) : [];

    const car = new Car({
      type,
      model,
      name,
      bodyType,
      fuel,
      seats,
      transmission,
      engine,
      mileage,
      price,
      pricePerKm,
      pricePerHour,
      images,
      fullDetails,
    });

    const createdCar = await car.save();
    res.status(201).json(createdCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update car
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car) {
      const {
        type,
        model,
        name,
        bodyType,
        fuel,
        seats,
        transmission,
        engine,
        mileage,
        price,
        pricePerKm,
        pricePerHour,
        fullDetails,
      } = req.body;

      car.type = type || car.type;
      car.model = model || car.model;
      car.name = name || car.name;
      car.bodyType = bodyType || car.bodyType;
      car.fuel = fuel || car.fuel;
      car.seats = seats || car.seats;
      car.transmission = transmission || car.transmission;
      car.engine = engine || car.engine;
      car.mileage = mileage || car.mileage;
      car.price = price || car.price;
      car.pricePerKm = pricePerKm || car.pricePerKm;
      car.pricePerHour = pricePerHour || car.pricePerHour;
      car.fullDetails = fullDetails || car.fullDetails; // Add new images if any

      if (req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => file.filename);
        car.images = [...car.images, ...newImages];
      }

      const updatedCar = await car.save();
      res.json(updatedCar);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete car
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car) {
      // Delete associated images from uploads folder
      // This would require additional file system operations

      await Car.deleteOne({ _id: req.params.id });
      res.json({ message: "Car removed" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete car image
export const deleteCarImage = async (req, res) => {
  try {
    const { carId, imageName } = req.params;
    const car = await Car.findById(carId);

    if (car) {
      // Remove image from array
      car.images = car.images.filter((img) => img !== imageName); // Delete image file from uploads folder // This would require additional file system operations

      await car.save();
      res.json({ message: "Image removed" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
