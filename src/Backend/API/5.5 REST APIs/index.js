// Importamos el framework Express para construir aplicaciones web y APIs.
import express from "express";

// Importamos la librería Axios para manejar solicitudes HTTP (GET, POST, PUT, etc.).
import axios from "axios";

// Importamos body-parser para analizar el cuerpo de las solicitudes HTTP.
import bodyParser from "body-parser";

// Creamos una instancia de la aplicación Express.
const app = express();

// Definimos el puerto donde correrá el servidor.
const port = 3000;

// URL base de la API externa con la que interactuaremos.
const API_URL = "https://secrets-api.appbrewery.com";

// TODO: Agregar tu token Bearer. Este token es usado para autenticación con la API externa.
const yourBearerToken = "def51b94-2865-4498-a7d2-41fd125c8e42";

// Configuración de encabezados HTTP para incluir el token Bearer en cada solicitud.
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

// Middleware para analizar datos enviados desde formularios (application/x-www-form-urlencoded).
// `extended: true` permite trabajar con objetos complejos y anidados.
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta raíz que Renderiza una vista EJS con un mensaje inicial.
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

// Ruta para manejar solicitudes POST y obtener un secreto específico por ID.
app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id; // Extraemos el ID enviado en el cuerpo de la solicitud.
  try {
    // Realizamos una solicitud GET a la API con el ID y la configuración (token incluido).
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    // Renderizamos la vista EJS mostrando los datos obtenidos como JSON.
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    // Si ocurre un error, renderizamos la vista con el mensaje de error devuelto por la API.
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Ruta para manejar solicitudes POST y crear un nuevo secreto en la API.
app.post("/post-secret", async (req, res) => {
  try {
    // Usamos Axios para enviar los datos del cuerpo de la solicitud a la API.
    const result = await axios.post(API_URL + "/secrets", req.body, config);
    // Mostramos la respuesta de la API en la vista EJS.
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    // Si ocurre un error, mostramos el mensaje de error en la vista.
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Ruta para manejar solicitudes PUT y actualizar un secreto existente por ID.
app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id; // Extraemos el ID enviado en el cuerpo de la solicitud.
  try {
    // Usamos Axios para actualizar un secreto en la API con los datos enviados.
    const result = await axios.put(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Ruta para manejar solicitudes PATCH y modificar parcialmente un secreto existente.
app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id; // Extraemos el ID enviado en el cuerpo de la solicitud.
  try {
    // Enviamos una solicitud PATCH para actualizar parcialmente un secreto.
    const result = await axios.patch(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Ruta para manejar solicitudes DELETE y eliminar un secreto por su ID.
app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id; // Extraemos el ID enviado en el cuerpo de la solicitud.
  try {
    // Enviamos una solicitud DELETE para eliminar un secreto en la API.
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Iniciamos el servidor y escuchamos en el puerto definido.
// Mostramos un mensaje en consola para indicar que el servidor está corriendo.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
