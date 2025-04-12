const _ = require("lodash");

const { formatResponse } = require("../utils/formatting/formatting.utils");

const Validations = require("./schemas");

module.exports = function (schemaName, query = false, params = false) {
  if (!Validations.hasOwnProperty(schemaName))
    return new Error(`'${schemaName}' schemaName is not exist`);

  return async function (req, res, next) {
    try {
      if (query) {
        if (!_.isEmpty(req.query)) {
          await Validations[schemaName].validateAsync(req.query);
        }
      } else if (params) {
        await Validations[schemaName].validateAsync(req.params);
      } else {
        const validated = await Validations[schemaName].validateAsync(req.body);
        req.body = validated;
      }
      next();
    } catch (err) {
      if (err.isJoi) return formatResponse(res, { error: err.message }, 400);
      return formatResponse(
        res,
        { message: "Error while validating request" },
        400
      );
    }
  };
};
