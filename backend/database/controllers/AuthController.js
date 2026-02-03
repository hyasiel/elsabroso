const AuthService = require("../services/AuthService");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    console.log("BODY:", req.body);

    const auth = new AuthService();
    const id = await auth.registerUser(req.body);

    const token = jwt.sign(
      {
        userId: id,
        username: req.body.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5min" },
    );

    return res.status(201).json({
      message: "User registered",
      token,
      userId: id,
    });
  } catch (error) {
    console.log("ERROR:", error.message);
    //si existe:
    if (error.message === "User already exists") {
      return res.status(409).json({ message: "Username no disponible" });
    }
    //server error
    return res.status(500).json({
      message: "Internal server error",
      detail: "error en el servidor",
    });
  }
}

module.exports = { register };
