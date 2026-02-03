const express = require("express");
const { validateRegister } = require("../middlewares/UserValidateRegister");
const router = express.Router();

const { register } = require("../controllers/AuthController");

router.post("/register", validateRegister, register);

module.exports = router;
