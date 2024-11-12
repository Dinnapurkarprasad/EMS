import express from "express";
import { login,verify } from "../controllers/authController.js"; // Adjusted import
import authMiddleware from "../middleware/authMiddleware.js"


const router = express.Router(); // Create the router instance

// Define your routes here
router.post("/login", login); // Use the router instance
router.get("/verify", authMiddleware,verify)

export default router; // Export the router
