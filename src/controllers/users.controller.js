const uuid = require("uuid");

const { generateHash } = require("../utils/hashProvider");

const users = [
  {
    id: "b958fa6c-6a6b-4e41-8c06-aded697aacb7",
    name: "John Doe",
    email: "john.doe@example.com.br",
    password: "$2a$08$lLiD3zFc7917WRiHwhOkZONuceba2NTEO2bAGTwwxouYpAhNOooP2",
    age: 21,
  },
];

const list = (request, response) => {
  return response.json(users);
};

const getById = (request, response) => {
  const { id } = request.params;

  const user = users.find((u) => u.id === id);

  if (!user) {
    return response.status(400).json({
      error: "@users/getById",
      message: `User not found ${id}`,
    });
  }

  return response.json(user);
};

const create = async (request, response) => {
  const { name, email, password, age } = request.body;

  const id = uuid.v4();

  const hashedPassword = await generateHash(password);

  const user = {
    id,
    name,
    email,
    password: hashedPassword,
    age,
  };

  users.push(user);

  return response.status(201).json(user);
};

const update = (request, response) => {
  const { id } = request.params;
  const { name, email, password, age } = request.body;

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex < 0) {
    return response.json({
      error: "@users/update",
      message: `User not found ${id}`,
    });
  }

  const userUpdate = {
    id,
    name,
    email,
    password,
    age,
  };

  users[userIndex] = userUpdate;

  return response.json(userUpdate);
};

const remove = (request, response) => {
  const { id } = request.params;

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex < 0) {
    return response.status(400).json({
      error: "@users/remove",
      message: `User not found ${id}`,
    });
  }

  users.splice(userIndex, 1);
  return response.send();
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  userDatabase: users,
};
