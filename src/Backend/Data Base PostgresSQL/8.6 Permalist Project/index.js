import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "diegodb",
  host: "localhost",
  database: "school",
  password: "13202470",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Obtener todos los ítems de la base de datos
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id");
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: result.rows,
    });
  } catch (err) {
    console.error("Error fetching items: ", err);
    res.status(500).send("Internal Server Error");
  }
});

// Agregar un nuevo ítem a la base de datos
app.post("/add", async (req, res) => {
  const title = req.body.newItem;
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [title]);
    res.redirect("/");
  } catch (err) {
    console.error("Error adding item: ", err);
    res.status(500).send("Internal Server Error");
  }
});

// Editar un ítem existente
app.post("/edit", async (req, res) => {
  const { updatedItemId, updatedItemTitle } = req.body;
  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [
      updatedItemTitle,
      updatedItemId,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error("Error updating item: ", err);
    res.status(500).send("Internal Server Error");
  }
});

// Eliminar un ítem de la base de datos
app.post("/delete", async (req, res) => {
  const deleteItemId = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM items WHERE id = $1", [deleteItemId]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting item: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
