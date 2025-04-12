const mongoose = require("mongoose");
const { COLLECTION, PAYMENT_METHOD, PURCHASED_STATUS } = require("../utils/constants");

const OrderSchema = new mongoose.Schema({
    // we can add profile id too if the user is logged in
    items: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: COLLECTION.BOOKS,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
            },
            shippingCost: {
                type: Number,
                required: true
            },
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: Object.values(PAYMENT_METHOD),
        required: true,
    },
    shippingAddress: {
        fullName: String,
        phone: String,
        address: String,
        state: String,
        email: String
    },
    status: {
        type: String,
        enum: Object.values(PURCHASED_STATUS),
        default: PURCHASED_STATUS.PENDING
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model(COLLECTION.ORDER, OrderSchema);
