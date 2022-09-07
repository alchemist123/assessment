const express = require("express");
const adminRouter = express.Router();
const AdminController = require("../controllers/admin.controller");
const { adminVerifyAccessToken } = require("../middlewares/auth.middleware");
adminRouter.post("/addEmployee", adminVerifyAccessToken ,AdminController.addEmployees);
adminRouter.post("/getEmployee", adminVerifyAccessToken ,AdminController.getEmployee);
adminRouter.post("/deleteRecord", adminVerifyAccessToken ,AdminController.deleteRecord);
adminRouter.post("/updateRecord", adminVerifyAccessToken ,AdminController.updateRecord);
module.exports = adminRouter;
