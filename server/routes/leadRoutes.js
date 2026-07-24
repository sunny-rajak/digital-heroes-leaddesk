import express from "express";
import {
  createLead,
  getLeads,
  updateLeadStatus,
} from "../controllers/leadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateLeadSubmission } from "../middleware/validateLead.js";

const router = express.Router();

router.post("/", validateLeadSubmission, createLead);
router.get("/", protect, getLeads);
router.patch("/:id", protect, updateLeadStatus);

export default router;
