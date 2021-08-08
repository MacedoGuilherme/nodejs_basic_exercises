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
      `SELECT COUNT(L.ID_CUSTOMER) FROM LEASE L LEFT JOIN CUSTOMER C ON C.ID = L.ID_CUSTOMER WHERE NAME = "${customer}";
      `,
      function (err, rows) {
        if (err) {
          console.log(err);
          return;
        }

        console.log(Object.entries(rows).length);

        if (Object.keys(rows) == "0") {
          const error = new Error();
          error.message = "Registro não encontrado";
          error.httpStatusCode = 404;
          error.code = "ERR003";
          return callback(null, error);
        } else {
          connection.query(
            `SELECT C.NAME, SUM(L.PRICE) FROM LEASE L LEFT JOIN CUSTOMER C ON C.ID = L.ID_CUSTOMER WHERE NAME = "${customer}`,
            function (err, rows) {
              if (err) {
                console.log(err);
                return;
              }
              console.log(rows);
              return callback(rows);
            }
          );
        }
      }
    );
  });
};
