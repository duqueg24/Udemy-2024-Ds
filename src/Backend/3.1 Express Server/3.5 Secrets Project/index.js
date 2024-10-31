import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const password = "DADQ";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // Servir archivos estáticos

// Middleware de autenticación
app.post("/secret", (req, res) => {
  if (password === req.body["password"]) {
    console.log(`My Password is ${password} and User Password is ${req.body["password"]}.`);
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
