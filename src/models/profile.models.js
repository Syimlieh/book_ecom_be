const mongoose = require("mongoose");
const { COLLECTION, REGEX, ROLES } = require("../utils/constants");

const ProfileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return REGEX.MOBILE.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
  },
  {
    timestamps: true,
  }
);

ProfileSchema.index({ email: 1 }, { unique: true });
ProfileSchema.index({ phone: 1 }, { unique: true });

module.exports = mongoose.model(COLLECTION.PROFILE, ProfileSchema);