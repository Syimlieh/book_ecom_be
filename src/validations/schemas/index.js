const { createBookValidation, validateFetchAllBooks } = require("./book.validation");

const { sortingPaginationValidation, validateObjectId } = require("./general.validation");

const { valdiateLogin, validateSignup } = require("./authentication.validation");

const { validateOrder } = require("./order.validation");

module.exports = {
    // general
    sortingPaginationValidation,
    validateObjectId,

    // authentication
    valdiateLogin,
    validateSignup,

    // book
    createBookValidation,
    validateFetchAllBooks,

    // order
    validateOrder,
}