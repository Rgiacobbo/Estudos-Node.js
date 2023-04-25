const express = require("express");

const app = express();

const PORT = 3333;

const users = [];

app.use(express.json());

/**
 * Method GET
 * http://localhost:3333/users -> Retornar uma listagem de usuarios
 * http://localhost:3333/users/:id -> Retornar o registro especifico do recurso
 *
 * Method POST
 * http://localhost:3333/users {} -> Criar um registro no recurso especifico
 *
 * Method PUT
 * http://localhost:3333/users/:id {} -> Edição de um registro no recurso especifico
 *
 * Method PATCH
 * http://localhost:3333/users/:id { status: "off" } -> Edição de uma informação unica referente ao registro no recurso especifico
 *
 * Method DELETE
 * http://localhost:3333/users/:id -> Remover um registro especifico do recurso
 */

app.get("/users", (request, response) => {
  response.json(users);
});

app.post("/users", (request, response) => {
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
});

app.get("/users/:id", (request, response) => {
  const { id } = request.params;

  const user = users.find((u) => u.id == id);

  response.json(user);
});

app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { name, email, password, age } = request.body;

  const userIndex = users.findIndex((u) => u.id == id);

  if (userIndex < 0) {
    response.end("usuário não encontrado");
  }

  const userUpdate = {
    id,
    name,
    email,
    password,
    age,
  };

  users[userIndex] = userUpdate;

  response.json(userUpdate);
});

app.delete("/users/:id", (request, response) => {
  const { id } = request.params;

  const userIndex = users.findIndex((u) => u.id == id);

  if (userIndex < 0) {
    response.end("Usuário não encontrado");
  }

  users.splice(userIndex, 1);
  response.end("Usuário removido com sucesso");
});

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
