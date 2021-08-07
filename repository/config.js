const mysql = require("mysql");

module.exports = (callback) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "locadora",
  });

  connection.connect(function (err) {
    if (err) {
      return callback(connection, err);
    }

    return callback(connection, err);
  });

  return connection;
}