const jwt = require("jsonwebtoken");
const logger = require("../log/logger");
const { AppError } = require("./errors/AppError");

const jwtSecret = process.env.JWT_ACCESS_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || "1h";
const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

const generateToken = (data) => {
  return jwt.sign(
    { data },
    jwtSecret,
    { expiresIn: accessExpiresIn || "1h" }
  );
};

const generateRefreshToken = (data) => {
  return jwt.sign(
    { data },
    refreshTokenSecret,
    { expiresIn: refreshExpiresIn || "7d" }
  );
};

const generateAuthTokens = (payload) => {
  const access_token = generateToken(payload);
  const refresh_token = generateRefreshToken(payload);
  return {
    access_token,
    accessExpiresIn,
    refresh_token,
    refreshExpiresIn,
  };
};

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return { success: true, data: decoded };
  } catch (err) {
    logger.error("Error verifying access token:", err);
    throw new AppError(
      "Invalid access token. Please log in again.",
      null,
      401
    );
  }
};

const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, refreshTokenSecret);
    return { success: true, data: decoded };
  } catch (err) {
    logger.error("Error verifying refresh token:", err);
    throw new AppError(
      "Invalid refresh token. Please log in again.",
      null,
      401
    );
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  generateAuthTokens,
  verifyRefreshToken,
  verifyAccessToken,
};
