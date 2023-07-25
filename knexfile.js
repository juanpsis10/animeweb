// Conexion chida
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./DB/anime.db",
    },
    useNullAsDefault: true,
  },
};
