const { pool } = require("../../configs/dbConfig");

class UserRepository {
  //find user by email
  async findByEmail(email) {
    const rows = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }
  //create user function
  async createUser(user) {
    const res = await pool.query(
      "INSERT INTO users (user_id, username, email, password) VALUES (?, ?, ?, ?)",
      ["23134", user.name, user.email, user.password],
    );
    return "usuario creado";
  }
}

module.exports = UserRepository;
