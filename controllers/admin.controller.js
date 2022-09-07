const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const {mailToClient}=require("../utils/emailHelper");
const adminModel = require("../models/adminModel");
const employeeModel = require("../models/employeeModel");
const {convertCSV}=require("../utils/convertToJson")

module.exports = {
    addEmployees:async(req,res)=>{
        try{
            let jsonData=await convertCSV(req.body.base)
            for(let i=0;i<jsonData.length;i++){
                let data=await userModel.findOne({ email: jsonData[i].email })
                if(!data){
                    const newuser = new userModel({
                        email: jsonData[i].email,
                        password: jsonData[i].password,
                        usertype: "1",
                      });
                    let userData=await newuser.save();
                    let employee=new employeeModel({
                        name:jsonData[i].name,
                        userId:Object(userData._id),
                        adminId:Object(req.payload.aud),
                        JoinDate:Date(jsonData[i].doj)
                    })
                    const to = jsonData[i].email;
                    const sub = "welcome";
                    const text = "email: "+jsonData[i].email+" password: "+jsonData[i].password
                    mailToClient(to, sub, text);
                    await employee.save()
                }
            }
            res.json({status:"ok"})
        }catch(ex){
            res.status(500).send({
                status: "error",
                error: 500,
            });
        }
    },
    getEmployee:async(req,res)=>{
        try{
            let data=await employeeModel.aggregate([
                {
                    $lookup: {
                      from: "users",
                      localField: "userId",
                      foreignField: "_id",
                      as: "userData",
                    },
                  },
                  { $match: { adminId: Object(req.payload.aud) } },
            ])
            res.json(data)
        }catch(ex){
            res.status(500).send({
                status: "error",
                error: 500,
            });
        }
    },
    deleteRecord:async(req,res)=>{
        try{
            let data=await employeeModel.findOne({userId:Object(req.body.userId)})
            if(data){
                await employeeModel.deleteOne({_id:Object(data._id)})
                await userModel.deleteOne({_id:Object(req.body.userId)})
                res.json({status:"deleted"})
            }else{
                res.status(500).send({
                    status: "error",
                    error: "can't find record",
                }); 
            }
        }catch(ex){
            res.status(500).send({
                status: "error",
                error: 500,
            });
        }
    },
    updateRecord:async(req,res)=>{
        try{
            let data=await employeeModel.findOne({userId:Object(req.body.userId)})
            if(data){
                await employeeModel.updateOne({userId:Object(req.body.userId)},{
                    name:req.body.name,
                    JoinDate:Date(req.body.joinDate),
                })
                await userModel.updateOne({_id:Object(req.body.userId)},{
                    email:req.body.email,
                })
                res.json({status:"updated"})
            }else{
                res.status(500).send({
                    status: "error",
                    error: "can't find record",
                }); 
            }
        }catch(ex){
            res.status(500).send({
                status: "error",
                error: 500,
            });
        }
    }
}