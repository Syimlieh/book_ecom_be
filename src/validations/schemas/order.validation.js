
const Joi = require("joi");
const { PAYMENT_METHOD, REGEX } = require("../../utils/constants");

const validateOrder = Joi.object({
    items: Joi.array()
        .items(
            Joi.object({
                bookId: Joi.string().length(24).hex().required(),
                quantity: Joi.number().integer().min(1).required(),
            })
        )
        .min(1)
        .required(),

    totalAmount: Joi.number().min(0).optional(),

    paymentMethod: Joi.string()
        .valid(...Object.values(PAYMENT_METHOD))
        .required(),

    shippingAddress: Joi.object({
        fullName: Joi.string().min(2).max(100).required(),
        phone: Joi.string().pattern(REGEX.MOBILE).required(),
        address: Joi.string().min(5).max(255).required(),
        state: Joi.string().required(),
        email: Joi.string().email().required(),
    }).required(),
});

module.exports = { validateOrder };