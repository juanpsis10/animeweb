const express = require("express");
const cors = require("cors"); // Inche cors como chingas
const knex = require("knex");
const dbConfig = require("./knexfile");

// Crear una instancia de la aplicación Express
const app = express();

// Configurar el motor de plantillas y otras configuraciones de Express si es necesario

// Crear una conexión a la base de datos SQLite utilizando Knex
const db = knex(dbConfig.development);

// Agregar middleware para habilitar las solicitudes CORS
app.use(cors());

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

// Rutas y configuraciones adicionales de Express si es necesario

// Iniciar el servidor en un puerto específico
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
