const UserRepository = require("../repositories/UserRepository");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  async authenticate(request, response) {
    const { email, password } = request.body;

    const user = await UserRepository.findByEmail(email);

    if (!user) {
      return response.status(400).json({ error: "user not found" });
    }

    if (password !== user.password) {
      return response.status(400).json({ error: "password is wrong" });
    }

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });

    const { id, name } = user;

    return response.json({ user: { id, email, name }, token });
  }
}

module.exports = new AuthController();
