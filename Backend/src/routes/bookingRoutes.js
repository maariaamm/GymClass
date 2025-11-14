import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createBooking, getMyBookings, deleteBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.use(protect);

router.post("/", createBooking);      
router.get("/my", getMyBookings);    
router.delete("/:id", deleteBooking); 

export default router;
