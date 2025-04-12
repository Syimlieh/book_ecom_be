const mongoose = require("mongoose");
const { COLLECTION } = require("../utils/constants");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publisher: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    weight: {
      type: Number,
      min: 0,
    },
    dimensions: {
      width: { type: Number, min: 0 },
      height: { type: Number, min: 0 },
      depth: { type: Number, min: 0 },
    },
    availabilityStatus: {
      type: String,
      trim: true,
    },
    returnPolicy: {
      type: String,
      trim: true,
    },
    shippingInformation: {
      type: String,
      trim: true,
    },
    minimumOrderQuantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    shippingCost: {
      type: Number,
      required: true
    },
    reviews: [
      {
        rating: {
          type: Number,
          min: 0,
          max: 5,
        },
        comment: {
          type: String,
          trim: true,
        },
        date: {
          type: Date,
        },
        reviewerName: {
          type: String,
          trim: true,
        },
      },
    ],
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    thumbnail: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(COLLECTION.BOOKS, bookSchema);