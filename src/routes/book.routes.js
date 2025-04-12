const express = require("express");
const router = express.Router();
const { createBook, getAllBooks, getBookById } = require("../controllers/book.controller");
const ValidateRole = require("../utils/rbac.utils");
const Validator = require("../validations/validator.js");
const { ROLES } = require("../utils/constants");
const { apiLevelAuthentication } = require("../middlewares/authentication.middleware.js");

router.get(
  "/",
  Validator("validateFetchAllBooks", true),
  getAllBooks
);

router.get(
  "/:id",
  Validator("validateObjectId", false, true),
  getBookById
);

router.use(apiLevelAuthentication);

router.post(
  "/",
  ValidateRole([ROLES.ADMIN]),
  Validator("createBookValidation"),
  createBook
);



module.exports = router;
