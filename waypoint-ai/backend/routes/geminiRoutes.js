import express from "express";
import multer from "multer";

import {
  careerChat,
  resumeAnalyzer,
  careerRoadmap,
  skillGap,
  interviewPrep,
} from "../controllers/geminiController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

// Resume Analyzer
router.post("/resume-analyzer", upload.single("resume"), resumeAnalyzer);

// Career Roadmap
router.post("/career-roadmap", careerRoadmap);

// Skill Gap
router.post("/skill-gap", skillGap);

// Interview Preparation
router.post("/interview-prep", interviewPrep);

// Career Chat
router.post("/career-chat", careerChat);

export default router;