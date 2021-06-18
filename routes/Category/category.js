const express = require("express");
const { verify, adminMiddleware } = require("../../Common-Middleware");
const { createCategory, getCategories } = require("../../Controllers/category/category");
const { validateCategory, isRequestValidated } = require("../../src/Validators/validator");
const router = express.Router();

// =================
//     Routes
// =================

router.post("/category/create", verify, adminMiddleware, validateCategory, isRequestValidated, createCategory);
router.get("/category/getcategory", getCategories);

module.exports = router;
