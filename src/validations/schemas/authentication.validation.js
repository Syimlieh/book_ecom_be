const Joi = require("joi");
const { REGEX } = require("../../utils/constants");

const validateSignup = Joi.object({
  fullName: Joi.string().required(),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
    }),

  phone: Joi.string()
    .pattern(REGEX.MOBILE)
    .required()
    .messages({
      "string.pattern.base": "Invalid phone number format",
    }),

  password: Joi.string()
    .min(8)
    .pattern(REGEX.PASSWORD)
    .required()
    .messages({
      "string.pattern.base": "Password must include uppercase, lowercase, number, and special character",
      "string.min": "Password must be at least 8 characters long",
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
})

const valdiateLogin = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string()
    .min(8)
    .pattern(REGEX.PASSWORD)
    .required()
    .messages({
      "string.pattern.base": "Password must include uppercase, lowercase, number, and special character",
      "string.min": "Password must be at least 8 characters long",
    }),
});

module.exports = {
  valdiateLogin,
  validateSignup,
}