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
}

module.exports = AuthService;
