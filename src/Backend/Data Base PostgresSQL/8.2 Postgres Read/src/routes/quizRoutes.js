import express from "express";
import { getHomePage, submitAnswer } from "../controllers/quizController.js";

const router = express.Router();

router.get("/", getHomePage);
router.post("/submit", submitAnswer);

export default router;
