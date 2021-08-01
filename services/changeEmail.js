const conectar = require("../repository/config");

module.exports = (user, callback) => {
  const { cpf, newEmail } = user;
  const connection = conectar();
  connection.query(
    `UPDATE LEASES SET EMAIL = ? WHERE CPF = ${cpf}`,
    newEmail,
    function (err, res) {
      if (err) {
        console.log(err);
        return;
      }
      return callback(res.affectedRows);
    }
  );
};