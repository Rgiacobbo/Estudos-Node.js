const uuid = require("uuid");

const movies = [];

const list = (request, response) => {
  return response.json(movies);
};

const getById = (request, response) => {
  const { id } = request.params;

  const movie = movies.find((u) => u.id === id);

  if (!movie) {
    return response.status(400).json({
      error: "@movies/getById",
      message: `User not found ${id}`,
    });
  }
  return response.json(movie);
};

const create = (request, response) => {
  const { title, description, year, genres, image, video } = request.body;

  const id = uuid.v4();

  const movie = {
    id,
    title,
    description,
    year,
    genres,
    image,
    video,
  };

  movies.push(movie);

  return response.status(201).json(movie);
};

const update = (request, response) => {
  const { id } = request.params;
  const { title, description, year, genres, image, video } = request.body;

  const movieIndex = movies.findIndex((m) => m.id === id);

  if (movieIndex < 0) {
    return response.status(400).json({
      error: "@movies/update",
      mesage: `Movie not found ${id}`,
    });
  }

  const movieUpdated = {
    id,
    title,
    description,
    year,
    genres,
    image,
    video,
  };

  movies[movieIndex] = movieUpdated;

  return response.json(movieUpdated);
};

const remove = (request, response) => {
  const { id } = request.params;

  const movieIndex = movies.findIndex((m) => m.id === id);

  if (movieIndex < 0) {
    return response.status(400).json({
      error: "@movies/remove",
      message: `Movie not found ${id}`,
    });
  }
  movies.splice(movieIndex, 1);

  return response.send();
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
