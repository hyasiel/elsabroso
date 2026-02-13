function validateRegister(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || name.length < 3) {
    return res.status(400).json({ message: "Invalid name" });
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ message: "Invalid password" });
  }

  next();
}

module.exports = {validateRegister};
