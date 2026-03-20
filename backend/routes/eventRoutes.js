import express from "express";
import { getEvents, createEvent } from "../controllers/eventController.js";
import multer from "multer";
import { storage } from "../Config/cloudinary.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/api/get/event", getEvents);
router.get("/api/get/event", requireAuth, getEvents);
router.post("/save/event/data", requireAuth, upload.single("eventFile"), createEvent);

export default router;
