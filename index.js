const express = require("express");

const app = express();

const PORT = 3333;

app.use("/", (request, response) => {
  response.end("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
