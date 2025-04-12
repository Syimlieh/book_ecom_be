const JWTUtil = require("../utils/jwt.utils");
const { AppError } = require("../utils/errors/AppError");
const { getProfileById } = require("../services/profile.service");
const { formatResponse } = require("../utils/formatting/formatting.utils");
const logger = require("../log/logger");

const apiLevelAuthentication = async (req, res, next) => {
  try {
    const token =
      req.headers?.authorization?.split(" ")[1] || req.query?.auth;

    if (!token) {
      logger.error(`No token provided`);
      const error = new AppError("Authenfication failed.", null, 401);
      return formatResponse(res, error, error.statusCode);
    }

    const { success, data: tokenData } = JWTUtil.verifyAccessToken(token);
    if (!success || !tokenData?.data?.profileId) {
      const error = new AppError("Invalid or expired token", null, 401);
      return formatResponse(res, error, error.statusCode);
    }

    const profile = await getProfileById(tokenData.data.profileId);

    if (!profile.success) {
      const error = new AppError("User not found", null, 404);
      return formatResponse(res, error, error.statusCode);
    }

    req.user = profile.data;
    next();
  } catch (error) {
    const internalError = new AppError(
      "Authentication failed",
      error,
      error.statusCode || 500
    );
    return formatResponse(res, internalError, internalError.statusCode);
  }
};

module.exports = { apiLevelAuthentication };
