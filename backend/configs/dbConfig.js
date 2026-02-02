const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "yasiel1234",
  database: "elsabroso_db",
  connectionLimit: 5,
});


module.exports = { pool };