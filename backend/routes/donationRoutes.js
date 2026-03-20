import express from "express";
import { donateToCollege } from "../controllers/donationController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/donate", requireAuth, donateToCollege);

export default router;

