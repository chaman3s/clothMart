const { StatusCodes } = require("http-status-codes");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
     return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
     });
  }

  const hash_password = await bcrypt.hash(password, 10);
 
  const userData = {
     firstName,
     lastName,
     email,
     hash_password,
  };

  const user = await User.findOne({ email });
  if (user) {
     return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
     });
  } else {
     User.create(userData).then((data, err) => {
     if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
     else
       res
        .status(StatusCodes.CREATED)
        .json({ message: "User created Successfully" });
     });
  }
};
const signIn = async (req, res) => {
    console.log("ok i here");
  try {
     if (!req.body.email || !req.body.password) {
        console.log("ere ");
        res.status(StatusCodes.BAD_REQUEST).json({
           message: "Please enter email and password",
        });
        
     }
     
     const user = await User.findOne({ email: req.body.email });
  
     if (user) {
        console.log(" i am here");
     if (user.authenticate(req.body.password)) {
        console.log(" i am also here");
           const token = jwt.sign(
              { _id: user._id, role: user.role },
              process.env.JWT_SECRET,{ expiresIn: "30d"});
        

  const { _id, firstName, lastName, email, role, fullName } = user;
  console.log("ut",user);
  res.status(StatusCodes.OK).json({
       token,
       user: { _id, firstName, lastName, email, role, fullName },
  });
 } else {
  res.status(StatusCodes.UNAUTHORIZED).json({
     message: "Something went wrong!",
  });
 }
} else {
  res.status(StatusCodes.BAD_REQUEST).json({
      message: "User does not exist..!",
  });
}
} catch (error) {
   res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};
module.exports = { signUp, signIn};