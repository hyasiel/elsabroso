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

class ProductRepository {
  async createNewPost(product) {
    const { title, description, imageUrl, category, price } = product;

    // generate an id since the table defines `id CHAR(21) PRIMARY KEY` with no default
    const id = nanoid();

    const query = `
      INSERT INTO menu (id, name, description, image_url, category, price)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    // default price if none provided
    const productPrice = price !== undefined ? price : 10.2;

    console.log("Inserting product", {
      id,
      title,
      description,
      imageUrl,
      category,
      productPrice,
    });

    await pool.query(query, [
      id,
      title,
      description,
      imageUrl,
      category,
      productPrice,
    ]);

    return { message: "Product created", id };
  }

  async updatePost(id, product) {
    const { title, description, imageUrl, category, price } = product;
    if (!id) {
      throw new Error("Product id is required");
    }

    const query = `
      UPDATE menu
      SET name = ?, description = ?, image_url = ?, category = ?, price = ?
      WHERE id = ?
    `;

    await pool.query(query, [
      title,
      description,
      imageUrl,
      category,
      price,
      id,
    ]);
    return { message: "Product updated" };
  }

  async getAllProducts() {
    // make sure the table name matches the DB schema (was mistyped as "meni")
    const rows = await pool.query("SELECT * FROM menu");
    return rows;
  }

  async findById(id) {
    const rows = await pool.query("SELECT * FROM menu WHERE id = ?", [id]);
    return rows[0];
  }
}

// export both repositories so callers can grab what they need
module.exports = {
  UserRepository: new UserRepository(),
  ProductRepository: new ProductRepository(),
};
