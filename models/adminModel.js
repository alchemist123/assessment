const mongoose = require("mongoose");
const adminUserSchema = new mongoose.Schema({
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
});
module.exports = mongoose.model("Adminmodel", adminUserSchema);
