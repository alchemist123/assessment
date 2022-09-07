const express = require("express");
const empRouter = express.Router();
const empController = require("../controllers/employee.controller");
const { employeeVerifyAccessToken } = require("../middlewares/auth.middleware");
empRouter.post("/getEmployee", employeeVerifyAccessToken ,empController.getEmployee);

module.exports = empRouter;
