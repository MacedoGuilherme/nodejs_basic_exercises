const routing = require("express").Router();
const leaseController = require("../controller/leaseController")();
const customer = require("../controller/customer")();

routing.get('/list', leaseController.list)
routing.get('/finduser', leaseController.finduser)
routing.get('/totalleases', leaseController.totalleases)
routing.post('/register', leaseController.register)
routing.put('/changeemail', leaseController.changeemail)
routing.delete('/deletelease/:id', leaseController.deletelease)

routing.post('/lease', customer.lease)

module.exports = routing;
