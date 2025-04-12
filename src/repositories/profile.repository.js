const logger = require("../log/logger");
const Profile = require("../models/profile.models");
const { statusMessage } = require("../utils/constants/status.message.utils");
const { AppError } = require("../utils/errors/AppError");

const findById = (id, { select = null, populate = null, lean = true } = {}) => {
  let query = Profile.findById(id);
  if (select) query = query.select(select);
  if (populate) query = query.populate(populate);
  if (lean) query = query.lean();
  return query.exec();
};

const findOne = (filter = {}, { select = null, populate = null, lean = true } = {}) => {
  let query = Profile.findOne(filter);
  if (select) query = query.select(select);
  if (populate) query = query.populate(populate);
  if (lean) query = query.lean();
  return query.exec();
};

const create = async (data) => {
  try {
    return await Profile.create(data);
  } catch (error) {
    logger.error(`Failed while trying to save user details to DB: ${error.message}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new AppError(
        statusMessage[409],
        error,
        409
      );
    }
    throw new AppError(
      statusMessage[500],
      error,
      500
    );
  }
}

module.exports = {
  findById,
  findOne,
  create,
};
