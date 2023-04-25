const users = [
  {
    id: 1,
    name: "John joe",
    email: "john.doe@example.com",
    password: "password",
    age: 21,
  },
];

const list = (request, response) => {
  response.json(users);
};

const getById = (request, response) => {
  const { id } = request.params;

  const user = users.find((u) => u.id === Number(id));

  response.json(user);
};

const create = (request, response) => {
  const { id, name, email, password, age } = request.body;

  const user = {
    id,
    name,
    email,
    password,
    age,
  };

  users.push(user);

  response.json(user);
};

const update = (request, response) => {
  const { id } = request.params;
  const { name, email, password, age } = request.body;

  const userIndex = users.findIndex((u) => u.id === Number(id));

  if (userIndex < 0) {
    response.end("usuário não encontrado");
  }

  const userUpdate = {
    id: Number(id),
    name,
    email,
    password,
    age,
  };

  users[userIndex] = userUpdate;

  response.json(userUpdate);
};

const remove = (request, response) => {
  const { id } = request.params;

  const userIndex = users.findIndex((u) => u.id === Number(id));

  if (userIndex < 0) {
    response.end("Usuário não encontrado");
  }

  users.splice(userIndex, 1);
  response.end("Usuário removido com sucesso");
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
