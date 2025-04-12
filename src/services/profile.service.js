const logger = require('../log/logger');
const ProfileRepository = require('../repositories/profile.repository');
const { AppError } = require('../utils/errors/AppError');

const getProfileById = async (id) => {
    try {
        const book = await ProfileRepository.findById(id);
        if (!book) throw new AppError("Profile not found", null, 404);
        return {
            data: book,
            message: "Profile retrieved successfully",
            statusCode: 200,
        };
    } catch (error) {
        logger.error(`Error while fetching: ${error.message}`);
        if (error instanceof AppError) throw error;
        throw new AppError(statusMessage[500], error, error.statusCode || 500)
    }
};

const getProfile = async (query) => {
    try {
        const book = await ProfileRepository.findOne(query);
        if (!book) throw new AppError("Profile not found", null, 404);
        return {
            data: book,
            message: "Profile retrieved successfully",
            statusCode: 200,
        };
    } catch (error) {
        logger.error(`Error while fetching: ${error.message}`);
        if (error instanceof AppError) throw error;
        throw new AppError(statusMessage[500], error, error.statusCode || 500)
    }
};

module.exports = { getProfileById, getProfile };
