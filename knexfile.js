// Ejemplo de uso de Knex en un archivo
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./DB/anime.db",
    },
    useNullAsDefault: true,
  },
};
