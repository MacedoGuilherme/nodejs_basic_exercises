const conectar = require("../repository/config");

module.exports = deletelease = (id, callback) => {
  const connection = conectar((connection, err) => {
    if (err) {
      const error = new Error();
      error.message = "Não foi possível conectar ao banco de dados";
      error.httpStatusCode = 500;
      error.code = "ERR003";
      return callback(null, error);
    }

    connection.query(
      `DELETE FROM LEASES WHERE ID = ?`,
      [id],
      function (err, res) {
        if (err) {
          console.log(err);
          return;
        }

        return callback(res.affectedRows);
      }
    );
  });
};
