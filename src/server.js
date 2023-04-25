const express = require("express");

const userRoutes = require("./routes/users.routes");

const app = express();

const PORT = 3333;

app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
