const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/UserRepositories");

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(userData) {
    const exist = await this.userRepository.findByEmail(userData.email);
    if (exist) throw new Error("User already exists");

    userData.password = await bcrypt.hash(userData.password, 10);

    return this.userRepository.createUser(userData);
  }

  async loginUser(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    return user;
  }
  
}

module.exports = AuthService;
