// Importa el módulo 'express', que es un framework de Node.js.
// 'express' funciona para manejar solicitudes HTTP, definir rutas y gestionar middleware.
import express from "express";

// Importa el módulo 'axios', que es una biblioteca para realizar solicitudes HTTP desde Node.js.
// 'axios' funciona para conectarse a APIs externas y procesar las respuestas recibidas.
import axios from "axios";

// Crea una instancia de la aplicación Express.
// 'app' funciona como el objeto principal para configurar y ejecutar el servidor.
const app = express();

// Define un puerto con el número 3000.
// 'port' funciona para especificar dónde el servidor escuchará las conexiones.
const port = 3000;

// Usa el middleware `express.static`, que funciona para servir archivos estáticos.
// La carpeta "public" es donde se guardarán archivos como imágenes, CSS y JavaScript del cliente.
app.use(express.static("public"));

// Define una ruta GET en la raíz ('/') del servidor.
// `app.get` funciona para manejar solicitudes HTTP GET de los clientes.
app.get("/", async (req, res) => {
    // La función asíncrona permite usar `await` para manejar operaciones asíncronas, como solicitudes HTTP.
    try {
        // Realiza una solicitud HTTP GET a la API externa usando `axios`.
        // `axios.get` funciona para obtener datos de la URL proporcionada.
        const result = await axios.get("https://secrets-api.appbrewery.com/random");

        // Usa el método `res.render` para generar y enviar una vista al cliente.
        // 'res' funciona como el objeto de respuesta que se envía al cliente.
        // `.render` funciona para renderizar una plantilla EJS con los datos obtenidos.
        res.render("index.ejs", {
            // Pasa el valor 'secret' obtenido de la API al archivo de plantilla EJS.
            secret: result.data.secret, // 'result.data.secret' funciona para acceder al secreto devuelto por la API.

            // Pasa el valor 'username' obtenido de la API al archivo de plantilla EJS.
            user: result.data.username, // 'result.data.username' funciona para acceder al nombre de usuario devuelto por la API.
        });
    } catch (error) {
        // Maneja errores con un bloque `catch`.
        // 'console.log(error.message)' funciona para registrar el mensaje del error en la consola del servidor.
        console.log(error.message);

        // Usa `res.status(500)` para establecer un estado de respuesta HTTP de error interno del servidor.
        // `.status(500)` funciona para indicar que hubo un problema en el servidor.
        res
            .status(500)
            // Usa `res.send` para enviar un mensaje de error al cliente.
            // `.send("Error fetching secret")` funciona para enviar un texto indicando que ocurrió un problema al obtener el secreto.
            .send("Error fetching secret");
    }
});

// Inicia el servidor usando `app.listen`, que funciona para escuchar conexiones en el puerto especificado.
app.listen(port, () => {
    // Muestra un mensaje en la consola para confirmar que el servidor está en funcionamiento.
    // `console.log` funciona para imprimir mensajes en la consola del servidor.
    console.log(`Server is running on port ${port}`);
});

// PISTAS:
// 1. Importa express y axios.
// 2. Crea una aplicación de express y define el número del puerto.
// 3. Usa la carpeta public para los archivos estáticos.
// 4. Cuando el usuario vaya a la página de inicio, se debe renderizar el archivo index.ejs.
// 5. Usa axios para obtener un secreto aleatorio y pásalo a index.ejs para mostrar
// el secreto y el nombre de usuario asociado al secreto.
// 6. Escucha en el puerto predefinido y arranca el servidor.
