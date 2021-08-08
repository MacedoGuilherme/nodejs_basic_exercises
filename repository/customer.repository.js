const registerLease = require("../services/registerLease");

module.exports = () => {
  const repository = {};

  repository.registerLease = registerLease;

  return repository;
};
