const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/order.controller.js");
const Validator = require("../validations/validator.js");

router.post(
  "/",
  Validator("validateOrder"),
  createOrder
);

module.exports = router;
