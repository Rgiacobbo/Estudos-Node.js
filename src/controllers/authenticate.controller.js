const { userDatabase } = require("./users.controller");

const { compareHash } = require("../utils/hashProvider");

const login = async (request, response) => {
  const { email, password } = request.body;

  const user = userDatabase.find((u) => u.email === email);

  const loginErrorMessage = {
    error: "@authenticate/login",
    messagem: "Invalid user or password",
  };

  if (!user) {
    return response.status(400).json(loginErrorMessage);
  }

  const isValidPassword = await compareHash(password, user.password);

  if (!isValidPassword) {
    return response.status(400).json(loginErrorMessage);
  }

  delete user.password;

  return response.send(user);
};

module.exports = {
  login,
};
