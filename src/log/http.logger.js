const morgan = require("morgan");
const logger = require("./logger");

// Define custom stream for Winston
const stream = {
  write: (message) => logger.http(message.trim()),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const httpLogger = morgan("combined", { stream, skip });

module.exports = httpLogger;