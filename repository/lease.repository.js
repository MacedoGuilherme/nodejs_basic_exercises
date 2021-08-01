const list = require("../services/list")
const totalLeases = require("../services/totalLeases");
const findUser = require("../services/findUser");
const register = require("../services/register");
const changeEmail = require("../services/changeEmail");
const deleteLease = require("../services/deleteLease");

module.exports = () => {
  const repository = {};

  repository.list = list;
  repository.totalLeases = totalLeases;
  repository.findUser = findUser;
  repository.register = register;
  repository.changeEmail = changeEmail;
  repository.deleteLease = deleteLease;

  return repository;
};
