const conectar = require("../repository/config");

module.exports = (user, callback) => {
  const { cpf, newEmail } = user;

  const connection = conectar((connection, err) => {
    if (err) {
      const error = new Error();
      error.message = "Não foi possível conectar ao banco de dados";
      error.httpStatusCode = 500;
      error.code = "ERR003";
      return callback(null, error);
    }

    connection.query(
      `UPDATE CUSTOMER SET EMAIL = ? WHERE CPF = ${cpf}`,
      newEmail,
      function (err, res) {
        if (err) {
          console.log(err);
          return;
        }

        if (res.affectedRows === 0) {
          const error = new Error();
          error.message = "Registro não encontrado";
          error.httpStatusCode = 404;
          error.code = "ERR003";
          return callback(null, error);
        }
        return callback(res.affectedRows);
      }
    );
  });
};
