const mysql = require("mysql");

module.exports = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "locadora",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });

  return connection;
}