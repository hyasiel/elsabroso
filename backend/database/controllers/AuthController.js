const AuthService = require("../services/AuthService");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();


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
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "5min" },
    );

    console.log("jwt token:", token);

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


async function login(req, res) {
  try {
    const { email, password } = req.body;

    const auth = new AuthService();
    const user = await auth.loginUser(email, password);

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "5min" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      userId: user.id,
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error.message);

    if (error.message === "User not found") {
      return res.status(404).json({ message: "Usuario no existe" });
    }

    if (error.message === "Invalid credentials") {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}


async function verifyToken(req, res) {
  return res.status(200).json({
    message: "Token valid",
    user: req.user,
  });
}


module.exports = { register, verifyToken, login };
