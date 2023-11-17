const express = require("express");
const router = new express.Router();
const userDb = require("../models/usersSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");



// for user registration
router.post("/register", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  console.log(req.body); // data aa gaya without error

  if (password !== confirm_password) {
    res.status(422).json({ error: "Passwords do not match" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  //console.log(hashPassword); // password hassed
  const hashConfirmPassword = await bcrypt.hash(confirm_password, 10);
  // console.log(hashConfirmPassword);

  try {
    const preUser = await userDb.findOne({ email: email });
    if (preUser) {
      res.status(422).json({ error: "User already registered" });
    } else {
      const newUser = new userDb({
        name: name,
        email: email,
        password: hashPassword,
        confirm_password: hashConfirmPassword,
      });
      const savedUser = await newUser.save();
      console.log(" reg api data: ", savedUser);
      res.status(201).json({ message: "user saved successfully", savedUser });
      // All set working good upto above...
    }
  } catch (error) {
    res.status(500).json({ error: "unable to get user registration" });
  }
});

//Register user getData Data
router.get("/register", async (req, res) => {
  try {
    const getUserData = await userDb.find();
    res.status(201).json(getUserData);
  } catch (err) {
    res.status(500).json({ error: "unable to get user registration" });
  }
});

//  Log-in Api
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body); // data aa gaya without error

  try {
    //user valid or not in the database
    const userValid = await userDb.findOne({ email: email });
    if (userValid) {
      const validPassword = await bcrypt.compare(password, userValid.password);

      if (!validPassword) {
        res.status(422).json({ error: "Invalid Password" });
      } else {
        //token generate  == generateAuthToken function is declared in userSchema.js file
        const token = await userValid.generateAuthToken();
        console.log("token : ", token); //Succesfully token genetated

        //Cookie generate (we used this token to generate cookie)
        res.cookie("userCookie", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1 day
          httpOnly: true,
        });

        const result = { userValid, token };

        res.status(201).json({ message: "Login Successfull", result });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "unable to get user login" });
  }
});







// UserValid API = to check user is valid or not after login

router.get("/validUser",authenticate, async(req,res) => {
//  console.log("userValid Api Authenticate function")
 try {
  
    const ValidUserOne = await userDb.findOne({_id : req.userId})
      // console.log("validUserOne : ", ValidUserOne)

      res.status(200).json({status: 200, ValidUserOne });

 } catch (error) {
  res.status(500).json({status: 401, error});
 }
 
})



router.get("/logout",authenticate,(req,res) => {

try {
  req.rootUser.tokens = req.rootUser.tokens.filter((currElem)=>{
    return( currElem.token !== req.token)
  });
  res.clearCookie("userCookie", {path : "/"})
  req.rootUser.save();
  res.status(201).json({status:201, message: "User logged out"})
} catch (error) {
 res.status(401).json({status: 401, error}); 
}


})








// ------------------------------------------------------------------------------------------------

module.exports = router;
