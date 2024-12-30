import db from "../db/database.js";

let quizData = [];
let totalCorrect = 0;
let currentQuestion = {};

/**
 * Carga las preguntas desde la base de datos al iniciar la aplicación.
 */
export const loadQuizData = async () => {
  try {
    const res = await db.query("SELECT * FROM flags");
    quizData = res.rows;
    console.log("Quiz data loaded successfully");
  } catch (err) {
    console.error("Error loading quiz data:", err.stack);
  }
};

/**
 * Obtiene una nueva pregunta aleatoria del quiz.
 */
const getRandomQuestion = () => {
  if (quizData.length === 0) {
    console.error("No quiz data available");
    return { country: "No data", capital: "Unknown" };
  }
  return quizData[Math.floor(Math.random() * quizData.length)];
};

/**
 * Controlador para la ruta GET "/".
 */
export const getHomePage = (req, res) => {
  totalCorrect = 0;
  currentQuestion = getRandomQuestion();
  res.render("index.ejs", { question: currentQuestion });
};

/**
 * Controlador para la ruta POST "/submit".
 */
export const submitAnswer = (req, res) => {
  const userAnswer = req.body.answer?.trim() || "";
  let isCorrect = false;

  if (
    currentQuestion.country &&
    currentQuestion.country.toLowerCase() === userAnswer.toLowerCase()
  ) {
    totalCorrect++;
    isCorrect = true;
  }

  currentQuestion = getRandomQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
};
