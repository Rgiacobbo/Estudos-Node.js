const express = require("express");

const userRoutes = require("./routes/users.routes");
const movieRoutes = require("./routes/movies.routes");
const authenticateRoutes = require("./routes/authenticate.routes");

const app = express();

const PORT = 3333;

app.use(express.json());

app.use(userRoutes);
app.use(movieRoutes);
app.use(authenticateRoutes);

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
