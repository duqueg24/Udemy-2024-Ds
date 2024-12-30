// Importamos las dependencias necesarias
import express from "express"; 
// `express` es un framework minimalist para Node.js que permite crear servidores web de manera sencilla.
// La sintaxis `import` se utiliza porque el archivo está configurado como un módulo ES6.

import bodyParser from "body-parser"; 
// `body-parser` es un middleware que permite procesar los datos enviados en el cuerpo de las solicitudes HTTP (por ejemplo, formularios).

import pg from "pg"; 
// `pg` es una librería para interactuar con PostgreSQL, un sistema de gestión de bases de datos relacional.

// Configuración de la conexión a la base de datos PostgreSQL
const db = new pg.Client({
  user: "diegodb", // Usuario con permisos para acceder a la base de datos.
  host: "localhost", // Dirección del servidor donde está alojada la base de datos. Aquí es local.
  database: "world", // Nombre de la base de datos que se utilizará.
  password: "13202470", // Contraseña del usuario para autenticar la conexión.
  port: 5432, // Puerto predeterminado de PostgreSQL, usado para establecer la conexión.
});

// Conexión a la base de datos
db.connect(); 
// La función `connect` establece la conexión entre la aplicación y la base de datos.
// Si ocurre un error (por ejemplo, credenciales incorrectas), lanzará una excepción.

// Inicialización de la aplicación Express
const app = express(); 
// Creamos una instancia de la aplicación Express. Esto inicia el servidor y nos permite definir rutas y middlewares.

const port = 3000; 
// `port` es una constante que define el puerto donde el servidor escuchará las solicitudes.
// Por convención, se usa un puerto como 3000 para desarrollo.

// Middleware para procesar datos enviados por formularios
app.use(bodyParser.urlencoded({ extended: true })); 
// `app.use` añade middlewares a la cadena de procesamiento de solicitudes de Express.
// La opción `extended: true` permite analizar datos complejos, como objetos anidados en el cuerpo de la solicitud.

// Middleware para servir archivos estáticos
app.use(express.static("public")); 
// Esto permite a los clientes acceder a archivos estáticos (CSS, imágenes, scripts) almacenados en la carpeta `public`.
// Por ejemplo, una imagen en `public/logo.png` se podrá acceder desde `/logo.png`.

// Función para obtener los países visitados desde la base de datos
async function checkVisisted() {
  // `async` marca esta función como asíncrona, lo que permite usar `await` dentro de ella.
  const result = await db.query("SELECT country_code FROM visited_countries"); 
  // `db.query` ejecuta un comando SQL en la base de datos y devuelve una promesa.
  // Aquí obtenemos los códigos de los países desde la tabla `visited_countries`.

  let countries = []; 
  // Creamos un array vacío para almacenar los códigos de los países.

  result.rows.forEach((country) => {
    // `result.rows` es un array de objetos, donde cada objeto representa una fila de la tabla.
    countries.push(country.country_code); 
    // Extraemos la propiedad `country_code` de cada fila y la añadimos al array.
  });

  return countries; 
  // Devolvemos un array con los códigos de los países visitados.
}

// Ruta para manejar solicitudes GET en la página principal
app.get("/", async (req, res) => {
  // `app.get` define una ruta que responde a solicitudes GET en la URL "/".
  const countries = await checkVisisted(); 
  // Llamamos a `checkVisisted` para obtener los países visitados.

  res.render("index.ejs", { countries: countries, total: countries.length }); 
  // `res.render` genera una página HTML basada en la plantilla `index.ejs`.
  // Pasamos los datos: `countries` (lista de países) y `total` (número total de países visitados).
});

// Ruta para manejar solicitudes POST y agregar un nuevo país
app.post("/add", async (req, res) => {
  // `app.post` define una ruta para manejar solicitudes POST en la URL "/add".
  const input = req.body["country"]; 
  // Extraemos el nombre del país enviado desde el formulario HTML.
  // `req.body` contiene los datos del cuerpo de la solicitud.

  try {
    // Realizamos una consulta para obtener el código del país según su nombre.
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
      // `$1` es un marcador de posición que se sustituye por el valor del array (en este caso, `input`).
      // Esto previene ataques de inyección SQL.
    );

    const data = result.rows[0]; 
    console.log(result.rows[0]);
    // `result.rows[0]` es la primera fila del resultado.
    const countryCode = data.country_code;
    console.log(countryCode);
    // Extraemos el código del país.

    try {
      // Intentamos insertar el código del país en la tabla `visited_countries`.
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)", 
        [countryCode]
      );
      res.redirect("/"); 
      // Si la inserción es exitosa, redirigimos al usuario a la página principal.
    } catch (err) {
      console.log(err); 
      // Muestra errores en la consola (por ejemplo, si el país ya está en la tabla).
      const countries = await checkVisisted(); 
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.", 
        // Renderizamos la página con un mensaje de error si el país ya existe.
      });
    }
  } catch (err) {
    console.log(err); 
    // Manejamos errores si el nombre del país no existe en la tabla `countries`.
    const countries = await checkVisisted(); 
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.", 
      // Renderizamos la página con un mensaje de error si el nombre no es válido.
    });
  }
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); 
  // Mensaje para confirmar que el servidor está en funcionamiento.
});
