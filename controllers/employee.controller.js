const mongoose = require("mongoose");
const employeeModel = require("../models/employeeModel");
const Object = mongoose.Types.ObjectId;
module.exports = {
    getEmployee:async(req,res)=>{
        try{
            let Empdata=await employeeModel.findOne({userId:Object(req.payload.aud)})
            if(Empdata){
                let data=await employeeModel.aggregate([
                    {
                        $lookup: {
                          from: "users",
                          localField: "userId",
                          foreignField: "_id",
                          as: "userData",
                        },
                      },
                      { $match: { adminId: Object(Empdata.adminId) } },
                ])
                res.json(data)
            }else{
                res.json([])
            }
        }catch(ex){
            res.status(500).send({
                status: "error",
                error: 500,
            });
        }
    }
}