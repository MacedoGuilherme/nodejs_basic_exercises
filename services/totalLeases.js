const conectar = require("../repository/config");

module.exports = (callback) => {
  const connection = conectar();
  connection.query("SELECT SUM(PRICE) FROM LEASES", function (err, rows) {
    if (err) {
      console.log(err);
      return;
    }

    console.log(rows);

    return callback(rows);
  });
};