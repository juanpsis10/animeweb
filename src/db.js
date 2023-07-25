const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./DB/anime.db", // Ruta correcta a tu base de datos
  },
});

module.exports = knex;
