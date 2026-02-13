const AuthService = require("../services/AuthService");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


//funcion registrar transmite datos a AuthService, recibe el token y lo devuelve al cliente
async function register(req, res) {
  try {
    const auth = new AuthService();
    //llamamos metodo registerUser y devolvemos token si se crea correctamente
    auth.registerUser(req.body).then((token) => {
      console.log("User registered successfully, token:", token);
      res.status(201).json({ message: "User registered successfully", token });
    });
  } catch (error) {
    res.status(500).json({ message: "Register user error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const auth = new AuthService();
    const token = await auth.loginUser(email, password);

    if (token !== "user not exist")
    return res.status(200).json({
      message: "Login successful",
      token
    });
  } 
  
  catch (error) {

    if (error.message == "Invalid credentials") {
      return res.status(404).json({ message: "invalid credentials" });
    }

    return res.status(500).json({ message: error });
  }
}

async function verifyToken(req, res) {
  console.log("data sendedddd: ", req.userId);
  try {
    const auth = new AuthService();
    const user = await auth.userRepository.findById(req.userId.userId);

    console.log("Token valid for user:", user.username);

    res.status(200).json({ message: "Token is valid", user: user.username, role: user.role });
  } catch (error) {
    console.log("Token verification error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { register, verifyToken, login };
