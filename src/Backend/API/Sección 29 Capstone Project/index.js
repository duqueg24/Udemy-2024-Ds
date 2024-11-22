import express from "express";
import axios from "axios";
import path from "path"; // Importa el módulo 'path'
import { fileURLToPath } from "url"; // Importa 'fileURLToPath' para trabajar con URLs

const app = express();
const port = 3000;

// Usar 'fileURLToPath' y 'import.meta.url' para obtener el __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta node_modules
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Configuración para servir archivos estáticos de la carpeta public
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    // Obtén la lista de personajes de la API
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    const characters = response.data.results;

    // Envía los personajes a la vista
    res.render("index.ejs", { characters });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los personajes");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
