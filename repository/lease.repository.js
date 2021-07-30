const mysql = require("mysql");

module.exports = () => {
    const repository = {};
  
    function conectar() {
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "locadora",
      });
  
      connection.connect(function (err) {
        if (err) {
          console.error("error connecting: " + err.stack);
          return;
        }
  
        console.log("connected as id " + connection.threadId);
      });
  
      return connection;
    }
  
    repository.list = (callback) => {
      const connection = conectar();
      connection.query("SELECT * FROM LEASES", function (err, rows) {
        if (err) {
          console.log(err);
          return;
        }
  
        // usuarios = rows.map((item) => {
        //   if (user.id === item.id) {
        //     return user;
        //   }
        //   return item;
        // });
  
        console.log(rows);
  
        return callback(rows);
      });
    };
  
    repository.register = (lease) => {
      const connection = conectar();
      connection.query(`INSERT INTO LEASES SET ?`, lease, function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
  
        console.log(`inseriu... ${res.insertId}`);
      });
    };
  
    repository.changeemail = (newEmail) => {
      const { id } = usuario;
      const connection = conectar();
      connection.query(
        `UPDATE LEASES SET ? WHERE ID = ${id}`,
        newEmail,
        function (err, res) {
          if (err) {
            console.log(err);
            return;
          }
  
          console.log(`alterou... ${res.insertId}`);
        }
      );
    };
  
    repository.excluir = (id) => {
      const connection = conectar();
      connection.query(`DELETE FROM LEASES WHERE ID = ?`, [id], function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
  
        console.log(`excluiu... ${res.affectedRows}`);
      });
    };
  
  
    return repository;
  };
  