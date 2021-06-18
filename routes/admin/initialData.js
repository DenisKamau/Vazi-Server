const express = require("express");
const { initialData } = require("../../Controllers/admin/initialData");
const router = express.Router();

router.post("/initialData", initialData);

module.exports = router;
