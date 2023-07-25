const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./DB/anime.db", // Ruta de mi BD c:
  },
});

module.exports = knex;
