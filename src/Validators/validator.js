const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("fullname").notEmpty().withMessage("Fullname is required"),
  check("username").notEmpty().withMessage("Username is required"),
  check("email").notEmpty().withMessage("Valid Email is required"),
  check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  check("contact").notEmpty().withMessage("Contact is required"),
];

exports.validateSigninRequest = [
  check("email").notEmpty().withMessage("Valid Email is required"),
  check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
];

exports.validateProductUpload = [
  check("title").notEmpty().withMessage("Product Title is required"),
  check("price").notEmpty().withMessage("Product Price is required"),
  check("description").notEmpty().withMessage("Product Description is required"),
  check("category").notEmpty().withMessage("Product Category is required"),
  check("description").notEmpty().withMessage("Product Description is required"),
  check("quantity").notEmpty().withMessage("Product Quantity is required"),
];

exports.validateCategory = [check("name").notEmpty().withMessage("Category Name is required")];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({
      validated: false,
      error: errors.array(),
    });
  }
  next();
};
