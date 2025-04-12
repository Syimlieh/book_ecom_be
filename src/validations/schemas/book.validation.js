const Joi = require("joi");
const { sortingPaginationValidation } = require("./general.validation");

const createBookValidation = Joi.object({
    title: Joi.string().trim().required(),
    author: Joi.string().trim().required(),
    publisher: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    price: Joi.number().min(0).required(),

    rating: Joi.number().min(0).max(5).default(0),
    discountPercentage: Joi.number().min(0).max(100).default(0),
    stock: Joi.number().integer().min(0).required(),
    tags: Joi.array().items(Joi.string().trim()).default([]),
    weight: Joi.number().min(0).required(),

    dimensions: Joi.object({
        length: Joi.number().min(0).required(),
        width: Joi.number().min(0).required(),
        height: Joi.number().min(0).required()
    }).required(),

    images: Joi.array().items(Joi.string().uri()).required(),
    thumbnail: Joi.string().uri().required(),

    availabilityStatus: Joi.string().trim().required(),
    returnPolicy: Joi.string().trim().required(),
    shippingInformation: Joi.string().trim().required(),
    shippingCost: Joi.number().required(),
    minimumOrderQuantity: Joi.number().integer().min(1).required(),

    reviews: Joi.array().items(
        Joi.object({
            userId: Joi.string().trim().required(),
            rating: Joi.number().min(0).max(5).required(),
            comment: Joi.string().trim().required(),
            date: Joi.date().iso().required()
        })
    ).default([])
});

const validateFetchAllBooks = sortingPaginationValidation.keys({
    title: Joi.string().trim(),
    category: Joi.string().trim(),
    author: Joi.string().trim(),
})

module.exports = {
    createBookValidation,
    validateFetchAllBooks,
};