const express = require("express");
const {
  createController,
  updateController,
  fetchController,
  deleteController,
} = require("../controllers/crudControllers");
const crudRouter = express.Router();

crudRouter.post("/create", createController);
crudRouter.post("/update/:id", updateController);
crudRouter.get("/read", fetchController);
crudRouter.delete("/delete/:id", deleteController);

module.exports = crudRouter;
