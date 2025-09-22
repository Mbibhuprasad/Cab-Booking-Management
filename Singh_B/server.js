import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import bookingRoutes from "./routes/bookingRoutes.js"; // <-- Import new routes
import getCarDetailsRoutes from "./routes/getCarDetails.js"; // <-- Import car routes
import emailRoutes from "./routes/emailroutes.js";
dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Make uploads folder static
app.use("/api/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/admin/cars", adminRoutes);
app.use("/api/bookings", bookingRoutes); // <-- Use new routes
app.use("/api/cars", getCarDetailsRoutes); 
app.use("/api/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
