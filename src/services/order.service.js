const logger = require("../log/logger");
const OrderRepository = require("../repositories/order.repository");
const BookRepository = require('../repositories/book.repository');
const { AVAILABILITY_STATUS } = require("../utils/constants");
const { AppError } = require("../utils/errors/AppError");
const { roundToTwo } = require("../utils/formatting/formatting.utils");

const createOrder = async (orderData) => {
    try {
        // check product
        let calculatedTotal = 0;
        const orderItemsToUpdate = [];
        const sanitizedItems = [];

        for (const item of orderData.items) {
            const book = await BookRepository.findById(item.bookId);
            if (!book) {
                throw new AppError(`Some book are invalid.`, null, 404);
            }

            if (book.stock < item.quantity) {
                logger.error(`Insufficient stock`);
                throw new AppError(`Insufficient stock for ${book.title}`, null, 400);
            }

            const itemShipping = book.shippingCost;
            const actualPrice = roundToTwo(book.price);
            const itemTotal = roundToTwo((actualPrice * item.quantity) + itemShipping);
            calculatedTotal += itemTotal;

            sanitizedItems.push({
                bookId: book._id,
                quantity: item.quantity,
                price: actualPrice,
                shippingCost: itemShipping,
            });

            // Queue the update
            orderItemsToUpdate.push({
                book,
                newStock: book.stock - item.quantity
            });
        }

        const roundedTotal = roundToTwo(calculatedTotal);

        const order = await OrderRepository.create({
            items: sanitizedItems,
            totalAmount: roundedTotal,
            paymentMethod: orderData.paymentMethod,
            shippingAddress: orderData.shippingAddress,
        });

        // Reduce stock after successful order creation we are only using this here because we are updating based on existing instance
        for (const { book, newStock } of orderItemsToUpdate) {
            book.stock = newStock;
            book.availabilityStatus = newStock > 0 ? AVAILABILITY_STATUS.IN_STOCK : AVAILABILITY_STATUS.OUT_OF_STOCK;
            await book.save();
        }

        return {
            data: order,
            message: "Order created successfully",
            status: 201
        };
    } catch (error) {
        logger.error("Failed while creating new order.")
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to create order", error, 500);
    }
};

module.exports = { createOrder };