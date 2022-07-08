const {ragistration, view, login, viewById, deleteData} = require("../controller/vehicle.ctrl");
const route = require("express").Router();

route.post("/ragistration",ragistration);
route.get("/view",view);
route.get("/viewById/:id",viewById);
route.post("/login",login);
route.delete("/delete/:id",deleteData);
// route.put("/updateData",updateData);

module.exports = route;