const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

const routing = require("./router/routing");

app.use(routing);

app.use(function (err, req, res, next) {
  res.status(err.httpStatusCode || 500).json({code: err.code, message: err.message})
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
