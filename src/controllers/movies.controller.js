const uuid = require("uuid");

const movies = [
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    year: 1994,
    genres: ["Drama"],
    image:
      "https://www.themoviedb.org/t/p/original/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
    video: "https://www.youtube.com/watch?v=6hB3S9bIaco",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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
    createdAt: new Date(),
    updatedAt: new Date(),
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

  const { createdAt } = movies[movieIndex];

  const movieUpdated = {
    id,
    title,
    description,
    year,
    genres,
    image,
    video,
    createdAt,
    updatedAt: new Date(),
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
