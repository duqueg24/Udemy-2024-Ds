import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import quizRoutes from "./src/routes/quizRoutes.js"
import { loadQuizData } from "./src/controllers/quizController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.use("/", quizRoutes);

// Load quiz data and start server
loadQuizData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
