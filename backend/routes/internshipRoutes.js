import express from "express";
import { getInternships, createInternship } from "../controllers/internshipController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get/intern/data", requireAuth, getInternships);
router.post("/api/internships", requireAuth, createInternship);

export default router;
  