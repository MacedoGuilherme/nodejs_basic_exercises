const conectar = require("../repository/config");

module.exports = (cpf, callback) => {
  const connection = conectar((connection, err) => {
    if (err) {
      const error = new Error();
      error.message = "Não foi possível conectar ao banco de dados";
      error.httpStatusCode = 500;
      error.code = "ERR003";
      return callback(null, error);
    }

    connection.query(
      `SELECT NAME, CPF, EMAIL, PHONE FROM CUSTOMER WHERE CPF = ?`,
      cpf,
      function (err, rows) {
        if (err) {
          console.log(err);
          return;
        }

        if (Object.values(rows).length === 0) {
          const error = new Error();
          error.message = "Registro não encontrado";
          error.httpStatusCode = 404;
          error.code = "ERR003";
          return callback(null, error);
        }

        connection.end();
        return callback(rows, null);
      }
    );
  });
};
