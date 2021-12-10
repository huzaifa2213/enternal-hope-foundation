const mongoose = require("mongoose");
const validator = require("validator");

const adminUserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "minimum 2 letters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
   
  },
  otp: {
    type: Number,
  },
 
  password: String,
  role: String,
  status: String,
});

module.exports = mongoose.model("AdminUser", adminUserSchema);
