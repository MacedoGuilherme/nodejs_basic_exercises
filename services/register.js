const conectar = require("../repository/config");

module.exports = (lease) => {
  const connection = conectar();
  connection.query(`INSERT INTO LEASES SET ?`, lease, function (err, res) {
    if (err) {
      console.log(err);
      return;
    }

    console.log(`inseriu... ${res.insertId}`);
  });
};