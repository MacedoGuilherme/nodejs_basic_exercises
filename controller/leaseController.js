const request = require("request");
const leaseRep = require("../repository/lease.repository")();

module.exports = () => {
  let leases = [];

  const leasesController = {};

  leasesController.list = (req, res) => {
    leaseRep.list((leases) => {
      res.status(200).json(leases);
    });
  };

  leasesController.finduser = (req, res) => {
    const lease = req.body;

    // const user = leases.filter((item) => {
    //   return item.cpf === lease.cpf;
    // });

    leaseRep.findlease(lease);

    res.status(200).json(user);
  };

  leasesController.totallocacoes = (req, res) => {
    // const totalLeases = leases.reduce((total, lease) => {
    //   return +total + +lease.price;
    // }, 0);

    leaseRep.totallocacoes((total) => {
      res.status(200).send("Total value of leases: " + totalLeases);
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
          // leases.push(lease);
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

    // leases = leases.map((item) => {
    //   if (customer.cpf === item.cpf) {
    //     item.email = customer.newEmail;
    //   }
    //   return item;
    // });

    leaseRep.changeemail(customer);

    res.status(200).json(leases);
  };

  leasesController.deletelease = (req, res) => {
    const id = req.params.id;

    // leases.forEach((lease, index) => {
    //   if (lease.id === id) {
    //     leases.splice(index, 1);
    //   }
    // });

    leaseRep.deletelease(id);

    res.status(200).send("Usuário deletado com sucesso!");
  };

  return leasesController;
};
