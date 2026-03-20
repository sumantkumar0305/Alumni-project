import express from "express";
import {
  alumniRegister,
  adminRegister,
  studentRegister,
  loginUser,
  getMentors,
  getAllAlumni,
  getMe,
  updateMe
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/alumni/register", alumniRegister);
router.post("/admin/register", adminRegister);
router.post("/student/register", studentRegister);
router.post("/login", loginUser);
router.get("/mentors", requireAuth, getMentors);
router.get("/alumni", requireAuth, getAllAlumni);
router.get("/me", requireAuth, getMe);
router.patch("/me", requireAuth, updateMe);

// Backward-compatible aliases (some frontend code referenced this path).
router.get("/auth/me", requireAuth, getMe);
router.patch("/auth/me", requireAuth, updateMe);

export default router;
