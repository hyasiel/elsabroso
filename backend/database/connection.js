const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "yasiel1234",
  database: "elsabroso_db",
  connectionLimit: 5,
});

function connect() {

pool.getConnection().then((conn) => {
  console.log("Database connection established");
  conn
    .query("SELECT * FROM users")
    .then((rows) => {
      console.log(rows);
    })

    .then((res) => {
      conn.end();
      pool.end();
    })

    .catch((err) => {
      console.log("Error querying database:", err);
      conn.end();
      pool.end();
    }); 
});

}

module.exports = { connect };