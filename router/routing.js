const routing = require("express").Router();
const leaseController = require("../controller/leaseController")();

routing.get('/list', leaseController.list)
routing.get('/finduser', leaseController.finduser)
routing.get('/totallocacoes', leaseController.totallocacoes)
routing.post('/register', leaseController.register)
routing.put('/changeemail', leaseController.changeemail)
routing.delete('/deletelease', leaseController.deletelease)

module.exports = routing;
