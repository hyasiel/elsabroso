const AuthService = require("../services/AuthService");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// funcion registrar transmite datos a AuthService, recibe el token y lo devuelve al cliente
async function register(req, res) {
  try {
    const token = await AuthService.registerUser(req.body);

    if (token === "User already exists") {
      return res.status(400).json({ message: token });
    }

    console.log("User registered successfully, token:", token);
    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Register user error" });
  }
}

// login function
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const authService = AuthService;
    const token = await authService.loginUser(email, password);

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    if (
      error.message === "Invalid credentials" ||
      error.message === "user not exist"
    ) {
      // avoid leaking which one failed
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// NOTE: product updates/creation should be handled by ProductController
// the old updateProducts function was unused and pointed at AuthService which
// does not expose product logic. It has been removed.
//---------------------------------------------------------------------

//verify function

async function verifyToken(req, res) {
  console.log("data sendedddd: ", req.userId);
  try {
    const auth = AuthService;
    const user = await auth.userRepository.findById(req.userId.userId);

    console.log("Token valid for user:", user.username);

    res.status(200).json({
      message: "Token is valid",
      user: user.username,
      role: user.role,
    });
  } catch (error) {
    console.log("Token verification error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { register, verifyToken, login };
