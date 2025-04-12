const logger = require("./log/logger");
const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 4000;

// Connect DB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Backend Server running on PORT: [${PORT}]`);
    });
  })
  .catch((err) => {
    logger.error(`Error while starting server due to DB error ${err}`);
    process.exit(1);
  });
