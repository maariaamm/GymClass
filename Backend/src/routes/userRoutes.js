import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { 
  register, 
  login, 
  getMe, 
  getAllUsers, 
  updateUser, 
  deleteUser 
} from "../controllers/userController.js";

const router = express.Router();

// Auth endpoints
router.post("/register", register);
router.post("/login", login);

// Protected endpoints
router.use(protect);

router.get("/me", getMe);          
router.get("/", getAllUsers);       // (admin only)
router.put("/:id", updateUser);     // 
router.delete("/:id", deleteUser);  // (admin only)

export default router;
