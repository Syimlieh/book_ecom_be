const Book = require("../models/book.models");

const aggregate = async (pipeline = []) => {
  return await Book.aggregate(pipeline);
};

const findById = (id) => {
  let query = Book.findById(id);
  return query;
};

const create = async (data) => {
  try {
    return await Book.create(data);
  } catch (error) {
    logger.error(`Failed while trying to save book details to DB: ${error.message}`);
    throw new AppError(
      statusMessage[500],
      error,
      500
    );
  }
}

module.exports = {
  aggregate,
  findById,
  create,
};
