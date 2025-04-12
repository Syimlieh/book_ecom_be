const express = require("express");

const router = express.Router();

const Validator = require("../validations/validator");
const AuthenticationController = require("../controllers/authentication.controller");

const { apiLevelAuthentication } = require("../middlewares/authentication.middleware");

router.post(
  "/signup",
  Validator("validateSignup"),
  AuthenticationController.SignUp
);

router.post(
  "/login",
  Validator("valdiateLogin"),
  AuthenticationController.login
);

router.use(apiLevelAuthentication)

router.get(
  "/me",
  AuthenticationController.fetchUserProfile
);

module.exports = router;
