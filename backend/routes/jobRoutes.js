import express from "express";
import { getJobs, createJob } from "../controllers/jobController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get/job/data", requireAuth, getJobs);
router.post("/api/jobs", requireAuth, createJob);

export default router;
