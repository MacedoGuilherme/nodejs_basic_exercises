const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

const routing = require("./router/routing");

app.use(routing);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
