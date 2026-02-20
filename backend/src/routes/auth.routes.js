const express = require("express");
const { validateRegister } = require("../middlewares/UserValidateRegister");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const {
  register,
  verifyToken,
  login,
} = require("../controllers/AuthController");

router.post("/register", validateRegister, register);
router.post("/login", login);
router.get("/verifytoken", AuthMiddleware, verifyToken);
//el admin envia los datos a estas ruta

module.exports = router;
