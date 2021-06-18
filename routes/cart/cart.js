const express = require("express");
const { verify, userMiddleware } = require("../../Common-Middleware");
const { addItemToCart } = require("../../Controllers/cart/cart");
const router = express.Router();

router.post("/user/cart/addToCart", verify, userMiddleware, addItemToCart);

module.exports = router;
