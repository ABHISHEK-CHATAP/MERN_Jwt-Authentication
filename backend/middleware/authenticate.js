const jwt = require("jsonwebtoken");
const userDb = require("../models/usersSchema");
const JWT_SECRET_KEY = "AbhishekChatap";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log("Authenticate api token :: " + token);

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const verifytoken = jwt.verify(token, JWT_SECRET_KEY);
    console.log(verifytoken); // user ki id mili authenticate ke liye jo database me store thi  ==> { _id: '6555e766d5297d9c6e58a4a3', iat: 1700155402, exp: 1700241802 }

    const rootUser = await userDb.findOne({ _id: verifytoken._id });
    //  console.log(rootUser)

    if (!rootUser) {
      throw new Error("No user found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    //ab mai req.token se = direct router.js me [token. rootuer, roortUser._id] get kr sakta hoon ye shortcut hai

    next();
  } catch (error) {
    res.status(401).json({status: 401 , error: " unauthorized , no token provided" });
  }
};

module.exports = authenticate;
