const BookRepository = require('../repositories/book.repository');
const BookPipeline = require('../pipelines/book.pipeline');
const { AppError } = require('../utils/errors/AppError');
const logger = require('../log/logger');
const { statusMessage } = require('../utils/constants/status.message.utils');

const create = async (bookPayload) => {
  try {
    const createdBook = await BookRepository.create(bookPayload);
    return {
      data: createdBook,
      message: "Book created successfully",
      statusCode: 201,
    };
  } catch (error) {
    logger.error(`Error creating book: ${error.message}`);
    if (error instanceof AppError) throw error;
    throw new AppError(statusMessage[500], error, error.statusCode || 500)
  }
};

const getAll = async (filters) => {
  try {
    const pipeling = BookPipeline.getAllBooksPipeline(filters);
    const books = await BookRepository.aggregate(pipeling);
    return {
      data: books,
      message: "Book retrieved successfully",
      statusCode: 200,
    };
  } catch (error) {
    logger.error(`Error fetching books: ${error.message}`);
    if (error instanceof AppError) throw error;
    throw new AppError(statusMessage[500], error, error.statusCode || 500)
  }
};

const getById = async (id) => {
  try {
    const book = await BookRepository.findById(id);
    if (!book) throw new AppError("Book not found", null, 404);
    return {
      data: book,
      message: "Book retrieved successfully",
      statusCode: 200,
    };
  } catch (error) {
    logger.error(`Error while fetching: ${error.message}`);
    if (error instanceof AppError) throw error;
    throw new AppError(statusMessage[500], error, error.statusCode || 500)
  }
};

module.exports = {
  create,
  getAll,
  getById,
};