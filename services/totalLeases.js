const customer = require("../controller/customer");
const conectar = require("../repository/config");

module.exports = (customer, callback) => {
  const connection = conectar((connection, err) => {
    if (err) {
      const error = new Error();
      error.message = "Não foi possível conectar ao banco de dados";
      error.httpStatusCode = 500;
      error.code = "ERR003";
      return callback(null, error);
    }
    connection.query(
      `SELECT C.NAME, SUM(L.PRICE) FROM LEASE L LEFT JOIN CUSTOMER C ON C.ID = L.ID_CUSTOMER WHERE NAME = "${customer}"ww;
      `,
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
