import express from "express";
import { getClasses, createClass } from "../controllers/classController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getClasses);
router.post("/", protect, adminOnly, createClass);

export default router;
