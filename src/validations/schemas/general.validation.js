const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const validationObject = {
  limit: Joi.number(),
  page: Joi.number(),
  order_by: Joi.string(),
  order_direction: Joi.string(),
};

const validateObjectId = Joi.object({
  id: Joi.objectId().required(),
})

const sortingPaginationValidation = Joi.object(validationObject);

module.exports = { sortingPaginationValidation, validationObject, validateObjectId };
