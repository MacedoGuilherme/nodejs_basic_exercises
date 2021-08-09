const request = require("request");
const leaseRep = require("../repository/lease.repository")();

module.exports = () => {
  const leasesController = {};

  leasesController.list = (req, res, callback) => {
    leaseRep.list((leases, err) => {
      if (err) {
        return callback(err);
      }
      res.status(200).json(leases);
    });
  };

  leasesController.finduser = (req, res, callback) => {
    const cpf = req.body.cpf;

    if (!cpf) {
      throw { httpStatusCode: 400, code: 'ERR001', message: 'CPF é obrigatório' };
    }

    leaseRep.findUser(cpf, (user, err) => {
      // if (callback.length !== 0) {
      //   res.status(200).json(callback);
      // } else {
      //   res.status(200).send("Usuário não encontrado!");
      // }
      if (err) {
        return callback(err);
      }
      res.status(200).json(user);
    });
  };

  leasesController.totalleases = (req, res, callback) => {
    const customer = req.body.customer;

    leaseRep.totalLeases(customer, (total, err) => {
      if (err) {
        return callback(err);
      }
      res.status(200).json(total);
    });
  };

  leasesController.register = (req, res, callback) => {
    const lease = req.body;
    const { cpf } = lease;

    if (!cpf) {
      throw {
        httpStatusCode: 400,
        code: "ERR001",
        message: "CPF é obrigatório",
      };
    }

    const requestCpf = `https://robsonalves-net-br-document-generator-srvapp.azurewebsites.net/api/CPF/isvalid/${cpf}`;

    request(requestCpf, (error, response, body) => {
      if (body !== '"CPF inválido"') {
        leaseRep.register(lease, (leases, err) => {
          if (err) {
            return callback(err);
          }
          res.status(200).json();
        });
      } else {
        res.status(400).json(body);
      }
    });
  };

  leasesController.changeemail = (req, res, callback) => {
    const customer = req.body;

    leaseRep.changeEmail(customer, (callback2, err) => {
      if (err) {
        return callback(err);
      }

      if (callback2 === 0) {
        res.status(200).send("CPF não encontrado!");
      } else {
        res.status(200).send("Email alterado com sucesso!");
      }
    });
  };

  leasesController.deletelease = (req, res, callback) => {
    const id = req.params.id;

    leaseRep.deleteLease(id, (callback2, err) => {
      if (err) {
        return callback(err);
      }

      res.status(200).res.send();
    });
  };

  return leasesController;
};
