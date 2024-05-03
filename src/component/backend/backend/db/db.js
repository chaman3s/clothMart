const mongoose = require("mongoose");

const connectDB = () => {
  const uri = "mongodb+srv://chaman:TetngUSba875zZQ6@cluster0.1thetrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try{
  let con = mongoose.connect(uri);
  console.log(con);
  return con;
  }
  catch(err){console.log(err);}
};
module.exports = connectDB;