const express = require("express");

const app = express();

const PORT = 3333;

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

app.use("/", (request, response) => {
  console.log(request.method);
  console.log(request.headers);
  console.log(request.url);
  response.end("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
