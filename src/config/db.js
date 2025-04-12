const mongoose = require("mongoose");
const Book = require("../models/book.models");
const Profile = require("../models/profile.models");
const seedBooks = require("../sample/book.seed.json");
const logger = require("../log/logger"); // adjust to your logger path
const { seedAdminIfNotExists } = require("../utils/seeds.utils");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("MongoDB connection string not provided");
    }
    logger.info("Connecting to Database...");
    await mongoose.connect(MONGO_URI, {
      authSource: "admin",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected');
    });

    logger.info("Connected to Database");

    // Seed if empty
    const count = await Book.countDocuments();
    if (count === 0) {
      logger.info("Seeding initial book data...");
      await Book.insertMany(seedBooks);
      logger.info("Seed completed.");
    } else {
      logger.info("Book collection already has data. Skipping seed.");
    }

    // seed admin profile for development
    await seedAdminIfNotExists();
  } catch (err) {
    logger.error("Failed to connect to Database:\n" + err);
    throw err;
  }
};

module.exports = { connectDB };
