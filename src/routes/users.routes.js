const { Router } = require("express");

const usersController = require("../controllers/users.controller");

const routes = Router();

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

routes.get("/users", usersController.list);

routes.post("/users", usersController.create);

routes.get("/users/:id", usersController.getById);

routes.put("/users/:id", usersController.update);

routes.delete("/users/:id", usersController.remove);

module.exports = routes;
