const express = require("express");
const authRouter = express.Router();
const AuthController = require("../controllers/auth.controller");
const { verifyAccessToken } = require("../middlewares/auth.middleware");
authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/updatePassword",verifyAccessToken ,AuthController.updatePassword);
module.exports = authRouter;