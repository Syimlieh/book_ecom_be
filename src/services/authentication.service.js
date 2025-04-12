const ProfileRepository = require('../repositories/profile.repository');
const { AppError } = require('../utils/errors/AppError');
const logger = require('../log/logger');
const { statusMessage } = require('../utils/constants/status.message.utils');
const { hashPassword, comparePassword } = require('../utils/hash.utils');
const { generateAuthTokens } = require('../utils/jwt.utils');

const signup = async (payload) => {
  try {
    const hashedPassword = await hashPassword(payload.password);

    const newUser = await ProfileRepository.create({ ...payload, password: hashedPassword });

    return {
      data: newUser,
      message: "Signup successful",
      statusCode: 201,
    };
  } catch (error) {
    logger.error(`Error during signup: ${error.message}`);
    if (error instanceof AppError) throw error;
    throw new AppError(statusMessage[500], error, error.statusCode || 500);
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await ProfileRepository.findOne({ email }, { select: '+password', lean: true });
    if (!user || !comparePassword(password, user.password)) {
      throw new AppError("Invalid email or password", null, 401);
    }

    const responsePayload = {
      profileId: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const tokens = generateAuthTokens(responsePayload);

    return {
      data: tokens,
      message: "Login successful",
      statusCode: 200,
    };
  } catch (error) {
    logger.error(`Error during login: ${error.message}`);
    if (error instanceof AppError) throw error;
    throw new AppError(statusMessage[500], error, error.statusCode || 500);
  }
};

module.exports = {
  signup,
  login,
};