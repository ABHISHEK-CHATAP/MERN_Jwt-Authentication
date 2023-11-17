const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 
//creating schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  confirm_password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
 
 
//Here the password hashing
// userSchema.pre("save", async (next) => {
// //   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, 10);
//   this.confirm_password = await bcrypt.hash(this.confirm_password, 10);
//   next();
// });
 

// ------------------------------------------------------------------------------------------------

// token generate from generateAuthToken function from router.js file
const JWT_SECRET_KEY = "AbhishekChatap";

userSchema.methods.generateAuthToken = async function () {
 try {
  // const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  const token23 = jwt.sign({ _id: this._id.toString()}, JWT_SECRET_KEY,{expiresIn : "1d"});
  this.tokens = this.tokens.concat({ token : token23 });
  await this.save();
  return token23;
 } catch (error) {
  res.status(422).json(error)
 }
};


// ------------------------------------------------------------------------------------------------

 
//creating model
// ("Users") is a Database collection name //  Database name is ("AuthJwt")
const userDb = new mongoose.model("users", userSchema);
 
 
module.exports = userDb;