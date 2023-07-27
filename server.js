const express = require("express");
const cors = require("cors");
const knex = require("knex");
const dbConfig = require("./knexfile");

// Crear una instancia de la aplicación Express
const app = express();

// Configurar el motor de plantillas y otras configuraciones de Express si es necesario

// Crear una conexión a la base de datos SQLite utilizando Knex
const db = knex(dbConfig.development);

// Agregar middleware para habilitar las solicitudes CORS
app.use(cors());

// Middleware para analizar los datos del cuerpo de la solicitud en formato JSON
app.use(express.json());

// Middleware para analizar los datos del cuerpo de la solicitud en formato de datos codificados en URL
app.use(express.urlencoded({ extended: true }));

// Rutas de ejemplo para consultar la tabla 'users'
app.get("/users", async (req, res) => {
  try {
    const users = await db.select().from("users");
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios." });
  }
});

// Ruta para registrar un nuevo usuario
app.post("/register", async (req, res) => {
  console.log("Datos recibidos:", req.body);
  const { displayName, email } = req.body;
  try {
    // Verificar si el correo electrónico ya está registrado en la base de datos
    const existingUser = await db
      .select()
      .from("users")
      .where("email", email)
      .first();

    if (existingUser) {
      // El correo electrónico ya está registrado, enviar una respuesta con el código 200 y un mensaje indicando que el usuario ya existe
      return res
        .status(200)
        .json({ message: "El correo electrónico ya está registrado" });
    } else {
      // El correo electrónico no está registrado, guardar la información del usuario en la base de datos
      const userId = await db("users").insert({
        user_name: displayName,
        email,
      });

      // Enviar una respuesta con el código 201 y el ID del usuario recién registrado
      return res
        .status(201)
        .json({ message: "Usuario registrado en la base de datos", userId });
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    // En caso de error, enviar una respuesta con el código 500 y un mensaje de error
    return res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Rutas y configuraciones adicionales de Express si es necesario

// Iniciar el servidor en un puerto específico
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
