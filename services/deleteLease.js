const conectar = require("../repository/config");

module.exports = deletelease = (id) => {
  const connection = conectar();
  connection.query(
    `DELETE FROM LEASES WHERE ID = ?`,
    [id],
    function (err, res) {
      if (err) {
        console.log(err);
        return;
      }

      console.log(`excluiu... ${res.affectedRows}`);
    }
  );
};