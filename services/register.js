const conectar = require("../repository/config");

module.exports = (lease, callback) => {
  const connection = conectar((connection, err) => {
    if (err) {
      const error = new Error();
      error.message = "Não foi possível conectar ao banco de dados";
      error.httpStatusCode = 500;
      error.code = "ERR003";
      return callback(null, error);
    }

    connection.query(`INSERT INTO LEASES SET ?`, lease, function (err, res) {
      if (err) {
        console.log(err);
        return;
      }
      return callback('Cadastro OK!');
    });
  });
};
