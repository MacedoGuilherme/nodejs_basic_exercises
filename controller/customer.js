const customerRep = require("../repository/customer.repository")();

module.exports = () => {
  const customer = {};

  customer.lease = (req, res, callback) => {
    const lease = req.body;

    customerRep.registerLease(lease, (leases, err) => {
      if (err) {
        return callback(err);
      }
      res.status(200).json('Deu certo!');
    });

  };

  return customer;
};
