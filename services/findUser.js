const conectar = require("../repository/config");

module.exports = (cpf) => {
  const connection = conectar();
  connection.query(
    `SELECT CUSTOMER, CPF, EMAIL FROM LEASES WHERE CPF = ?`,
    cpf,
    function (err, rows) {
      if (err) {
        console.log(err);
        return;
      }

      console.log(rows);

      return rows;
    }
  );
};