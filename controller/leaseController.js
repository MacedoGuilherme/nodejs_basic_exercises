const request = require("request");
const leaseRep = require("../repository/lease.repository")();

module.exports = () => {
  const leasesController = {};

  leasesController.list = (req, res) => {
    leaseRep.list((leases) => {
      res.status(200).json(leases);
    });
  };

  leasesController.finduser = (req, res) => {
    const lease = req.params.cpf;

    leaseRep.findUser(lease);

    res.status(200).json(lease);
  };

  leasesController.totalleases = (req, res) => {
    leaseRep.totalLeases((total) => {
      res.status(200).json(total);
    });
  };

  leasesController.register = (req, res) => {
    const lease = req.body;
    const { id, customer, cpf, email, game, price } = lease;
    const requestCpf = `https://robsonalves-net-br-document-generator-srvapp.azurewebsites.net/api/CPF/isvalid/${cpf}`;

    request(
      `https://robsonalves-net-br-document-generator-srvapp.azurewebsites.net/api/CPF/isvalid/${cpf}`,
      (error, response, body) => {
        if (body !== '"CPF inválido"') {
          leaseRep.register(lease);
          res.send("Locação cadastrada com sucesso!");
        } else {
          res.send(`${body}`);
        }
      }
    );
  };

  leasesController.changeemail = (req, res) => {
    const customer = req.body;

    leaseRep.changeEmail(customer);

    res.status(200).send("Usuário alterado com sucesso!");
  };

  leasesController.deletelease = (req, res) => {
    const id = req.params.id;

    leaseRep.deleteLease(id);

    res.status(200).send("Usuário deletado com sucesso!");
  };

  return leasesController;
};
