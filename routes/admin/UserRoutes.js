const express = require("express");
const { signup, signin, logout } = require("../../Controllers/admin/auth");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../../src/Validators/validator");
const router = express.Router();

//1.  Create NEW Account

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);

//2. SIGNIN to Existing account

router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);

//3. LOGOUT admin

router.post("/admin/logout", logout);

module.exports = router;
