const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");


const validateSignUpRequest = [
check("firstName").notEmpty().withMessage("First Name is required"),
check("lastName").notEmpty().withMessage("Last Name is required"),
check("email").isEmail().withMessage("Valid Email required"),
check("password")
   .isLength({ min: 6 })
   .withMessage("Password must be at least 6 character long"),
];
const validateSignIpRequest = [
check("email").isEmail().withMessage("Valid Email required"),
check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
]
const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
 console.log("err "+errors.array().length);
  if (errors.array().length > 0) {
    console.log("error ");
      return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ error: errors.array()[0].msg });
  }
  console.log("ok");
  next();
};
module.exports = {
  validateSignUpRequest,
  isRequestValidated,
  validateSignIpRequest,
};