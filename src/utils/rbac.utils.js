/* eslint-disable func-names */
const { formatResponse } = require('./formatting/formatting.utils');

module.exports = function (roles) {
  return async function (req, res, next) {
    try {
      if (!roles.includes(req.user.role)) {
        throw new Error("Unauthorized");
      }
    } catch (err) {
      return formatResponse(res, { error: "Unauthorized" }, 401);
    }
    next();
  };
};
