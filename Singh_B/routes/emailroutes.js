import express from "express";
import { sendEmail } from "../controllers/emailController.js";

const router = express.Router();

// POST request to send email
router.post("/send", sendEmail);

export default router;
