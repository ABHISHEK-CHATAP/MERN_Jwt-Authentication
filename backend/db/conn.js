const DB = "mongodb+srv://Abhishek:Abhishek@cluster0.lg986fx.mongodb.net/AuthJwt?retryWrites=true&w=majority"
const mongoose = require("mongoose");
 
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("DataBase Connected..."))
.catch((err)=> console.log("err aaya:",err));