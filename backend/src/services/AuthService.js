const bcrypt = require("bcrypt");
const repositories = require("../repositories/UserRepositories");

require("dotenv").config();
const jwt = require("jsonwebtoken");

// clase para manejar la logica de autenticacion, se encarga de enviar datos al user repository
class AuthService {
  constructor() {
    // repositories is now an object with both repos
    this.userRepository = repositories.UserRepository;
  }

  //register function (recibe userData)

  async registerUser(userData) {
    const isExists = await this.verifyUserIsExist(userData.email);
    if (isExists) return "User already exists";

    userData.password = await bcrypt.hash(userData.password, 10);
    //crea el user y devuelve el token en base a ese usuario
    const user = await this.userRepository.createUser(userData);
    const token = await this.createToken(user);
    return token;
  }

  async loginUser(email, password) {
    //buscamos si el usuario existe, si existe compara claves
    const user = await this.verifyUserIsExist(email);
    console.log("verifyUser response " + user);
    if (!user) throw new Error("user not exist");
    //comparamos claves
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (!match) throw new Error("Invalid credentials");
    console.log("the user isssss ", user.id);
    const token = await this.createToken(user.id);

    return token;
  }

  async verifyUserIsExist(email) {
    //si existe el user, lanza error. si no devuelve false
    const user = await this.userRepository.findByEmail(email);
    //si existe retornamos usuario
    if (user) return user;

    return false;
  }

  //function to create jwt token
  async createToken(user) {
    console.log("Creating token for user:", user);
    const token = jwt.sign(
      {
        userId: user,
      },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" },
    );
    return token;
  }

  //---------------------------------------------------------------
}

// export a single instance so callers can use methods directly
module.exports = new AuthService();
