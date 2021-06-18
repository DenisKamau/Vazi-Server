const express = require("express");
const router = express.Router();

// =============================
//   Middleware / Controllers
// =============================

const { verify, adminMiddleware } = require("../../Common-Middleware");
const { createProduct, getProducts, fetchProduct, uploadImage, getProductsBySlug } = require("../../Controllers/product/product");
const { isRequestValidated, validateProductUpload } = require("../../src/Validators/validator");

// =================
//     Routes
// =================

router.post("/uploadImage", verify, adminMiddleware, uploadImage);

router.post("/product/createProduct", verify, adminMiddleware, validateProductUpload, isRequestValidated, createProduct);

router.post("/getProducts", getProducts);

router.get("/products_by_id", fetchProduct);

router.get("/products/:slug", getProductsBySlug);

module.exports = router;
