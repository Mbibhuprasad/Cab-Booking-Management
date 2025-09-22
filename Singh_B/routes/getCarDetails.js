import express from "express";

const router = express.Router();

// Sample car data (In a real application, this would come from a database)
import { getCarDetails } from "../controllers/getCarDetails.js";

// Route to get car details
router.get("/", getCarDetails);

export default router;