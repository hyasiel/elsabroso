const AuthService = require("../services/AuthService");

async function register(req, res) {
  try {
    console.log("BODY:", req.body);

    const auth = new AuthService();
    const id = await auth.registerUser(req.body);

    return res.status(201).json({
      message: "User registered",
      userId: id,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    // Usuario ya existe
    if (error.message === "User already exists") {
      return res.status(409).json({ message: error.message });
    }

    // Error interno real
    return res.status(500).json({
      message: "Internal server error",
      detail: error.message,
    });
  }
}

module.exports = { register };
