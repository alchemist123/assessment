const mongoose = require("mongoose");
const employeeUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Object,
    required: true
  },
  JoinDate: {
    type: Date
  },
  adminId: {
    type: Object,
    required:true
  },
});
module.exports = mongoose.model("employeemodel", employeeUserSchema);
