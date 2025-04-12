const logger = require("../log/logger");
const Order = require("../models/order.models");
const { statusMessage } = require("../utils/constants/status.message.utils");
const { AppError } = require("../utils/errors/AppError");

const create = async (data) => {
    try {
        return await Order.create(data);
    } catch (error) {
        logger.error(`Failed while trying to save order details to DB: ${error.message}`);
        throw new AppError(
            statusMessage[500],
            error,
            500
        );
    }
}

module.exports = {
    create,
};
