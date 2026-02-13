const { pool } = require("../../configs/dbConfig");
const { nanoid } = require("nanoid");

class UserRepository {
  //find user by email
  async findByEmail(email) {
    const rows = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  async findById(id) {
    const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    console.log("findById result:", rows);
    return rows[0];
  }

  //create user function
  async createUser(user) {
    try {
      const id = nanoid();
      const res = await pool.query(
        "INSERT INTO users (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [
          id,
          user.name,
          user.email,
          user.password,
          user.email === "hyasiel1@gmail.com" ? "admin" : "user",
        ],
      );

      return id;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

class AdminRepository {
  async createNewPost() {}
}

module.exports = { UserRepository, AdminRepository };
