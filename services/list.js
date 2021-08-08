const conectar = require("../repository/config");

module.exports = (callback) => {
  const connection = conectar((connection, err) => {
    if (err) {
      const error = new Error();
      error.message = "Não foi possível conectar ao banco de dados";
      error.httpStatusCode = 500;
      error.code = "ERR003";
      return callback(null, error);
    }

    connection.query(
      "SELECT L.ID, L.ID_CUSTOMER, C.NAME, L.GAME FROM LEASE L LEFT JOIN CUSTOMER C ON C.ID = L.ID_CUSTOMER",
      function (err, rows) {
        if (err) {
          console.log(err);
          return;
        }

        return callback(rows);
      }
    );
  });
};
