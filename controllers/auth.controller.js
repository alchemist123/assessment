const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const { signAccessToken } = require("../middlewares/auth.middleware");
const {mailToClient}=require("../utils/emailHelper");
const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const Object = mongoose.Types.ObjectId;
module.exports = {
    register: async (req, res) => {
      try {
        const { Name, email, password } =
          req.body;
        if (
          !email ||
          !password ||
          !Name
        ) {
          res.json({
            status: "error",
            error: "data missing",
          });
        } else {
          await userModel.find({ email: email }, (err, result) => {
            if (err) {
              res.json(err);
            }
            if (result.length === 0) {
              const newuser = new userModel({
                email: email,
                password: password,
                usertype: "0",
              });
              newuser.save().then(async(data) => {
                const newAdmin=new adminModel({
                    name:Name,
                    userId:Object(data._id)
                })
                await newAdmin.save()
                const to = data.email;
                const sub = "welcome";
                const text = "email: "+email+" password: "+password
                 mailToClient(to, sub, text);
              });
              res.json({status:"ok"})
            } else {
              res.status(500).send({
                status: "error",
                error: "email already in use",
              });
            }
          });
        }
      } catch (err) {
        res.status(500).send({
          status: "error",
          error: 500,
        });
      }
    },
    login: async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) {
          return res.status(500).json({
            status: "error",
            error: "user not found",
          });
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
          return res.status(500).json({
            status: "error",
            error: "Username/password not valid",
          });
        } else {
          const accessToken = await signAccessToken(String(user._id),user.usertype);
          return res.json({
            status: "ok",
            id: user._id,
            userType: user.usertype,
            accessToken: accessToken,
          });
        }
      } catch (err) {
        res.status(500).json({
          status: "error",
          error: 500,
        });
      }
    },
    updatePassword: async (req, res) => {
      try {
        const userId = Object(req.payload.aud);
        const { currentPassword, newPassword } = req.body;
        await userModel.findById(userId, async (err, foundData) => {
          if (err) {
            res.status(500).json({
              status: "error",
              error: "find error",
            });
          }
          if (!currentPassword || !newPassword) {
            res.status(500).json({
              status: "error",
              error: "data missing",
            });
          } else {
            const isMatch = await foundData.isValidPassword(currentPassword);
            if (!isMatch) {
              return res.status(500).json({
                status: "error",
                error: "current password not correct",
              });
            } else {
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(newPassword, salt);
              foundData.password = hashedPassword;
              foundData.save((err, data) => {
                if (err) {
                  res.status(500).json({
                    status: "error",
                    error: "can't update",
                  });
                }
  
                res.json({ status: "updated" });
              });
            }
          }
        });
      } catch (err) {
        res.status(500).json({
          status: "error",
          error: 500,
        });
      }
    },
}