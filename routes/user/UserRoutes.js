const express = require("express");
const { signup, signin, logout } = require("../../Controllers/user/auth");
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require("../../src/Validators/validator");
const router = express.Router();

//1.  Create NEW Account

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

//2. SIGNIN to Existing account

router.post("/signin", validateSigninRequest, isRequestValidated, signin);

//3. LOGOUT user

router.post("/logout", logout);

module.exports = router;

//3. Verify LOGIN

// router.post("/verify", verify, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });
